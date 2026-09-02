
export default function JobListSkeleton() {
  return (
    <div className="grid gap-4 px-5 py-12 sm:grid-cols-2 sm:px-8 max-w-7xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[360px] animate-pulse rounded-2xl border border-border bg-surface p-5"
        >
          <div className="mb-3 h-5 w-2/3 rounded bg-ink/10" />
          <div className="mb-4 h-8 w-full rounded bg-ink/5" />
          <div className="space-y-2">
            <div className="h-3 w-1/2 rounded bg-ink/10" />
            <div className="h-3 w-1/3 rounded bg-ink/10" />
            <div className="h-3 w-2/3 rounded bg-ink/10" />
          </div>
        </div>
      ))}
    </div>
  );
}