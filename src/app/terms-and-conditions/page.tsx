import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Global Jobs Opportunity",
  description:
    "Read the terms and conditions for using Global Jobs Opportunity. Understand the rules and conditions for accessing our job discovery platform.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "legal",
    "job platform terms",
  ],
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Terms & Conditions | Global Jobs Opportunity",
    description: "Terms and Conditions for Global Jobs Opportunity",
    url: `${SITE_URL}/terms-and-conditions`,
  },
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-ink)]">
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-[0.06]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
              Legal Information
            </span>

            <h1 className="mt-6 font-[var(--font-display)] text-4xl font-bold tracking-tight text-[var(--color-surface)] sm:text-5xl lg:text-6xl">
              Terms &amp; Conditions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-surface)]">
              These terms explain the rules and conditions for using Global
              Jobs Opportunity and our job discovery services.
            </p>

            <p className="mt-5 text-sm text-[var(--color-surface)]">
              Effective Date: August 13, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="space-y-8">
          <TermsSection
            number="01"
            title="Acceptance of Terms"
          >
            <p>
              Welcome to Global Jobs Opportunity. By accessing or using our
              website, you agree to comply with these Terms and Conditions. If
              you do not agree with any part of these terms, please do not use
              the website.
            </p>

            <p>
              These terms apply to all visitors and users who access or use
              Global Jobs Opportunity.
            </p>
          </TermsSection>

          <TermsSection
            number="02"
            title="About Our Service"
          >
            <p>
              Global Jobs Opportunity is a job discovery platform designed to
              help users find and explore employment opportunities from
              different industries, locations, and career fields.
            </p>

            <p>
              Our website may display information such as job titles,
              descriptions, locations, employment types, qualifications,
              responsibilities, and application instructions.
            </p>

            <p>
              Job information may be obtained from employers, recruitment
              sources, publicly available information, or other sources.
            </p>
          </TermsSection>

          <TermsSection
            number="03"
            title="Job Listings and Information"
          >
            <p>
              We aim to present job information in a clear and useful manner.
              However, vacancies, requirements, salaries, application
              deadlines, availability, and other details may change at any
              time.
            </p>

            <p>
              Users should review the complete job description and verify
              important information with the relevant employer or original
              application source before applying.
            </p>

            <p>
              We may update, modify, or remove job listings when necessary.
            </p>
          </TermsSection>

          <TermsSection
            number="04"
            title="No Employment Guarantee"
          >
            <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
              <p>
                Global Jobs Opportunity does not guarantee employment,
                interviews, job offers, salaries, visas, or selection for any
                position listed on the website.
              </p>

              <p className="mt-4">
                Hiring decisions are made independently by the respective
                employer or recruiting organization.
              </p>
            </div>
          </TermsSection>

          <TermsSection
            number="05"
            title="Third-Party Employers and External Links"
          >
            <p>
              Some job listings may direct users to employer websites,
              recruitment platforms, application portals, or other
              third-party websites.
            </p>

            <p>
              Global Jobs Opportunity does not control these external websites
              and is not responsible for their content, availability, security,
              privacy practices, or terms.
            </p>

            <p>
              Users should review the policies and terms of external websites
              before using their services or submitting personal information.
            </p>
          </TermsSection>

          <TermsSection
            number="06"
            title="User Responsibilities"
          >
            <p>
              Users agree to use Global Jobs Opportunity only for lawful
              purposes and in accordance with these Terms and Conditions.
            </p>

            <ul className="mt-4 space-y-3">
              <Bullet>
                Provide accurate information when voluntarily contacting us.
              </Bullet>

              <Bullet>
                Review job requirements before submitting an application.
              </Bullet>

              <Bullet>
                Independently verify employers and employment opportunities
                when appropriate.
              </Bullet>

              <Bullet>
                Exercise caution when sharing personal or sensitive
                information online.
              </Bullet>

              <Bullet>
                Follow the applicable terms and policies of external websites
                when applying for jobs.
              </Bullet>
            </ul>
          </TermsSection>

          <TermsSection
            number="07"
            title="Prohibited Activities"
          >
            <p>
              Users must not use the website in a way that may harm the
              website, its users, or other parties.
            </p>

            <ul className="mt-4 space-y-3">
              <Bullet>
                Engage in unlawful or fraudulent activities.
              </Bullet>

              <Bullet>
                Attempt to interfere with the operation or security of the
                website.
              </Bullet>

              <Bullet>
                Use automated methods to access or collect website content
                without authorization.
              </Bullet>

              <Bullet>
                Misrepresent your identity or affiliation with an employer or
                organization.
              </Bullet>

              <Bullet>
                Copy or reproduce original website materials for unauthorized
                commercial purposes.
              </Bullet>

              <Bullet>
                Use the website to distribute harmful, misleading, or abusive
                content.
              </Bullet>
            </ul>
          </TermsSection>

          <TermsSection
            number="08"
            title="Intellectual Property"
          >
            <p>
              Unless otherwise stated, the original design, branding, text,
              graphics, layout, and other original materials created for Global
              Jobs Opportunity are protected by applicable intellectual property
              laws.
            </p>

            <p>
              Company names, trademarks, logos, job descriptions, and other
              third-party materials belong to their respective owners.
            </p>
          </TermsSection>

          <TermsSection
            number="09"
            title="Accuracy of Information"
          >
            <p>
              We make reasonable efforts to keep information on the website
              useful and up to date. However, we do not guarantee that every
              piece of information is complete, accurate, current, or available
              at all times.
            </p>

            <p>
              If you notice an incorrect, outdated, or potentially misleading
              job listing, please contact us so that we can review the
              information.
            </p>
          </TermsSection>

          <TermsSection
            number="10"
            title="User Safety and Fraud Awareness"
          >
            <p>
              Users should exercise appropriate caution when responding to job
              opportunities online.
            </p>

            <p>
              Global Jobs Opportunity does not request payment in exchange for
              employment and does not guarantee the legitimacy of every
              third-party employer or external website.
            </p>

            <p>
              Before sharing sensitive documents, financial information, or
              making any payment, users should independently verify the
              employer and the opportunity.
            </p>
          </TermsSection>

          <TermsSection
            number="11"
            title="Privacy"
          >
            <p>
              Your use of Global Jobs Opportunity is also subject to our
              Privacy Policy, which explains how information may be collected,
              used, stored, and disclosed.
            </p>

            <p>
              Our website may use cookies and similar technologies for website
              functionality, analytics, advertising, and other legitimate
              purposes as described in our Privacy Policy.
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex font-semibold text-[var(--color-primary-dark)] transition hover:text-[var(--color-accent)]"
            >
              Read our Privacy Policy →
            </Link>
          </TermsSection>

          <TermsSection
            number="12"
            title="Limitation of Liability"
          >
            <p>
              To the extent permitted by applicable law, Global Jobs
              Opportunity is not responsible for losses or damages resulting
              from reliance on job listings, third-party websites, employer
              decisions, changes to job availability, or information provided
              by external sources.
            </p>

            <p>
              Users are responsible for evaluating employment opportunities
              and making their own decisions before applying or sharing
              information.
            </p>
          </TermsSection>

          <TermsSection
            number="13"
            title="Changes to These Terms"
          >
            <p>
              We may update these Terms and Conditions from time to time to
              reflect changes to our website, services, or applicable
              requirements.
            </p>

            <p>
              Updated terms will be published on this page together with the
              revised effective date.
            </p>

            <p>
              Your continued use of the website after changes are published
              means that you accept the updated Terms and Conditions.
            </p>
          </TermsSection>

          <TermsSection
            number="14"
            title="Contact Us"
          >
            <p>
              If you have questions, concerns, or feedback regarding these
              Terms and Conditions, please contact us through our Contact Us
              page.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-primary-dark)]"
            >
              Contact Us
            </Link>
          </TermsSection>
        </div>
      </section>

    
    </main>
  );
}


function TermsSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm sm:p-9">
      <div className="flex gap-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary-dark)]">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
            {title}
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-7 text-[var(--color-muted)]">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}


function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[9px] flex h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
      <span>{children}</span>
    </li>
  );
}