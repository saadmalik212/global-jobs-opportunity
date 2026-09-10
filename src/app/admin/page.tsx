"use client";

import { SITE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteJob } from "@/lib/jobsClient";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/timeAgo";
import { buildShareText } from "@/lib/shareText";
import * as Sentry from "@sentry/nextjs";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  async function loadPage(page: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs?page=${page}`);
      const { jobs: data, hasNextPage: dataHasNextPage } = await res.json();
      setJobs(data);
      setHasNextPage(dataHasNextPage);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to load jobs", err);
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadJobs() {
    await loadPage(1);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Yeh job post delete karni hai?")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
      await fetch("/api/revalidate-jobs", { method: "POST" });
      const remainingJobs = jobs.filter((job) => job.id !== id);
      if (remainingJobs.length === 0 && currentPage > 1) {
        await loadPage(currentPage - 1);
      } else {
        await loadPage(currentPage);
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCopyLink(job: Job) {
    const url = `${SITE_URL}/jobs/${job.slug || job.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(job.id);
      setTimeout(() => setCopiedId((cur) => (cur === job.id ? null : cur)), 2000);
    } catch {
      window.prompt("Link copy nahi ho saka — manually copy kar lein:", url);
    }
  }

  async function handleCopyText(job: Job) {
    const text = buildShareText(job);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTextId(job.id);
      setTimeout(() => setCopiedTextId((cur) => (cur === job.id ? null : cur)), 2000);
    } catch {
      window.prompt("Text copy nahi ho saka — manually copy kar lein:", text);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Job posts</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={loadJobs}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            🔄 Refresh
          </button>
          <Link
            href="/admin/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            + New job post
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
          Abhi koi job post nahi — “New job post” se pehli job add karein.
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Applications</th>
                  <th className="px-4 py-3">Posted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-ink">{job.title}</td>
                    <td className="px-4 py-3 text-ink/80">{job.location}</td>
                    <td className="px-4 py-3 font-semibold text-ink">
                      {job.applicationCount ?? 0}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {timeAgo(job.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-wrap justify-end gap-3">
                        <button
                          onClick={() => handleCopyText(job)}
                          className="text-primary hover:underline"
                        >
                          {copiedTextId === job.id ? "Copied!" : "Copy text"}
                        </button>
                        <button
                          onClick={() => handleCopyLink(job)}
                          className="text-primary hover:underline"
                        >
                          {copiedId === job.id ? "Copied!" : "Copy link"}
                        </button>
                        <Link
                          href={`/admin/edit/${job.id}`}
                          className="text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          disabled={deletingId === job.id}
                          className="text-red-600 hover:underline disabled:opacity-50"
                        >
                          {deletingId === job.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => loadPage(currentPage - 1)}
              disabled={loading || currentPage === 1}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-canvas disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-muted">Page {currentPage}</span>
            <button
              onClick={() => loadPage(currentPage + 1)}
              disabled={loading || !hasNextPage}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-canvas disabled:opacity-50"
            >
              Next
            </button>
            </div>
        </>
      )}
    </div>
  );
}