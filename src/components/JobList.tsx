"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import JobCard from "./JobCard";
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

  // Reads ?job=<id> from a shared direct link, e.g. yoursite.com/?job=abc123
  const searchParams = useSearchParams();
  const targetJobId = searchParams.get("job");

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .finally(() => setLoading(false));
  }, []);

  const visibleJobs = useMemo(
    () => jobs.filter((job) => jobMatches(job, filters)),
    [jobs, filters]
  );

  // Once jobs are loaded, scroll straight to the shared job — other jobs
  // stay visible above/below it, only the scroll position changes.
  useEffect(() => {
    if (!targetJobId || loading) return;
    const el = document.getElementById(`job-${targetJobId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetJobId, loading, visibleJobs]);

  return (
    <section id="jobs" className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[280px_1fr]">
      <Sidebar filters={filters} onChange={setFilters} />

      <div>
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