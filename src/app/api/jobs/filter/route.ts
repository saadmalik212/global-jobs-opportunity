import { NextRequest, NextResponse } from "next/server";
import { fetchJobsFiltered } from "@/lib/jobs";
import { JobFilters } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const filters: JobFilters = {
    cities: searchParams.get("cities")?.split(",").filter(Boolean) ?? [],
    countries: searchParams.get("countries")?.split(",").filter(Boolean) ?? [],
    remoteOnly: searchParams.get("remote") === "true",
    onsiteOnly: searchParams.get("onsite") === "true",
    internshipOnly: searchParams.get("intern") === "true",
  };

  const page = Number(searchParams.get("page") ?? 1);

  const result = await fetchJobsFiltered(filters, page, 10);

  return NextResponse.json(result);
}