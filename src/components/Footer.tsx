import Link from "next/link";
import Logo from "./Logo";
import { PAKISTAN_DEMAND_CITIES, TARGET_COUNTRIES } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-saad-b807623ba/" },
  { label: "Instagram", href: "https://www.instagram.com/globaljobsopportunity/" },
  { label: "Facebook", href: "https://www.facebook.com/globaljobsopportunity/" },
];

const QUICK_LINKS = [
   { label: "ATS Resume", href: "/ats-resume" },
  { label: "Browse Jobs", href: "/#jobs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-muted">
              Verified job listings across World Wide, updated every day.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold text-ink">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Most Demand Cities
            </h3>
            <ul className="space-y-2 text-sm">
              {PAKISTAN_DEMAND_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/?city=${encodeURIComponent(city)}#jobs`}
                    className="text-muted hover:text-primary"
                  >
                    {city} Jobs
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold text-ink">
              Most Demand Countries
            </h3>
            <ul className="space-y-2 text-sm">
              {TARGET_COUNTRIES.map((country) => (
                <li key={country}>
                  <Link
                    href={`/?country=${encodeURIComponent(country)}#jobs`}
                    className="text-muted hover:text-primary"
                  >
                    {country} Jobs
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold text-ink">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Global Jobs Opportunity. All job listings are sourced from verified HR partners.
    
        </div>
      </div>
    </footer>
  );
}