import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/cart';
import type { Product, Size } from '@/types/catalog';

/**
 * Global cart state (Zustand + localStorage persistence).
 *
 * Line identity is (productId + size): adding the same product/size again
 * increments quantity, while a different size creates a separate line.
 * Derived values (subtotal, count) are computed selectors, not stored, so
 * they can never drift out of sync with `items`.
 */

interface CartState {
  items: CartItem[];
  /** Transient UI flag for the slide-in drawer (not persisted). */
  isOpen: boolean;

  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;

  openCart: () => void;
  closeCart: () => void;
}

const MAX_QUANTITY_PER_LINE = 10;

function makeLineId(productId: number, size: Size): string {
  return `${productId}-${size}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, quantity = 1) =>
        set((state) => {
          const lineId = makeLineId(product.id, size);
          const existing = state.items.find((item) => item.lineId === lineId);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.lineId === lineId
                  ? {
                      ...item,
                      quantity: clampQuantity(item.quantity + quantity),
                    }
                  : item,
              ),
              isOpen: true,
            };
          }

          const newItem: CartItem = {
            lineId,
            productId: product.id,
            title: product.title,
            brand: product.brand,
            image: product.thumbnail,
            price: product.price,
            size,
            quantity: clampQuantity(quantity),
          };

          return { items: [...state.items, newItem], isOpen: true };
        }),

      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        })),

      updateQuantity: (lineId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.lineId !== lineId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.lineId === lineId
                ? { ...item, quantity: clampQuantity(quantity) }
                : item,
            ),
          };
        }),

      clear: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'standard-cart',
      version: 1,
      // Only persist the contents — never the transient drawer flag.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

function clampQuantity(quantity: number): number {
  return Math.max(1, Math.min(MAX_QUANTITY_PER_LINE, Math.round(quantity)));
}

/* ---- Selectors (use these to read derived values without re-renders) ---- */

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
