import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const MESSAGES_COLLECTION = "contactMessages";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return Date.now();
}

/** Called from the public contact form — anyone can create one, no login needed. */
export async function submitContactMessage(input: ContactMessageInput): Promise<void> {
  await addDoc(collection(db, MESSAGES_COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

/** Called from the admin panel only — reading messages requires admin login. */
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const q = query(collection(db, MESSAGES_COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: (data.name as string) ?? "",
      email: (data.email as string) ?? "",
      subject: (data.subject as string) ?? "",
      message: (data.message as string) ?? "",
      createdAt: toMillis(data.createdAt),
    };
  });
}