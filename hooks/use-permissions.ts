"use client";

import { useSession } from "next-auth/react";
import { Permission, Role, hasPermission } from "@/lib/permissions";

export function usePermissions() {
  const { data: session } = useSession();
  const userRole = session?.user?.role ?? Role.Viewer;

  return {
    can: (permission: Permission) => hasPermission(userRole, permission),
    role: userRole,
    isAdmin: userRole === Role.Admin,
  };
} 