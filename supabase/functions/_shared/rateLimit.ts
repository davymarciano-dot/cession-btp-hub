// Simple in-memory rate limiter for edge functions
// For production, consider using Upstash Redis or similar

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const requestLog = new Map<string, number[]>();

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP, user ID, session ID)
 * @param config - Rate limit configuration
 * @returns true if rate limit exceeded
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 10 }
): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = requestLog.get(identifier) || [];
  
  // Clean old requests outside the window
  const recentRequests = requests.filter(time => now - time < config.windowMs);
  
  if (recentRequests.length >= config.maxRequests) {
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((oldestRequest + config.windowMs - now) / 1000);
    return { limited: true, retryAfter };
  }
  
  // Add current request
  recentRequests.push(now);
  requestLog.set(identifier, recentRequests);
  
  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    cleanupOldEntries(now, config.windowMs);
  }
  
  return { limited: false };
}

function cleanupOldEntries(now: number, windowMs: number) {
  for (const [key, timestamps] of requestLog.entries()) {
    const validTimestamps = timestamps.filter(time => now - time < windowMs);
    if (validTimestamps.length === 0) {
      requestLog.delete(key);
    } else {
      requestLog.set(key, validTimestamps);
    }
  }
}

/**
 * Extract client IP from request
 */
export function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         req.headers.get('x-real-ip') ||
         'unknown';
}
