import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const base =
  'caps inline-flex items-center justify-center gap-2 font-medium text-xs ' +
  'transition-all duration-200 ease-[var(--ease-out-soft)] ' +
  'disabled:pointer-events-none disabled:opacity-40 select-none';

const variants: Record<Variant, string> = {
  // Solid ink button — the single primary action per view.
  primary:
    'bg-ink text-surface border border-ink hover:bg-transparent hover:text-ink ' +
    'active:scale-[0.98]',
  // Outlined — secondary actions.
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-ink ' +
    'active:scale-[0.98]',
  // Text-only with an animated underline — tertiary / inline actions.
  tertiary:
    'bg-transparent text-ink border-b border-ink/40 hover:border-ink px-0 ' +
    'rounded-none tracking-normal normal-case',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4',
  md: 'h-11 px-6',
  lg: 'h-14 px-8 text-[0.8rem]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        variant !== 'tertiary' && sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
