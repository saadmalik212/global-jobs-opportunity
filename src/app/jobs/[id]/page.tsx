import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob } from "@/lib/jobs";
import { timeAgo } from "@/lib/timeAgo";
import { buildApplyHref } from "@/lib/applyLink";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";
import WhatsAppBanner from "@/components/WhatsAppBanner"; // Ensure path matches your setup

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJob(params.id);
  if (!job) {
    return { title: `Job not found — ${SITE_NAME}` };
  }

  const description = `Apply for ${job.title} in ${job.location}. ${job.experience || "Experience varies"} • ${job.jobType || "Various"}. Discover remote & global career opportunities on ${SITE_NAME}.`;

  return {
    title: `${job.title} — ${job.location} | ${SITE_NAME}`,
    description,
    keywords: [
      job.title,
      `${job.title} jobs`,
      `${job.title} in ${job.location}`,
      `${job.location} job opportunities`,
      `${job.jobType} hiring`,
      "remote job opportunity",
      "apply now",
      "careers 2026",
    ],
    alternates: { 
      canonical: `${SITE_URL}/jobs/${job.id}`,
    },
    openGraph: {
      title: `${job.title} — ${job.location}`,
      description,
      url: `${SITE_URL}/jobs/${job.id}`,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} — ${job.location}`,
      description,
      images: [`${SITE_URL}/og-image.png`],
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

  const fullDescriptionHtml = `
    <p><strong>Job Title:</strong> ${job.title}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Experience:</strong> ${job.experience}</p>
    <h3>Requirements:</h3>
    <ul>
      ${job.requirements.map((r) => `<li><strong>${r.title}:</strong> ${r.details}</li>`).join("")}
    </ul>
    <p>${job.noticeLine}</p>
  `.replace(/\s+/g, ' ').trim();

  const createdDate = new Date(job.createdAt);
  const validThroughDate = new Date(createdDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: fullDescriptionHtml,
    datePosted: createdDate.toISOString(),
    validThrough: validThroughDate,
    employmentType: guessEmploymentType(job.jobType),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: isRemote ? {
      "@type": "Country",
      name: "WORLDWIDE"
    } : undefined,
    jobLocation: isRemote
      ? undefined
      : {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
          },
        },
    directApply: true,
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Jobs", url: `${SITE_URL}/#jobs` },
    { name: job.title, url: `${SITE_URL}/jobs/${job.id}` },
  ]);

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Link href="/#jobs" className="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← Back to all jobs
      </Link>

      <article className="rounded-2xl border border-border bg-surface p-6">
        {/* Title & Time */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-bold text-ink">{job.title}</h1>
          <span className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 font-mono text-[11px] font-medium text-primary-dark">
            {timeAgo(job.createdAt)}
          </span>
        </div>

        {/* Notice Line - Moved right under Title */}
        <p className="mb-4 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-ink/70">
          ⚠️ {job.noticeLine}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>📍 {job.location}</span>
          <span>🧭 {job.experience}</span>
          <span>💼 {job.jobType}</span>
        </div>

        {/* Requirements */}
        {job.requirements.length > 0 && (
          <ul className="mb-4 space-y-2">
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
          <p className="mb-6 text-sm text-ink/85">
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

        {/* WhatsApp Banner Section */}
        <WhatsAppBanner />
      </article>
    </section>
  );
}