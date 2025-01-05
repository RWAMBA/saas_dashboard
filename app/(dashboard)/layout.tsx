import { SideNav } from "@/components/dashboard/side-nav";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="hidden md:flex w-64 shrink-0 fixed inset-y-0">
        <SideNav user={user} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden fixed left-4 top-3 z-40"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="sr-only">Navigation menu</div>
          <SideNav user={user} className="border-none" />
        </SheetContent>
      </Sheet>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col w-full md:pl-64">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 md:px-6">
            <div className="ml-8 md:ml-0 mr-4 flex">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1">
          <div className="container p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 