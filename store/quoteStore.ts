'use client';

import { create } from 'zustand';
import { Product } from '@/lib/mockData';

export type QuoteItem = Product & { quantity: number };

type QuoteState = {
  items: QuoteItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((item) => item.id === product.id);
      const nextItems = exists
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.items, { ...product, quantity: 1 }];

      return {
        items: nextItems,
        totalItems: nextItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const nextItems = state.items.filter((item) => item.id !== id);
      return {
        items: nextItems,
        totalItems: nextItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const nextItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      );
      return {
        items: nextItems,
        totalItems: nextItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }),
  clear: () => set({ items: [], totalItems: 0 }),
  totalItems: 0,
}));

