/**
 * Raw shapes returned by the DummyJSON API.
 * These mirror the wire format exactly and should never leak into UI
 * components — they are translated into domain types (see `types/catalog.ts`)
 * by the mapping layer in `src/catalog`.
 */

export interface ApiProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  availabilityStatus: string;
  reviews: ApiProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiCategory {
  slug: string;
  name: string;
  url: string;
}
