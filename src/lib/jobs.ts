import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  limit as fsLimit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Job, JobFormValues } from "./types";

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
 * One-time fetch, newest first. Pass `maxCount` to cap how many documents
 * are read — e.g. the Related Jobs section only needs a recent sample, not
 * the entire collection, so it should always pass a limit to keep Firestore
 * read costs bounded as the number of job posts grows.
 */
export async function fetchJobs(maxCount?: number): Promise<Job[]> {
  const q = maxCount
    ? query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"), fsLimit(maxCount))
    : query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data()));
}

/** Live subscription — used in the admin dashboard so new posts show instantly. */
export function subscribeJobs(callback: (jobs: Job[]) => void) {
  const q = query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => mapDoc(d.id, d.data())));
  });
}

export async function fetchJob(id: string): Promise<Job | null> {
  const ref = doc(db, JOBS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDoc(snap.id, snap.data());
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