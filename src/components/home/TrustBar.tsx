import { TruckIcon, ReturnIcon, ShieldIcon } from '@/components/ui/icons';
import type { ReactNode } from 'react';

interface Trust {
  icon: ReactNode;
  title: string;
  detail: string;
}

const TRUST: Trust[] = [
  {
    icon: <TruckIcon width={22} height={22} />,
    title: 'Free shipping over $75',
    detail: 'Dispatched within 1–2 business days.',
  },
  {
    icon: <ReturnIcon width={22} height={22} />,
    title: '30-day returns',
    detail: 'Free, easy returns on unworn items.',
  },
  {
    icon: <ShieldIcon width={22} height={22} />,
    title: 'Secure checkout',
    detail: 'Your details, always protected.',
  },
];

/** Reassurance row near the top of the home page. */
export function TrustBar() {
  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:mt-24 lg:px-10">
      <div className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-3">
        {TRUST.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 bg-surface p-6"
          >
            <span className="text-ink" aria-hidden>
              {item.icon}
            </span>
            <div>
              <p className="caps text-[11px] font-semibold text-ink">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
