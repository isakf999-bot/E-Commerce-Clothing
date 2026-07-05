import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { CloseIcon, BagIcon, ArrowRightIcon } from '@/components/ui/icons';
import { CartLineItem } from './CartLineItem';
import { formatPrice } from '@/lib/format';
import {
  useCartStore,
  selectCartCount,
  selectCartSubtotal,
} from '@/store/cartStore';

const FREE_SHIPPING_THRESHOLD = 75;

/** Slide-in cart. Add/remove/quantity, live subtotal, free-shipping nudge. */
export function CartDrawer() {
  const navigate = useNavigate();
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const count = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  function goToCheckout() {
    closeCart();
    navigate('/checkout');
  }

  return (
    <Drawer open={isOpen} onClose={closeCart} side="right" label="Shopping cart">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-line px-6">
        <h2 className="caps text-sm font-semibold">
          Cart{count > 0 && <span className="text-ink-faint"> ({count})</span>}
        </h2>
        <button
          type="button"
          onClick={closeCart}
          aria-label="Close cart"
          className="flex h-10 w-10 items-center justify-center text-ink"
        >
          <CloseIcon />
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyCart onClose={closeCart} />
      ) : (
        <>
          {/* Free-shipping progress */}
          <div className="border-b border-line px-6 py-4">
            <p className="mb-2 text-xs text-ink-soft">
              {remaining > 0 ? (
                <>
                  You&apos;re{' '}
                  <span className="font-medium text-ink">
                    {formatPrice(remaining)}
                  </span>{' '}
                  away from free shipping
                </>
              ) : (
                <span className="font-medium text-ink">
                  You&apos;ve unlocked free shipping.
                </span>
              )}
            </p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-sunken">
              {/* Width is data-driven, so an inline style is warranted here. */}
              <div
                className="h-full rounded-full bg-ink transition-all duration-500 ease-[var(--ease-out-soft)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartLineItem key={item.lineId} item={item} />
              ))}
            </AnimatePresence>
          </ul>

          {/* Footer / summary */}
          <div className="border-t border-line px-6 py-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="caps text-sm">Subtotal</span>
              <span className="caps text-sm tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mb-4 text-xs text-ink-faint">
              Shipping &amp; taxes calculated at checkout.
            </p>
            <Button fullWidth size="lg" onClick={goToCheckout}>
              Checkout
              <ArrowRightIcon width={16} height={16} />
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted text-ink-faint">
        <BagIcon width={26} height={26} />
      </div>
      <p className="mb-1 text-sm font-medium text-ink">Your cart is empty</p>
      <p className="mb-6 max-w-xs text-sm text-ink-soft">
        Once you add pieces you love, they&apos;ll show up here.
      </p>
      <Button variant="secondary" onClick={onClose}>
        Continue shopping
      </Button>
    </div>
  );
}
