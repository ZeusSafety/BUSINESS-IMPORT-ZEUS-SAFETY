'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  ClipboardList,
  FileText,
  Mail,
  Package,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  User,
} from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import { Input } from '@/components/ui/input';
import { QuoteLineItem } from '@/components/quote/quote-line-item';
import { QuoteEmptyState } from '@/components/quote/quote-empty-state';
import {
  QUOTE_EMAIL,
  buildQuoteMessage,
  emailQuoteUrls,
  whatsappQuoteUrl,
} from '@/lib/quote-message';

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

const digitsOnly = (value: string) => value.replace(/\D/g, '');

type FieldKey = 'name' | 'company' | 'ruc' | 'phone' | 'email';

export default function QuotePage() {
  const { items, updateQuantity, updateUnit, removeItem, clear } =
    useQuoteStore();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [ruc, setRuc] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [countFlash, setCountFlash] = useState<'up' | 'down' | null>(null);
  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    const count = items.length;
    if (prevCountRef.current === null) {
      prevCountRef.current = count;
      return;
    }
    if (count === prevCountRef.current) return;
    const dir = count > prevCountRef.current ? 'up' : 'down';
    prevCountRef.current = count;
    setCountFlash(dir);
    const t = window.setTimeout(() => setCountFlash(null), 500);
    return () => window.clearTimeout(t);
  }, [items.length]);

  const errors = useMemo(() => {
    const rucDigits = digitsOnly(ruc).length;
    const result: Partial<Record<FieldKey, string>> = {};
    if (name.trim().length < 2) result.name = 'Ingresa tu nombre y apellido';
    if (company.trim().length < 2) result.company = 'Ingresa el nombre de tu empresa';
    if (rucDigits !== 8 && rucDigits !== 11)
      result.ruc = 'DNI de 8 dígitos o RUC de 11 dígitos';
    if (digitsOnly(phone).length < 7) result.phone = 'Ingresa un teléfono válido';
    if (!isValidEmail(email)) result.email = 'Ingresa un correo válido (ej. correo@empresa.com)';
    return result;
  }, [name, company, ruc, phone, email]);

  const formValid = Object.keys(errors).length === 0;
  const canSubmit = items.length > 0 && formValid;

  const handleQuantityChange = (lineId: string, change: number) => {
    const item = items.find((i) => i.lineId === lineId);
    if (item) {
      updateQuantity(lineId, Math.max(1, item.quantity + change));
    }
  };

  const buildMessage = () =>
    buildQuoteMessage(items, { name, company, ruc, phone, email });

  const validate = () => {
    setTouched(true);
    return canSubmit;
  };

  const emailSubject = `Cotización Zeus Safety — ${company.trim() || name.trim()}`;

  const openWhatsApp = () => {
    if (!validate()) return;
    window.open(whatsappQuoteUrl(buildMessage()), '_blank', 'noopener,noreferrer');
  };

  const openEmail = () => {
    if (!validate()) return;
    window.location.href = emailQuoteUrls(emailSubject, buildMessage()).mailto;
    setEmailSent(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    openEmail();
  };

  const fieldClass =
    'h-11 rounded-xl border-slate-200 px-3.5 text-sm text-[#0c1427] transition-colors focus:border-[#0b2d60] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

  const fieldError = (key: FieldKey) =>
    touched && errors[key] ? 'border-red-400 focus:border-red-500' : '';

  const errorText = (key: FieldKey) =>
    touched && errors[key] ? (
      <p className="mt-1 text-[11px] font-medium text-red-600">{errors[key]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <motion.div
        className="w-full px-6 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16 2xl:px-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Cotización
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-3xl">
            Arma tu pedido
          </h1>
          <div className="mt-2 h-1.5 w-14 rounded-full bg-[#F5C400]" />
          {items.length === 0 && (
            <p className="mt-2 text-sm text-slate-500">
              Agrega productos desde el catálogo para cotizar.
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(380px,480px)]">
          <div className="min-w-0 space-y-4">
            {items.length === 0 ? (
              <QuoteEmptyState variant="page" />
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(11,45,96,0.05)]">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2d60] text-[#F5C400]">
                      <ShoppingCart className="h-4 w-4" strokeWidth={2.3} />
                    </span>
                    <h2 className="truncate text-base font-bold text-[#0b2d60]">
                      Productos en cotización
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#f4f7fb] px-3 py-1.5 text-xs font-semibold text-[#0b2d60]">
                      <Package className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                      <span className="font-black">{items.length}</span>
                      {items.length === 1 ? 'producto' : 'productos'}
                    </span>
                    <button
                      type="button"
                      onClick={clear}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Vaciar todo
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {items.map((item) => (
                    <QuoteLineItem
                      key={item.lineId}
                      item={item}
                      variant="page"
                      onDecrease={() => handleQuantityChange(item.lineId, -1)}
                      onIncrease={() => handleQuantityChange(item.lineId, 1)}
                      onUnitChange={(unit) => updateUnit(item.lineId, unit)}
                      onRemove={() => removeItem(item.lineId)}
                    />
                  ))}
                </div>

                <Link
                  href="/productos"
                  className="group/btn relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] shadow-sm transition-all hover:border-[#F5C400] hover:shadow-[0_6px_18px_rgba(245,196,0,0.25)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <Plus className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">Seguir agregando productos</span>
                </Link>
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_10px_32px_rgba(11,45,96,0.1)]"
              noValidate
            >
              <div className="relative overflow-hidden bg-[#0b2d60] px-6 py-6 sm:px-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#0b2d60] via-[#F5C400] to-[#0b2d60]"
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Formulario
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight text-white">
                  Datos para la cotización
                </h2>
                <p className="mt-1.5 text-xs text-white/65">
                  Completa los campos para enviar tu pedido
                </p>
              </div>

              <div className="space-y-4 p-5 sm:p-6 sm:pt-5">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b2d60]/70">
                    <User className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                    Nombre y apellido
                    <span className="text-[#F5C400]">*</span>
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Ana Pérez"
                    className={`${fieldClass} bg-[#f3f5f8] ${fieldError('name')}`}
                  />
                  {errorText('name')}
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b2d60]/70">
                    <Building2 className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                    Empresa
                    <span className="text-[#F5C400]">*</span>
                  </label>
                  <Input
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Razón social"
                    className={`${fieldClass} bg-[#f3f5f8] ${fieldError('company')}`}
                  />
                  {errorText('company')}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b2d60]/70">
                      <FileText className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                      RUC / DNI
                      <span className="text-[#F5C400]">*</span>
                    </label>
                    <Input
                      required
                      inputMode="numeric"
                      maxLength={11}
                      value={ruc}
                      onChange={(e) => setRuc(digitsOnly(e.target.value))}
                      placeholder="20123456789"
                      className={`${fieldClass} bg-[#f3f5f8] ${fieldError('ruc')}`}
                    />
                    {errorText('ruc')}
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b2d60]/70">
                      <Phone className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                      Teléfono
                      <span className="text-[#F5C400]">*</span>
                    </label>
                    <Input
                      required
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+51 999 999 999"
                      className={`${fieldClass} bg-[#f3f5f8] ${fieldError('phone')}`}
                    />
                    {errorText('phone')}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b2d60]/70">
                    <Mail className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                    Correo electrónico
                    <span className="text-[#F5C400]">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@empresa.com"
                    className={`${fieldClass} bg-[#f3f5f8] ${fieldError('email')}`}
                  />
                  {errorText('email')}
                </div>

                <div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    countFlash === 'up'
                      ? 'border-emerald-300 bg-emerald-50'
                      : countFlash === 'down'
                        ? 'border-red-300 bg-red-50'
                        : 'border-[#0b2d60]/10 bg-[#f3f5f8]'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-full w-1.5 transition-colors duration-300 ${
                      countFlash === 'up'
                        ? 'bg-emerald-500'
                        : countFlash === 'down'
                          ? 'bg-red-500'
                          : 'bg-[#F5C400]'
                    }`}
                  />

                  <div className="flex items-center gap-3 px-4 py-3.5 pl-5">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        countFlash === 'up'
                          ? 'bg-emerald-500 text-white'
                          : countFlash === 'down'
                            ? 'bg-red-500 text-white'
                            : 'bg-[#0b2d60] text-[#F5C400]'
                      }`}
                    >
                      <ClipboardList className="h-5 w-5" strokeWidth={2.25} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Productos a cotizar
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                        Te enviaremos precios y disponibilidad
                      </p>
                    </div>

                    <p
                      className={`shrink-0 text-2xl font-black tabular-nums transition-all duration-300 ${
                        countFlash === 'up'
                          ? 'scale-105 text-emerald-600'
                          : countFlash === 'down'
                            ? 'scale-105 text-red-600'
                            : 'scale-100 text-[#0b2d60]'
                      }`}
                    >
                      {items.length}
                    </p>
                  </div>
                </div>

                {touched && !formValid && (
                  <p className="text-center text-xs font-medium text-red-600">
                    Revisa los campos marcados en rojo para continuar
                  </p>
                )}
                {touched && formValid && items.length === 0 && (
                  <p className="text-center text-xs font-medium text-red-600">
                    Agrega productos para continuar
                  </p>
                )}

                <button
                  type="submit"
                  className={`group/btn relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:shadow-[0_6px_18px_rgba(245,196,0,0.35)] ${
                    canSubmit ? '' : 'opacity-70'
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <Mail className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">Cotizar por correo</span>
                </button>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className={`group/btn relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] text-xs font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_6px_18px_rgba(37,211,102,0.35)] ${
                    canSubmit ? '' : 'opacity-70'
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#20BA5A] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <WhatsAppIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">Cotizar por WhatsApp</span>
                </button>

                {emailSent && canSubmit && (
                  <p className="rounded-xl bg-[#f3f5f8] px-3 py-2.5 text-center text-[11px] leading-relaxed text-slate-600">
                    ¿No se abrió tu aplicación de correo?{' '}
                    <a
                      href={emailQuoteUrls(emailSubject, buildMessage()).gmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0b2d60] underline underline-offset-2"
                    >
                      Enviar desde Gmail
                    </a>{' '}
                    o escríbenos a{' '}
                    <span className="font-semibold text-[#0b2d60]">{QUOTE_EMAIL}</span>
                  </p>
                )}

                <Link
                  href="/productos"
                  className="group/btn relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:border-[#0b2d60]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#0b2d60] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <span className="relative z-10 transition-colors group-hover/btn:text-white">
                    Seguir cotizando
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
