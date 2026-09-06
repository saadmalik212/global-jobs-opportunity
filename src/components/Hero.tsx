const FEATURES = [
  { label: "Updated job listings", value: "Daily" },
  { label: "Career opportunities", value: "Global" },
  { label: "Easy job access", value: "Simple" },
  { label: "Apply options", value: "Direct" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10">
      <img
        src="/cover-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

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
          Discover Career Opportunities Worldwide
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Global Jobs Opportunity
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          Discover job opportunities from around the world and explore
          available positions from companies and trusted job sources in one place.
        </p>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-sm"
            >
              <dt className="sr-only">{feature.label}</dt>

              <dd className="font-display text-xl font-bold text-white sm:text-2xl">
                {feature.value}
              </dd>

              <dd className="mt-1 text-xs text-white/75 sm:text-sm">
                {feature.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}