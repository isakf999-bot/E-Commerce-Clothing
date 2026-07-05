import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';

interface PriceProps {
  price: number;
  compareAtPrice?: number | null;
  className?: string;
  /** Larger treatment for the product detail page. */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

/**
 * Price display. When on sale, shows the current price in the accent colour
 * with the original struck through beside it — the one sanctioned use of the
 * sale accent.
 */
export function Price({
  price,
  compareAtPrice,
  className,
  size = 'md',
}: PriceProps) {
  const onSale = compareAtPrice != null && compareAtPrice > price;

  return (
    <span className={cn('caps inline-flex items-baseline gap-2', sizeClasses[size], className)}>
      <span className={cn('tabular-nums', onSale && 'text-sale')}>
        {formatPrice(price)}
      </span>
      {onSale && (
        <span className="text-ink-faint line-through tabular-nums text-[0.85em] font-normal">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </span>
  );
}
