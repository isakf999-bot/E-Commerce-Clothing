import { Link } from 'react-router-dom';
import { ProductGrid, ProductGridSkeleton } from './ProductGrid';
import { CategorySidebar } from '@/components/filters/CategorySidebar';
import { MobileFilterBar } from '@/components/filters/MobileFilterBar';
import { SortSelect } from '@/components/filters/SortSelect';
import { StateMessage } from '@/components/feedback/StateMessage';
import { ChevronRightIcon } from '@/components/ui/icons';
import type { Gender, Product, SortOption } from '@/types/catalog';

interface Crumb {
  label: string;
  to?: string;
}

interface ListingViewProps {
  gender: Gender;
  activeSlug?: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

/**
 * Shared listing layout used by both the gender landing and category pages:
 * breadcrumb → title/description → filter chrome → sidebar + grid, with
 * loading, empty and error states handled in one place.
 */
export function ListingView({
  gender,
  activeSlug,
  title,
  description,
  crumbs,
  products,
  isLoading,
  isError,
  onRetry,
  sort,
  onSortChange,
}: ListingViewProps) {
  const count = products?.length ?? 0;

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="caps mb-6 flex items-center gap-1.5 text-[10px] text-ink-faint">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {crumb.to ? (
              <Link to={crumb.to} className="transition-colors hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
            {index < crumbs.length - 1 && (
              <ChevronRightIcon width={12} height={12} />
            )}
          </span>
        ))}
      </nav>

      {/* Title + description */}
      <header className="mb-8 max-w-2xl">
        <h1 className="caps font-display text-3xl font-extrabold leading-none text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
      </header>

      {/* Mobile filter/sort bar */}
      <div className="mb-6">
        <MobileFilterBar
          gender={gender}
          activeSlug={activeSlug}
          sort={sort}
          onSortChange={onSortChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <CategorySidebar gender={gender} activeSlug={activeSlug} />
          </div>
        </aside>

        {/* Main column */}
        <section>
          {/* Desktop count + sort row */}
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="caps text-[11px] text-ink-faint">
              {isLoading ? 'Loading…' : `${count} item${count === 1 ? '' : 's'}`}
            </p>
            <SortSelect value={sort} onChange={onSortChange} />
          </div>

          {isError ? (
            <StateMessage
              title="Something went wrong"
              description="We couldn't load these products. Please try again."
              action={{ label: 'Retry', onClick: onRetry }}
            />
          ) : isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : count === 0 ? (
            <StateMessage
              title="Nothing here yet"
              description="There are no products in this category right now. Try another category."
            />
          ) : (
            <ProductGrid products={products!} />
          )}
        </section>
      </div>
    </div>
  );
}
