import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        try {
          // Get current active users (last 5 minutes)
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
          const activeUsers = await prisma.analyticsEvent.groupBy({
            by: ['sessionId'],
            where: {
              timestamp: {
                gte: fiveMinutesAgo
              }
            },
            _count: true
          });

          // Get recent events
          const recentEvents = await prisma.analyticsEvent.findMany({
            take: 10,
            orderBy: {
              timestamp: 'desc'
            }
          });

          const data = {
            activeUsers: activeUsers.length,
            currentPageViews: recentEvents.filter(e => e.name === 'page_view').length,
            lastEvents: recentEvents
          };

          // Send data
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          
          // Wait 5 seconds before next update
          await new Promise(resolve => setTimeout(resolve, 5000));
        } catch (error) {
          console.error('Error in realtime stats:', error);
        }
      }
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 