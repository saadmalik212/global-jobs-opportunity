"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { subscribeJobs, deleteJob } from "@/lib/jobs";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/timeAgo";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeJobs((j) => {
      setJobs(j);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Yeh job post delete karni hai?")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
    } finally {
      setDeletingId(null);
    }
  }


async function handleCopyLink(id: string) {
    const url = `${window.location.origin}/jobs/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 2000);
    } catch {
      window.prompt("Link copy nahi ho saka — manually copy kar lein:", url);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Job posts</h1>
        <Link
          href="/admin/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          + New job post
        </Link>
      </div>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
          Abhi koi job post nahi — “New job post” se pehli job add karein.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Posted</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-ink">{job.title}</td>
                  <td className="px-4 py-3 text-ink/80">{job.location}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {timeAgo(job.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleCopyLink(job.id)}
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