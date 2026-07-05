/**
 * Domain types used throughout the UI. These are what components consume —
 * decoupled from the DummyJSON wire format so the data source could be
 * swapped without touching the presentation layer.
 */

export type Gender = 'women' | 'men';

/** Mocked apparel sizes (DummyJSON has no real size data). */
export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = (typeof SIZES)[number];

/**
 * A clean, store-facing category. One store category may aggregate several
 * raw DummyJSON categories (e.g. "Shoes" ← mens-shoes + womens-shoes).
 */
export interface StoreCategory {
  /** Stable id, unique across the whole store, e.g. "women-dresses". */
  id: string;
  /** URL slug within a gender, e.g. "dresses" → /women/dresses. */
  slug: string;
  /** Display label, e.g. "Dresses". */
  label: string;
  gender: Gender;
  /** Raw DummyJSON category slugs this store category pulls from. */
  rawCategories: string[];
  /** Short editorial blurb shown on the listing page. */
  description: string;
}

/** A product after mapping — the shape every component works with. */
export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  /** Current selling price (USD). */
  price: number;
  /** Original price before discount, when on sale; otherwise null. */
  compareAtPrice: number | null;
  discountPercentage: number;
  onSale: boolean;
  images: string[];
  thumbnail: string;
  rating: number;
  inStock: boolean;
  /** Raw DummyJSON category slug the product came from. */
  rawCategory: string;
  /** Available mocked sizes. */
  sizes: Size[];
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface SortConfig {
  value: SortOption;
  label: string;
}
