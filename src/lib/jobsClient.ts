"use client";

import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "./firebase";
import { JobFormValues } from "./types";

export async function trackJobApplication(jobId: string): Promise<void> {
  if (!jobId) return;
  const ref = doc(db, "jobs", jobId);
  await updateDoc(ref, { applicationCount: increment(1), updatedAt: serverTimestamp() });
}

export async function createJob(values: JobFormValues): Promise<string> {
  const ref = await addDoc(collection(db, "jobs"), {
    ...values,
    applicationCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateJob(id: string, values: JobFormValues): Promise<void> {
  const ref = doc(db, "jobs", id);
  await updateDoc(ref, { ...values, updatedAt: serverTimestamp() });
}

export async function deleteJob(id: string): Promise<void> {
  await deleteDoc(doc(db, "jobs", id));
}