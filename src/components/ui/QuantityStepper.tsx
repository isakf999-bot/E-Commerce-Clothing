import { cn } from '@/lib/cn';

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Accessible +/- quantity control. Decrement below `min` (default 1) is
 * disabled rather than silently clamped, so the boundary is visible.
 */
export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 10,
  className,
  size = 'md',
}: QuantityStepperProps) {
  const dimension = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  const width = size === 'sm' ? 'w-8' : 'w-11';

  return (
    <div
      className={cn(
        'inline-flex items-center border border-line-strong rounded-[var(--radius-sm)]',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        className={cn(
          dimension,
          'flex items-center justify-center text-ink transition-colors',
          'hover:bg-surface-muted disabled:opacity-30 disabled:hover:bg-transparent',
        )}
      >
        <span aria-hidden className="text-base leading-none">
          &minus;
        </span>
      </button>
      <span
        className={cn(
          width,
          'text-center text-sm tabular-nums select-none',
        )}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
        className={cn(
          dimension,
          'flex items-center justify-center text-ink transition-colors',
          'hover:bg-surface-muted disabled:opacity-30 disabled:hover:bg-transparent',
        )}
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
      </button>
    </div>
  );
}
