import type { Size } from './catalog';

/**
 * A single line in the cart. Identity is (productId + size): the same product
 * in two different sizes is two distinct lines, but adding the same
 * product+size again just increments quantity.
 */
export interface CartItem {
  /** Composite id: `${productId}-${size}`. */
  lineId: string;
  productId: number;
  title: string;
  brand: string;
  image: string;
  /** Unit price at time of adding (USD). */
  price: number;
  size: Size;
  quantity: number;
}
