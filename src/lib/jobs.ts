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
 */
async function rawFetchJobs(maxCount?: number): Promise<Job[]> {
  const q = maxCount
    ? query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"), fsLimit(maxCount))
    : query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

async function rawFetchJob(id: string): Promise<Job | null> {
  const ref = doc(db, JOBS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDoc(snap.id, snap.data());
}

export const fetchJobs = (maxCount?: number) =>
  unstable_cache(
    async () => rawFetchJobs(maxCount),
    [`jobs-list-${maxCount || "all"}`],
    { revalidate: 300, tags: ["jobs"] }
  )();

export const fetchJob = (id: string) =>
  unstable_cache(
    async () => rawFetchJob(id),
    [`job-detail-${id}`],
    { revalidate: 300, tags: ["jobs"] }
  )();

/** Uncached version specifically for Admin Dashboard */
export async function fetchJobsUncached(maxCount?: number): Promise<Job[]> {
  return rawFetchJobs(maxCount);
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