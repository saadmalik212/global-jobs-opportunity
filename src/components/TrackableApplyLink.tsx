"use client";

import { useState } from "react";
import { buildApplyHref } from "@/lib/applyLink";
import { trackJobApplication } from "@/lib/jobs";
import * as Sentry from "@sentry/nextjs";

interface Props {
  jobId: string;
  applyLink: string;
  applyLinkDisplay: "real" | "short";
  className?: string;
}

export default function TrackableApplyLink({
  jobId,
  applyLink,
  applyLinkDisplay,
  className = "",
}: Props) {
  const [tracking, setTracking] = useState(false);

  async function handleClick() {
    if (!jobId || tracking) return;
    setTracking(true);
    try {
      await trackJobApplication(jobId);
    } catch (error) {
      console.error("Failed to track application click:", error);
      Sentry.captureException(error); 

    } finally {
      setTracking(false);
    }
  }

  return (
    <a
      href={buildApplyHref(applyLink)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={applyLinkDisplay === "short" ? "Apply Here" : applyLink}
    >
      {applyLinkDisplay === "short" ? "Apply Here" : applyLink}
    </a>
  );
}
