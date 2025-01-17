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
      return new Response(
        JSON.stringify({ error: "Email already in use" }),
        {
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          },
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(validatedData.password, 12);
    const verificationToken = randomBytes(32).toString("hex");
    
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        hashedPassword,
        verificationToken,
      },
    });

    try {
      await sendVerificationEmail(user.email!, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Continue with registration even if email fails
    }

    return new Response(
      JSON.stringify({
        message: "User created successfully. Please check your email to verify your account.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }),
      {
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Registration failed",
      }),
      {
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        status: 500,
      }
    );
  }
} 