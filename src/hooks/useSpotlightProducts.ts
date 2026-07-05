import { useQuery } from '@tanstack/react-query';
import { getSpotlightProducts } from '@/services/api/products';
import { queryKeys } from '@/lib/queryClient';

/** Curated pool of products for home-page rails. */
export function useSpotlightProducts() {
  return useQuery({
    queryKey: queryKeys.spotlight,
    queryFn: getSpotlightProducts,
  });
}
