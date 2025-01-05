"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangeSelector } from "./date-range-selector";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterControls({ onFilterChange }: { 
  onFilterChange: (filters: any) => void 
}) {
  const [filters, setFilters] = useState({
    period: "7d",
    eventType: "all",
    source: "all"
  });

  return (
    <div className="flex items-center gap-4">
      <DateRangeSelector 
        onChange={(range) => {
          onFilterChange({ ...filters, dateRange: range });
        }} 
      />
      <Select
        value={filters.eventType}
        onValueChange={(value) => {
          setFilters(prev => ({ ...prev, eventType: value }));
          onFilterChange({ ...filters, eventType: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="page_view">Page Views</SelectItem>
          <SelectItem value="click">Clicks</SelectItem>
          <SelectItem value="conversion">Conversions</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 