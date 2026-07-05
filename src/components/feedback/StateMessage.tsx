import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface StateMessageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
}

/** Shared presentational block for empty and error states. */
export function StateMessage({
  title,
  description,
  icon,
  action,
}: StateMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-ink-faint">
          {icon}
        </div>
      )}
      <h2 className="caps text-sm font-semibold text-ink">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>
      )}
      {action && (
        <Button variant="secondary" className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
