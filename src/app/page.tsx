import { Suspense } from "react";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import { fetchJobs } from "@/lib/jobs";

export const revalidate = 300;



export default async function HomePage() {
 const jobs = await fetchJobs(50);

  return (
    <main>
      <Hero />
      <Suspense fallback={null}>
        <JobList initialJobs={jobs} />
      </Suspense>
    </main>
  );
}