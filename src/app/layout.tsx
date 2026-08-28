import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { siteKeywords } from "@/lib/seoKeywords";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },

  title: {
    default: "Global Jobs Opportunity | Latest Jobs Worldwide",
    template: "%s | Global Jobs Opportunity",
  },

  description:
    "Find the latest jobs, remote jobs, international career opportunities, and hiring listings from companies worldwide. Explore jobs by country, city, industry, and job type.",

  keywords: siteKeywords,

  authors: [
    {
      name: "Global Jobs Opportunity",
      url: SITE_URL,
    },
  ],

  creator: "Global Jobs Opportunity",
  publisher: "Global Jobs Opportunity",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Global Jobs Opportunity",
    title: "Global Jobs Opportunity | Latest Jobs Worldwide",
    description:
      "Discover the latest jobs, remote opportunities, and international career listings from around the world.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Global Jobs Opportunity",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Global Jobs Opportunity | Latest Jobs Worldwide",
    description:
      "Find the latest jobs, remote jobs, and international career opportunities worldwide.",
    images: [`${SITE_URL}/og-image.png`],
  },

  category: "Jobs & Careers",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Global Jobs Opportunity",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="google-adsense-account" content="ca-pub-8823780017191777" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823780017191777"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-canvas font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <SiteChrome>{children}</SiteChrome>
      </body>
      <GoogleAnalytics gaId="G-8RLLPRTZNT" />
    </html>
  );
}