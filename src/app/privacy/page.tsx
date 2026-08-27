import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ATS_RESUME_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted">Last updated: August 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/85">
        <div>
          <p>
            {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates{" "}
            {SITE_URL.replace("https://", "")}. This page explains what information we collect
            when you visit our site, how we use it, and the choices you have.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Information We Collect
          </h2>
          <p className="mb-2">
            <strong>Browsing to job listings.</strong> You do not need to create an account or
            log in to browse or apply to jobs on this site. We do not require job seekers to
            submit personal details directly to us in order to view listings.
          </p>
          <p className="mb-2">
            <strong>Analytics data.</strong> We use Google Analytics to understand how visitors
            use the site — such as which pages are viewed, how long visitors stay, approximate
            location (city/country level, not precise), and device/browser type. This data is
            aggregated and used to improve the site; it is not used to personally identify you.
          </p>
          <p className="mb-2">
            <strong>Contact and email submissions.</strong> If you email us (including for our
            ATS Resume service at{" "}
            <a href={`mailto:${ATS_RESUME_EMAIL}`} className="text-primary hover:underline">
              {ATS_RESUME_EMAIL}
            </a>
            ), we receive whatever information you choose to send — such as your name, email
            address, and resume content. This information is used solely to respond to you or
            deliver the service you requested, and is not sold or shared with third parties.
          </p>
          <p>
            <strong>Cookies.</strong> Our site uses cookies for basic functionality (such as
            remembering that you&apos;ve already seen a popup in your current session) and for
            analytics and advertising purposes, described below.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Advertising &amp; Google AdSense
          </h2>
          <p className="mb-2">
            We may display advertisements served by Google AdSense. Google and its partners may
            use cookies to serve ads based on your prior visits to this or other websites. You
            can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            , or generally at{" "}
            <a
              href="https://www.aboutads.info"
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
              <strong>Firebase (Google)</strong> — powers our job-listing database and admin
              login system.
            </li>
            <li>
              <strong>Google Analytics</strong> — site usage statistics.
            </li>
            <li>
              <strong>Google AdSense</strong> — advertising (where enabled).
            </li>
            <li>
              <strong>WhatsApp</strong> — our job-alert channel is hosted on WhatsApp; joining it
              is subject to WhatsApp&apos;s own privacy policy.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            External Job Application Links
          </h2>
          <p>
            Each job post includes an &quot;Apply Now&quot; link or email address provided by the
            hiring source. Clicking it takes you to a third party (an employer&apos;s email,
            LinkedIn, a Google Form, etc.) that we do not control. We are not responsible for
            the privacy practices of those external destinations — please review their policies
            before submitting any personal information.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">Data Security</h2>
          <p>
            We take reasonable measures to protect the information we hold, including using
            Google Firebase&apos;s secured infrastructure and restricting our admin panel to
            authenticated accounts only. No method of transmission over the internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children, and we do not knowingly collect personal
            information from anyone under the age of 13.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">Your Choices</h2>
          <p>
            You can disable cookies through your browser settings at any time — most site
            features will still work, though some analytics/ad-related functionality may be
            limited. If you&apos;ve emailed us and would like your message or resume deleted from
            our records, contact us using the details below.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated &quot;Last updated&quot; date.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-bold text-ink">Contact Us</h2>
          <p>
            Questions about this policy? Reach out via our{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}