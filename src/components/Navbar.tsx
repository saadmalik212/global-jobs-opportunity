import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Global Jobs Opportunity home">
          <Logo size="sm" />
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href="/about"
            className="hidden text-sm font-medium text-ink/80 hover:text-primary sm:block"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hidden text-sm font-medium text-ink/80 hover:text-primary sm:block"
          >
            Contact
          </Link>
           <Link
            href="/terms-and-conditions"
            className="hidden text-sm font-medium text-ink/80 hover:text-primary sm:block"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/#jobs"
            className="hidden text-sm font-medium text-ink/80 hover:text-primary sm:block"
          >
            Browse jobs
          </Link>
        </nav>
      </div>
    </header>
  );
}
