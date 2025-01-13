"use client";

import { Button } from "@/components/ui/button";
import { useExport } from "@/hooks/use-export";
import { Download } from "lucide-react";
import { useAuthToast } from "@/hooks/use-auth-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DateRange, ExportFilter, ExportFormat } from "@/types";

interface ExportButtonProps {
  dateRange?: DateRange;
  filters?: ExportFilter;
  containerId: string;
}

export function ExportButton({ dateRange, filters, containerId }: ExportButtonProps) {
  const { exportData, loading } = useExport();
  const authToast = useAuthToast();

  const handleExport = async (format: ExportFormat) => {
    if (!dateRange) {
      authToast.error(
        "Export Error",
        "Please select a date range first"
      );
      return;
    }

    try {
      await exportData({
        format,
        dateRange,
        metrics: ['page_views', 'visitors', 'events'],
        filters,
      }, containerId);
      
      authToast.success(
        "Export Successful",
        `Report downloaded successfully as ${format.toUpperCase()}`
      );
    } catch (error) {
      authToast.error(
        "Export Failed",
        `Failed to download ${format} report. Please try again.`
      );
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          disabled={loading}
        >
          {loading ? (
            "Exporting..."
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('image')}>
          Export as Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 