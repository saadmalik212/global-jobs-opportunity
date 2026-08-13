export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? 56 : size === "sm" ? 32 : 40;
  const textSize =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative shrink-0"
        style={{ width: dims, height: dims }}
        aria-hidden="true"
      >
        {/* Core globe */}
        <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_0_0_1px_rgba(11,110,79,0.15)]">
          <div className="absolute inset-0 rounded-full border border-white/25" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/20" />
          <div className="absolute inset-[22%] rounded-full border border-white/20" />
        </div>

        {/* Orbiting nodes representing global reach */}
        <div className="absolute inset-0 flex items-center justify-center animate-orbit">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-orbit-rev">
          <span className="h-1 w-1 rounded-full bg-primary-light" />
        </div>

        {/* Ambient pulse */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulseGlow" />
      </div>

      <span className={`font-display font-extrabold tracking-tight text-ink ${textSize}`}>
        Global Jobs
        <span className="text-primary"> Opportunity</span>
      </span>
    </div>
  );
}
