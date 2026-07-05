import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ListingView } from '@/components/product/ListingView';
import { useGenderProducts } from '@/hooks/useGenderProducts';
import { isGender, GENDER_LABELS } from '@/catalog/categories';
import type { Gender, SortOption } from '@/types/catalog';

const GENDER_INTRO: Record<Gender, string> = {
  women:
    'The full women’s edit — tops, dresses, footwear and finishing pieces, in one restrained palette.',
  men: 'The full men’s edit — shirting, footwear and considered accessories built to last.',
};

/** /:gender — landing page showing every product for a gender. */
export function GenderPage() {
  const { gender } = useParams();
  const [sort, setSort] = useState<SortOption>('featured');

  const validGender = isGender(gender) ? gender : undefined;
  const query = useGenderProducts(validGender ?? 'women', sort);

  if (!validGender) return <Navigate to="/" replace />;

  return (
    <ListingView
      gender={validGender}
      title={GENDER_LABELS[validGender]}
      description={GENDER_INTRO[validGender]}
      crumbs={[{ label: 'Home', to: '/' }, { label: GENDER_LABELS[validGender] }]}
      products={query.data}
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={() => query.refetch()}
      sort={sort}
      onSortChange={setSort}
    />
  );
}
