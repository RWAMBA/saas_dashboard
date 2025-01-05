import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    
    if (!token) {
      return NextResponse.json(
        { error: "Missing verification token" },
        { status: 400 }
      );
    }

    // First check if this token was already used
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    // If no user found with this token, check if it was already used
    if (!user) {
      const verifiedUser = await prisma.user.findFirst({
        where: {
          emailVerified: { not: null },
          verificationToken: null,
        },
      });

      if (verifiedUser) {
        return NextResponse.json({
          message: "Email is already verified",
          status: "already_verified"
        });
      }

      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    // If user is already verified but token wasn't cleared (edge case)
    if (user.emailVerified) {
      return NextResponse.json({
        message: "Email is already verified",
        status: "already_verified"
      });
    }

    // Verify the email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null, // Clear the token after use
      },
    });

    return NextResponse.json({
      message: "Email verified successfully",
      status: "verified"
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
} 