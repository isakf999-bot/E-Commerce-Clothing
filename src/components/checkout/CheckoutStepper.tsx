import { CheckIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import { CHECKOUT_STEPS, type CheckoutStep } from '@/checkout/useCheckoutForm';

const STEP_LABELS: Record<CheckoutStep, string> = {
  shipping: 'Shipping',
  payment: 'Payment',
  review: 'Review',
};

/** Progress indicator across the three validated checkout steps. */
export function CheckoutStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {CHECKOUT_STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'caps flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors',
                done && 'bg-ink text-surface',
                active && 'border border-ink text-ink',
                !done && !active && 'border border-line-strong text-ink-faint',
              )}
            >
              {done ? <CheckIcon width={14} height={14} /> : index + 1}
            </span>
            <span
              className={cn(
                'caps text-[11px] font-medium transition-colors',
                active || done ? 'text-ink' : 'text-ink-faint',
              )}
            >
              {STEP_LABELS[step]}
            </span>
            {index < CHECKOUT_STEPS.length - 1 && (
              <span
                className={cn(
                  'mx-1 hidden h-px flex-1 sm:block',
                  done ? 'bg-ink' : 'bg-line-strong',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
