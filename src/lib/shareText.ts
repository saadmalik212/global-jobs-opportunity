import { Job } from "./types";
import { getJobMetaRows } from "./jobMeta";
import { SITE_URL } from "./constants";

const META_ICONS: Record<string, string> = {
  Location: "📍",
  Experience: "🧭",
  "Job Type": "💼",
  Company: "🏢",
  Salary: "💰",
};

/**
 * Builds a clean, ready-to-paste block of text summarizing a job post —
 * for pasting straight into WhatsApp, Facebook, LinkedIn, etc.
 */
export function buildShareText(job: Job): string {
  const lines: string[] = [];

  lines.push(`🚀 ${job.title}`);
  lines.push("");

  for (const row of getJobMetaRows(job)) {
    const icon = META_ICONS[row.label] ?? "•";
    lines.push(`${icon} ${row.label}: ${row.value}`);
  }

  if (job.requirements.length > 0) {
    lines.push("");
    for (const req of job.requirements) {
      lines.push(`${req.title}:`);
      const detailLines = req.details.split(/\r?\n/).filter((l) => l.trim());
      for (const detail of detailLines) {
        lines.push(`  • ${detail.trim()}`);
      }
    }
  }

  if (job.noticeLine) {
    lines.push("");
    lines.push(`⚠️ ${job.noticeLine}`);
  }

  if (job.applyLink) {
    lines.push("");
    lines.push(`Apply Now: ${job.applyLink}`);
  }

  lines.push("");
  lines.push(`🔗 Full details: ${SITE_URL}/jobs/${job.slug || job.id}`);

  return lines.join("\n");
}