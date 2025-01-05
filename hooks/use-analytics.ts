import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/track';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      path: pathname,
      query: Object.fromEntries(searchParams.entries()),
    });
  }, [pathname, searchParams]);

  return {
    trackEvent,
  };
} 