'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/mockData';

export type QuoteItem = Product & { quantity: number };

type QuoteProductInput = Pick<
  Product,
  | 'id'
  | 'name'
  | 'slug'
  | 'category'
  | 'brand'
  | 'price'
  | 'certification'
  | 'description'
  | 'specs'
  | 'image'
  | 'tags'
>;

type QuoteState = {
  items: QuoteItem[];
  totalItems: number;
  addItem: (product: QuoteProductInput, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

function toQuoteItem(product: QuoteProductInput, quantity: number): QuoteItem {
  return {
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    category: product.category,
    brand: product.brand || 'Zeus Safety',
    price: Number(product.price) || 0,
    certification: product.certification ?? [],
    description: product.description ?? '',
    specs: product.specs ?? [],
    image: product.image?.trim() || '',
    tags: product.tags,
    quantity: Math.max(1, quantity),
  };
}

function sumItems(items: QuoteItem[]) {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const qty = Math.max(1, quantity);
          const exists = state.items.find((item) => item.id === product.id);
          const nextItems = exists
            ? state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + qty }
                  : item,
              )
            : [...state.items, toQuoteItem(product, qty)];

          return {
            items: nextItems,
            totalItems: sumItems(nextItems),
          };
        }),
      removeItem: (id) =>
        set((state) => {
          const nextItems = state.items.filter((item) => item.id !== id);
          return {
            items: nextItems,
            totalItems: sumItems(nextItems),
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const nextItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          );
          return {
            items: nextItems,
            totalItems: sumItems(nextItems),
          };
        }),
      clear: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: 'zeus-quote-cart',
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
      }),
    },
  ),
);
