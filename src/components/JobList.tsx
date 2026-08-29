"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import JobCard from "./JobCard";
import WhatsAppBanner from "./WhatsAppBanner";
import { Job, JobFilters } from "@/lib/types";

const EMPTY_FILTERS: JobFilters = {
  cities: [],
  countries: [],
  remoteOnly: false,
  onsiteOnly: false,
  internshipOnly: false,
};

interface Props {
  initialJobs: Job[];
}

export default function JobList({ initialJobs }: Props) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const targetJobId = searchParams.get("job");
  const cityParam = searchParams.get("city");
  const countryParam = searchParams.get("country");
  const remoteParam = searchParams.get("remote");

  const isFilterActive = useMemo(() => {
    return (
      filters.cities.length > 0 ||
      filters.countries.length > 0 ||
      filters.remoteOnly ||
      filters.onsiteOnly ||
      filters.internshipOnly
    );
  }, [filters]);

  // Ab ye Firestore ko direct hit nahi karta — cached API route call karta hai.
  const fetchFilteredJobs = useCallback(async (currentFilters: JobFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.cities.length > 0) params.set("cities", currentFilters.cities.join(","));
      if (currentFilters.countries.length > 0) params.set("countries", currentFilters.countries.join(","));
      if (currentFilters.remoteOnly) params.set("remote", "true");
      if (currentFilters.onsiteOnly) params.set("onsite", "true");
      if (currentFilters.internshipOnly) params.set("intern", "true");

      const res = await fetch(`/api/jobs/filter?${params.toString()}`);
      const data = await res.json();
      setJobs(data.jobs ?? []);
    } catch (err) {
      console.error("Error fetching filtered jobs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);

    const hasFilters =
      newFilters.cities.length > 0 ||
      newFilters.countries.length > 0 ||
      newFilters.remoteOnly ||
      newFilters.onsiteOnly ||
      newFilters.internshipOnly;

    if (!hasFilters) {
      setJobs(initialJobs);
    } else {
      fetchFilteredJobs(newFilters);
    }
  };

  useEffect(() => {
    if (!cityParam) return;
    handleFilterChange({ ...EMPTY_FILTERS, cities: [cityParam] });
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cityParam]);

  useEffect(() => {
    if (!countryParam) return;
    handleFilterChange({ ...EMPTY_FILTERS, countries: [countryParam] });
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [countryParam]);

  useEffect(() => {
    if (remoteParam !== "true") return;
    handleFilterChange({ ...EMPTY_FILTERS, remoteOnly: true });
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [remoteParam]);

  useEffect(() => {
    if (!targetJobId) return;
    const el = document.getElementById(`job-${targetJobId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetJobId, jobs]);

  return (
    <section id="jobs" className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Find the Right Job Faster with Smart Filters
        </h2>
        <Sidebar filters={filters} onChange={handleFilterChange} />
      </div>

      <div>
        <WhatsAppBanner />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">
            {isFilterActive ? "Filtered Openings" : "Latest openings"}
          </h2>
          <span className="text-sm text-muted">
            {loading ? "Searching..." : `${jobs.length} job${jobs.length === 1 ? "" : "s"}`}
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center text-muted">
            Matching jobs search ho rahi hain...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
            Koi job filters se match nahi hui — filters clear kar ke dubara try karein.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} highlighted={job.id === targetJobId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}