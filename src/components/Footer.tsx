import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-8 text-center sm:px-8">
        <Logo size="sm" />
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Global Jobs Opportunity. All job listings are sourced from verified HR partners.
        </p>
      </div>
    </footer>
  );
}
