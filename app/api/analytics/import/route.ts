import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { validateCSVData } from '@/lib/utils/csv';
import type { AnalyticsImportRow } from '@/types';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data } = await req.json();

    // Validate the data structure
    if (!Array.isArray(data) || !validateCSVData(data)) {
      return NextResponse.json(
        { error: 'Invalid CSV format. Please use the template provided.' },
        { status: 400 }
      );
    }

    // Process and save the data
    const events = await prisma.analyticsEvent.createMany({
      data: data.map((row: AnalyticsImportRow) => ({
        name: row.event_name,
        path: row.path,
        timestamp: new Date(row.timestamp),
        properties: row.properties ? JSON.parse(row.properties) : {},
        sessionId: row.session_id,
        userId: user.id,
      })),
    });

    return NextResponse.json({ 
      success: true, 
      count: events.count 
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import data. Please ensure your CSV matches the template format.' },
      { status: 500 }
    );
  }
} 