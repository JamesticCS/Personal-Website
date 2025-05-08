export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number;    // Max requests per interval
}

interface ClientRateLimitInfo {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, you might want to use Redis or another persistent store
const rateLimitStore = new Map<string, ClientRateLimitInfo>();

export default function rateLimit(ip: string, config: RateLimitConfig): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const clientInfo = rateLimitStore.get(ip) || { count: 0, resetTime: now + config.interval };
  
  // Reset count if interval has passed
  if (now > clientInfo.resetTime) {
    clientInfo.count = 0;
    clientInfo.resetTime = now + config.interval;
  }

  // Increment count and check against limit
  clientInfo.count += 1;
  const isRateLimited = clientInfo.count > config.limit;
  
  // Store updated info
  rateLimitStore.set(ip, clientInfo);
  
  return {
    success: !isRateLimited,
    limit: config.limit,
    remaining: Math.max(0, config.limit - clientInfo.count),
    reset: clientInfo.resetTime,
  };
}

// Clean up expired entries periodically (optional but recommended)
setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of rateLimitStore.entries()) {
    if (now > info.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000); // Clean up every minute