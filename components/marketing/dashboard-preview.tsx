"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, ArrowUpRight, DollarSign } from "lucide-react";
import Image from "next/image";

const mockStats = [
  {
    title: "Total Visitors",
    value: "45.2K",
    change: "+12.3%",
    icon: Users
  },
  {
    title: "Revenue",
    value: "$12,345",
    change: "+8.1%",
    icon: DollarSign
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+3.2%",
    icon: Users
  },
  {
    title: "Conversion Rate",
    value: "2.3%",
    change: "+1.1%",
    icon: BarChart2
  }
];

export function DashboardPreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-lg md:aspect-video">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 p-4">
        <div className="w-full md:w-1/2">
          <Image
            src="/dashboard-preview-1.png"
            alt="Dashboard Preview"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/dashboard-preview-2.png"
            alt="Dashboard Preview"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="w-full space-y-4 rounded-lg border bg-background p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {mockStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 