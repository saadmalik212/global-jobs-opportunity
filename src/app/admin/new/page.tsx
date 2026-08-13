"use client";

import JobForm from "@/components/JobForm";
import { createJob } from "@/lib/jobs";

export default function NewJobPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">
        Post a new job
      </h1>
      <JobForm submitLabel="Publish job" onSubmit={(values) => createJob(values).then(() => {})} />
    </div>
  );
}
