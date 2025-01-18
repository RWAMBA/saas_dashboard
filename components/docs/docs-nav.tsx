"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Analytics", href: "/docs/features/analytics" },
      { title: "Dashboard", href: "/docs/features/dashboard" },
      { title: "Reports", href: "/docs/features/reports" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "API Overview", href: "/docs/api" },
      { title: "Integration", href: "/docs/integration" },
      { title: "Security", href: "/docs/security" },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 py-6">
      {navigationItems.map((section) => (
        <div key={section.title}>
          <h2 className="mb-2 font-semibold tracking-tight">{section.title}</h2>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm hover:bg-accent",
                  pathname === item.href
                    ? "font-medium text-foreground bg-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
} 