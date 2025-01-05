'use client';
import { UserMenu } from "@/components/auth/user-menu";
import type { User } from "@/types";

interface DashboardNavProps {
  user: User;
}

export function DashboardNav({ user }: DashboardNavProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
} 