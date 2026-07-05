import { useQuery } from '@tanstack/react-query';
import { getProductsForGender } from '@/services/api/products';
import type { Gender, SortOption } from '@/types/catalog';

/** All products for a gender landing page, sorted. */
export function useGenderProducts(gender: Gender, sort: SortOption) {
  return useQuery({
    queryKey: ['gender-products', gender, sort],
    queryFn: () => getProductsForGender(gender, sort),
  });
}
