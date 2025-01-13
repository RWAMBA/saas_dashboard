import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/track';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view with stringified query params
    trackEvent('page_view', {
      path: pathname,
      query: JSON.stringify(Object.fromEntries(searchParams.entries())), // Convert object to string
    });
  }, [pathname, searchParams]);

  return {
    trackEvent,
  };
} 