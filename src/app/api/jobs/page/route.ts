import { NextRequest, NextResponse } from "next/server";
import { fetchJobsPage } from "@/lib/jobs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const limit = Number(searchParams.get("limit") ?? 20);

  const result = await fetchJobsPage(limit, cursor ? Number(cursor) : undefined);

  return NextResponse.json(result);
}