import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, variant?: string) => void;
  updateQty: (productId: string, quantity: number, variant?: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex(
            (i) => i.productId === item.productId && i.variant === item.variant,
          );
          if (idx >= 0) {
            const next = [...s.items];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
            return { items: next };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, variant) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && i.variant === variant),
          ),
        })),
      updateQty: (productId, quantity, variant) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "velisca-cart" },
  ),
);
