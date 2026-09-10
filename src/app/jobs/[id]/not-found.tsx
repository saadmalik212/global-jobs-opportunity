import Link from "next/link";

export default function JobNotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-3xl">
        📭
      </div>
      <h1 className="mb-2 font-display text-2xl font-bold text-ink">
        This Job Is No Longer Available
      </h1>
      <p className="mb-8 text-sm text-ink/70">
        This position may have been filled or removed by the employer. Don&apos;t worry —
        we have plenty of other opportunities waiting for you.
      </p>
      <Link
        href="/#jobs"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Explore More Opportunities
      </Link>
    </section>
  );
}