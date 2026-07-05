import type { ApiProduct } from '@/types/product';
import type { Product, Size } from '@/types/catalog';
import { SIZES } from '@/types/catalog';

/**
 * Translate a raw DummyJSON product into the domain `Product` used by the UI.
 *
 * Two derivations worth noting:
 *  - `compareAtPrice`: DummyJSON gives a current `price` plus a
 *    `discountPercentage`. We treat `price` as the selling price and
 *    reconstruct the original ("compare at") price so we can show a genuine
 *    strikethrough + sale tag — the one place accent colour is allowed.
 *  - `sizes`: DummyJSON has no apparel sizes, so we mock a full run. Kept
 *    deterministic (all sizes for every product) for predictable UX.
 */

// Only surface a sale when the discount is meaningful — avoids "5% off"
// noise on nearly every product.
const SALE_THRESHOLD = 8;

export function mapProduct(raw: ApiProduct): Product {
  const onSale = raw.discountPercentage >= SALE_THRESHOLD;

  const compareAtPrice = onSale
    ? roundToCents(raw.price / (1 - raw.discountPercentage / 100))
    : null;

  return {
    id: raw.id,
    title: raw.title,
    brand: raw.brand?.trim() || 'STANDARD',
    description: raw.description,
    price: raw.price,
    compareAtPrice,
    discountPercentage: raw.discountPercentage,
    onSale,
    images: raw.images.length > 0 ? raw.images : [raw.thumbnail],
    thumbnail: raw.thumbnail,
    rating: raw.rating,
    inStock: raw.stock > 0 && raw.availabilityStatus !== 'Out of Stock',
    rawCategory: raw.category,
    sizes: mockSizes(),
  };
}

export function mapProducts(raws: ApiProduct[]): Product[] {
  return raws.map(mapProduct);
}

function mockSizes(): Size[] {
  return [...SIZES];
}

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}
