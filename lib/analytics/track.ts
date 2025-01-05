type EventProperties = Record<string, any>;

export async function trackEvent(
  name: string,
  properties?: EventProperties
) {
  try {
    const sessionId = getOrCreateSessionId();
    
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        properties,
        path: window.location.pathname,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track event');
    }

    return response.json();
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Helper to manage session IDs
function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
} 