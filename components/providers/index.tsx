"use client";

import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "./session-provider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="saas-theme"
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
} 