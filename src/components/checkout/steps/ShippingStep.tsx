import type { UseFormReturn } from 'react-hook-form';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { COUNTRIES, type CheckoutFormValues } from '@/checkout/schema';

/** Step 1 — shipping details. */
export function ShippingStep({
  form,
}: {
  form: UseFormReturn<CheckoutFormValues>;
}) {
  const { register, formState } = form;
  const errors = formState.errors.shipping;

  return (
    <fieldset>
      <legend className="caps mb-6 font-display text-xl font-bold text-ink">
        Shipping details
      </legend>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          autoComplete="given-name"
          registration={register('shipping.firstName')}
          error={errors?.firstName?.message}
        />
        <TextField
          label="Last name"
          autoComplete="family-name"
          registration={register('shipping.lastName')}
          error={errors?.lastName?.message}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          registration={register('shipping.email')}
          error={errors?.email?.message}
        />
        <TextField
          label="Phone"
          type="tel"
          autoComplete="tel"
          registration={register('shipping.phone')}
          error={errors?.phone?.message}
        />
        <TextField
          label="Address"
          autoComplete="address-line1"
          wrapperClassName="sm:col-span-2"
          registration={register('shipping.address')}
          error={errors?.address?.message}
        />
        <TextField
          label="Apartment, suite, etc. (optional)"
          autoComplete="address-line2"
          wrapperClassName="sm:col-span-2"
          registration={register('shipping.apartment')}
          error={errors?.apartment?.message}
        />
        <TextField
          label="City"
          autoComplete="address-level2"
          registration={register('shipping.city')}
          error={errors?.city?.message}
        />
        <TextField
          label="Postal code"
          autoComplete="postal-code"
          registration={register('shipping.postalCode')}
          error={errors?.postalCode?.message}
        />
        <SelectField
          label="Country"
          wrapperClassName="sm:col-span-2"
          options={COUNTRIES}
          registration={register('shipping.country')}
          error={errors?.country?.message}
        />
      </div>
    </fieldset>
  );
}
