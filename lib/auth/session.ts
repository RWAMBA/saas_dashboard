import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth-options";
import type { User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    const user: User = {
      id: session.user.id || '',
      name: session.user.name || null,
      email: session.user.email || null,
      image: session.user.image || null,
    };

    return user;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

// Fixed client-side session checker
export function useCurrentUser() {
  const { data: session } = useSession();
  return session?.user as User | null;
} 