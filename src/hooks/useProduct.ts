import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/services/api/products';
import { queryKeys } from '@/lib/queryClient';

/** A single product by id. */
export function useProduct(id: number | undefined) {
  return useQuery({
    queryKey: queryKeys.product(id ?? -1),
    queryFn: () => getProduct(id!),
    enabled: typeof id === 'number' && Number.isFinite(id),
  });
}
