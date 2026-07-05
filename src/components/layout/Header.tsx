import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Wordmark } from '@/components/ui/Wordmark';
import { CartButton } from '@/components/cart/CartButton';
import { MobileNav } from './MobileNav';
import { MenuIcon } from '@/components/ui/icons';
import {
  GENDERS,
  GENDER_LABELS,
  getCategoriesByGender,
  categoryPath,
} from '@/catalog/categories';
import { cn } from '@/lib/cn';
import type { Gender } from '@/types/catalog';

/**
 * Sticky site header. Three-part layout echoing the classic Weekday chrome:
 * primary nav left, centred wordmark, cart right. Women/Men reveal an
 * integrated hover dropdown of their categories (not detached icon menus).
 *
 * Extension points (stretch goals): a search trigger and account/wishlist
 * entries would sit in the right cluster beside the cart.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="caps flex h-8 items-center justify-center bg-ink px-4 text-center text-[10px] font-medium text-surface">
        Complimentary shipping over $75 · 30-day returns
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
          {/* Left — primary nav (desktop) / hamburger (mobile) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="-ml-2 flex h-10 w-10 items-center justify-center text-ink lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon width={22} height={22} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {GENDERS.map((gender) => (
                <NavDropdown key={gender} gender={gender} />
              ))}
            </nav>
          </div>

          {/* Center — wordmark */}
          <div className="flex justify-center">
            <Wordmark />
          </div>

          {/* Right — cart */}
          <div className="flex items-center justify-end">
            <CartButton />
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/** A single top-level nav item (Women / Men) with an integrated hover panel. */
function NavDropdown({ gender }: { gender: Gender }) {
  const [open, setOpen] = useState(false);
  const categories = getCategoriesByGender(gender);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={`/${gender}`}
        className={({ isActive }) =>
          cn(
            'caps flex h-16 items-center text-xs font-medium transition-colors',
            'border-b-2 border-transparent',
            isActive ? 'text-ink border-ink' : 'text-ink-soft hover:text-ink',
          )
        }
      >
        {GENDER_LABELS[gender]}
      </NavLink>

      {/* Hover dropdown */}
      <div
        className={cn(
          'absolute left-0 top-full min-w-56 border border-line bg-surface p-2 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)] transition-all duration-200',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <p className="caps px-3 pb-2 pt-1 text-[10px] font-semibold text-ink-faint">
          Shop {GENDER_LABELS[gender]}
        </p>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={categoryPath(category)}
            className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
