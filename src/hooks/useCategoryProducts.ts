import { useQuery } from '@tanstack/react-query';
import { getProductsForCategory } from '@/services/api/products';
import { queryKeys } from '@/lib/queryClient';
import type { StoreCategory, SortOption } from '@/types/catalog';

/**
 * Products for a single store category, sorted. Sorting is part of the query
 * key so switching sort is instant once each variant is cached.
 */
export function useCategoryProducts(
  category: StoreCategory | undefined,
  sort: SortOption,
) {
  return useQuery({
    queryKey: queryKeys.categoryProducts(category?.id ?? 'none', sort),
    queryFn: () => getProductsForCategory(category!, sort),
    enabled: Boolean(category),
  });
}
