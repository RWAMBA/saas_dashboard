"use client";

import { useState, useEffect } from 'react';

interface RealtimeStats {
  activeUsers: number;
  currentPageViews: number;
  lastEvents: Array<{
    id: string;
    name: string;
    timestamp: string;
    path: string;
  }>;
}

export function useRealtimePolling(interval = 30000) { // 30 seconds default
  const [stats, setStats] = useState<RealtimeStats>({
    activeUsers: 0,
    currentPageViews: 0,
    lastEvents: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/realtime');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching realtime stats:', error);
      }
    };

    // Initial fetch
    fetchStats();

    // Set up polling
    const pollInterval = setInterval(fetchStats, interval);

    return () => clearInterval(pollInterval);
  }, [interval]);

  return stats;
} 