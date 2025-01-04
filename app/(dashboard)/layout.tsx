import { DashboardNav } from "@/components/dashboard/nav";
import { SideNav } from "@/components/dashboard/side-nav";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { User } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <DashboardNav user={user as User} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 