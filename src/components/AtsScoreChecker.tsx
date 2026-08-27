"use client";

import { useState } from "react";
import { scoreResume, AtsScoreResult } from "@/lib/atsScore";
import { ATS_RESUME_EMAIL } from "@/lib/constants";

export default function AtsScoreChecker() {
  const [resumeText, setResumeText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<AtsScoreResult | null>(null);

  function handleCheck() {
    if (!resumeText.trim()) return;
    setResult(scoreResume(resumeText, keywords));
  }

  const scoreColor =
    result === null
      ? ""
      : result.score >= 75
      ? "text-primary"
      : result.score >= 50
      ? "text-accent"
      : "text-red-600";

  return (
    <section className="bg-surface py-14">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <h2 className="mb-2 text-center font-display text-2xl font-bold text-ink">
          Free ATS Resume Score Checker
        </h2>
        <p className="mb-6 text-center text-sm text-ink/70">
          Paste your resume text below and get an instant estimate of how ATS-friendly it is.
        </p>

        <div className="rounded-2xl border border-border bg-canvas p-5">
          <label className="mb-1 block text-sm font-semibold text-ink">
            Paste your resume text
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={8}
            placeholder="Paste the full text of your resume here…"
            className="mb-4 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary"
          />

          <label className="mb-1 block text-sm font-semibold text-ink">
            Target job title / keywords (optional)
          </label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. React, Node.js, project management"
            className="mb-4 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-primary"
          />

          <button
            onClick={handleCheck}
            disabled={!resumeText.trim()}
            className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            Check My Score
          </button>

          {result && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-4 text-center">
                <span className={`font-display text-4xl font-extrabold ${scoreColor}`}>
                  {result.score}
                </span>
                <span className="text-lg text-muted">/100</span>
              </p>
              <ul className="mb-5 space-y-2">
                {result.checks.map((check) => (
                  <li key={check.label} className="flex items-start gap-2 text-sm">
                    <span>{check.passed ? "✅" : "⚠️"}</span>
                    <span>
                      <span className="font-medium text-ink">{check.label}</span>{" "}
                      <span className="text-ink/70">— {check.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mb-3 text-center text-xs text-muted">
                This is an automated estimate based on common ATS best practices — not a guarantee
                of how any specific company&apos;s software will score your resume.
              </p>
              <p className="text-center text-sm">
                <span className="font-semibold text-ink">Want it professionally fixed? </span>
                <a
                  href={`mailto:${ATS_RESUME_EMAIL}`}
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-dark"
                >
                  {ATS_RESUME_EMAIL}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}