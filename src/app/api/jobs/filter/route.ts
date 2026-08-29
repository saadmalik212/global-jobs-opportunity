import { NextRequest, NextResponse } from "next/server";
import { fetchJobs } from "@/lib/jobs";
import { Job, JobFilters } from "@/lib/types";

export const revalidate = 300;

function jobMatches(job: Job, filters: JobFilters): boolean {
  const haystack = `${job.title} ${job.location} ${job.jobType} ${job.experience}`.toLowerCase();

  if (filters.cities.length > 0) {
    const hit = filters.cities.some((c) => haystack.includes(c.toLowerCase()));
    if (!hit) return false;
  }

  if (filters.countries.length > 0) {
    const hit = filters.countries.some((c) =>
      haystack.includes(c.toLowerCase().replace(/\s*\(uae\)/, ""))
    );
    if (!hit) return false;
  }

  if (filters.remoteOnly && !haystack.includes("remote")) return false;
  if (filters.internshipOnly && !haystack.includes("intern")) return false;

  return true;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const filters: JobFilters = {
    cities: searchParams.get("cities")?.split(",").filter(Boolean) ?? [],
    countries: searchParams.get("countries")?.split(",").filter(Boolean) ?? [],
    remoteOnly: searchParams.get("remote") === "true",
    onsiteOnly: searchParams.get("onsite") === "true",
    internshipOnly: searchParams.get("intern") === "true",
  };

  // fetchJobs() is cached (5 min) — this does NOT hit Firestore on every call.
  // Bump the count here if you want the filter to search more than 200 jobs.
  const allJobs = await fetchJobs(200);

  const filtered = allJobs.filter((job) => jobMatches(job, filters));

  return NextResponse.json({ jobs: filtered });
}