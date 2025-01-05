import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { profileSchema } from "@/lib/validations/user";
import { hash, compare } from "bcryptjs";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    // If changing password, verify current password
    if (validatedData.newPassword) {
      if (!validatedData.currentPassword) {
        return NextResponse.json(
          { error: "Current password is required" },
          { status: 400 }
        );
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { hashedPassword: true },
      });

      const validPassword = await compare(
        validatedData.currentPassword,
        dbUser?.hashedPassword || ""
      );

      if (!validPassword) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      name: validatedData.name,
    };

    // If changing password, hash new password
    if (validatedData.newPassword) {
      updateData.hashedPassword = await hash(validatedData.newPassword, 12);
    }

    // If changing email, require verification
    if (validatedData.email !== user.email) {
      const verificationToken = randomBytes(32).toString("hex");
      updateData.email = validatedData.email;
      updateData.emailVerified = null;
      updateData.verificationToken = verificationToken;

      // Send verification email to new address
      await sendVerificationEmail(validatedData.email, verificationToken);
    }

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 