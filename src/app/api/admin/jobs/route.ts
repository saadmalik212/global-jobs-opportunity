import { NextRequest, NextResponse } from "next/server";
import { fetchJobsUncached } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const jobs = await fetchJobsUncached(500); // ya jitni limit set ki hai
  return NextResponse.json({ jobs });
}