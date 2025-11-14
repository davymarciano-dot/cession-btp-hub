interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class APICache {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number;

  constructor(defaultTTL = 300000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  /**
   * Generate cache key from URL and options
   */
  private generateKey(url: string, options?: RequestInit): string {
    return `${url}${JSON.stringify(options || {})}`;
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry<any>, ttl: number): boolean {
    return Date.now() - entry.timestamp < ttl;
  }

  /**
   * Get cached data if available and valid
   */
  get<T>(url: string, options?: RequestInit, ttl?: number): T | null {
    const key = this.generateKey(url, options);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (!this.isValid(entry, ttl || this.defaultTTL)) {
      this.cache.delete(key);
      return null;
    }

    console.log(`Cache hit for: ${url}`);
    return entry.data;
  }

  /**
   * Set cache data
   */
  set<T>(url: string, data: T, options?: RequestInit): void {
    const key = this.generateKey(url, options);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
    console.log(`Cache set for: ${url}`);
  }

  /**
   * Clear specific cache entry
   */
  clear(url: string, options?: RequestInit): void {
    const key = this.generateKey(url, options);
    this.cache.delete(key);
    console.log(`Cache cleared for: ${url}`);
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear();
    console.log("All cache cleared");
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const apiCache = new APICache();

/**
 * Cached fetch wrapper
 * @param url - URL to fetch
 * @param options - Fetch options
 * @param ttl - Time to live in milliseconds (default: 5 minutes)
 * @returns Promise with cached or fresh data
 */
export const cachedFetch = async <T = any>(
  url: string,
  options?: RequestInit,
  ttl?: number
): Promise<T> => {
  // Try to get from cache first
  const cached = apiCache.get<T>(url, options, ttl);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  console.log(`Fetching fresh data for: ${url}`);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();

  // Cache the result
  apiCache.set(url, data, options);

  return data;
};