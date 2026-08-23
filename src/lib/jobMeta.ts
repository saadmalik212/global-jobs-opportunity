import { Job } from "./types";

export interface JobMetaRow {
  label: string;
  value: string;
}


export function getJobMetaRows(job: Job): JobMetaRow[] {
  const rows: JobMetaRow[] = [];
  if (job.location) rows.push({ label: "Location", value: job.location });
  if (job.experience) rows.push({ label: "Experience", value: job.experience });
  if (job.jobType) rows.push({ label: "Job Type", value: job.jobType });
  if (job.company) rows.push({ label: "Company", value: job.company });
  if (job.salary) rows.push({ label: "Salary", value: job.salary });
  return rows;
}