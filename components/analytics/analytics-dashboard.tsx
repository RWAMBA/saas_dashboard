"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangeSelector } from "./date-range-selector";
import { Overview } from "./overview";
import { TopPages } from "./top-pages";
import { RecentActivity } from "./recent-activity";
import { RealtimeView } from "./realtime-view";
import { CSVUpload } from "./csv-upload";
import { ExportButton } from "./export-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DateRange, ExportFilter } from "@/types";
import { cn } from "@/lib/utils/cn";
import { 
  Users2, 
  Activity, 
  Clock, 
  MousePointerClick,
  LucideIcon 
} from "lucide-react";

type TrendType = "up" | "down" | "neutral";

interface Stat {
  title: string;
  value: number | string;
  icon: LucideIcon;
  change: string;
  trend: TrendType;
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<ExportFilter>({
    eventType: 'all',
    path: undefined,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });

      const response = await fetch(`/api/analytics/summary?${params}`);
      const result = await response.json();
      console.log('Fetched analytics data:', result);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (range: DateRange) => {
    if (range.from && range.to) {
      setDateRange(range);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <DateRangeSelector onChange={handleDateRangeChange} />
          <div className="flex items-center gap-4">
            <CSVUpload onUploadSuccess={fetchData} />
            <ExportButton 
              dateRange={dateRange} 
              filters={filters} 
              containerId="analytics-content" 
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
      </div>
    );
  }

  const stats: Stat[] = [
    {
      title: "Total Visitors",
      value: data?.totalVisitors || 0,
      icon: Users2,
      change: data?.visitorChange || "+0%",
      trend: (data?.visitorTrend as TrendType) || "neutral",
    },
    {
      title: "Page Views",
      value: data?.pageViews || 0,
      icon: Activity,
      change: data?.pageViewChange || "+0%",
      trend: data?.pageViewTrend || "neutral",
    },
    {
      title: "Avg. Session Duration",
      value: data?.avgSessionDuration || "0:00",
      icon: Clock,
      change: data?.durationChange || "+0%",
      trend: data?.durationTrend || "neutral",
    },
    {
      title: "Bounce Rate",
      value: `${data?.bounceRate || 0}%`,
      icon: MousePointerClick,
      change: data?.bounceRateChange || "+0%",
      trend: data?.bounceRateTrend || "neutral",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DateRangeSelector onChange={handleDateRangeChange} />
        <div className="flex items-center gap-2 md:gap-4">
          <CSVUpload onUploadSuccess={fetchData} />
          <ExportButton 
            dateRange={dateRange} 
            filters={filters} 
            containerId="analytics-content" 
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realtime">Realtime</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <div id="analytics-content">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className={cn(
                        stat.trend === "up" && "text-green-500",
                        stat.trend === "down" && "text-red-500"
                      )}>
                        {stat.change}
                      </span>
                      <span className="ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Overview data={data?.dailyStats || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopPages data={data?.topPages || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentActivity data={data?.recentEvents || []} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime">
            <RealtimeView />
          </TabsContent>

          <TabsContent value="behavior">
            <Card>
              <CardHeader>
                <CardTitle>User Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <p>User behavior analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 