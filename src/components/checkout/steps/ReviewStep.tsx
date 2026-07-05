import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { digitsOnly, type CheckoutFormValues } from '@/checkout/schema';
import type { CheckoutStep } from '@/checkout/useCheckoutForm';

interface ReviewStepProps {
  form: UseFormReturn<CheckoutFormValues>;
  onEdit: (step: CheckoutStep) => void;
}

/** Step 3 — review shipping + payment before placing the order. */
export function ReviewStep({ form, onEdit }: ReviewStepProps) {
  const { shipping, payment } = form.watch();
  const last4 = digitsOnly(payment.cardNumber).slice(-4);

  return (
    <div>
      <h2 className="caps mb-6 font-display text-xl font-bold text-ink">
        Review your order
      </h2>

      <div className="space-y-4">
        <ReviewBlock title="Contact & shipping" onEdit={() => onEdit('shipping')}>
          <p className="text-sm text-ink">
            {shipping.firstName} {shipping.lastName}
          </p>
          <p className="text-sm text-ink-soft">{shipping.email}</p>
          <p className="text-sm text-ink-soft">{shipping.phone}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {shipping.address}
            {shipping.apartment ? `, ${shipping.apartment}` : ''}
            <br />
            {shipping.city}, {shipping.postalCode}
            <br />
            {shipping.country}
          </p>
        </ReviewBlock>

        <ReviewBlock title="Payment" onEdit={() => onEdit('payment')}>
          <p className="text-sm text-ink">{payment.cardName}</p>
          <p className="text-sm text-ink-soft tabular-nums">
            •••• •••• •••• {last4 || '••••'}
          </p>
          <p className="text-sm text-ink-soft tabular-nums">
            Expires {payment.expiry}
          </p>
        </ReviewBlock>
      </div>
    </div>
  );
}

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border border-line p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="caps text-[11px] font-semibold text-ink-faint">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="caps text-[11px] font-medium text-ink underline-offset-4 hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}
