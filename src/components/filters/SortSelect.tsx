import { ChevronDownIcon } from '@/components/ui/icons';
import { SORT_OPTIONS } from '@/catalog/sortOptions';
import type { SortOption } from '@/types/catalog';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/**
 * Native <select> styled to match the chrome — keeps keyboard/mobile
 * behaviour and accessibility for free while looking bespoke.
 */
export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort products</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="caps h-10 cursor-pointer appearance-none border border-line-strong bg-surface pl-4 pr-10 text-xs text-ink transition-colors hover:border-ink focus:border-ink"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 text-ink-soft"
      />
    </label>
  );
}
