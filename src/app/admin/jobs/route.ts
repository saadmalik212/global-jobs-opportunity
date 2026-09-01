import { NextRequest, NextResponse } from "next/server";
import { fetchJobsUncached } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit");
  const jobs = await fetchJobsUncached(limit ? Number(limit) : undefined);
  return NextResponse.json({ jobs });
}