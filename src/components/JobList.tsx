"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import JobCard from "./JobCard";
import WhatsAppBanner from "./WhatsAppBanner";
import { fetchJobs } from "@/lib/jobs";
import { Job, JobFilters } from "@/lib/types";

const EMPTY_FILTERS: JobFilters = {
  cities: [],
  countries: [],
  remoteOnly: false,
  internshipOnly: false,
};

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

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);

  const searchParams = useSearchParams();
  const targetJobId = searchParams.get("job");
  const cityParam = searchParams.get("city");
  const countryParam = searchParams.get("country");

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .finally(() => setLoading(false));
  }, []);

  // Keep the sidebar in sync with the footer's "Most Demand Cities/Countries"
  // links — this re-runs every time the URL's ?city= or ?country= changes,
  // even if the JobList component itself never unmounts (e.g. clicking a
  // different footer link while already on the home page).
  useEffect(() => {
    if (!cityParam) return;
    setFilters((prev) => ({ ...prev, cities: [cityParam] }));
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cityParam]);

  useEffect(() => {
    if (!countryParam) return;
    setFilters((prev) => ({ ...prev, countries: [countryParam] }));
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [countryParam]);

  const visibleJobs = useMemo(
    () => jobs.filter((job) => jobMatches(job, filters)),
    [jobs, filters]
  );

  useEffect(() => {
    if (!targetJobId || loading) return;
    const el = document.getElementById(`job-${targetJobId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetJobId, loading, visibleJobs]);

  return (
    <section id="jobs" className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Find the Right Job Faster with Smart Filters
        </h2>
        <Sidebar filters={filters} onChange={setFilters} />
      </div>

      <div>
        <WhatsAppBanner />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">
            Latest openings
          </h2>
          <span className="text-sm text-muted">
            {loading ? "Loading…" : `${visibleJobs.length} job${visibleJobs.length === 1 ? "" : "s"}`}
          </span>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-border bg-surface"
              />
            ))}
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
            Koi job filters se match nahi hui — filters clear kar ke dubara try karein.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleJobs.map((job) => (
              <JobCard key={job.id} job={job} highlighted={job.id === targetJobId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}