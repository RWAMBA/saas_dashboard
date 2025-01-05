import { prisma } from "@/lib/db/prisma";

export async function getAnalyticsSummary(days: number = 30) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [dailyStats, events, topPages] = await Promise.all([
    // Get daily stats
    prisma.dailyStats.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    }),

    // Get event counts
    prisma.analyticsEvent.groupBy({
      by: ['name'],
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: true,
    }),

    // Get top pages
    prisma.analyticsEvent.groupBy({
      by: ['path'],
      where: {
        name: 'page_view',
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: true,
      orderBy: {
        _count: {
          path: 'desc',
        },
      },
      take: 5,
    }),
  ]);

  return {
    dailyStats,
    events,
    topPages,
  };
} 