import { NextRequest, NextResponse } from "next/server";
import { fetchJobsPageUncached } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const cursorParam = req.nextUrl.searchParams.get("cursor");
  const cursor = cursorParam ? Number(cursorParam) : undefined;
  const result = await fetchJobsPageUncached(5, Number.isFinite(cursor) ? cursor : undefined);

  return NextResponse.json(result);
}