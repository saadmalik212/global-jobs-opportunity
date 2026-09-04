import "server-only";
import { redis } from "./redis";
import { Timestamp as AdminTimestamp } from "firebase-admin/firestore";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit as fsLimit,
  serverTimestamp,
  Timestamp,
  where,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";
import { Job, JobFormValues, JobMetaField } from "./types";
import { adminDb } from "./firebaseAdmin";

const JOBS_COLLECTION = "jobs";
const CACHE_TTL = 300; // 5 minutes, seconds mein

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (value && typeof value === "object" && "toMillis" in value && typeof (value as any).toMillis === "function") {
    return (value as any).toMillis();
  }
  if (typeof value === "number") return value;
  return Date.now();
}

function normalizeMetaFields(value: unknown): JobMetaField[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      id: String((item.id as string) ?? `${Date.now()}-${Math.random()}`),
      label: String((item.label as string) ?? ""),
      value: String((item.value as string) ?? ""),
    }))
    .filter((item) => item.label.trim() || item.value.trim());
}

function mapDoc(id: string, data: Record<string, unknown>): Job {
  return {
    id,
    title: (data.title as string) ?? "",
    location: (data.location as string) ?? "",
    experience: (data.experience as string) ?? "",
    jobType: (data.jobType as string) ?? "",
    company: (data.company as string) ?? "",
    salary: (data.salary as string) ?? "",
    applicationCount: Number(data.applicationCount ?? 0),
    applyLink: (data.applyLink as string) ?? "",
    applyLinkDisplay: (data.applyLinkDisplay as Job["applyLinkDisplay"]) ?? "real",
    applyLinkLabel: (data.applyLinkLabel as string) ?? "",
    metaFields: normalizeMetaFields(data.metaFields),
    requirements: (data.requirements as Job["requirements"]) ?? [],
    noticeLine: (data.noticeLine as string) ?? "",
    createdAt: toMillis(data.createdAt),
    updatedAt: toMillis(data.updatedAt),
  };
}

async function rawFetchJobs(maxCount: number = 50): Promise<Job[]> {
  try {
    const snap = await adminDb
      .collection(JOBS_COLLECTION)
      .orderBy("createdAt", "desc")
      .limit(maxCount)
      .get();
    return snap.docs.map((d) => mapDoc(d.id, d.data()));
  } catch (err) {
    console.error("rawFetchJobs error:", err);
    return [];
  }
}

async function rawFetchJob(id: string): Promise<Job | null> {
  try {
    const snap = await adminDb.collection(JOBS_COLLECTION).doc(id).get();
    if (!snap.exists) return null;
    return mapDoc(snap.id, snap.data() as Record<string, unknown>);
  } catch (err) {
    console.error("rawFetchJob error:", err);
    return null;
  }
}

// In-flight request coalescing — same Lambda container ke andar
// simultaneous requests ko ek hi Firestore fetch share karwata hai,
// taake cache-expire ke waqt "thundering herd" na ho.
const inflightRequests = new Map<string, Promise<any>>();

export async function fetchJobs(maxCount: number = 50): Promise<Job[]> {
  const cacheKey = `jobs-list-${maxCount}`;

  try {
    const cached = await redis.get<Job[]>(cacheKey);
    if (cached) return cached;
  } catch (err) {
    console.error("Redis get error:", err);
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    const jobs = await rawFetchJobs(maxCount);
    try {
      await redis.set(cacheKey, jobs, { ex: CACHE_TTL });
    } catch (err) {
      console.error("Redis set error:", err);
    }
    return jobs;
  })();

  inflightRequests.set(cacheKey, fetchPromise);

  try {
    return await fetchPromise;
  } finally {
    inflightRequests.delete(cacheKey);
  }
}

export async function fetchJob(id: string): Promise<Job | null> {
  const cacheKey = `job-detail-${id}`;

  try {
    const cached = await redis.get<Job>(cacheKey);
    if (cached) return cached;
  } catch (err) {
    console.error("Redis get error:", err);
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    const job = await rawFetchJob(id);
    if (job) {
      try {
        await redis.set(cacheKey, job, { ex: CACHE_TTL });
      } catch (err) {
        console.error("Redis set error:", err);
      }
    }
    return job;
  })();

  inflightRequests.set(cacheKey, fetchPromise);

  try {
    return await fetchPromise;
  } finally {
    inflightRequests.delete(cacheKey);
  }
}

export async function fetchJobsPage(
  pageSize: number = 20,
  cursor?: number // last job ka createdAt (millis)
): Promise<{ jobs: Job[]; nextCursor: number | null }> {
  const cacheKey = `jobs-page-${pageSize}-${cursor ?? "first"}`;

  try {
    const cached = await redis.get<{ jobs: Job[]; nextCursor: number | null }>(cacheKey);
    if (cached) return cached;
  } catch (err) {
    console.error("Redis get error:", err);
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    try {
      let q = adminDb
        .collection(JOBS_COLLECTION)
        .orderBy("createdAt", "desc")
        .limit(pageSize);

      if (cursor) {
        q = q.startAfter(AdminTimestamp.fromMillis(cursor));
      }

      const snap = await q.get();
      const jobs = snap.docs.map((d) => mapDoc(d.id, d.data()));

      const nextCursor =
        jobs.length === pageSize ? jobs[jobs.length - 1].createdAt : null;

      const result = { jobs, nextCursor };

      try {
        await redis.set(cacheKey, result, { ex: CACHE_TTL });
      } catch (err) {
        console.error("Redis set error:", err);
      }

      return result;
    } catch (err) {
      console.error("fetchJobsPage error:", err);
      return { jobs: [], nextCursor: null };
    }
  })();

  inflightRequests.set(cacheKey, fetchPromise);

  try {
    return await fetchPromise;
  } finally {
    inflightRequests.delete(cacheKey);
  }
}

export async function fetchJobsUncached(maxCount: number = 200): Promise<Job[]> {
  return rawFetchJobs(maxCount);
}

export async function fetchJobUncached(id: string): Promise<Job | null> {
  return rawFetchJob(id);
}

export async function fetchJobsFiltered(
  filters: {
    cities?: string[];
    countries?: string[];
    remoteOnly?: boolean;
    onsiteOnly?: boolean;
    internshipOnly?: boolean;
  },
  page: number = 1,
  pageSize: number = 10
): Promise<{ jobs: Job[]; totalCount: number; totalPages: number }> {
  try {
    const allJobs = await fetchJobs(1000);

    const filtered = allJobs.filter((job) => {
      const haystack =
        `${job.title} ${job.location} ${job.jobType} ${job.experience}`.toLowerCase();

      if (filters.cities && filters.cities.length > 0) {
        const hit = filters.cities.some((city) => haystack.includes(city.toLowerCase()));
        if (!hit) return false;
      }
      if (filters.countries && filters.countries.length > 0) {
        const hit = filters.countries.some((country) =>
          haystack.includes(country.toLowerCase().replace(/\s*\(uae\)/, ""))
        );
        if (!hit) return false;
      }
      if (filters.remoteOnly && !haystack.includes("remote")) return false;
      if (filters.onsiteOnly && haystack.includes("remote")) return false;
      if (filters.internshipOnly && !haystack.includes("intern")) return false;

      return true;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedJobs = filtered.slice(start, start + pageSize);

    return { jobs: paginatedJobs, totalCount, totalPages };
  } catch (err) {
    console.error("fetchJobsFiltered error:", err);
    return { jobs: [], totalCount: 0, totalPages: 0 };
  }
}

export async function createJob(values: JobFormValues): Promise<string> {
  const ref = await addDoc(collection(db, JOBS_COLLECTION), {
    ...values,
    applicationCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
}

export async function updateJob(id: string, values: JobFormValues): Promise<void> {
  const ref = doc(db, JOBS_COLLECTION, id);
  await updateDoc(ref, {
    ...values,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteJob(id: string): Promise<void> {
  await deleteDoc(doc(db, JOBS_COLLECTION, id));
}