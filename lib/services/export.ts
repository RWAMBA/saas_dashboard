import type { ExportData, ExportOptions } from "@/types";
import { prisma } from "@/lib/db/prisma";

export async function generateExportData({ format, dateRange, filters }: ExportOptions): Promise<ExportData> {
  // Fetch data based on filters
  const data = await prisma.analyticsEvent.findMany({
    where: {
      timestamp: {
        gte: dateRange?.from,
        lte: dateRange?.to,
      },
      ...(filters?.eventType && { name: filters.eventType }),
      ...(filters?.path && { path: filters.path }),
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  // Transform data based on format
  const headers = ['Event', 'Path', 'Timestamp', 'Session'];
  const rows = data.map(event => [
    event.name,
    event.path,
    event.timestamp.toISOString(),
    event.sessionId || '',
  ]);

  return {
    headers,
    rows,
    filename: `analytics-export-${format}-${new Date().toISOString()}`
  };
}

export async function exportData(options: ExportOptions) {
  const data = await generateExportData(options);
  return data;
} 