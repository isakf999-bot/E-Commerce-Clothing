import { Link } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { CloseIcon } from '@/components/ui/icons';
import { Wordmark } from '@/components/ui/Wordmark';
import {
  GENDERS,
  GENDER_LABELS,
  getCategoriesByGender,
  categoryPath,
} from '@/catalog/categories';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/** Slide-in navigation for mobile — full category tree grouped by gender. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Drawer open={open} onClose={onClose} side="left" label="Menu">
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center text-ink"
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-6">
        {GENDERS.map((gender) => (
          <div key={gender} className="mb-8">
            <Link
              to={`/${gender}`}
              onClick={onClose}
              className="caps mb-3 block font-display text-lg font-bold text-ink"
            >
              {GENDER_LABELS[gender]}
            </Link>
            <ul className="space-y-1">
              {getCategoriesByGender(gender).map((category) => (
                <li key={category.id}>
                  <Link
                    to={categoryPath(category)}
                    onClick={onClose}
                    className="block py-1.5 text-ink-soft transition-colors hover:text-ink"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Drawer>
  );
}
