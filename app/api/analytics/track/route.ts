import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Tracking event:', body);
    const { name, properties, path, sessionId } = body;
    const user = await getCurrentUser();

    if (!name) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    // Create event
    const event = await prisma.analyticsEvent.create({
      data: {
        name,
        properties: properties || {},
        path,
        sessionId,
        userId: user?.id,
      },
    });

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyStats.upsert({
      where: { date: today },
      create: {
        date: today,
        totalEvents: 1,
        totalVisits: name === 'page_view' ? 1 : 0,
        uniqueVisitors: 1,
      },
      update: {
        totalEvents: { increment: 1 },
        totalVisits: name === 'page_view' ? { increment: 1 } : undefined,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
} 