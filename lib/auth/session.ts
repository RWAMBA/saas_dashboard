import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import type { User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    // Ensure we return a consistent user object structure
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

// Add a client-side session checker
export function useCurrentUser() {
  const session = useSession();
  return session.data?.user as User | null;
} 