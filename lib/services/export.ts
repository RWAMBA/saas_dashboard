import { ExportOptions, ExportData } from '@/lib/types/export';
import { prisma } from '@/lib/db/prisma';

export async function generateExportData(options: ExportOptions): Promise<ExportData> {
  const { dateRange, metrics, filters } = options;
  
  // Build query conditions
  const where = {
    ...(dateRange && {
      timestamp: {
        gte: dateRange.from,
        lte: dateRange.to,
      },
    }),
    ...(filters?.eventType !== 'all' && {
      name: filters.eventType,
    }),
  };

  // Fetch data from database
  const data = await prisma.analyticsEvent.findMany({
    where,
    orderBy: {
      timestamp: 'desc',
    },
    select: {
      name: true,
      path: true,
      timestamp: true,
      properties: true,
      sessionId: true,
    },
  });

  // Format data for export
  const headers = ['Event', 'Path', 'Timestamp', 'Session', 'Properties'];
  const rows = data.map(event => [
    event.name,
    event.path,
    event.timestamp.toISOString(),
    event.sessionId,
    JSON.stringify(event.properties),
  ]);

  return {
    headers,
    rows,
    filename: `analytics-export-${new Date().toISOString().split('T')[0]}`
  };
} 