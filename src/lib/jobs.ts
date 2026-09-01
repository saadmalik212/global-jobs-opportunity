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
import { unstable_cache } from "next/cache";
import * as Sentry from "@sentry/nextjs";


const JOBS_COLLECTION = "jobs";

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
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
    metaFields: normalizeMetaFields(data.metaFields),
    requirements: (data.requirements as Job["requirements"]) ?? [],
    noticeLine: (data.noticeLine as string) ?? "",
    createdAt: toMillis(data.createdAt),
    updatedAt: toMillis(data.updatedAt),
  };
}

async function rawFetchJobs(maxCount: number = 50): Promise<Job[]> {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      orderBy("createdAt", "desc"),
      fsLimit(maxCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapDoc(d.id, d.data()));
  } catch (err) {
    console.error("rawFetchJobs error:", err);
    Sentry.captureException(err); 
    return [];
  }
}

async function rawFetchJob(id: string): Promise<Job | null> {
  try {
    const ref = doc(db, JOBS_COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return mapDoc(snap.id, snap.data());
  } catch (err) {
    console.error("rawFetchJob error:", err);
    Sentry.captureException(err);
    return null;
  }
}

/**
 * Next.js Cached Data Fetching (5 Minutes Cache)
 */
export const fetchJobs = (maxCount: number = 50) =>
  unstable_cache(
    async () => rawFetchJobs(maxCount),
    [`jobs-list-${maxCount}`],
    { revalidate: 300, tags: ["jobs"] }
  )();

export const fetchJob = (id: string) =>
  unstable_cache(
    async () => rawFetchJob(id),
    [`job-detail-${id}`],
    { revalidate: 300, tags: ["jobs"] }
  )();

/** Uncached version specifically for Admin Dashboard */
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
  }
): Promise<Job[]> {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      orderBy("createdAt", "desc"),
      fsLimit(500) 
    );

    const snap = await getDocs(q);
    const allJobs = snap.docs.map((d) => mapDoc(d.id, d.data()));

    const filtered = allJobs.filter((job) => {
      const haystack =
        `${job.title} ${job.location} ${job.jobType} ${job.experience}`.toLowerCase();

      if (filters.cities && filters.cities.length > 0) {
        const hit = filters.cities.some((city) =>
          haystack.includes(city.toLowerCase())
        );
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

    return filtered;
  } catch (err) {
    console.error("fetchJobsFiltered error:", err);
    Sentry.captureException(err);
    return [];
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

export async function trackJobApplication(jobId: string): Promise<void> {
  if (!jobId) return;

  const ref = doc(db, JOBS_COLLECTION, jobId);
  await updateDoc(ref, {
    applicationCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteJob(id: string): Promise<void> {
  await deleteDoc(doc(db, JOBS_COLLECTION, id));
    
}