import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, ATS_RESUME_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPolicyPage() {
  const domainName = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted">Last updated: August 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/85">
        <div>
          <p>
            {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates{" "}
            {domainName}. This page explains what information we collect when
            you visit our site, how we use it, and the choices you have.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Information We Collect
          </h2>
          <p className="mb-2">
            <strong>Browsing to job listings.</strong> You do not need to create
            an account or log in to browse or apply to jobs on this site. We do
            not require job seekers to submit personal details directly to us in
            order to view listings.
          </p>
          <p className="mb-2">
            <strong>Analytics data.</strong> We use Google Analytics to
            understand how visitors use the site — such as which pages are
            viewed, duration of visits, approximate location (city/country level),
            and device/browser type. This aggregated data is used solely to improve
            site performance and functionality.
          </p>
          <p className="mb-2">
            <strong>Contact and email submissions.</strong> If you contact us directly
            (including for our ATS Resume service at{" "}
            <a
              href={`mailto:${ATS_RESUME_EMAIL}`}
              className="text-primary hover:underline"
            >
              {ATS_RESUME_EMAIL}
            </a>
            ), we receive whatever information you choose to provide (e.g., your name,
            email address, and resume). This data is used exclusively to deliver the
            requested service or respond to your inquiry and is never sold or shared.
          </p>
          <p>
            <strong>Cookies &amp; Tracking Technologies.</strong> Our site uses cookies for
            essential functionality, analytics, and serving personalized or non-personalized
            advertisements.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Advertising &amp; Google AdSense Policy
          </h2>
          <p className="mb-2">
            We display advertisements served by Google AdSense and third-party ad vendors.
            These vendors use cookies, web beacons, and similar technologies to serve ads based
            on a user&apos;s prior visits to this website or other websites across the internet.
          </p>
          <p className="mb-2">
            Google&apos;s use of advertising cookies enables it and its partners to serve ads
            to users based on their visit to our site and/or other sites on the Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendor use of cookies for personalized
            advertising by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.aboutads.info
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Third-Party Services We Use
          </h2>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Firebase (Google)</strong> — Powers our database infrastructure and authentication.
            </li>
            <li>
              <strong>Google Analytics</strong> — Measures overall site performance and usage statistics.
            </li>
            <li>
              <strong>Google AdSense</strong> — Delivers advertisements on select pages.
            </li>
            <li>
              <strong>WhatsApp</strong> — Hosting platform for job alert updates (subject to WhatsApp&apos;s Privacy Policy).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Your Rights (GDPR &amp; CCPA)
          </h2>
          <p className="mb-2">
            Depending on your location, you may have specific privacy rights regarding your personal data:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li><strong>Right to Access / Deletion:</strong> You can request access to or deletion of any personal data you have voluntarily provided to us.</li>
            <li><strong>Right to Opt-Out:</strong> You have the right to opt out of personalized advertisements and cookies at any time using your browser settings or ad-opt-out links.</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            External Job Application Links
          </h2>
          <p>
            Job applications may contain direct links to external websites (employers, ATS portals, LinkedIn, etc.).
            We are not responsible for the privacy practices, content, or policies of third-party destinations.
            Please review their respective privacy policies before providing sensitive personal details.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Data Security
          </h2>
          <p>
            We enforce standard security measures to protect data transmitted to us. However, no internet transmission
            or electronic storage system is completely secure, and absolute security cannot be guaranteed.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Children&apos;s Privacy
          </h2>
          <p>
            Our services are not intended for individuals under the age of 13, and we do not knowingly collect personal details from children.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Changes to This Policy
          </h2>
          <p>
            We reserve the right to modify this Privacy Policy at any time. Any updates will be reflected directly on this page with a revised &quot;Last updated&quot; date.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Contact Us
          </h2>
          <p>
            If you have any questions or requests regarding your data, reach out via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}