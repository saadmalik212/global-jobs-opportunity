import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Global Jobs Opportunity",
  description:
    "Get in touch with Global Jobs Opportunity. Have questions or feedback about our job platform? Contact us using our contact form.",
  keywords: [
    "contact global jobs opportunity",
    "customer support",
    "feedback",
    "job platform support",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    title: "Contact Us | Global Jobs Opportunity",
    description:
      "Get in touch with Global Jobs Opportunity. We'd love to hear from you!",
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Global Jobs Opportunity",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
