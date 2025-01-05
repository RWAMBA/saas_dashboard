"use client";

import { useState } from 'react';
import { exportAnalytics } from '@/lib/utils/export';
import type { ExportOptions } from '@/types';

export function useExport() {
  const [loading, setLoading] = useState(false);

  const exportData = async (options: ExportOptions, containerId?: string) => {
    setLoading(true);
    try {
      await exportAnalytics(options.format, containerId || 'analytics-content', `analytics-${new Date().toISOString()}`);
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    exportData,
    loading,
  };
} 