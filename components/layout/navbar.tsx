"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  // If user is logged in, don't show marketing navigation
  if (session?.user) {
    return null;
  }

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        href="#features" 
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Features
      </Link>
      <Link 
        href="#pricing" 
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pricing
      </Link>
      <Link 
        href="/docs" 
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Documentation
      </Link>
    </nav>
  );
} 