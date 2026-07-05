import type { Gender, StoreCategory } from '@/types/catalog';

/**
 * Category-mapping module — the single place that translates DummyJSON's raw
 * categories into STANDARD's clean, gender-split clothing categories.
 *
 * DummyJSON only has real product data for a handful of fashion categories,
 * so every store category below is backed by genuine products + imagery.
 * To re-map the store later, edit only this file.
 */

export const STORE_CATEGORIES: StoreCategory[] = [
  // — Women —
  {
    id: 'women-tops',
    slug: 'tops',
    label: 'Tops',
    gender: 'women',
    rawCategories: ['tops'],
    description:
      'Everyday tops cut from considered fabrics — the quiet backbone of a working wardrobe.',
  },
  {
    id: 'women-dresses',
    slug: 'dresses',
    label: 'Dresses',
    gender: 'women',
    rawCategories: ['womens-dresses'],
    description:
      'Clean silhouettes for day and evening, in a restrained, wear-anywhere palette.',
  },
  {
    id: 'women-shoes',
    slug: 'shoes',
    label: 'Shoes',
    gender: 'women',
    rawCategories: ['womens-shoes'],
    description: 'Footwear that grounds an outfit — built to be worn on repeat.',
  },
  {
    id: 'women-bags',
    slug: 'bags',
    label: 'Bags',
    gender: 'women',
    rawCategories: ['womens-bags'],
    description: 'Carry-everything shapes with nothing extraneous.',
  },
  {
    id: 'women-jewellery',
    slug: 'jewellery',
    label: 'Jewellery',
    gender: 'women',
    rawCategories: ['womens-jewellery'],
    description: 'Fine, understated pieces meant to be layered and lived in.',
  },
  {
    id: 'women-watches',
    slug: 'watches',
    label: 'Watches',
    gender: 'women',
    rawCategories: ['womens-watches'],
    description: 'Precise, pared-back timepieces.',
  },
  {
    id: 'women-sunglasses',
    slug: 'sunglasses',
    label: 'Sunglasses',
    gender: 'women',
    rawCategories: ['sunglasses'],
    description: 'Frames that finish a look without asking for attention.',
  },

  // — Men —
  {
    id: 'men-shirts',
    slug: 'shirts',
    label: 'Shirts',
    gender: 'men',
    rawCategories: ['mens-shirts'],
    description:
      'Shirting with a considered cut — from crisp poplin to relaxed weekend weaves.',
  },
  {
    id: 'men-shoes',
    slug: 'shoes',
    label: 'Shoes',
    gender: 'men',
    rawCategories: ['mens-shoes'],
    description: 'Footwear built to be worn hard and often.',
  },
  {
    id: 'men-watches',
    slug: 'watches',
    label: 'Watches',
    gender: 'men',
    rawCategories: ['mens-watches'],
    description: 'Precise, pared-back timepieces.',
  },
  {
    id: 'men-sunglasses',
    slug: 'sunglasses',
    label: 'Sunglasses',
    gender: 'men',
    rawCategories: ['sunglasses'],
    description: 'Frames that finish a look without asking for attention.',
  },
];

export const GENDERS: Gender[] = ['women', 'men'];

export const GENDER_LABELS: Record<Gender, string> = {
  women: 'Women',
  men: 'Men',
};

export function isGender(value: string | undefined): value is Gender {
  return value === 'women' || value === 'men';
}

/** All store categories belonging to a gender, in display order. */
export function getCategoriesByGender(gender: Gender): StoreCategory[] {
  return STORE_CATEGORIES.filter((category) => category.gender === gender);
}

/** Resolve a gender + slug pair to a store category (e.g. women + dresses). */
export function findCategory(
  gender: Gender,
  slug: string,
): StoreCategory | undefined {
  return STORE_CATEGORIES.find(
    (category) => category.gender === gender && category.slug === slug,
  );
}

/** Resolve by stable id, e.g. "women-dresses". */
export function findCategoryById(id: string): StoreCategory | undefined {
  return STORE_CATEGORIES.find((category) => category.id === id);
}

/** Path helper — the canonical URL for a category listing page. */
export function categoryPath(category: StoreCategory): string {
  return `/${category.gender}/${category.slug}`;
}

/**
 * A curated set of categories to feature on the home page. Chosen for the
 * strongest imagery and the clearest "clothing store" read.
 */
export const FEATURED_CATEGORY_IDS = [
  'women-dresses',
  'men-shirts',
  'women-tops',
  'women-bags',
] as const;
