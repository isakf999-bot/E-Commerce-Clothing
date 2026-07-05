import { cn } from '@/lib/cn';
import type { Size } from '@/types/catalog';

interface SizeSelectorProps {
  sizes: Size[];
  value: Size | null;
  onChange: (size: Size) => void;
  /** When true, highlights the control to prompt a selection. */
  error?: boolean;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  error,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="caps text-[11px] font-semibold text-ink">Size</span>
      </div>
      <div
        role="radiogroup"
        aria-label="Select a size"
        className="flex flex-wrap gap-2"
      >
        {sizes.map((size) => {
          const selected = size === value;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(size)}
              className={cn(
                'caps h-11 min-w-11 px-3 text-xs font-medium transition-all duration-150',
                'border',
                selected
                  ? 'border-ink bg-ink text-surface'
                  : 'border-line-strong text-ink hover:border-ink',
                error && !value && 'border-sale',
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error && !value && (
        <p className="mt-2 text-xs text-sale">Please select a size.</p>
      )}
    </div>
  );
}
