"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BarChart2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteHeader() {
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="font-bold inline-block">Analytics Pro</span>
          </Link>
          {!isMobile && <MainNav className="mx-6" />}
        </div>

        <div className="flex items-center gap-4">
          {isMobile && <MainNav />}
          <ThemeToggle />
          {session?.user ? (
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "ghost",
                size: isMobile ? "sm" : "default",
              })}
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: isMobile ? "sm" : "default",
                })}
              >
                Sign in
              </Link>
              {!isMobile && (
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: isMobile ? "sm" : "default",
                  })}
                >
                  Get started
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 