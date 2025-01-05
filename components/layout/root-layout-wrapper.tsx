"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";

export function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith("/dashboard") || 
                    pathname?.startsWith("/auth") || 
                    pathname?.startsWith("/settings");

  return (
    <>
      {!isAppRoute && <SiteHeader />}
      {children}
    </>
  );
} 