'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/mockData';
import {
  DEFAULT_QUOTE_UNIT,
  isQuoteUnit,
  type QuoteUnit,
} from '@/lib/quote-units';

export type QuoteItem = Product & {
  lineId: string;
  quantity: number;
  unit: QuoteUnit;
};

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
  addItem: (
    product: QuoteProductInput,
    quantity?: number,
    unit?: QuoteUnit,
  ) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  updateUnit: (lineId: string, unit: QuoteUnit) => void;
  clear: () => void;
};

const lineIdOf = (productId: string, unit: QuoteUnit) => `${productId}::${unit}`;

function toQuoteItem(
  product: QuoteProductInput,
  quantity: number,
  unit: QuoteUnit,
): QuoteItem {
  const id = String(product.id);
  return {
    id,
    lineId: lineIdOf(id, unit),
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
    unit,
  };
}

function sumItems(items: QuoteItem[]) {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

function withTotals(items: QuoteItem[]) {
  return { items, totalItems: sumItems(items) };
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      addItem: (product, quantity = 1, unit = DEFAULT_QUOTE_UNIT) =>
        set((state) => {
          const qty = Math.max(1, quantity);
          const lineId = lineIdOf(String(product.id), unit);
          const exists = state.items.some((item) => item.lineId === lineId);
          return withTotals(
            exists
              ? state.items.map((item) =>
                  item.lineId === lineId
                    ? { ...item, quantity: item.quantity + qty }
                    : item,
                )
              : [...state.items, toQuoteItem(product, qty, unit)],
          );
        }),
      removeItem: (lineId) =>
        set((state) =>
          withTotals(state.items.filter((item) => item.lineId !== lineId)),
        ),
      updateQuantity: (lineId, quantity) =>
        set((state) =>
          withTotals(
            state.items.map((item) =>
              item.lineId === lineId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            ),
          ),
        ),
      updateUnit: (lineId, unit) =>
        set((state) => {
          const current = state.items.find((item) => item.lineId === lineId);
          if (!current || current.unit === unit) return state;
          const targetId = lineIdOf(current.id, unit);
          const target = state.items.find((item) => item.lineId === targetId);

          if (target) {
            return withTotals(
              state.items
                .filter((item) => item.lineId !== lineId)
                .map((item) =>
                  item.lineId === targetId
                    ? { ...item, quantity: item.quantity + current.quantity }
                    : item,
                ),
            );
          }

          return withTotals(
            state.items.map((item) =>
              item.lineId === lineId
                ? { ...item, unit, lineId: targetId }
                : item,
            ),
          );
        }),
      clear: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: 'zeus-quote-cart',
      version: 1,
      migrate: (persisted) => {
        const state = persisted as { items?: Partial<QuoteItem>[] } | undefined;
        const items = (state?.items ?? []).map((item) => {
          const unit = isQuoteUnit(item.unit) ? item.unit : DEFAULT_QUOTE_UNIT;
          return {
            ...item,
            unit,
            lineId: lineIdOf(String(item.id), unit),
          } as QuoteItem;
        });
        return withTotals(items);
      },
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
      }),
    },
  ),
);
