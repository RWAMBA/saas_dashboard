import { signOut } from "next-auth/react";

export async function handleSignOut() {
  // First sign out
  await signOut({ redirect: false });
  
  // Return true to indicate successful sign out
  return true;
} 