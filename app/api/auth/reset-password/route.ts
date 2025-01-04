import { prisma } from "@/lib/db/prisma";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { hash, compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received reset password request:", { token: body.token });

    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    // Find all users with reset tokens (for debugging)
    const users = await prisma.user.findMany({
      where: {
        passwordResetToken: { not: null },
      },
      select: {
        id: true,
        email: true,
        passwordResetToken: true,
        passwordResetExpires: true,
      },
    });

    console.log("Users with reset tokens:", users);

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: { not: null },
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Verify the token matches
    const tokenMatches = await compare(token, user.passwordResetToken!);

    if (!tokenMatches) {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update user's password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
} 