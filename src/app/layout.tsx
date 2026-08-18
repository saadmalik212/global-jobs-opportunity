import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Global Jobs Opportunity",
  description:
    "Find and apply to the latest jobs in Lahore, Islamabad, Karachi, Faisalabad and top international destinations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas font-body text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}