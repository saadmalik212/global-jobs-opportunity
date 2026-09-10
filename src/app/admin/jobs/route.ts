import { NextRequest, NextResponse } from "next/server";
import { fetchJobsUncached } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const pageParam = Number(req.nextUrl.searchParams.get("page") ?? "1");
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const pageSize = 5;
  const allJobs = await fetchJobsUncached(1000);
  const start = (page - 1) * pageSize;
  const jobs = allJobs.slice(start, start + pageSize);

  return NextResponse.json({
    jobs,
    hasNextPage: start + pageSize < allJobs.length,
  });
}