import type { CartItem } from './cart';
import type { ShippingValues } from '@/checkout/schema';

/** A completed order, snapshotted at the moment "Place order" succeeds. */
export interface PlacedOrder {
  orderNumber: string;
  placedAt: string;
  email: string;
  /** Cart contents captured before the cart is cleared. */
  items: CartItem[];
  shippingAddress: ShippingValues;
  /** Masked card, e.g. "•••• 4242". */
  cardLast4: string;
  subtotal: number;
  shipping: number;
  total: number;
}
