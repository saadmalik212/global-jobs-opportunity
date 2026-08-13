import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Jobs Opportunity — Latest Jobs in Pakistan & Abroad",
  description:
    "Find and apply to the latest jobs in Lahore, Islamabad, Karachi, Faisalabad and top international destinations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas font-body text-ink antialiased">{children}</body>
    </html>
  );
}
