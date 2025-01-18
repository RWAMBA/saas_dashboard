import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { AuditLogger } from "@/lib/audit-logger";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    // Update privacy settings in database
    await prisma.privacySettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        anonymizeIPs: data.anonymizeIPs,
        cookieConsent: data.cookieConsent,
        dataRetention: data.dataRetention,
        collectPII: data.collectPII,
      },
      create: {
        userId: session.user.id,
        anonymizeIPs: data.anonymizeIPs,
        cookieConsent: data.cookieConsent,
        dataRetention: data.dataRetention,
        collectPII: data.collectPII,
      },
    });

    // Log the settings change
    await AuditLogger.log({
      action: 'settings_change',
      userId: session.user.id,
      details: {
        type: 'privacy_settings',
        changes: data,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update privacy settings:', error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
} 