"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { parseCSV, generateCSVTemplate } from "@/lib/utils/csv";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CSVUploadProps {
  onUploadSuccess?: () => void;
}

export function CSVUpload({ onUploadSuccess }: CSVUploadProps) {
  const [loading, setLoading] = useState(false);
  const authToast = useAuthToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const csvData = await parseCSV(file);
      
      const response = await fetch('/api/analytics/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: csvData }),
      });

      if (!response.ok) throw new Error('Upload failed');

      authToast.success(
        "Upload Successful",
        "Your analytics data has been imported"
      );
      
      onUploadSuccess?.();
      
    } catch (error) {
      authToast.error(
        "Upload Failed",
        "Failed to import analytics data. Please check your CSV format."
      );
    } finally {
      setLoading(false);
      event.target.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          {loading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <div className="p-2 text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground">CSV Format Guide:</h4>
          <ul className="mt-2 list-disc pl-4 space-y-1">
            <li>event_name: page_view, button_click, etc.</li>
            <li>path: /home, /products, etc.</li>
            <li>timestamp: YYYY-MM-DD HH:mm</li>
            <li>session_id: any identifier</li>
            <li>referrer: google, direct, etc.</li>
          </ul>
        </div>
        <DropdownMenuItem onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => document.getElementById('csv-upload')?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileUpload}
      />
    </DropdownMenu>
  );
} 