import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";

export async function POST(req: Request) {
  try {
    const { url, type = 'URL_UPDATED' } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Google Auth Setup
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });

    // API Call to Google
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type, 
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Indexing API Error:', error.response?.data || error.message);
    Sentry.captureException(error);
    return NextResponse.json(
      { error: error.message || 'Failed to trigger indexing' },
      { status: 500 }
    );
  }
}
