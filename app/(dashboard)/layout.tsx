import { SideNav } from "@/components/dashboard/side-nav";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

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
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="fixed inset-y-0 w-64">
          <SideNav user={user} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <MobileNav user={user} />
            <div className="flex">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <main className="flex-1">
          <div className="px-4 py-4 md:px-6 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 