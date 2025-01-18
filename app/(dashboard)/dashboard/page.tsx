import { DashboardCards } from "@/components/dashboard/cards";
import { DashboardChart } from "@/components/dashboard/chart";
import { prisma } from "@/lib/db/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch the last 30 days of stats
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyStats = await prisma.dailyStats.findMany({
    where: {
      date: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  const formattedStats = dailyStats.map(stat => ({
    date: stat.date.toISOString().split('T')[0],
    totalVisits: stat.totalVisits,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your analytics and performance
        </p>
      </div>
      <DashboardCards />
      <DashboardChart data={formattedStats} />
    </div>
  );
} 