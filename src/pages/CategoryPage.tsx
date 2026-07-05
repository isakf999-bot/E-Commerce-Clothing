import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ListingView } from '@/components/product/ListingView';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import { findCategory, isGender, GENDER_LABELS } from '@/catalog/categories';
import type { SortOption } from '@/types/catalog';

/** /:gender/:category — a single indexable category listing. */
export function CategoryPage() {
  const { gender, category: slug } = useParams();
  const [sort, setSort] = useState<SortOption>('featured');

  // Resolve params to domain objects (may be undefined for bad URLs).
  const validGender = isGender(gender) ? gender : undefined;
  const category =
    validGender && slug ? findCategory(validGender, slug) : undefined;

  // Hooks must run unconditionally — the query is disabled when category is
  // undefined, so redirect decisions happen after it's called.
  const query = useCategoryProducts(category, sort);

  if (!validGender) return <Navigate to="/" replace />;
  if (!category) return <Navigate to={`/${validGender}`} replace />;

  return (
    <ListingView
      gender={validGender}
      activeSlug={category.slug}
      title={`${category.label} · ${GENDER_LABELS[validGender]}`}
      description={category.description}
      crumbs={[
        { label: 'Home', to: '/' },
        { label: GENDER_LABELS[validGender], to: `/${validGender}` },
        { label: category.label },
      ]}
      products={query.data}
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={() => query.refetch()}
      sort={sort}
      onSortChange={setSort}
    />
  );
}
