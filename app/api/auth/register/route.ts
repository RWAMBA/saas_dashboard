import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { ApiError, handleApiError } from "@/lib/api/errors";
import { sendVerificationEmail } from "@/lib/email";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new ApiError("Email already in use", 400, "email");
    }

    const hashedPassword = await hash(validatedData.password, 12);
    const verificationToken = randomBytes(32).toString("hex");
    
    // Log the token being created
    console.log("Creating user with token:", verificationToken);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        hashedPassword,
        verificationToken, // Store raw token
      },
    });

    // Verify token was stored
    const createdUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        email: true,
        verificationToken: true
      }
    });

    console.log("Stored user data:", createdUser);

    await sendVerificationEmail(user.email!, verificationToken);

    return new Response(JSON.stringify({
      message: "User created successfully. Please check your email to verify your account.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }));
  } catch (error) {
    return handleApiError(error);
  }
} 