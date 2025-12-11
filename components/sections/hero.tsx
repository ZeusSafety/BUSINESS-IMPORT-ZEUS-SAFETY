'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.15),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(15,23,42,0.18),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge className="bg-slate-900 text-amber-300">
            Protección Industrial Premium
          </Badge>
          <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
            Protección total para tu fuerza laboral
          </h1>
          <p className="text-lg text-slate-700 sm:text-xl">
            Equipamos a equipos de alto riesgo con EPP certificado y asesoría
            especializada para minería, energía, construcción y oil & gas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="px-6" asChild>
              <Link href="/productos">
                Ver catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="px-6" asChild>
              <Link href="/cotizacion">
                Hablar con un asesor
                <PlayCircle className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Respuesta en &lt; 30 minutos
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Stock para proyectos de gran escala
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,193,7,0.35),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(30,41,59,0.35),transparent_40%),linear-gradient(145deg,#0f172a,#1e293b)] p-6 shadow-2xl">
            <div className="flex h-full flex-col justify-between rounded-2xl bg-white/5 p-6 backdrop-blur">
              <div className="space-y-4 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
                  Seguridad Industrial
                </p>
                <h3 className="text-3xl font-bold leading-snug">
                  Soluciones integrales de EPP para operaciones críticas
                </h3>
                <p className="text-sm text-slate-100/80">
                  Kits personalizados, control de stock y soporte técnico a nivel nacional.
                </p>
              </div>
              <div className="space-y-3 rounded-xl bg-white/10 p-4 text-sm text-white">
                <p className="font-semibold">Resumen operativo</p>
                <div className="grid grid-cols-2 gap-3 text-slate-100">
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs text-slate-200/80">Clientes B2B</p>
                    <p className="text-xl font-bold">250+</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs text-slate-200/80">Entregas OTIF</p>
                    <p className="text-xl font-bold">98%</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs text-slate-200/80">Certificaciones</p>
                    <p className="text-xl font-bold">ANSI · ISO</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs text-slate-200/80">Cobertura</p>
                    <p className="text-xl font-bold">Nacional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

