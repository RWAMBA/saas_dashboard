import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

interface StatsRow {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  totalEvents: number;
}

interface EventRow {
  event_name: string;
  path: string;
  timestamp: string;
  session_id: string;
  properties: string;
}

interface ImportData {
  date?: string;
  totalVisits?: number;
  uniqueVisitors?: number;
  totalEvents?: number;
  event_name?: string;
  path?: string;
  timestamp?: string;
  session_id?: string;
  properties?: string;
}

function validateStatsData(data: ImportData[]): data is StatsRow[] {
  return data.every(row => 
    typeof row.date === 'string' &&
    !isNaN(new Date(row.date).getTime()) &&
    typeof row.totalVisits === 'number' &&
    typeof row.uniqueVisitors === 'number' &&
    typeof row.totalEvents === 'number'
  );
}

function validateEventData(data: ImportData[]): data is EventRow[] {
  return data.every(row => 
    typeof row.event_name === 'string' &&
    typeof row.path === 'string' &&
    typeof row.timestamp === 'string' &&
    !isNaN(new Date(row.timestamp).getTime()) &&
    typeof row.session_id === 'string' &&
    typeof row.properties === 'string'
  );
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const rows = text.split('\n');
    const headers = rows[0].split(',').map(h => h.trim());
    
    if (type === 'stats') {
      // Handle statistics data
      const expectedHeaders = ['date', 'totalVisits', 'uniqueVisitors', 'totalEvents'];
      if (!headers.every((h, i) => h === expectedHeaders[i])) {
        return NextResponse.json(
          { error: 'Invalid headers for statistics. Expected: date, totalVisits, uniqueVisitors, totalEvents' },
          { status: 400 }
        );
      }
      
      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim());
        return {
          date: values[0],
          totalVisits: parseInt(values[1]),
          uniqueVisitors: parseInt(values[2]),
          totalEvents: parseInt(values[3]),
        };
      });

      if (!validateStatsData(data)) {
        return NextResponse.json(
          { error: 'Invalid statistics data format. Please check the sample file.' },
          { status: 400 }
        );
      }

      await Promise.all(data.map(row => 
        prisma.dailyStats.upsert({
          where: { date: new Date(row.date) },
          update: row,
          create: { ...row, date: new Date(row.date) },
        })
      ));
    } else {
      // Handle events data
      const expectedHeaders = ['event_name', 'path', 'timestamp', 'session_id', 'properties'];
      if (!headers.every((h, i) => h === expectedHeaders[i])) {
        return NextResponse.json(
          { error: 'Invalid headers for events. Expected: event_name, path, timestamp, session_id, properties' },
          { status: 400 }
        );
      }

      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim());
        return {
          event_name: values[0],
          path: values[1],
          timestamp: values[2],
          session_id: values[3],
          properties: values[4],
        };
      });

      if (!validateEventData(data)) {
        return NextResponse.json(
          { error: 'Invalid events data format. Please check the sample file.' },
          { status: 400 }
        );
      }

      await Promise.all(data.map(row => 
        prisma.analyticsEvent.create({
          data: {
            name: row.event_name,
            path: row.path,
            timestamp: new Date(row.timestamp),
            sessionId: row.session_id,
            properties: row.properties ? JSON.parse(row.properties) : {},
          },
        })
      ));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to import data' },
      { status: 500 }
    );
  }
} 