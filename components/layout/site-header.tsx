"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BarChart2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="font-bold inline-block">Analytics Pro</span>
        </Link>
        
        <MainNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          {session?.user ? (
            <Link 
              href="/dashboard"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ size: "sm" })}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 