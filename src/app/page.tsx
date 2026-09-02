import { Suspense } from "react";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import { fetchJobs } from "@/lib/jobs";
import JobListSkeleton from "@/components/JobListSkeleton";



export const revalidate = 300;

export default async function HomePage() {
 const jobs = await fetchJobs(20);

  return (
    <main>
      <Hero />
   <Suspense fallback={<JobListSkeleton />}>
  <JobList initialJobs={jobs} />
</Suspense>
    </main>
  );
}