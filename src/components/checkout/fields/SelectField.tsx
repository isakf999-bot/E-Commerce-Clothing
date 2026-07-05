import type { UseFormRegisterReturn } from 'react-hook-form';
import { ChevronDownIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

interface SelectFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  options: readonly string[];
  error?: string;
  wrapperClassName?: string;
}

/** Labelled select wired to React Hook Form, styled to match TextField. */
export function SelectField({
  label,
  registration,
  options,
  error,
  wrapperClassName,
}: SelectFieldProps) {
  const id = registration.name;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col', wrapperClassName)}>
      <label htmlFor={id} className="caps mb-2 text-[10px] font-semibold text-ink-soft">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...registration}
          className={cn(
            'h-11 w-full cursor-pointer appearance-none border bg-surface pl-3.5 pr-10 text-sm text-ink outline-none transition-colors focus:border-ink',
            error ? 'border-sale' : 'border-line-strong hover:border-ink/60',
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          width={16}
          height={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-sale">
          {error}
        </p>
      )}
    </div>
  );
}
