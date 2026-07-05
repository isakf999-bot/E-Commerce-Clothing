/**
 * Formatting helpers. Currency lives here so switching locale/currency later
 * is a one-line change rather than a find-and-replace across components.
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/** e.g. 29.99 → "$29.99" */
export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

/** e.g. 0.35 → "35% off" (input is a percentage number like 35). */
export function formatDiscount(percentage: number): string {
  return `${Math.round(percentage)}% off`;
}
