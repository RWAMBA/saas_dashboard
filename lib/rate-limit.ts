interface RateLimitWindow {
  timestamp: number;
  count: number;
}

const rateLimitWindows = new Map<string, RateLimitWindow>();

export class RateLimit {
  private windowMs: number;
  private maxRequests: number;

  constructor(maxRequests: number, windowMs: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async isLimited(identifier: string): Promise<boolean> {
    const now = Date.now();
    const window = rateLimitWindows.get(identifier);

    // Clean up old entries
    if (window && now - window.timestamp > this.windowMs) {
      rateLimitWindows.delete(identifier);
    }

    if (!window) {
      // First request in window
      rateLimitWindows.set(identifier, {
        timestamp: now,
        count: 1
      });
      return false;
    }

    if (window.count >= this.maxRequests) {
      return true;
    }

    // Increment counter
    window.count += 1;
    return false;
  }
}

// Export a default instance
export const rateLimit = new RateLimit(10, 10 * 1000); // 10 requests per 10 seconds 