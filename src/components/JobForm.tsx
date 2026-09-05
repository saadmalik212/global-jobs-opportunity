"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobFormValues, JobMetaField, JobRequirement } from "@/lib/types";
import { DEFAULT_NOTICE_LINE } from "@/lib/constants";

interface Props {
  initialValues?: JobFormValues;
  onSubmit: (values: JobFormValues) => Promise<void>;
  submitLabel: string;
}

const EMPTY_REQUIREMENT: JobRequirement = { title: "", details: "" };
const SALARY_OPTIONS = [
  { value: "", label: "Custom / Not specified" },
  { value: "Negotiable", label: "Negotiable" },
  { value: "$800 - $1200 / month", label: "$800 - $1200 / month" },
  { value: "$1200 - $2000 / month", label: "$1200 - $2000 / month" },
  { value: "$2000 - $3500 / month", label: "$2000 - $3500 / month" },
  { value: "$35 - $60 / hour", label: "$35 - $60 / hour" },
  { value: "PKR 80,000 - 150,000 / month", label: "PKR 80,000 - 150,000 / month" },
  { value: "PKR 150,000 - 300,000 / month", label: "PKR 150,000 - 300,000 / month" },
] as const;

function makeMetaField(): JobMetaField {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: "",
    value: "",
  };
}

export default function JobForm({ initialValues, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [experience, setExperience] = useState(initialValues?.experience ?? "");
  const [jobType, setJobType] = useState(initialValues?.jobType ?? "");
  const [company, setCompany] = useState(initialValues?.company ?? "");
  const [salary, setSalary] = useState(initialValues?.salary ?? "");
  const [salaryPreset, setSalaryPreset] = useState(() => {
    const currentSalary = initialValues?.salary ?? "";
    return SALARY_OPTIONS.some((option) => option.value === currentSalary)
      ? currentSalary
      : "";
  });
  const [applyLink, setApplyLink] = useState(initialValues?.applyLink ?? "");
  const [applyLinkDisplay, setApplyLinkDisplay] = useState<"real" | "short">(
    initialValues?.applyLinkDisplay ?? "real"
  );
  const [applyLinkLabel, setApplyLinkLabel] = useState(initialValues?.applyLinkLabel ?? "");
  const [metaFields, setMetaFields] = useState<JobMetaField[]>(
    initialValues?.metaFields?.length ? initialValues.metaFields : []
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

  function updateMetaField(id: string, field: keyof JobMetaField, value: string) {
    setMetaFields((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function addMetaField() {
    setMetaFields((prev) => [...prev, makeMetaField()]);
  }

  function removeMetaField(id: string) {
    setMetaFields((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSalaryPresetChange(nextPreset: string) {
    setSalaryPreset(nextPreset);
    if (nextPreset) {
      setSalary(nextPreset);
    } else {
      setSalary("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !location.trim()) {
      setError("Title aur location zaroori hain.");
      return;
    }

    const finalSalary = salary.trim() || (salaryPreset ? salaryPreset : "");

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        location: location.trim(),
        experience: experience.trim(),
        jobType: jobType.trim(),
        company: company.trim(),
        salary: finalSalary,
        applicationCount: initialValues?.applicationCount ?? 0,
        applyLink: applyLink.trim(),
        applyLinkDisplay,
        applyLinkLabel: applyLinkLabel.trim(),
        metaFields: metaFields
          .filter((field) => field.label.trim() || field.value.trim())
          .map((field) => ({
            id: field.id,
            label: field.label.trim(),
            value: field.value.trim(),
          })),
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
        <Field label="Experience" hint="Leave blank to hide this field on the job card">
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
        <Field label="Company" hint="Optional — leave blank to hide this field">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Systems Ltd"
            className={inputClass}
          />
        </Field>
        <Field label="Salary" hint="Preset select karen ya custom amount type karen">
          <div className="grid gap-2 sm:grid-cols-[200px_1fr]">
            <select
              value={salaryPreset}
              onChange={(e) => handleSalaryPresetChange(e.target.value)}
              className={inputClass}
            >
              {SALARY_OPTIONS.map((option) => (
                <option key={option.value || "custom"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                setSalaryPreset("");
              }}
              placeholder="e.g. $1500/month or Negotiable"
              className={inputClass}
            />
          </div>
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

      <Field
        label="Apply heading / sentence"
        hint="Yeh link se pehle wali heading hai — apni marzi ka koi bhi text likhein (colon/punctuation bhi khud shamil karein). Khali chhodne par default 'Apply Now:' dikhega."
      >
        <input
          value={applyLinkLabel}
          onChange={(e) => setApplyLinkLabel(e.target.value)}
          placeholder="e.g. Apply Now: or Send your CV to:"
          className={inputClass}
        />
      </Field>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">Extra fields</label>
          <button
            type="button"
            onClick={addMetaField}
            className="text-xs font-medium text-primary hover:underline"
          >
            + Add field
          </button>
        </div>
        <div className="space-y-3">
          {metaFields.map((field) => (
            <div key={field.id} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1fr_1.3fr_auto]">
              <input
                value={field.label}
                onChange={(e) => updateMetaField(field.id, "label", e.target.value)}
                placeholder="Heading, e.g. Compensation"
                className={`${inputClass} font-medium`}
              />
              <input
                value={field.value}
                onChange={(e) => updateMetaField(field.id, "value", e.target.value)}
                placeholder="Value, e.g. $1500/month"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeMetaField(field.id)}
                className="shrink-0 self-center text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          {metaFields.length === 0 && (
            <p className="text-xs text-muted">
              Add custom headings like “Compensation”, “Remote Policy”, or “Deadline”.
            </p>
          )}
        </div>
      </div>

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