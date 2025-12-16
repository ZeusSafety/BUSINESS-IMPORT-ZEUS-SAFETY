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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1528] via-[#0b2d60] to-[#0c1427] text-white">
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,181,226,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(16,58,123,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,181,226,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
        
        {/* Patrón de grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center"
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
            <p className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl">
              Ajusta cantidades y envía tu solicitud. Un asesor especializado responderá en minutos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Products List */}
          <div className="space-y-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,181,226,0.03),transparent_70%)]" />
                <div className="relative">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                    <ShoppingCart className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    Tu cotización está vacía
                  </h3>
                  <p className="mb-8 text-sm text-slate-600">
                    Explora nuestro catálogo y agrega productos a tu cotización.
                  </p>
                  <Button size="lg" className="bg-gradient-to-r from-[#103a7b] to-[#0b2d60] hover:from-[#154a9b] hover:to-[#0d3d70] shadow-lg" asChild>
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
                <div className="mb-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                      <Package className="h-5 w-5 text-[#103a7b]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Productos en cotización
                      </h2>
                      <p className="text-xs text-slate-500">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-slate-600 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar todo
                  </Button>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1.5"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-6 w-6 text-slate-300" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <span className="mb-1.5 inline-block rounded-full bg-[#103a7b] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                {item.category}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">{item.brand}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Price, Quantity and Subtotal */}
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-[10px] text-slate-500 mb-0.5">Precio unitario</p>
                              <p className="text-base font-bold text-[#103a7b]">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-[10px] font-semibold uppercase text-slate-600 whitespace-nowrap">
                                Cantidad
                              </label>
                              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                                <button
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="p-1.5 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#103a7b]"
                                  aria-label="Disminuir cantidad"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = Math.max(1, Number(e.target.value) || 1);
                                    updateQuantity(item.id, value);
                                  }}
                                  className="w-12 border-0 bg-transparent text-center text-sm font-semibold focus-visible:ring-0 h-8 px-1"
                                />
                                <button
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="p-1.5 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#103a7b]"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-slate-500 mb-0.5">Subtotal</p>
                              <p className="text-lg font-bold text-slate-900">
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

          {/* Quote Form Sidebar */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00b5e2] to-[#103a7b] text-white shadow-md">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Datos para la cotización</h2>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    <User className="h-3.5 w-3.5 text-[#103a7b]" />
                    Nombre y apellido
                  </label>
                  <Input 
                    placeholder="Ej. Ana Pérez" 
                    className="h-10 border-slate-200 text-sm focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-[#103a7b]" />
                    Empresa
                  </label>
                  <Input 
                    placeholder="Razón social" 
                    className="h-10 border-slate-200 text-sm focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                      <FileText className="h-3.5 w-3.5 text-[#103a7b]" />
                      RUC / ID fiscal
                    </label>
                    <Input 
                      placeholder="12345678901" 
                      className="h-10 border-slate-200 text-sm focus:border-[#103a7b] focus:ring-[#103a7b]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                      <Phone className="h-3.5 w-3.5 text-[#103a7b]" />
                      Teléfono
                    </label>
                    <Input 
                      placeholder="+51 999 999 999" 
                      className="h-10 border-slate-200 text-sm focus:border-[#103a7b] focus:ring-[#103a7b]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    <Mail className="h-3.5 w-3.5 text-[#103a7b]" />
                    Correo electrónico
                  </label>
                  <Input 
                    type="email" 
                    placeholder="correo@empresa.com" 
                    className="h-10 border-slate-200 text-sm focus:border-[#103a7b] focus:ring-[#103a7b]"
                  />
                </div>
              </div>

              {/* Total Section */}
              <div className="my-5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#103a7b]" />
                    <span className="text-sm font-semibold text-slate-700">Total referencial</span>
                  </div>
                  <span className="text-2xl font-black text-[#103a7b]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-blue-50/50 border border-blue-100 p-3">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#00b5e2] mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Los montos finales se ajustan según descuentos por volumen, disponibilidad 
                    y condiciones comerciales negociadas.
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-12 bg-gradient-to-r from-[#103a7b] to-[#0b2d60] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={items.length === 0}
              >
                <FileText className="mr-2 h-4 w-4" />
                Solicitar cotización formal
                <ArrowRight className="ml-2 h-4 w-4" />
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

