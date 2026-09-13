"use client";

import { SITE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteJob, deleteJobsBulk } from "@/lib/jobsClient";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/timeAgo";
import { buildShareText } from "@/lib/shareText";
import * as Sentry from "@sentry/nextjs";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  async function loadJobs() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs`);
      const { jobs: data } = await res.json();
      setJobs(data);
      setSelectedIds(new Set());
    } catch (err) {
      console.error("Failed to load jobs", err);
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
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
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } finally {
      setDeletingId(null);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === jobs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(jobs.map((j) => j.id)));
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`${selectedIds.size} job posts delete karni hain? Ye action wapas nahi ho sakta.`)) return;

    setBulkDeleting(true);
    try {
      await deleteJobsBulk(Array.from(selectedIds));
      await fetch("/api/revalidate-jobs", { method: "POST" });
      setJobs((prev) => prev.filter((j) => !selectedIds.has(j.id)));
      setSelectedIds(new Set());
    } catch (err) {
      console.error("Bulk delete failed", err);
      Sentry.captureException(err);
      alert("Kuch jobs delete nahi ho saki — dobara try karein.");
    } finally {
      setBulkDeleting(false);
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
        <h1 className="font-display text-2xl font-bold text-ink">
          Job posts {jobs.length > 0 && <span className="text-sm font-normal text-muted">({jobs.length} total)</span>}
        </h1>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {bulkDeleting ? "Deleting…" : `Delete selected (${selectedIds.size})`}
            </button>
          )}
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
          Abhi koi job post nahi — "New job post" se pehli job add karein.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={jobs.length > 0 && selectedIds.size === jobs.length}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-border"
                  />
                </th>
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
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(job.id)}
                      onChange={() => toggleSelect(job.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </td>
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
      )}
    </div>
  );
}