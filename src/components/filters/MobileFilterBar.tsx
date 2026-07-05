import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { CloseIcon, CheckIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import {
  GENDER_LABELS,
  getCategoriesByGender,
  categoryPath,
} from '@/catalog/categories';
import { SORT_OPTIONS } from '@/catalog/sortOptions';
import type { Gender, SortOption } from '@/types/catalog';

interface MobileFilterBarProps {
  gender: Gender;
  activeSlug?: string;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

/**
 * Mobile-only control row: two buttons opening bottom-sheet panels for
 * category and sort. Keeps the listing header uncluttered on small screens.
 */
export function MobileFilterBar({
  gender,
  activeSlug,
  sort,
  onSortChange,
}: MobileFilterBarProps) {
  const [panel, setPanel] = useState<'category' | 'sort' | null>(null);
  const categories = getCategoriesByGender(gender);
  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Featured';

  return (
    <div className="lg:hidden">
      <div className="grid grid-cols-2 border-y border-line">
        <button
          type="button"
          onClick={() => setPanel('category')}
          className="caps border-r border-line py-3 text-xs font-medium text-ink"
        >
          Category
        </button>
        <button
          type="button"
          onClick={() => setPanel('sort')}
          className="caps py-3 text-xs font-medium text-ink"
        >
          Sort · {activeSortLabel}
        </button>
      </div>

      {/* Category sheet */}
      <Drawer
        open={panel === 'category'}
        onClose={() => setPanel(null)}
        side="bottom"
        label="Filter by category"
      >
        <SheetHeader
          title={`${GENDER_LABELS[gender]} categories`}
          onClose={() => setPanel(null)}
        />
        <ul className="overflow-y-auto px-2 pb-8">
          <SheetLink to={`/${gender}`} label="All" active={activeSlug === undefined} onNavigate={() => setPanel(null)} />
          {categories.map((category) => (
            <SheetLink
              key={category.id}
              to={categoryPath(category)}
              label={category.label}
              active={category.slug === activeSlug}
              onNavigate={() => setPanel(null)}
            />
          ))}
        </ul>
      </Drawer>

      {/* Sort sheet */}
      <Drawer
        open={panel === 'sort'}
        onClose={() => setPanel(null)}
        side="bottom"
        label="Sort products"
      >
        <SheetHeader title="Sort by" onClose={() => setPanel(null)} />
        <ul className="px-2 pb-8">
          {SORT_OPTIONS.map((option) => {
            const active = option.value === sort;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setPanel(null);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-[var(--radius-sm)] px-4 py-3 text-left text-sm transition-colors hover:bg-surface-muted',
                    active ? 'font-medium text-ink' : 'text-ink-soft',
                  )}
                >
                  {option.label}
                  {active && <CheckIcon width={16} height={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
}

function SheetHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-4">
      <h2 className="caps text-sm font-semibold">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex h-9 w-9 items-center justify-center text-ink"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function SheetLink({
  to,
  label,
  active,
  onNavigate,
}: {
  to: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        to={to}
        onClick={onNavigate}
        className={cn(
          'flex items-center justify-between rounded-[var(--radius-sm)] px-4 py-3 text-sm transition-colors hover:bg-surface-muted',
          active ? 'font-medium text-ink' : 'text-ink-soft',
        )}
      >
        {label}
        {active && <CheckIcon width={16} height={16} />}
      </Link>
    </li>
  );
}
