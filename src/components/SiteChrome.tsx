"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AtsResumePopup from "./AtsResumePopup";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AtsResumePopup />
    </>
  );
}