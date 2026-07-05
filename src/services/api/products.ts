import { apiGet } from './client';
import type { ApiProduct, ApiProductsResponse } from '@/types/product';
import type { Gender, Product, StoreCategory, SortOption } from '@/types/catalog';
import { mapProduct, mapProducts } from '@/catalog/mapProduct';
import { getCategoriesByGender } from '@/catalog/categories';

/**
 * Product service — dedicated data-access layer over DummyJSON.
 * Returns domain types (`Product`), never raw API shapes.
 */

// DummyJSON caps a category at ~50 items; our fashion categories are small,
// but we request a generous limit so nothing is silently truncated.
const CATEGORY_LIMIT = 100;

/** Fetch and map every product for a single raw DummyJSON category. */
async function getProductsByRawCategory(raw: string): Promise<Product[]> {
  const data = await apiGet<ApiProductsResponse>(
    `/products/category/${raw}`,
    { limit: CATEGORY_LIMIT },
  );
  return mapProducts(data.products);
}

/**
 * Fetch all products for a store category, merging every raw source it maps
 * to (e.g. "Shoes" pulls both mens-shoes and womens-shoes) and de-duplicating
 * by product id.
 */
export async function getProductsForCategory(
  category: StoreCategory,
  sort: SortOption = 'featured',
): Promise<Product[]> {
  const batches = await Promise.all(
    category.rawCategories.map(getProductsByRawCategory),
  );

  const byId = new Map<number, Product>();
  for (const batch of batches) {
    for (const product of batch) byId.set(product.id, product);
  }

  return sortProducts([...byId.values()], sort);
}

/**
 * All products for a gender — merges every raw category across all of that
 * gender's store categories, de-duplicated by id. Powers the /women and /men
 * landing grids.
 */
export async function getProductsForGender(
  gender: Gender,
  sort: SortOption = 'featured',
): Promise<Product[]> {
  const rawCategories = [
    ...new Set(
      getCategoriesByGender(gender).flatMap((category) => category.rawCategories),
    ),
  ];

  const batches = await Promise.all(rawCategories.map(getProductsByRawCategory));

  const byId = new Map<number, Product>();
  for (const batch of batches) {
    for (const product of batch) byId.set(product.id, product);
  }

  return sortProducts([...byId.values()], sort);
}

/** Fetch a single product by id, mapped to the domain type. */
export async function getProduct(id: number): Promise<Product> {
  const raw = await apiGet<ApiProduct>(`/products/${id}`);
  return mapProduct(raw);
}

/**
 * A small, curated pool used for home-page featured rails and "you may also
 * like" style rows. Pulls a couple of strong fashion categories.
 */
export async function getSpotlightProducts(): Promise<Product[]> {
  const [dresses, shirts] = await Promise.all([
    getProductsByRawCategory('womens-dresses'),
    getProductsByRawCategory('mens-shirts'),
  ]);
  return [...dresses, ...shirts];
}

/** Client-side sort — DummyJSON's sort params are unreliable for our needs. */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'newest':
      // No real timestamps in the mapped type; id is a stable proxy for
      // recency in DummyJSON (higher id = added later).
      return list.sort((a, b) => b.id - a.id);
    case 'featured':
    default:
      return list.sort((a, b) => b.rating - a.rating);
  }
}
