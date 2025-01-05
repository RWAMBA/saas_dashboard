import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface AuthError {
  message: string;
  field?: string;
}

export type ToastVariant = "default" | "destructive" | "success" | "warning"; 

export type ExportFormat = 'csv' | 'pdf' | 'image';
export type ExportMetric = 'page_views' | 'visitors' | 'events' | 'conversions';
export type ExportFilter = {
  eventType?: string;
  path?: string;
  dateRange?: DateRange;
};

export interface ExportOptions {
  format: ExportFormat;
  dateRange?: DateRange;
  metrics: ExportMetric[];
  filters?: ExportFilter;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface ExportData {
  headers: string[];
  rows: any[];
  filename: string;
}

export interface AnalyticsImportRow {
  event_name: string;
  path: string;
  timestamp: string;
  session_id?: string;
  properties?: string;
}

export const CSV_HEADERS = [
  'event_name',
  'path',
  'timestamp',
  'session_id',
  'properties'
] as const; 