import { motion } from 'framer-motion';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatPrice } from '@/lib/format';
import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/types/cart';

/** A single row in the cart drawer. */
export function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 overflow-hidden py-5"
    >
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-surface-muted">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <p className="caps text-[10px] text-ink-faint">{item.brand}</p>
            <p className="truncate text-sm text-ink">{item.title}</p>
            <p className="mt-0.5 text-xs text-ink-soft">Size {item.size}</p>
          </div>
          <p className="caps whitespace-nowrap text-sm tabular-nums text-ink">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            size="sm"
            quantity={item.quantity}
            onChange={(next) => updateQuantity(item.lineId, next)}
          />
          <button
            type="button"
            onClick={() => removeItem(item.lineId)}
            className="text-xs text-ink-faint underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}
