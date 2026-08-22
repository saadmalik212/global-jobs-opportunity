import Link from "next/link";
import { Job } from "@/lib/types";
import { timeAgo } from "@/lib/timeAgo";
import { buildApplyHref } from "@/lib/applyLink";

interface Props {
  job: Job;
  highlighted?: boolean;
}

export default function JobCard({ job, highlighted = false }: Props) {
  return (
    <article
      id={`job-${job.id}`}
      className={`flex h-[360px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-surface p-5 transition hover:shadow-md ${
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

      <div className="min-h-0 flex-1 overflow-hidden">
        {/* Notice Line - Moved right below the title section */}
        <p className="mb-3 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-ink/70">
          ⚠️ {job.noticeLine}
        </p>

        {/* Location, Experience & Type */}
        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>📍 {job.location}</span>
          <span>🧭 {job.experience}</span>
          <span>💼 {job.jobType}</span>
        </div>

        {/* Job Requirements */}
        {job.requirements.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {job.requirements.map((req, i) => (
              <li key={i} className="text-sm text-ink/85">
                <span className="font-semibold text-ink">{req.title}: </span>
                <ul className="ml-5 space-y-1">
                  {req.details.split(/\r?\n/).filter((line) => line.trim()).map((line, lineIndex) => (
                    <li key={lineIndex}>{line.trim()}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}

        {/* Apply Link */}
             {job.applyLink && (
        <p className="mb-2 text-sm text-ink/85">
          <span className="font-semibold text-ink">Apply Now: </span>
          <a
            href={buildApplyHref(job.applyLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-dark"
          >
            {job.applyLinkDisplay === "short" ? "Apply Here" : job.applyLink}
          </a>
        </p>
      )}
      </div>

      <Link
        href={`/jobs/${job.id}`}
        className="mt-2 shrink-0 text-xs font-medium text-muted underline decoration-dotted hover:text-primary"
      >
        View full details →
      </Link>
    </article>
  );
}