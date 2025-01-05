import { useState, useEffect } from 'react';
import { customerEvents } from '@/lib/events';
import type { DateRange } from '@/types';

interface CustomerMetrics {
  totalCustomers: number;
  activeSubscriptions: number;
  churnRate: string;
  growth: string;
  lastMonthCustomers: number;
}

export function useCustomerMetrics(dateRange: DateRange) {
  const [metrics, setMetrics] = useState<CustomerMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });

      const response = await fetch(`/api/customers/metrics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const unsubscribe = customerEvents.subscribe(fetchMetrics);
    return () => unsubscribe();
  }, [dateRange]);

  return { metrics, loading, refreshMetrics: fetchMetrics };
} 