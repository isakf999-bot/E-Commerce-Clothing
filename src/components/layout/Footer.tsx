import { Link } from 'react-router-dom';
import { Wordmark } from '@/components/ui/Wordmark';
import {
  GENDERS,
  GENDER_LABELS,
  getCategoriesByGender,
  categoryPath,
} from '@/catalog/categories';

/**
 * Site footer — treated with the same care as the rest of the page: a proper
 * link directory grouped by gender, a brand statement, and a fine-print row.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand statement */}
          <div className="col-span-2 md:col-span-1">
            <Wordmark asLink={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Considered wardrobe essentials. Made to be worn, not noticed —
              a quiet, lasting standard.
            </p>
          </div>

          {/* Category directories */}
          {GENDERS.map((gender) => (
            <div key={gender}>
              <h3 className="caps mb-4 text-[11px] font-semibold text-ink-faint">
                {GENDER_LABELS[gender]}
              </h3>
              <ul className="space-y-2.5">
                {getCategoriesByGender(gender).map((category) => (
                  <li key={category.id}>
                    <Link
                      to={categoryPath(category)}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Help */}
          <div>
            <h3 className="caps mb-4 text-[11px] font-semibold text-ink-faint">
              Help
            </h3>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>Shipping &amp; returns</li>
              <li>Size guide</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="caps mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[10px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} STANDARD. All rights reserved.</span>
          <span>A frontend portfolio project · Data by DummyJSON</span>
        </div>
      </div>
    </footer>
  );
}
