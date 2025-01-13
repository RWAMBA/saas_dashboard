"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerFilters {
  status: string;
  plan: string;
}

interface CustomerFiltersProps {
  filters: CustomerFilters;
  onFilterChange: (filters: CustomerFilters) => void;
}

export function CustomerFilters({ filters, onFilterChange }: CustomerFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFilterChange({ ...filters, status: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.plan}
        onValueChange={(value) =>
          onFilterChange({ ...filters, plan: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 