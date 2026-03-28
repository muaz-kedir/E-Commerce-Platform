import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().hasItem(product.id)) return;
        const newItem: WishlistItem = {
          id: `wl-${product.id}`,
          product,
          addedAt: new Date().toISOString(),
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      toggleItem: (product) => {
        if (get().hasItem(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      hasItem: (productId) =>
        get().items.some((i) => i.product.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "ecp-wishlist" }
  )
);
