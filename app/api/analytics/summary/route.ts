import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface AnalyticsEvent {
  name: string;
  timestamp: Date;
  sessionId: string;
  path: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

    // Get previous period for comparison
    const periodLength = to.getTime() - from.getTime();
    const previousFrom = new Date(from.getTime() - periodLength);
    const previousTo = new Date(to.getTime() - periodLength);

    // Get current period events
    const [currentEvents, previousEvents] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where: {
          timestamp: {
            gte: from,
            lte: to,
          },
        },
        select: {
          name: true,
          timestamp: true,
          sessionId: true,
          path: true,
        },
      }),
      prisma.analyticsEvent.findMany({
        where: {
          timestamp: {
            gte: previousFrom,
            lte: previousTo,
          },
        },
        select: {
          name: true,
          sessionId: true,
        },
      }),
    ]) as [AnalyticsEvent[], Pick<AnalyticsEvent, 'name' | 'sessionId'>[]];

    // Calculate metrics
    const totalVisitors = new Set(currentEvents.map(e => e.sessionId)).size;
    const previousVisitors = new Set(previousEvents.map(e => e.sessionId)).size;
    const pageViews = currentEvents.filter(e => e.name === 'page_view').length;
    const previousPageViews = previousEvents.filter(e => e.name === 'page_view').length;

    // Calculate changes
    const visitorChange = previousVisitors === 0 
      ? '+100%' 
      : `${Math.round((totalVisitors - previousVisitors) / previousVisitors * 100)}%`;
    const pageViewChange = previousPageViews === 0 
      ? '+100%' 
      : `${Math.round((pageViews - previousPageViews) / previousPageViews * 100)}%`;

    // Get top pages with type safety
    const pageViewsMap = currentEvents.reduce((acc: Record<string, number>, event) => {
      if (event.name === 'page_view' && event.path) {
        acc[event.path] = (acc[event.path] || 0) + 1;
      }
      return acc;
    }, {});

    const topPages = Object.entries(pageViewsMap)
      .map(([path, count]) => ({ path, _count: count }))
      .sort((a, b) => b._count - a._count)
      .slice(0, 5);

    // Calculate daily stats with type safety
    const dailyStats = Array.from(
      currentEvents.reduce((acc: Map<string, { date: string; totalVisits: number }>, event) => {
        const date = event.timestamp.toISOString().split('T')[0];
        if (!acc.has(date)) {
          acc.set(date, { date, totalVisits: 0 });
        }
        const stats = acc.get(date);
        if (stats) {
          stats.totalVisits++;
        }
        return acc;
      }, new Map())
    ).map(([_, stats]) => stats);

    return NextResponse.json({
      totalVisitors,
      pageViews,
      avgSessionDuration: "0:00",
      bounceRate: 0,
      visitorChange: visitorChange.startsWith('-') ? visitorChange : `+${visitorChange}`,
      pageViewChange: pageViewChange.startsWith('-') ? pageViewChange : `+${pageViewChange}`,
      durationChange: "+0%",
      bounceRateChange: "+0%",
      visitorTrend: totalVisitors > previousVisitors ? "up" : totalVisitors < previousVisitors ? "down" : "neutral",
      pageViewTrend: pageViews > previousPageViews ? "up" : pageViews < previousPageViews ? "down" : "neutral",
      durationTrend: "neutral",
      bounceRateTrend: "neutral",
      dailyStats,
      topPages,
      recentEvents: currentEvents
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)
        .map((event, index) => ({
          id: `${event.sessionId}_${event.timestamp.getTime()}_${event.name}_${index}`,
          name: event.name,
          path: event.path,
          timestamp: event.timestamp,
        })),
    });
  } catch (error) {
    console.error('Failed to fetch analytics summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 