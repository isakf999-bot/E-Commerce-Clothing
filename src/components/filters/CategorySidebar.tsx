import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import {
  GENDER_LABELS,
  getCategoriesByGender,
  categoryPath,
} from '@/catalog/categories';
import type { Gender } from '@/types/catalog';

interface CategorySidebarProps {
  gender: Gender;
  /** Slug of the active category, or undefined on the gender landing page. */
  activeSlug?: string;
}

/** Desktop category rail shown alongside listing grids. */
export function CategorySidebar({ gender, activeSlug }: CategorySidebarProps) {
  const categories = getCategoriesByGender(gender);

  return (
    <nav aria-label={`${GENDER_LABELS[gender]} categories`}>
      <h2 className="caps mb-4 text-[11px] font-semibold text-ink-faint">
        {GENDER_LABELS[gender]}
      </h2>
      <ul className="space-y-1">
        <li>
          <Link
            to={`/${gender}`}
            className={cn(
              'block py-1.5 text-sm transition-colors',
              activeSlug === undefined
                ? 'font-medium text-ink'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            All
          </Link>
        </li>
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <li key={category.id}>
              <Link
                to={categoryPath(category)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block py-1.5 text-sm transition-colors',
                  active
                    ? 'font-medium text-ink'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
