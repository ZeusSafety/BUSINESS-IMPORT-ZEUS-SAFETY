/** Rangos referenciales por categoría (soles) cuando el API no trae precio real */
const CATEGORY_RANGES: Record<string, [number, number]> = {
  Guantes: [9.9, 38.5],
  'Protección Manual': [9.9, 38.5],
  Lentes: [18.5, 52.0],
  'Protección Visual': [18.5, 52.0],
  Respiradores: [28.0, 95.0],
  'Protección Respiratoria': [28.0, 95.0],
  Calzado: [129.0, 289.0],
  'Calzado de Seguridad': [129.0, 289.0],
  Auditivo: [6.5, 24.9],
  'Protección Auditiva': [6.5, 24.9],
  Vial: [14.9, 78.0],
  'Seguridad Vial': [14.9, 78.0],
  Corporal: [42.0, 118.0],
  'Protección Corporal': [42.0, 118.0],
  'Protección de Cabeza': [42.0, 118.0],
  Laboral: [35.0, 165.0],
  'Equipo Laboral': [35.0, 165.0],
};

const DEFAULT_RANGE: [number, number] = [19.9, 89.0];

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

function findRange(category: string): [number, number] {
  if (CATEGORY_RANGES[category]) return CATEGORY_RANGES[category];
  const key = Object.keys(CATEGORY_RANGES).find((k) =>
    category.toLowerCase().includes(k.toLowerCase()),
  );
  return key ? CATEGORY_RANGES[key] : DEFAULT_RANGE;
}

/**
 * Devuelve un precio de exhibición. Usa el precio del API si es creíble (> 5);
 * si no, genera uno estable y variado por producto según su categoría.
 */
export function getDisplayPrice(product: {
  id: string;
  category: string;
  price: number;
}): number {
  if (product.price > 5) return product.price;

  const [min, max] = findRange(product.category);
  const seed = hashSeed(product.id);
  const spread = max - min;
  const raw = min + (seed % 1000) / 1000 * spread;

  // Termina en .90 o .50 para parecer precio comercial
  const rounded = Math.round(raw * 2) / 2;
  const cents = seed % 2 === 0 ? 0.9 : 0.5;
  const base = Math.floor(rounded) + cents;

  return Math.min(max, Math.max(min, Math.round(base * 100) / 100));
}

export function formatSoles(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}
