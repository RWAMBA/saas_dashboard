"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterControls } from "./filter-controls";

export function CustomReportBuilder() {
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      // Generate report logic
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FilterControls 
          onFilterChange={(filters) => {
            console.log("Filters changed:", filters);
          }} 
        />
        <div className="flex justify-end">
          <Button 
            onClick={generateReport} 
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 