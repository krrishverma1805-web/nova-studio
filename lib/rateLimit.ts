// In-memory token bucket rate limiter.
// NOTE: This resets on every serverless cold start. In production, replace this
// with a persistent store like Redis (e.g. Upstash @upstash/ratelimit) so that
// rate limits survive function restarts and work across multiple instances.

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, TokenBucket>();

interface RateLimitConfig {
  maxTokens: number;
  refillIntervalMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxTokens: 5,
  refillIntervalMs: 15 * 60 * 1000, // 15 minutes
};

export const rateLimit = (
  key: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { success: boolean; remaining: number } => {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket) {
    buckets.set(key, { tokens: config.maxTokens - 1, lastRefill: now });
    return { success: true, remaining: config.maxTokens - 1 };
  }

  // Refill tokens if enough time has passed
  const elapsed = now - bucket.lastRefill;
  if (elapsed >= config.refillIntervalMs) {
    bucket.tokens = config.maxTokens;
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return { success: false, remaining: 0 };
  }

  bucket.tokens -= 1;
  return { success: true, remaining: bucket.tokens };
};
