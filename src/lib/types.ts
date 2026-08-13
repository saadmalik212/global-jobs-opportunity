
export interface JobRequirement {
  title: string;
  details: string;
}
 
export interface Job {
  id: string;
  title: string;
  location: string;
  experience: string;
  jobType: string;
  applyLink: string; 
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
  internshipOnly: boolean;
}