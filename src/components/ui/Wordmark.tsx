import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface WordmarkProps {
  className?: string;
  /** Render as a plain span (e.g. inside the footer) instead of a home link. */
  asLink?: boolean;
}

/**
 * The STANDARD wordmark. Set in the display grotesk, heavy weight, wide caps
 * tracking — an understated, Scandinavian-minimal mark in the Weekday lineage.
 * The trailing hairline period gives it a quiet, editorial finish.
 */
export function Wordmark({ className, asLink = true }: WordmarkProps) {
  const mark = (
    <span
      className={cn(
        'font-display font-extrabold tracking-[0.18em] text-ink leading-none',
        'text-xl select-none',
        className,
      )}
    >
      STANDARD<span className="text-ink-faint">.</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link to="/" aria-label="STANDARD — home" className="inline-block">
      {mark}
    </Link>
  );
}
