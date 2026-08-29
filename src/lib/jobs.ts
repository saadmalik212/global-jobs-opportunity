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
} from "firebase/firestore";
import { db } from "./firebase";
import { Job, JobFormValues } from "./types";
import { unstable_cache } from "next/cache";

const JOBS_COLLECTION = "jobs";

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return Date.now();
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
    applyLink: (data.applyLink as string) ?? "",
    applyLinkDisplay: (data.applyLinkDisplay as Job["applyLinkDisplay"]) ?? "real",
    requirements: (data.requirements as Job["requirements"]) ?? [],
    noticeLine: (data.noticeLine as string) ?? "",
    createdAt: toMillis(data.createdAt),
    updatedAt: toMillis(data.updatedAt),
  };
}

/**
 * Direct uncached fetch function for raw internal access.
 * Default limit 50 set kar di gayi hai taake uncontrolled reads na hon.
 */
async function rawFetchJobs(maxCount: number = 50): Promise<Job[]> {
  const q = query(
    collection(db, JOBS_COLLECTION),
    orderBy("createdAt", "desc"),
    fsLimit(maxCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

async function rawFetchJob(id: string): Promise<Job | null> {
  const ref = doc(db, JOBS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDoc(snap.id, snap.data());
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

/** 
 * Client-Side Filter Function: Direct search on full database when user clicks sidebar filters.
 */
export async function fetchJobsFiltered(filters: { country?: string; jobType?: string }): Promise<Job[]> {
  const constraints = [];

  if (filters.country) {
    constraints.push(where("location", "==", filters.country));
  }
  if (filters.jobType) {
    constraints.push(where("jobType", "==", filters.jobType));
  }

  const q = query(
    collection(db, JOBS_COLLECTION),
    ...constraints,
    orderBy("createdAt", "desc"),
    fsLimit(100)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

export async function createJob(values: JobFormValues): Promise<string> {
  const ref = await addDoc(collection(db, JOBS_COLLECTION), {
    ...values,
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