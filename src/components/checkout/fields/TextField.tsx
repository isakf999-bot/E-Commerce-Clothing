import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/cn';

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  wrapperClassName?: string;
}

/**
 * Labelled text input wired to React Hook Form. Spread order puts the
 * registration last so RHF's ref/onChange/onBlur win — except where the caller
 * intentionally wraps onChange inside the registration (card formatting).
 */
export function TextField({
  label,
  registration,
  error,
  wrapperClassName,
  ...rest
}: TextFieldProps) {
  const id = registration.name;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col', wrapperClassName)}>
      <label htmlFor={id} className="caps mb-2 text-[10px] font-semibold text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
        {...registration}
        className={cn(
          'h-11 border bg-surface px-3.5 text-sm text-ink outline-none transition-colors',
          'placeholder:text-ink-faint focus:border-ink',
          error ? 'border-sale' : 'border-line-strong hover:border-ink/60',
        )}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-sale">
          {error}
        </p>
      )}
    </div>
  );
}
