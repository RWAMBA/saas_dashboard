"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerMetrics } from "@/hooks/use-customer-metrics";
import { Users, Activity, TrendingDown } from "lucide-react";
import type { DateRange } from "@/types";

interface CustomerMetricsProps {
  dateRange: DateRange;
}

export function CustomerMetrics({ dateRange }: CustomerMetricsProps) {
  const { metrics, loading } = useCustomerMetrics(dateRange);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.totalCustomers || 0}</div>
          <p className="text-xs text-muted-foreground">
            {metrics?.growth.startsWith('-') ? (
              <span className="text-red-500">{metrics.growth}</span>
            ) : (
              <span className="text-green-500">+{metrics?.growth}</span>
            )}
            {' from last month'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.activeSubscriptions || 0}</div>
          <p className="text-xs text-muted-foreground">
            {metrics?.lastMonthCustomers} new this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.churnRate || '0%'}</div>
          <p className="text-xs text-muted-foreground">
            Updated in real-time
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 