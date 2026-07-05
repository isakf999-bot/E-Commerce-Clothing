import { formatPrice } from '@/lib/format';
import { totalsFor } from '@/lib/pricing';
import type { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  /** Heading shown above the line items. */
  title?: string;
}

/**
 * Order line items + totals. Computes its own subtotal from the items so it
 * renders identically for the live cart and a snapshotted placed order.
 */
export function OrderSummary({ items, title = 'Order summary' }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const { shipping, total } = totalsFor(subtotal);

  return (
    <div className="border border-line">
      <div className="border-b border-line px-5 py-4">
        <h2 className="caps text-sm font-semibold">
          {title}
          <span className="text-ink-faint"> · {items.length}</span>
        </h2>
      </div>

      <ul className="divide-y divide-line px-5">
        {items.map((item) => (
          <li key={item.lineId} className="flex gap-3 py-4">
            <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-surface-muted">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <span className="caps absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-surface tabular-nums">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 justify-between gap-2">
              <div className="min-w-0">
                <p className="caps text-[10px] text-ink-faint">{item.brand}</p>
                <p className="truncate text-sm text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">Size {item.size}</p>
              </div>
              <p className="caps whitespace-nowrap text-sm tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <dl className="space-y-2 border-t border-line px-5 py-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Shipping</dt>
          <dd className="tabular-nums">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
          <dt className="caps">Total</dt>
          <dd className="caps tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
