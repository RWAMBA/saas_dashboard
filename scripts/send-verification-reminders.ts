import { prisma } from "@/lib/db/prisma";
import { sendVerificationEmail } from "@/lib/email";

async function sendVerificationReminders() {
  try {
    // Find all unverified users
    const unverifiedUsers = await prisma.user.findMany({
      where: {
        emailVerified: null,
      },
    });

    console.log(`Found ${unverifiedUsers.length} unverified users`);

    for (const user of unverifiedUsers) {
      try {
        // Send them a link to request verification
        await sendVerificationEmail(
          user.email!,
          user.verificationToken || 'request-new'
        );
        console.log(`Sent reminder to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send reminder to ${user.email}:`, error);
      }
    }
  } catch (error) {
    console.error('Failed to send reminders:', error);
  }
}

// Run the script
sendVerificationReminders(); 