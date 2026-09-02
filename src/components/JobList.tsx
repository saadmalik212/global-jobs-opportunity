"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import * as Sentry from "@sentry/nextjs";
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
  const [filterPage, setFilterPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const PAGE_SIZE = 20;

  const [displayedJobs, setDisplayedJobs] = useState<Job[]>(initialJobs);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialJobs.length === PAGE_SIZE
      ? initialJobs[initialJobs.length - 1].createdAt
      : null
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreJobs = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/jobs/page?cursor=${nextCursor}&limit=${PAGE_SIZE}`
      );
      const data = await res.json();
      setDisplayedJobs((prev) => [...prev, ...data.jobs]);
      setNextCursor(data.nextCursor);
    } catch (err) {
      console.error("Failed to load more jobs", err);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);

  const fetchFilteredJobs = useCallback(
    async (currentFilters: JobFilters, page: number = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentFilters.cities.length > 0)
          params.set("cities", currentFilters.cities.join(","));
        if (currentFilters.countries.length > 0)
          params.set("countries", currentFilters.countries.join(","));
        if (currentFilters.remoteOnly) params.set("remote", "true");
        if (currentFilters.onsiteOnly) params.set("onsite", "true");
        if (currentFilters.internshipOnly) params.set("intern", "true");
        params.set("page", String(page));

        const res = await fetch(`/api/jobs/filter?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Filter request failed: ${res.status}`);
        }

        const data = await res.json();

        setJobs(data.jobs ?? []);
        setTotalPages(data.totalPages ?? 1);
        setFilterPage(page);
      } catch (err) {
        console.error("Error fetching filtered jobs:", err);
        Sentry.captureException(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
      setFilterPage(1);
      setTotalPages(1);
    } else {
      fetchFilteredJobs(newFilters, 1);
    }
  };

  useEffect(() => {
    if (!cityParam) return;
    handleFilterChange({ ...EMPTY_FILTERS, cities: [cityParam] });
    document
      .getElementById("jobs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cityParam]);

  useEffect(() => {
    if (!countryParam) return;
    handleFilterChange({ ...EMPTY_FILTERS, countries: [countryParam] });
    document
      .getElementById("jobs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [countryParam]);

  useEffect(() => {
    if (remoteParam !== "true") return;
    handleFilterChange({ ...EMPTY_FILTERS, remoteOnly: true });
    document
      .getElementById("jobs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [remoteParam]);

  useEffect(() => {
    if (!targetJobId) return;
    const el = document.getElementById(`job-${targetJobId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetJobId, jobs]);

  return (
    <section
      id="jobs"
      className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[280px_1fr]"
    >
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
</div>

      {loading ? (
  <div className="grid gap-4 sm:grid-cols-2">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="h-[360px] animate-pulse rounded-2xl border border-border bg-surface p-5"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="h-5 w-2/3 rounded bg-ink/10" />
          <div className="h-5 w-14 shrink-0 rounded-full bg-ink/10" />
        </div>
        <div className="mb-4 h-8 w-full rounded bg-ink/5" />
        <div className="space-y-2">
          <div className="h-3 w-1/2 rounded bg-ink/10" />
          <div className="h-3 w-1/3 rounded bg-ink/10" />
          <div className="h-3 w-2/3 rounded bg-ink/10" />
          <div className="h-3 w-1/2 rounded bg-ink/10" />
        </div>
      </div>
    ))}
  </div>
) : (isFilterActive ? jobs : displayedJobs).length === 0 ? (
  <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
    No jobs matched your selected filters. Please clear the filters and try another.
  </div>
) : (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      {(isFilterActive ? jobs : displayedJobs).map((job) => (
        <JobCard
          key={job.id}
          job={job}
          highlighted={job.id === targetJobId}
        />
      ))}
    </div>

            {!isFilterActive && nextCursor && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMoreJobs}
                  disabled={loadingMore}
                  className="group relative flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-70"
                >
                  {loadingMore ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      See more jobs...
                    </>
                  ) : (
                    <>
                      See more jobs
                      <span className="transition group-hover:translate-y-0.5">
                        ↓
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {isFilterActive && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => fetchFilteredJobs(filters, filterPage - 1)}
                  disabled={filterPage === 1 || loading}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink disabled:opacity-40 hover:bg-canvas"
                >
                  ← Previous
                </button>
                <span className="text-sm text-muted">
                  Page {filterPage} of {totalPages}
                </span>
                <button
                  onClick={() => fetchFilteredJobs(filters, filterPage + 1)}
                  disabled={filterPage === totalPages || loading}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink disabled:opacity-40 hover:bg-canvas"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}