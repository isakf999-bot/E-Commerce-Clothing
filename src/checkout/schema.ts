import { z } from 'zod';

/**
 * Checkout validation — the single source of truth for what a valid order
 * looks like. Kept free of any React/UI concerns so it can be unit-tested or
 * reused (e.g. server-side) in isolation.
 */

export const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Sweden',
  'Germany',
  'Australia',
] as const;

/** Strip formatting spaces from a card number. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Luhn checksum — the standard card-number sanity check. */
function passesLuhn(cardNumber: string): boolean {
  const digits = digitsOnly(cardNumber);
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return digits.length > 0 && sum % 10 === 0;
}

/** MM/YY has not yet passed. */
function notExpired(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  return endOfMonth.getTime() >= now.getTime();
}

export const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(6, 'Enter a valid phone number'),
  address: z.string().min(1, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(3, 'Enter a valid postal code'),
  country: z.enum(COUNTRIES, { message: 'Select a country' }),
});

export const paymentSchema = z.object({
  cardName: z.string().min(1, 'Name on card is required'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .refine((v) => /^\d{13,19}$/.test(digitsOnly(v)), 'Enter a valid card number')
    .refine((v) => passesLuhn(v), 'Enter a valid card number'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY')
    .refine(notExpired, 'Card has expired'),
  cvc: z.string().regex(/^\d{3,4}$/, 'Enter a valid CVC'),
});

export const checkoutSchema = z.object({
  shipping: shippingSchema,
  payment: paymentSchema,
});

export type ShippingValues = z.infer<typeof shippingSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/** Empty defaults for the form. Country pre-selected to a valid enum member. */
export const checkoutDefaults: CheckoutFormValues = {
  shipping: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United States',
  },
  payment: {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  },
};
