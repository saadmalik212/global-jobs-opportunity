"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobForm from "@/components/JobForm";
import { fetchJob, updateJob } from "@/lib/jobs";
import { JobFormValues } from "@/lib/types";

export default function EditJobPage() {
  const params = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<JobFormValues | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchJob(params.id).then((job) => {
      if (!job) {
        setNotFound(true);
        return;
      }
      const { id, createdAt, updatedAt, ...values } = job;
      setInitialValues(values);
    });
  }, [params.id]);

  if (notFound) {
    return <p className="text-muted">Yeh job post nahi mili — ho sakta hai delete ho chuki ho.</p>;
  }

  if (!initialValues) {
    return <p className="text-muted">Loading…</p>;
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Edit job</h1>
      <JobForm
        initialValues={initialValues}
        submitLabel="Save changes"
        onSubmit={(values) => updateJob(params.id, values)}
      />
    </div>
  );
}
