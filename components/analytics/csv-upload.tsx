"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { Upload, Download, FileText, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CSVUploadProps {
  onUploadSuccess: () => void;
}

export function CSVUpload({ onUploadSuccess }: CSVUploadProps) {
  const authToast = useAuthToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");

  const downloadSampleFile = (type: "stats" | "events") => {
    const sampleData = type === "stats" 
      ? [
          'date,totalVisits,uniqueVisitors,totalEvents',
          '2024-01-01,150,75,300',
          '2024-01-02,165,82,330',
          '2024-01-03,180,90,360'
        ]
      : [
          'event_name,path,timestamp,session_id,properties',
          'page_view,/dashboard,2024-01-01T10:00:00Z,session_123,{"referrer":"google"}',
          'click,/features,2024-01-01T10:05:00Z,session_123,{"element":"signup_button"}',
          'conversion,/checkout,2024-01-01T10:10:00Z,session_123,{"value":"199"}'
        ];

    const blob = new Blob([sampleData.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_sample_${type}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', activeTab); // Send the type of data being uploaded

      const response = await fetch('/api/analytics/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      authToast.success(
        "Upload Successful",
        `${activeTab === 'stats' ? 'Analytics data' : 'Event data'} imported successfully`
      );
      onUploadSuccess();
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      authToast.error(
        "Upload Failed",
        error instanceof Error ? error.message : "Failed to import data"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Analytics Data</DialogTitle>
          <DialogDescription>
            Choose the type of data you want to import
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="stats" onValueChange={(value) => setActiveTab(value as "stats" | "events")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="events">Events & Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <div className="space-y-4">
              {/* Stats upload UI */}
              <div className="text-sm text-muted-foreground">
                <h4 className="font-semibold">Statistics Format:</h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Required columns: date, totalVisits, uniqueVisitors, totalEvents</li>
                  <li>Date format: YYYY-MM-DD</li>
                  <li>Numbers should be integers</li>
                </ul>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => downloadSampleFile('stats')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Sample Stats File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="space-y-4">
              {/* Events upload UI */}
              <div className="text-sm text-muted-foreground">
                <h4 className="font-semibold">Events Format:</h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Required columns: event_name, path, timestamp, session_id, properties</li>
                  <li>Timestamp format: ISO 8601</li>
                  <li>Properties should be valid JSON</li>
                </ul>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => downloadSampleFile('events')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Sample Events File
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          {selectedFile ? (
            <div className="rounded-lg border-2 border-dashed p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed p-6 text-center">
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && !file.name.endsWith('.csv')) {
                    authToast.error("Invalid File", "Please upload a CSV file");
                    return;
                  }
                  setSelectedFile(file || null);
                }}
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer space-y-2"
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="text-sm font-medium">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-muted-foreground">
                  CSV files only (max 5MB)
                </div>
              </label>
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleFileUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 