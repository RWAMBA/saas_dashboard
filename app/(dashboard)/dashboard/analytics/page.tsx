import { getAnalyticsSummary } from "@/lib/analytics/queries";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track and analyze your application metrics
        </p>
      </div>
      
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsDashboard />
      </Suspense>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-[120px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[160px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 