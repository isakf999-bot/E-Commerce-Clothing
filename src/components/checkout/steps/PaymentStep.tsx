import type { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';
import { TextField } from '../fields/TextField';
import { ShieldIcon } from '@/components/ui/icons';
import type { CheckoutFormValues } from '@/checkout/schema';

/** Group a card number into blocks of four, digits only. */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

/** Auto-insert the slash in an MM/YY expiry. */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvc(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4);
}

/** Step 2 — payment details (validated only; no real processing). */
export function PaymentStep({
  form,
}: {
  form: UseFormReturn<CheckoutFormValues>;
}) {
  const { register, formState } = form;
  const errors = formState.errors.payment;

  // Wrap each registration's onChange to reformat the value as the user types.
  // Return type is annotated so `event` picks up RHF's ChangeHandler signature.
  const withFormatter = (
    name: 'payment.cardNumber' | 'payment.expiry' | 'payment.cvc',
    formatter: (value: string) => string,
  ): UseFormRegisterReturn => {
    const registration = register(name);
    return {
      ...registration,
      onChange: (event) => {
        event.target.value = formatter(event.target.value);
        return registration.onChange(event);
      },
    };
  };

  return (
    <fieldset>
      <legend className="caps mb-6 font-display text-xl font-bold text-ink">
        Payment
      </legend>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Name on card"
          autoComplete="cc-name"
          wrapperClassName="sm:col-span-2"
          registration={register('payment.cardName')}
          error={errors?.cardName?.message}
        />
        <TextField
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          maxLength={23}
          wrapperClassName="sm:col-span-2"
          registration={withFormatter('payment.cardNumber', formatCardNumber)}
          error={errors?.cardNumber?.message}
        />
        <TextField
          label="Expiry (MM/YY)"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="08/28"
          maxLength={5}
          registration={withFormatter('payment.expiry', formatExpiry)}
          error={errors?.expiry?.message}
        />
        <TextField
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={4}
          registration={withFormatter('payment.cvc', formatCvc)}
          error={errors?.cvc?.message}
        />
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
        <ShieldIcon width={16} height={16} className="text-ink" />
        Demo store — no real payment is processed. Try{' '}
        <span className="tabular-nums text-ink">4242 4242 4242 4242</span>.
      </p>
    </fieldset>
  );
}
