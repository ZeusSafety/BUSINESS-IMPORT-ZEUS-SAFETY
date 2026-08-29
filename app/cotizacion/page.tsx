'use client';
 
import { useQuoteStore } from '@/store/quoteStore';
import { Input } from '@/components/ui/input';
import {
  Building2,
  Calculator,
  FileText,
  Mail,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';

const WA_NUMBER = '51999999999';
const QUOTE_EMAIL = 'ventas@zeussafety.com';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function QuotePage() {
  const { items, updateQuantity, removeItem, clear, totalItems } =
    useQuoteStore();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [ruc, setRuc] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formValid = useMemo(() => {
    return (
      name.trim().length > 1 &&
      company.trim().length > 1 &&
      ruc.trim().length >= 8 &&
      phone.trim().length >= 6 &&
      isValidEmail(email)
    );
  }, [name, company, ruc, phone, email]);

  const canSubmit = items.length > 0 && formValid;

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + change));
    }
  };

  const buildMessage = () => {
    const lines = items.map(
      (item, i) =>
        `${i + 1}. ${item.name} x${item.quantity} (S/ ${item.price.toFixed(2)} c/u)`,
    );
    return [
      'Hola Zeus Safety 👋',
      'Solicito cotización con estos datos:',
      '',
      `Nombre: ${name.trim()}`,
      `Empresa: ${company.trim()}`,
      `RUC: ${ruc.trim()}`,
      `Teléfono: ${phone.trim()}`,
      `Correo: ${email.trim()}`,
      '',
      'Productos:',
      ...lines,
      '',
      `Total referencial: S/ ${total.toFixed(2)}`,
    ].join('\n');
  };

  const openWhatsApp = () => {
    if (!canSubmit) {
      setTouched(true);
      return;
    }
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openEmail = () => {
    if (!canSubmit) {
      setTouched(true);
      return;
    }
    const subject = encodeURIComponent(
      `Cotización Zeus Safety — ${company.trim() || name.trim()}`,
    );
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    openEmail();
  };

  const fieldClass =
    'h-11 rounded-none border-slate-200 text-sm text-[#0c1427] transition-colors focus:border-[#0b2d60] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

  const fieldError = (ok: boolean) =>
    touched && !ok ? 'border-red-400 focus:border-red-500' : '';

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden sm:h-[260px]">
        <Image
          src="/7349177659b6abcf56fff60d36e7bff0.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/78" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Cotización
          </p>
          <h1 className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
            Arma tu <span className="text-[#F5C400]">pedido</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Revisa cantidades y envía tu solicitud. Un asesor responde en
            minutos.
          </p>
        </div>
      </section>

      <motion.div
        className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:px-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] xl:gap-8">
          <div className="space-y-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
              >
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-[#0b2d60] text-white">
                  <ShoppingCart className="h-7 w-7" />
                </span>
                <h3 className="mb-2 text-2xl font-bold text-[#0c1427]">
                  Tu cotización está vacía
                </h3>
                <p className="mb-8 text-sm text-slate-500">
                  Explora el catálogo y agrega productos para armar tu pedido.
                </p>
                <Link
                  href="/productos"
                  className="inline-flex h-12 items-center gap-2 bg-[#F5C400] px-7 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                >
                  <Package className="h-4 w-4" />
                  Explorar catálogo
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="relative overflow-hidden border border-slate-200 bg-white">
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                        <ShoppingCart className="h-5 w-5" strokeWidth={2.3} />
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-[#0c1427]">
                          Productos en cotización
                        </h2>
                        <p className="text-xs text-slate-500">
                          {totalItems}{' '}
                          {totalItems === 1 ? 'unidad' : 'unidades'} ·{' '}
                          {items.length}{' '}
                          {items.length === 1 ? 'producto' : 'productos'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clear}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 transition-colors hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Vaciar todo
                    </button>
                  </div>
                  <div className="h-1 bg-[#F5C400]" />
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => {
                    const imageSrc = item.image?.trim() || null;
                    const lineTotal = item.price * item.quantity;
                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        className="border border-slate-200 bg-white p-3.5 transition hover:border-[#0b2d60]/25 hover:shadow-[0_10px_28px_rgba(11,45,96,0.08)] sm:p-4"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden border border-slate-100 bg-slate-50 sm:h-20 sm:w-20">
                            {imageSrc ? (
                              <Image
                                src={imageSrc}
                                alt={item.name}
                                fill
                                className="object-contain p-1.5"
                                sizes="80px"
                                unoptimized
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Package className="h-6 w-6 text-slate-300" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <Link
                                  href={`/productos?categoria=${encodeURIComponent(item.category)}`}
                                  className="mb-1 inline-block bg-[#0b2d60] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
                                >
                                  {item.category}
                                </Link>
                                <Link
                                  href={`/productos/${item.slug}`}
                                  className="block line-clamp-2 text-sm font-bold leading-snug text-[#0c1427] transition-colors hover:text-[#0b2d60] sm:text-[15px]"
                                >
                                  {item.name}
                                </Link>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                aria-label="Eliminar producto"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                              <div className="inline-flex h-9 items-center border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(item.id, -1)
                                  }
                                  className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                                  aria-label="Disminuir cantidad"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-8 text-center text-sm font-bold text-[#0b2d60]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(item.id, 1)
                                  }
                                  className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-base font-black text-[#0b2d60] sm:text-lg">
                                  S/ {lineTotal.toFixed(2)}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-[11px] text-slate-500">
                                    S/ {item.price.toFixed(2)} c/u
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                <Link
                  href="/productos"
                  className="inline-flex h-11 items-center gap-2 border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Seguir agregando productos
                </Link>
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden border border-slate-200 bg-white shadow-sm"
              noValidate
            >
              <div className="bg-[#0b2d60] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Datos para la cotización
                    </h2>
                    <p className="text-xs text-white/70">
                      Completa los campos para enviar
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-[#F5C400]" />

              <div className="space-y-3.5 p-5">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <User className="h-3.5 w-3.5 text-[#F5C400]" />
                    Nombre y apellido *
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ana Pérez"
                    className={`${fieldClass} ${fieldError(name.trim().length > 1)}`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <Building2 className="h-3.5 w-3.5 text-[#F5C400]" />
                    Empresa *
                  </label>
                  <Input
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Razón social"
                    className={`${fieldClass} ${fieldError(company.trim().length > 1)}`}
                  />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      <FileText className="h-3.5 w-3.5 text-[#F5C400]" />
                      RUC / ID fiscal *
                    </label>
                    <Input
                      required
                      value={ruc}
                      onChange={(e) => setRuc(e.target.value)}
                      placeholder="12345678901"
                      className={`${fieldClass} ${fieldError(ruc.trim().length >= 8)}`}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-[#F5C400]" />
                      Teléfono *
                    </label>
                    <Input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+51 999 999 999"
                      className={`${fieldClass} ${fieldError(phone.trim().length >= 6)}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-[#F5C400]" />
                    Correo electrónico *
                  </label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@empresa.com"
                    className={`${fieldClass} ${fieldError(isValidEmail(email))}`}
                  />
                </div>

                <div className="border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-[#0b2d60]" />
                      <span className="text-sm font-semibold text-slate-700">
                        Total referencial
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#0b2d60]">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Los montos finales se ajustan según volumen, disponibilidad
                    y condiciones comerciales.
                  </p>
                </div>

                {touched && !formValid && (
                  <p className="text-center text-xs font-medium text-red-600">
                    Completa todos los campos requeridos para continuar
                  </p>
                )}
                {touched && formValid && items.length === 0 && (
                  <p className="text-center text-xs font-medium text-red-600">
                    Agrega productos para continuar
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Mail className="h-4 w-4" />
                  Cotizar por correo
                </button>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  disabled={!canSubmit}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#25D366] text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                </button>

                <Link
                  href="/productos"
                  className="inline-flex h-11 w-full items-center justify-center border border-slate-200 bg-white text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60]"
                >
                  Seguir cotizando
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
