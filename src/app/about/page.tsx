import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Global Jobs Opportunity",
  description:
    "Learn about Global Jobs Opportunity - a job discovery platform connecting job seekers with opportunities worldwide. Our mission is to make finding employment easier.",
  keywords: [
    "about global jobs opportunity",
    "job platform",
    "career opportunities",
    "job search platform",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    title: "About Global Jobs Opportunity",
    description:
      "Learn about our mission to connect job seekers with global career opportunities.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Global Jobs Opportunity",
      },
    ],
  },
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-ink)]">
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-[0.06]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
              About Global Jobs Opportunity
            </span>

            <h1 className="mt-6 font-[var(--font-display)] text-4xl font-bold tracking-tight text-[var(--color-surface)] sm:text-5xl lg:text-6xl">
              Connecting Job Seekers With Opportunities Around the World
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-surface)]">
              Global Jobs Opportunity is a job discovery platform created to
              make it easier for people to find employment opportunities from
              different industries and locations in one convenient place.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
              Who We Are
            </p>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              A simpler way to discover job opportunities
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-muted)]">
              <p>
                Finding the right job can take considerable time, especially
                when opportunities are spread across multiple websites and
                platforms. Global Jobs Opportunity aims to make this process
                easier by bringing relevant job opportunities together in one
                organized platform.
              </p>

              <p>
                Our website focuses on helping job seekers discover vacancies,
                understand basic job requirements, and access the original
                application information provided with each listing.
              </p>

              <p>
                We believe that job information should be presented clearly,
                responsibly, and in a way that allows candidates to make their
                own informed decisions before applying.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary-dark)]">
              01
            </div>

            <h3 className="mt-6 font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              Our mission is to create a useful and accessible job discovery
              platform where people can explore employment opportunities across
              different countries, industries, experience levels, and career
              fields.
            </p>

            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              We continuously work toward improving the way job information is
              organized and presented so that visitors can spend less time
              searching and more time focusing on suitable opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-[var(--color-primary-light)]/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
              What We Do
            </p>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
              Helping people discover their next opportunity
            </h2>

            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              Global Jobs Opportunity is designed around the needs of people
              who are actively exploring career and employment opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Job Discovery"
              text="We organize employment opportunities so visitors can explore jobs by relevant information such as position, location, industry, and requirements."
              icon="01"
            />

            <InfoCard
              title="Clear Information"
              text="We aim to present important job details in a clear and readable format so candidates can better understand an opportunity before applying."
              icon="02"
            />

            <InfoCard
              title="Global Opportunities"
              text="Our platform covers opportunities from different locations and professional fields, helping users discover possibilities beyond their local area."
              icon="03"
            />
          </div>
        </div>
      </section>

      {/* Job Seekers */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Highlight Card */}
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
              For Job Seekers
            </p>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)]">
              Built to make job searching easier
            </h2>

            <p className="mt-5 leading-7 text-[var(--color-muted)]">
              Whether you are looking for your first job, planning a career
              move, or exploring opportunities in another country, our goal is
              to make finding relevant vacancies more convenient.
            </p>

            <ul className="mt-7 space-y-4 text-[var(--color-ink)]">
              <li className="flex gap-3">
                <CheckIcon />
                <span>
                  Explore opportunities across different industries.
                </span>
              </li>

              <li className="flex gap-3">
                <CheckIcon />
                <span>Review job requirements before applying.</span>
              </li>

              <li className="flex gap-3">
                <CheckIcon />
                <span>Find opportunities based on different locations.</span>
              </li>

              <li className="flex gap-3">
                <CheckIcon />
                <span>
                  Use provided application information to continue your
                  application.
                </span>
              </li>
            </ul>
          </div>

          {/* Our Approach */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
              Our Approach
            </p>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)]">
              Transparency matters to us
            </h2>

            <div className="mt-6 space-y-5 leading-7 text-[var(--color-muted)]">
              <p>
                We understand that employment information can have a
                significant impact on people&apos;s careers. For this reason,
                we aim to provide job information as clearly and accurately as
                possible.
              </p>

              <p>
                Job seekers should always review the complete job description,
                employer information, eligibility criteria, and application
                instructions before submitting an application.
              </p>

              <p>
                We also encourage users to be cautious when sharing personal
                information online and to verify an employer or recruitment
                opportunity before providing sensitive documents or payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters */}
      <section className="bg-[var(--color-ink)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                For Employers & Recruiters
              </p>

              <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[var(--color-surface)] sm:text-4xl">
                Helping opportunities reach the right audience
              </h2>
            </div>

            <div>
              <p className="leading-8 text-[var(--color-surface)]/65">
                Employers and recruitment professionals can use our platform
                to reach people who are actively searching for career
                opportunities. We aim to maintain clear job information and
                provide visitors with useful details about available positions.
              </p>

              <p className="mt-5 leading-8 text-[var(--color-surface)]/65">
                We do not promise employment, interviews, or selection for any
                candidate. Hiring decisions are made independently by the
                respective employer or recruiting organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Standards */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
            Job Listing Standards
          </p>

          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Responsible job information
          </h2>

          <p className="mt-5 leading-7 text-[var(--color-muted)]">
            We aim to keep job information useful, relevant, and easy to
            understand. When information is available, listings may include
            details such as the job title, company or organization, location,
            employment type, qualifications, responsibilities, and application
            instructions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StandardCard
            title="Relevant"
            text="We focus on presenting employment-related information that is useful to job seekers."
          />

          <StandardCard
            title="Clear"
            text="Important job details are presented in a straightforward and readable format."
          />

          <StandardCard
            title="Responsible"
            text="We avoid making promises about hiring outcomes or guaranteed employment."
          />

          <StandardCard
            title="User Focused"
            text="Our platform is designed to make job discovery more convenient for visitors."
          />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-primary-light)]/30">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 sm:p-9">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                !
              </div>

              <div>
                <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                  Important Information
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                  <p>
                    Global Jobs Opportunity is a job discovery website. We are
                    not the employer for every position published on this
                    platform, and appearing on our website does not mean that a
                    job is endorsed or guaranteed by us.
                  </p>

                  <p>
                    Job availability, requirements, compensation, application
                    deadlines, and other employment details may change.
                    Candidates should verify the information with the relevant
                    employer or original application source before applying.
                  </p>

                  <p>
                    We never guarantee employment, interviews, visas, salaries,
                    or selection. Users should use their own judgment and
                    conduct appropriate verification before sharing personal
                    information or accepting an employment offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
          Start Exploring Your Next Opportunity
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--color-muted)]">
          Explore available opportunities and find job information that
          matches your career goals and experience.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#jobs"
            className="rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-primary-dark)]"
          >
            Browse Jobs
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}



function InfoCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary-dark)]">
        {icon}
      </div>

      <h3 className="mt-6 font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   Standard Card
========================================================= */

function StandardCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
        {text}
      </p>
    </div>
  );
}



function CheckIcon() {
  return (
    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-[var(--color-ink)]">
      ✓
    </span>
  );
}

