'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
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

export default function QuotePage() {
  const { items, updateQuantity, removeItem, clear } = useQuoteStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px]">
        <Image
          src="/zeus2.jpg"
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
            Arma tu{' '}
            <span className="text-[#F5C400]">pedido</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Ajusta cantidades y envía tu solicitud. Un asesor especializado
            responderá en minutos.
          </p>
        </div>
      </section>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] xl:gap-8">
          {/* Products */}
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
                  Explora nuestro catálogo y agrega productos a tu cotización.
                </p>
                <Link
                  href="/productos"
                  className="inline-flex h-12 items-center gap-2 bg-[#F5C400] px-7 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                >
                  <Package className="h-4 w-4" />
                  Explorar catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between border border-slate-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#0b2d60] text-white">
                      <Package className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-[#0c1427]">
                        Productos en cotización
                      </h2>
                      <p className="text-xs text-slate-500">
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

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-slate-50">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1.5"
                              sizes="80px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-6 w-6 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <span className="mb-1.5 inline-block bg-[#0b2d60] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                {item.category}
                              </span>
                              <h3 className="line-clamp-1 text-base font-bold text-[#0c1427]">
                                {item.name}
                              </h3>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {item.brand}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="mb-0.5 text-[10px] text-slate-500">
                                Precio unitario
                              </p>
                              <p className="text-base font-bold text-[#0b2d60]">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold uppercase text-slate-600">
                                Cantidad
                              </span>
                              <div className="flex items-center border border-slate-200 bg-slate-50">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(item.id, -1)
                                  }
                                  className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-[#0b2d60]"
                                  aria-label="Disminuir cantidad"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = Math.max(
                                      1,
                                      Number(e.target.value) || 1,
                                    );
                                    updateQuantity(item.id, value);
                                  }}
                                  className="h-8 w-12 border-0 bg-transparent px-1 text-center text-sm font-semibold focus-visible:ring-0"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(item.id, 1)
                                  }
                                  className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-[#0b2d60]"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="mb-0.5 text-[10px] text-slate-500">
                                Subtotal
                              </p>
                              <p className="text-lg font-bold text-[#0c1427]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-10 w-10 items-center justify-center bg-[#0b2d60] text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-bold text-[#0c1427]">
                  Datos para la cotización
                </h2>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <User className="h-3.5 w-3.5 text-[#F5C400]" />
                    Nombre y apellido
                  </label>
                  <Input
                    placeholder="Ej. Ana Pérez"
                    className="h-11 rounded-none border-slate-200 text-sm focus:border-[#F5C400] focus-visible:ring-0"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <Building2 className="h-3.5 w-3.5 text-[#F5C400]" />
                    Empresa
                  </label>
                  <Input
                    placeholder="Razón social"
                    className="h-11 rounded-none border-slate-200 text-sm focus:border-[#F5C400] focus-visible:ring-0"
                  />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      <FileText className="h-3.5 w-3.5 text-[#F5C400]" />
                      RUC / ID fiscal
                    </label>
                    <Input
                      placeholder="12345678901"
                      className="h-11 rounded-none border-slate-200 text-sm focus:border-[#F5C400] focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-[#F5C400]" />
                      Teléfono
                    </label>
                    <Input
                      placeholder="+51 999 999 999"
                      className="h-11 rounded-none border-slate-200 text-sm focus:border-[#F5C400] focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-[#F5C400]" />
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    placeholder="correo@empresa.com"
                    className="h-11 rounded-none border-slate-200 text-sm focus:border-[#F5C400] focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="my-5 border border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#0b2d60]" />
                    <span className="text-sm font-semibold text-slate-700">
                      Total referencial
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#0b2d60]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Los montos finales se ajustan según descuentos por volumen,
                  disponibilidad y condiciones comerciales.
                </p>
              </div>

              <button
                type="button"
                disabled={items.length === 0}
                className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileText className="h-4 w-4" />
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </button>

              {items.length === 0 && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  Agrega productos para continuar
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
