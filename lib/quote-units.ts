export const QUOTE_UNITS = [
  'UNIDADES',
  'DOCENAS',
  'DECENAS',
  'CAJAS',
  'CAJITAS',
  'BOLSITAS',
] as const;

export type QuoteUnit = (typeof QUOTE_UNITS)[number];

export const DEFAULT_QUOTE_UNIT: QuoteUnit = 'UNIDADES';

const UNIT_LABELS: Record<QuoteUnit, { one: string; many: string }> = {
  UNIDADES: { one: 'unidad', many: 'unidades' },
  DOCENAS: { one: 'docena', many: 'docenas' },
  DECENAS: { one: 'decena', many: 'decenas' },
  CAJAS: { one: 'caja', many: 'cajas' },
  CAJITAS: { one: 'cajita', many: 'cajitas' },
  BOLSITAS: { one: 'bolsita', many: 'bolsitas' },
};

export function isQuoteUnit(value: unknown): value is QuoteUnit {
  return typeof value === 'string' && (QUOTE_UNITS as readonly string[]).includes(value);
}

export function formatUnit(quantity: number, unit: QuoteUnit): string {
  const label = UNIT_LABELS[unit];
  return `${quantity} ${quantity === 1 ? label.one : label.many}`;
}
