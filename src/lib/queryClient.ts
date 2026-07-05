import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client. Product data is effectively static during a
 * session, so we cache aggressively and disable refetch-on-focus to avoid
 * needless network chatter.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/** Centralised query keys — keeps cache invalidation consistent. */
export const queryKeys = {
  categories: ['categories'] as const,
  categoryProducts: (categoryId: string, sort: string) =>
    ['category-products', categoryId, sort] as const,
  product: (id: number) => ['product', id] as const,
  spotlight: ['spotlight'] as const,
};
