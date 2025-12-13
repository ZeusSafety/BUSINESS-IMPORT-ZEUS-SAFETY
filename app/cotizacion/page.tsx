'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingCart, Plus, Minus, User, Building2, FileText, Phone, Mail, Calculator, Package, ArrowRight, Sparkles } from 'lucide-react';
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
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              Cotización
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Arma tu{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                pedido
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
              Ajusta cantidades y envía tu solicitud. Un asesor especializado responderá en minutos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Products List */}
          <div className="space-y-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50 p-12 text-center shadow-sm"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,181,226,0.05),transparent_70%)]" />
                <div className="relative">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                    <ShoppingCart className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Tu cotización está vacía
                  </h3>
                  <p className="mb-6 text-sm text-slate-600">
                    Explora nuestro catálogo y agrega productos a tu cotización.
                  </p>
                  <Button size="lg" className="bg-[#103a7b] hover:bg-[#0b2d60]" asChild>
                    <Link href="/productos">
                      <Package className="mr-2 h-4 w-4" />
                      Explorar catálogo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#103a7b]" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Productos en cotización ({items.length})
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-slate-600 hover:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar todo
                  </Button>
                </div>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00b5e2]/5 via-transparent to-[#103a7b]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Product Image */}
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-8 w-8 text-slate-300" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="mb-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                                {item.category}
                              </span>
                              <h3 className="text-lg font-bold text-slate-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-slate-600">{item.brand}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Price and Quantity Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Precio unitario</p>
                              <p className="text-xl font-bold text-[#103a7b]">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <label className="text-xs font-semibold uppercase text-slate-600">
                                Cantidad
                              </label>
                              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50">
                                <button
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="rounded-l-lg p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#103a7b]"
                                  aria-label="Disminuir cantidad"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = Math.max(1, Number(e.target.value) || 1);
                                    updateQuantity(item.id, value);
                                  }}
                                  className="w-16 border-0 bg-transparent text-center text-sm font-semibold focus-visible:ring-0"
                                />
                                <button
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="rounded-r-lg p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#103a7b]"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-slate-500">Subtotal</p>
                                <p className="text-lg font-bold text-slate-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
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

          {/* Quote Form Sidebar */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00b5e2] to-[#103a7b] text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Datos para la cotización</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    <User className="h-3.5 w-3.5" />
                    Nombre y apellido
                  </label>
                  <Input 
                    placeholder="Ej. Ana Pérez" 
                    className="border-slate-200 focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    <Building2 className="h-3.5 w-3.5" />
                    Empresa
                  </label>
                  <Input 
                    placeholder="Razón social" 
                    className="border-slate-200 focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      <FileText className="h-3.5 w-3.5" />
                      RUC / ID fiscal
                    </label>
                    <Input 
                      placeholder="12345678901" 
                      className="border-slate-200 focus:border-[#103a7b] focus:ring-[#103a7b]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      <Phone className="h-3.5 w-3.5" />
                      Teléfono
                    </label>
                    <Input 
                      placeholder="+51 999 999 999" 
                      className="border-slate-200 focus:border-[#103a7b] focus:ring-[#103a7b]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    <Mail className="h-3.5 w-3.5" />
                    Correo electrónico
                  </label>
                  <Input 
                    type="email" 
                    placeholder="correo@empresa.com" 
                    className="border-slate-200 focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
              </div>

              {/* Total Section */}
              <div className="my-6 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#103a7b]" />
                    <span className="text-sm font-semibold text-slate-700">Total referencial</span>
                  </div>
                  <span className="text-3xl font-black text-[#103a7b]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#00b5e2] mt-0.5" />
                  <p className="text-xs leading-relaxed text-slate-600">
                    Los montos finales se ajustan según descuentos por volumen, disponibilidad 
                    y condiciones comerciales negociadas.
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#103a7b] to-[#0b2d60] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                disabled={items.length === 0}
              >
                <FileText className="mr-2 h-5 w-5" />
                Solicitar cotización formal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

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

