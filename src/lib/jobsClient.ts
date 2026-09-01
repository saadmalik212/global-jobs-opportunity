"use client";

import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function trackJobApplication(jobId: string): Promise<void> {
  if (!jobId) return;

  const ref = doc(db, "jobs", jobId);
  await updateDoc(ref, {
    applicationCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}