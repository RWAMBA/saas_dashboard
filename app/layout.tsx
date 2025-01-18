import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Analytics Pro - SaaS Dashboard",
  description: "Modern analytics dashboard for SaaS businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
