import { formatUnit, type QuoteUnit } from '@/lib/quote-units';

export const QUOTE_WHATSAPP_NUMBER = '51916532849';
export const QUOTE_EMAIL = 'zeus.safety2020@gmail.com';

export type QuoteCustomer = {
  name: string;
  company: string;
  ruc: string;
  phone: string;
  email: string;
};

type QuoteMessageItem = {
  name: string;
  category?: string;
  quantity: number;
  unit: QuoteUnit;
};

export function buildQuoteMessage(
  items: QuoteMessageItem[],
  customer?: QuoteCustomer,
): string {
  const productLines = items.map((item, i) => {
    const category = item.category ? ` (${item.category})` : '';
    return `${i + 1}. ${item.name}${category}\n   Cantidad: ${formatUnit(item.quantity, item.unit)}`;
  });

  const customerLines = customer
    ? [
        '*DATOS DEL CLIENTE*',
        `Nombre: ${customer.name.trim()}`,
        `Empresa: ${customer.company.trim()}`,
        `RUC / DNI: ${customer.ruc.trim()}`,
        `Teléfono: ${customer.phone.trim()}`,
        `Correo: ${customer.email.trim()}`,
        '',
      ]
    : [];

  return [
    'Hola Zeus Safety, solicito una cotización.',
    '',
    ...customerLines,
    `*PRODUCTOS SOLICITADOS* (${items.length})`,
    ...productLines,
    '',
    '¿Me pueden confirmar disponibilidad, precio y tiempo de entrega?',
  ].join('\n');
}

export function whatsappQuoteUrl(message: string): string {
  return `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function emailQuoteUrls(subject: string, message: string) {
  const plain = message.replace(/\*/g, '');
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(plain);
  return {
    mailto: `mailto:${QUOTE_EMAIL}?subject=${s}&body=${b}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${QUOTE_EMAIL}&su=${s}&body=${b}`,
  };
}
