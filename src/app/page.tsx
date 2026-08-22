import { Suspense } from "react";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";

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