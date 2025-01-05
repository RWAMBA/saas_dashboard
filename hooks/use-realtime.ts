"use client";

import { useState, useEffect } from 'react';

export function useRealtimeStats() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    currentPageViews: 0,
    lastEvents: []
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/analytics/realtime');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return stats;
} 