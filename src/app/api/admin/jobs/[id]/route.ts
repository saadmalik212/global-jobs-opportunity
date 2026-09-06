import { NextRequest, NextResponse } from "next/server";
import { fetchJobUncached } from "@/lib/jobs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const job = await fetchJobUncached(params.id);
  return NextResponse.json({ job });
}