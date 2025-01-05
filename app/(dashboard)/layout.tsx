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
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
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

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="flex-1">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <div className="ml-8 md:ml-0 mr-4 flex">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
            </div>
          </div>
          <div className="container max-w-screen-2xl p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 