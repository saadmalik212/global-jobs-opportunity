import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Global Jobs Opportunity | Latest Jobs Worldwide",
  description:
    "Discover thousands of job opportunities from around the world. Find remote jobs, international positions, and career opportunities across various industries. Browse, filter, and apply to your dream job today.",
  keywords: [
    "jobs",
    "careers",
    "employment",
    "remote jobs",
    "international jobs",
    "job search",
    "apply jobs",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "Global Jobs Opportunity | Latest Jobs Worldwide",
    description:
      "Discover thousands of job opportunities from around the world. Find remote jobs, international positions, and career opportunities.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Global Jobs Opportunity - Job Listings Worldwide",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={null}>
        <JobList />
      </Suspense>
    </main>
  );
}