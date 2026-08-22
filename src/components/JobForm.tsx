"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobFormValues, JobRequirement } from "@/lib/types";
import { DEFAULT_NOTICE_LINE } from "@/lib/constants";

interface Props {
  initialValues?: JobFormValues;
  onSubmit: (values: JobFormValues) => Promise<void>;
  submitLabel: string;
}

const EMPTY_REQUIREMENT: JobRequirement = { title: "", details: "" };

export default function JobForm({ initialValues, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [experience, setExperience] = useState(initialValues?.experience ?? "");
  const [jobType, setJobType] = useState(initialValues?.jobType ?? "");
  const [applyLink, setApplyLink] = useState(initialValues?.applyLink ?? "");
  const [applyLinkDisplay, setApplyLinkDisplay] = useState<"real" | "short">(
    initialValues?.applyLinkDisplay ?? "real"
  );
  const [requirements, setRequirements] = useState<JobRequirement[]>(
    initialValues?.requirements?.length ? initialValues.requirements : [{ ...EMPTY_REQUIREMENT }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateRequirement(index: number, field: keyof JobRequirement, value: string) {
    setRequirements((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  }

  function addRequirement() {
    setRequirements((prev) => [...prev, { ...EMPTY_REQUIREMENT }]);
  }

  function removeRequirement(index: number) {
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !location.trim()) {
      setError("Title aur location zaroori hain.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        location: location.trim(),
        experience: experience.trim(),
        jobType: jobType.trim(),
        applyLink: applyLink.trim(),
        applyLinkDisplay,
        requirements: requirements
          .filter((r) => r.title.trim() || r.details.trim())
          .map((r) => ({ title: r.title.trim(), details: r.details.trim() })),
        noticeLine: DEFAULT_NOTICE_LINE,
      });
      router.push("/admin");
    } catch {
      setError("Save nahi ho saka — dobara try karein.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="rounded-lg bg-accent/10 px-4 py-2.5 text-xs font-medium text-ink/70">
        Every post automatically shows: “{DEFAULT_NOTICE_LINE}”
      </div>

      <Field label="Job title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Senior React Developer"
          className={inputClass}
        />
      </Field>

      <Field label="Location" hint="City / country keywords go here — used for filter matching, e.g. “Lahore” or “Remote, Dubai”">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Lahore, Remote"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Experience">
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 2-3 years"
            className={inputClass}
          />
        </Field>
        <Field label="Job type" hint="Include “Internship” here if applicable">
          <input
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="e.g. Full-time"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Apply Now">
        <div className="flex gap-2">
          <input
            value={applyLink}
            onChange={(e) => setApplyLink(e.target.value)}
            placeholder="e.g. hr@company.com or https://linkedin.com/jobs/view/123"
            className={`${inputClass} flex-1`}
          />
          <select
            value={applyLinkDisplay}
            onChange={(e) => setApplyLinkDisplay(e.target.value as "real" | "short")}
            className="shrink-0 rounded-lg border border-border bg-canvas px-2 py-2 text-sm text-ink focus:border-primary"
          >
            <option value="real">Real URL</option>
            <option value="short">Short URL</option>
          </select>
        </div>
        <p className="mt-1 text-xs text-muted">
          {applyLinkDisplay === "short"
            ? "Frontend par sirf \"Apply Here\" dikhega — link wahi upar wala hi kaam karega."
            : "Frontend par yehi poora link jaisa daala hai waise hi dikhega."}
        </p>
      </Field>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">Requirements</label>
          <button
            type="button"
            onClick={addRequirement}
            className="text-xs font-medium text-primary hover:underline"
          >
            + Add field
          </button>
        </div>
        <div className="space-y-3">
          {requirements.map((req, i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <input
                  value={req.title}
                  onChange={(e) => updateRequirement(i, "title", e.target.value)}
                  placeholder="Custom title, e.g. Skills"
                  className={`${inputClass} font-medium`}
                />
                {requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(i)}
                    className="shrink-0 text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <textarea
                value={req.details}
                onChange={(e) => updateRequirement(i, "details", e.target.value)}
                placeholder="Details…"
                rows={2}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink focus:border-primary";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-ink">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}