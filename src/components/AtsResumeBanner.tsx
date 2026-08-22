import Link from "next/link";


export default function AtsResumeBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <Link
        href="/ats-resume"
        className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-light px-6 py-6 text-center transition hover:border-primary/40 sm:flex-row sm:text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white">
            📄
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-primary-dark sm:text-lg">
              Get an ATS Resume
            </h3>
            <p className="text-sm text-ink/70">
              Professionally optimized to pass automated filters and get noticed — any country.
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark">
          Learn More
        </span>
      </Link>
    </section>
  );
}