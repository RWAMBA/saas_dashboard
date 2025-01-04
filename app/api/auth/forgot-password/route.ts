import { prisma } from "@/lib/db/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received forgot password request:", body);

    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: "If an account exists, you will receive a reset email",
      });
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    // Important: Store the raw token, not the hashed one
    const hashedResetToken = await hash(resetToken, 10);

    console.log("Generated token:", resetToken); // Debug log

    // Save hashed token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashedResetToken,
        passwordResetExpires: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    // Send the raw token in the email
    await sendPasswordResetEmail(user.email!, resetToken);

    return NextResponse.json({
      message: "Reset email sent successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 