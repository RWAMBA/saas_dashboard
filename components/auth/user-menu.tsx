"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { handleSignOut } from "@/lib/auth/auth-utils";
import type { User } from "@/types";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const authToast = useAuthToast();
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const onSignOut = async () => {
    try {
      const success = await handleSignOut();
      if (success) {
        // Show toast first
        authToast.success(
          "Signed out successfully",
          "Come back soon!"
        );
        // Then redirect after a small delay
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 100);
      }
    } catch (error) {
      authToast.error(
        "Error signing out",
        "Please try again"
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>{initials || "?"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onSignOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 