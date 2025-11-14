import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { cachedFetch } from "@/lib/apiCache";

/**
 * Custom hook that combines React Query with API caching
 * @param queryKey - React Query key
 * @param url - URL to fetch
 * @param options - Fetch options
 * @param queryOptions - React Query options
 */
export const useCachedQuery = <T = any>(
  queryKey: string[],
  url: string,
  options?: RequestInit,
  queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T>({
    queryKey,
    queryFn: () => cachedFetch<T>(url, options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...queryOptions,
  });
};