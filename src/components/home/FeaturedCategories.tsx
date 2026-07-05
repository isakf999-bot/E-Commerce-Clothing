import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowRightIcon } from '@/components/ui/icons';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import {
  FEATURED_CATEGORY_IDS,
  findCategoryById,
  categoryPath,
  GENDER_LABELS,
} from '@/catalog/categories';
import type { StoreCategory } from '@/types/catalog';

/** Home-page grid of curated categories, each previewed by its top product. */
export function FeaturedCategories() {
  const categories = FEATURED_CATEGORY_IDS.map(findCategoryById).filter(
    (category): category is StoreCategory => Boolean(category),
  );

  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="caps font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Shop by category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.06}>
            <FeaturedCategoryCard category={category} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategoryCard({ category }: { category: StoreCategory }) {
  const { data, isLoading } = useCategoryProducts(category, 'featured');
  const image = data?.[0]?.images[0];

  return (
    <Link to={categoryPath(category)} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
        {isLoading || !image ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <span className="caps bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink">
            {category.label}
          </span>
          <span className="flex h-8 w-8 translate-x-1 items-center justify-center bg-ink text-surface opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowRightIcon width={15} height={15} />
          </span>
        </div>
      </div>
      <p className="caps mt-2 text-[10px] text-ink-faint">
        {GENDER_LABELS[category.gender]}
      </p>
    </Link>
  );
}
