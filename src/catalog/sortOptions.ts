import type { SortConfig, SortOption } from '@/types/catalog';

/** The sort options offered on listing pages, in menu order. */
export const SORT_OPTIONS: SortConfig[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

export function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}
