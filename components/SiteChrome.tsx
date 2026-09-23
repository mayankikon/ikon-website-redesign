"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <SiteHeader overlay={pathname === "/"} />
      {children}
      <SiteFooter />
    </>
  );
}
