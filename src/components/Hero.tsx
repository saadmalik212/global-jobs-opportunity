const STATS = [
  { label: "jobs every week", value: "1000+" },
  { label: "found jobs", value: "20,000+" },
  { label: "recruiters helped", value: "1,000+" },
  { label: "followers", value: "200,000+" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Your photo from /public — rename the file to match the src below,
          or edit the src to match whatever you named it. */}
      <img
        src="/hero-photo.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Brand-colour wash over the photo so the white text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/85 via-primary/70 to-primary-dark/85" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="mb-3 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-white/80">
          Find Your Next Career Opportunity at GlobalJobsOpportunity.com
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Global Jobs Opportunity
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          Global Opportunities — discover verified job listings, updated daily, all in one place.
        </p>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-sm"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-xl font-bold text-white sm:text-2xl">
                {s.value}
              </dd>
              <dd className="mt-1 text-xs text-white/75 sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}