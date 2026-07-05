import { AnimatePresence, motion } from 'framer-motion';
import { BagIcon } from '@/components/ui/icons';
import { useCartStore, selectCartCount } from '@/store/cartStore';

/**
 * Header cart trigger. Shows a live item count that pops when it changes,
 * giving lightweight feedback that an add-to-cart registered.
 */
export function CartButton() {
  const count = useCartStore(selectCartCount);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      className="relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-ink-soft"
    >
      <BagIcon width={22} height={22} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-surface tabular-nums"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
