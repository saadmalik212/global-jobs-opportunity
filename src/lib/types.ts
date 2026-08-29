export interface JobRequirement {
  title: string;
  details: string;
}

export interface JobMetaField {
  id: string;
  label: string;
  value: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  experience: string;
  jobType: string;
  company: string;
  salary: string;
  applyLink: string;
  applyLinkDisplay: "real" | "short";
  metaFields: JobMetaField[];
  requirements: JobRequirement[];
  noticeLine: string;
  createdAt: number;
  updatedAt: number;
}

export type JobFormValues = Omit<Job, "id" | "createdAt" | "updatedAt">;

export interface JobFilters {
  cities: string[];
  countries: string[];
  remoteOnly: boolean;
  onsiteOnly: boolean;
  internshipOnly: boolean;
}