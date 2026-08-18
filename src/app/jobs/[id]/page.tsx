import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob } from "@/lib/jobs";
import { timeAgo } from "@/lib/timeAgo";
import { buildApplyHref } from "@/lib/applyLink";
import { SITE_NAME, SITE_URL } from "@/lib/constants";


export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJob(params.id);
  if (!job) {
    return { title: `Job not found — ${SITE_NAME}` };
  }

  const description = `${job.title} in ${job.location}. ${job.experience || "Experience varies"} • ${job.jobType || "Various"}. Apply now on ${SITE_NAME}.`;

  return {
    title: `${job.title} — ${job.location} | ${SITE_NAME}`,
    description,
    alternates: { canonical: `${SITE_URL}/jobs/${job.id}` },
    openGraph: {
      title: job.title,
      description,
      url: `${SITE_URL}/jobs/${job.id}`,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

function guessEmploymentType(jobType: string): string {
  const t = jobType.toLowerCase();
  if (t.includes("intern")) return "INTERN";
  if (t.includes("part")) return "PART_TIME";
  if (t.includes("contract")) return "CONTRACTOR";
  if (t.includes("temp")) return "TEMPORARY";
  return "FULL_TIME";
}

export default async function JobDetailPage({ params }: Props) {
  const job = await fetchJob(params.id);
  if (!job) notFound();

  const isRemote = `${job.title} ${job.location} ${job.jobType}`
    .toLowerCase()
    .includes("remote");

  // Google for Jobs structured data — this is what makes the listing
  // eligible to show up in Google's dedicated job search results.
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: [
      ...job.requirements.map((r) => `${r.title}: ${r.details}`),
      job.noticeLine,
    ].join(". "),
    datePosted: new Date(job.createdAt).toISOString(),
    employmentType: guessEmploymentType(job.jobType),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
    jobLocation: isRemote
      ? undefined
      : {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
          },
        },
    baseSalary: undefined,
    directApply: true,
  };

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/#jobs" className="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← Back to all jobs
      </Link>

      <article className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-bold text-ink">{job.title}</h1>
          <span className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 font-mono text-[11px] font-medium text-primary-dark">
            {timeAgo(job.createdAt)}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>📍 {job.location}</span>
          <span>🧭 {job.experience}</span>
          <span>💼 {job.jobType}</span>
        </div>

        {job.requirements.length > 0 && (
          <ul className="mb-4 space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="text-sm text-ink/85">
                <span className="font-semibold text-ink">{req.title}: </span>
                {req.details}
              </li>
            ))}
          </ul>
        )}

        <p className="mb-4 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-ink/70">
          ⚠️ {job.noticeLine}
        </p>

        {job.applyLink && (
          <p className="text-sm text-ink/85">
            <span className="font-semibold text-ink">Apply Now: </span>
            <a
              href={buildApplyHref(job.applyLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-dark"
            >
              {job.applyLink}
            </a>
          </p>
        )}
      </article>
    </section>
  );
}
