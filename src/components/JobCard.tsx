import Link from "next/link";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/timeAgo";
import { getJobMetaRows } from "@/lib/jobMeta";

interface Props {
  job: Job;
  highlighted?: boolean;
}

export default function JobCard({ job, highlighted = false }: Props) {
  const metaRows = getJobMetaRows(job);

  return (
    <article
      id={`job-${job.id}`}
      className={`flex w-full min-w-0 flex-col rounded-2xl border bg-surface p-5 transition hover:shadow-md ${
        highlighted
          ? "border-primary ring-2 ring-primary/40"
          : "border-border hover:border-primary/40"
      }`}
    >
      {/* Title & Date */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-ink">{job.title}</h3>
        <span className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 font-mono text-[11px] font-medium text-primary-dark">
          {timeAgo(job.createdAt)}
        </span>
      </div>

      {/* Notice Line */}
      <p className="mb-3 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-ink/70">
        ⚠️ {job.noticeLine}
      </p>

     
      {metaRows.length > 0 && (
        <dl className="mb-4 space-y-1 text-sm">
          {metaRows.map((row) => (
            <div key={row.label} className="flex flex-wrap gap-x-1.5">
              <dt className="font-medium text-muted">{row.label}:</dt>
              <dd className="text-ink/85">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <Link
        href={`/jobs/${job.id}`}
        prefetch={false}
        className="mt-auto inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-dark"
      >
        View full details →
      </Link>
    </article>
  );
}