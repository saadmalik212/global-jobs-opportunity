import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <JobList />
      </Suspense>
      <Footer />
    </main>
  );
}