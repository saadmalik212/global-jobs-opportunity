import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST() {
  try {

    const keys = await redis.keys("jobs-list-*");
    const jobKeys = await redis.keys("job-detail-*");
    const allKeys = [...keys, ...jobKeys];

    if (allKeys.length > 0) {
      await redis.del(...allKeys);
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("Redis clear error:", err);
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}