import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ATS_RESUME_EMAIL } from "@/lib/constants";
import AtsScoreChecker from "@/components/AtsScoreChecker";

export const metadata: Metadata = {
  title: `ATS Resume Writing Service — $1 | ${SITE_NAME}`,
  description:
    "Get a professionally formatted, ATS-optimized resume for just $1 — built to pass automated screening and reach real recruiters, for any country.",
  alternates: { canonical: `${SITE_URL}/ats-resume` },
};

const BENEFITS = [
  {
    icon: "🎯",
    title: "Gets past automated filters",
    text: "Most companies now scan resumes with software before a human ever reads them. An ATS-friendly format and keyword structure means yours doesn't get silently rejected.",
  },
  {
    icon: "⚡",
    title: "Faster shortlisting",
    text: "Recruiters spend seconds scanning each resume. A clean, ATS-optimized layout highlights your strongest points immediately instead of burying them.",
  },
  {
    icon: "🌍",
    title: "Works for any country",
    text: "Whether you're applying in Pakistan, the Gulf, the US, UK, or anywhere else — we format your resume to match what employers in that market expect.",
  },
  {
    icon: "📈",
    title: "Higher interview call rate",
    text: "A resume that's both ATS-compatible and easy for a human to skim gives you the best odds at every stage — screening and interview shortlisting.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Send us your details",
    text: "Share your current resume (or your work history) and the job title / industry you're targeting.",
  },
  {
    step: "2",
    title: "We rebuild it for ATS",
    text: "Our team restructures the formatting, keywords, and section layout so it's readable by both ATS software and human recruiters.",
  },
  {
    step: "3",
    title: "You receive your new resume",
    text: "A polished, ready-to-send resume file — built to get noticed instead of filtered out.",
  },
];

export default function AtsResumePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-ink)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-white/80">
            ATS Resume Service
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            A Resume Built to Get Past the Filters
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Professionally formatted, ATS-optimized resumes for any country — starting at just{" "}
            <span className="font-bold text-white">$1</span>.
          </p>
          <a
            href={`mailto:${ATS_RESUME_EMAIL}`}
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition hover:bg-white/90"
          >
            📧 {ATS_RESUME_EMAIL}
          </a>
        </div>
      </section>

      {/* What is ATS */}
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <h2 className="mb-3 font-display text-2xl font-bold text-ink">
          What is an ATS, and why does it matter?
        </h2>
        <p className="text-ink/80">
          An Applicant Tracking System (ATS) is software that companies use to collect, scan, and
          rank resumes before a recruiter ever opens them. If your resume's formatting, structure,
          or keywords don't match what the software is looking for, it can get filtered out — no
          matter how qualified you actually are. An ATS-optimized resume is built specifically to
          avoid that trap.
        </p>
      </section>

      <AtsScoreChecker />

      {/* Benefits */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-ink">
            Why an ATS Resume Makes Job Hunting Easier
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-canvas p-5 transition hover:border-primary/40"
              >
                <div className="mb-2 text-2xl">{b.icon}</div>
                <h3 className="mb-1 font-display text-base font-bold text-ink">{b.title}</h3>
                <p className="text-sm text-ink/75">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-ink">How It Works</h2>
        <div className="space-y-6">
          {STEPS.map((s) => (
            <div key={s.step} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white">
                {s.step}
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{s.title}</h3>
                <p className="text-sm text-ink/75">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-2xl px-5 pb-20 text-center sm:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary-light p-8">
          <h2 className="mb-2 font-display text-xl font-bold text-primary-dark">
            Ready to stop getting filtered out?
          </h2>
          <p className="mb-5 text-sm text-ink/75">
            One-time price of $1 — any country, any industry.
          </p>
          <p className="text-sm text-ink/85">
            <span className="font-semibold text-ink">Email us: </span>
            <a
              href={`mailto:${ATS_RESUME_EMAIL}`}
              className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-primary-dark"
            >
              {ATS_RESUME_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}