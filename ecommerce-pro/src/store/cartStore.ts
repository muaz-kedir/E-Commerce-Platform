import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { clamp } from "@/lib/utils";
import { MAX_CART_QUANTITY } from "@/constants";

interface CartState {
  items: CartItem[];
  // Derived
  itemCount: number;
  subtotal: number;
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  hasItem: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

function computeTotals(items: CartItem[]) {
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { itemCount, subtotal };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          let items: CartItem[];

          if (existing) {
            items = state.items.map((i) =>
              i.id === product.id
                ? {
                    ...i,
                    quantity: clamp(i.quantity + quantity, 1, MAX_CART_QUANTITY),
                  }
                : i
            );
          } else {
            const newItem: CartItem = {
              id: product.id,
              product,
              quantity: clamp(quantity, 1, MAX_CART_QUANTITY),
              price: product.price,
            };
            items = [...state.items, newItem];
          }

          return { items, ...computeTotals(items) };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== productId);
          return { items, ...computeTotals(items) };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => i.id !== productId)
              : state.items.map((i) =>
                  i.id === productId
                    ? { ...i, quantity: clamp(quantity, 1, MAX_CART_QUANTITY) }
                    : i
                );
          return { items, ...computeTotals(items) };
        });
      },

      clearCart: () => set({ items: [], itemCount: 0, subtotal: 0 }),

      hasItem: (productId) => get().items.some((i) => i.id === productId),

      getItemQuantity: (productId) =>
        get().items.find((i) => i.id === productId)?.quantity ?? 0,
    }),
    {
      name: "ecp-cart",
      // Only persist items; recompute totals on hydration
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { itemCount, subtotal } = computeTotals(state.items);
          state.itemCount = itemCount;
          state.subtotal = subtotal;
        }
      },
    }
  )
);
