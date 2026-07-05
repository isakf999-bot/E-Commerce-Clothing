import { cn } from '@/lib/cn';

/**
 * Base skeleton block. Uses a subtle shimmer so loading states echo the final
 * layout rather than showing a spinner (per the design brief).
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface-sunken rounded-[var(--radius-sm)]',
        className,
      )}
    />
  );
}
