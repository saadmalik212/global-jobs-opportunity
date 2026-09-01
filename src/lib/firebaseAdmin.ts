import 'server-only';
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
   
    privateKey = privateKey.trim().replace(/^["']|["']$/g, '');
    // 2. Escaped \n ko actual newline characters me convert karein
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const adminDb = getFirestore(getAdminApp());