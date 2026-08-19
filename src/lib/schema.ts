import { SITE_NAME, SITE_URL } from "./constants";

// Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Global Jobs Opportunity is a job discovery platform connecting job seekers with opportunities worldwide.",
    sameAs: [
      // Add your social media URLs here
      // "https://www.facebook.com/globaljobsopportunity",
      // "https://www.twitter.com/globaljobs",
      // "https://www.linkedin.com/company/global-jobs-opportunity",
    ],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      // Add your contact info
      // email: "contact@globaljobsopportunity.com",
    },
  };
}

// Website Schema
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?q={search_term_string}`,
      },
      query_input: "required name=search_term_string",
    },
  };
}

// Job Posting Schema
export function getJobPostingSchema(job: {
  id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  createdAt: string;
  experience?: string;
  salary?: string;
}) {
  function guessEmploymentType(jobType: string): string {
    const t = jobType.toLowerCase();
    if (t.includes("intern")) return "INTERN";
    if (t.includes("part")) return "PART_TIME";
    if (t.includes("contract")) return "CONTRACTOR";
    if (t.includes("temp")) return "TEMPORARY";
    return "FULL_TIME";
  }

  const isRemote = `${job.title} ${job.location} ${job.jobType}`
    .toLowerCase()
    .includes("remote");

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: new Date(job.createdAt).toISOString(),
    employmentType: guessEmploymentType(job.jobType),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
  };

  if (!isRemote) {
    schema.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    };
  }

  if (job.salary) {
    schema.baseSalary = {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      price: job.salary,
    };
  }

  return schema;
}

// Breadcrumb Schema
export function getBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
