import { Job } from "./types";

function significantWords(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1);
}


export function getRelatedJobs(current: Job, allJobs: Job[], limit = 4): Job[] {
  const currentWords = new Set(
    significantWords(`${current.location} ${current.jobType} ${current.title}`)
  );

  return allJobs
    .filter((job) => job.id !== current.id)
    .map((job) => {
      const words = significantWords(`${job.location} ${job.jobType} ${job.title}`);
      const score = words.filter((w) => currentWords.has(w)).length;
      return { job, score };
    })
    .sort((a, b) => b.score - a.score || b.job.createdAt - a.job.createdAt)
    .slice(0, limit)
    .map((entry) => entry.job);
}