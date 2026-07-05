/**
 * Order-total maths in one place so the cart drawer, checkout and confirmation
 * all agree on shipping thresholds and totals.
 */

export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING_FEE = 8;

export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export function totalsFor(subtotal: number): OrderTotals {
  const shipping = shippingFor(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}
