"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SESSION_KEY = "ats_resume_popup_shown";
const SHOW_DELAY_MS = 2500;

export default function AtsResumePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5 backdrop-blur-sm"
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm animate-riseIn rounded-2xl border border-border bg-surface p-6 text-center shadow-xl"
      >
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
        >
          ×
        </button>

        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-2xl">
          📄
        </div>

        <h2 className="mb-2 font-display text-lg font-bold text-ink">
          Want an ATS Resume for Getting a Job?
        </h2>
        <p className="mb-5 text-sm text-ink/70">
          Get a professionally optimized resume that passes automated filters and reaches real
          recruiters — for any country, starting at just $1.
        </p>

        <Link
          href="/ats-resume"
          onClick={() => setVisible(false)}
          className="mb-2 block w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Yes, Show Me
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="text-xs font-medium text-muted hover:text-ink"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}