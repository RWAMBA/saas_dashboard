"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2 } from "lucide-react";
import { Navbar } from "./navbar";
import { useSession } from "next-auth/react";

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isHome = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  // Don't show header in dashboard
  if (isDashboard) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="font-bold inline-block">Analytics Pro</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Navbar />
          <div className="flex items-center space-x-2">
            {!session ? (
              isHome ? (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              ) : (
                <Link href="/">
                  <Button variant="ghost" size="sm">Back to Home</Button>
                </Link>
              )
            ) : (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 