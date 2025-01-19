'use client';
import { UserMenu } from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { User } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

interface DashboardNavProps {
  user: User;
}

export function DashboardNav({ user }: DashboardNavProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <div className="flex items-center gap-4">
      {!isMobile && <ThemeToggle />}
      <UserMenu user={user} />
    </div>
  );

  if (isMobile) {
    return (
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Dashboard Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Menu</div>
                </div>
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto">
          <NavContent />
        </div>
      </div>
    </header>
  );
} 