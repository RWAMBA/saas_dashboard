"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings,
  Users 
} from "lucide-react";
import { UserMenu } from "@/components/auth/user-menu";
import type { User } from "@/types";
import { useState } from "react";
import { siteConfig } from "@/lib/constants";

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/dashboard/analytics",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings/profile",
  },
];

interface SideNavProps {
  user: User;
  className?: string;
}

export function SideNav({ user, className }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    router.push(href);
  };

  return (
    <aside className={cn(
      "flex h-full flex-col border-r bg-background",
      className
    )}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {routes.map((route) => (
            <button
              key={route.href}
              onClick={() => handleNavigation(route.href)}
              className={cn(
                "w-full flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                pathname === route.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
                isNavigating && "opacity-70"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </button>
          ))}
        </nav>
        <div className="border-t p-4">
          <UserMenu user={user} />
        </div>
      </div>
    </aside>
  );
} 