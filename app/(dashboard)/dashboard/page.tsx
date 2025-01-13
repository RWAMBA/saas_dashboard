import { DashboardCards } from "@/components/dashboard/cards";
import { DashboardChart } from "@/components/dashboard/chart";

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your analytics and performance
        </p>
      </div>
      <DashboardCards />
      <DashboardChart />
    </div>
  );
} 