import { NextRequest, NextResponse } from "next/server";
import { fetchJobsUncachedPaginated } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
  const pageSize = Number(req.nextUrl.searchParams.get("pageSize") ?? 5);

  const result = await fetchJobsUncachedPaginated(page, pageSize);

  return NextResponse.json(result);
}