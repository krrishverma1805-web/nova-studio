const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('nova_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('nova_session_id', sessionId);
  }
  return sessionId;
};

// Track event helper for client page visits and CTA clicks
export const trackEvent = async (
  eventType: string,
  element: string,
  page?: string
): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        page: page || window.location.pathname,
        element,
        sessionId: getSessionId(),
      }),
    });
  } catch {
    // Silently fail — analytics should never break the user experience
  }
};
