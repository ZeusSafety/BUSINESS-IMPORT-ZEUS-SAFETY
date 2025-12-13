'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlayCircle, Clock, Package, Users, CheckCircle2, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1528] via-[#0b2d60] to-[#0c1427] text-white">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,181,226,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(16,58,123,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,181,226,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
      
      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-[#00b5e2]/20 to-[#00d2ff]/20 border border-[#00b5e2]/30 text-[#00d2ff] backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]">
              Seguridad Industrial Integral
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-black leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Protección total para tu{' '}
            <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
              fuerza laboral
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg leading-relaxed text-slate-200/90 sm:text-xl max-w-2xl"
          >
            Equipamos a equipos de alto riesgo con EPP certificado y asesoría
            especializada para minería, energía, construcción y oil & gas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              className="group px-8 py-6 text-base font-semibold shadow-lg shadow-[#103a7b]/50 hover:shadow-xl hover:shadow-[#103a7b]/60 transition-all duration-300 hover:scale-105" 
              asChild
            >
              <Link href="/productos">
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="group px-8 py-6 text-base font-semibold bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105" 
              asChild
            >
              <Link href="/cotizacion">
                <PlayCircle className="mr-2 h-5 w-5" />
                Hablar con un asesor
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <div className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 backdrop-blur-sm border border-white/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300/80">Respuesta rápida</p>
                <p className="text-sm font-semibold text-white">&lt; 30 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 backdrop-blur-sm border border-white/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00b5e2]/20">
                <Package className="h-4 w-4 text-[#00b5e2]" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300/80">Stock disponible</p>
                <p className="text-sm font-semibold text-white">Proyectos gran escala</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] p-1 shadow-2xl shadow-black/50">
            {/* Borde con gradiente */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00b5e2]/20 via-transparent to-[#00d2ff]/20 opacity-50" />
            
            <div className="relative h-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0b2d60]/95 via-[#103a7b]/95 to-[#0a1528]/95 backdrop-blur-xl">
              {/* Efectos de luz internos */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.3),transparent_50%),radial-gradient(circle_at_90%_80%,rgba(16,58,123,0.25),transparent_50%)]" />
              
              <div className="relative flex h-full flex-col justify-between p-8">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#00d2ff]/10 px-4 py-1.5 border border-[#00d2ff]/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d2ff]">
                      Seguridad Industrial
                    </p>
                  </div>
                  
                  <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Soluciones integrales de EPP para operaciones críticas
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-slate-200/80">
                    Kits personalizados, control de stock y soporte técnico a nivel nacional.
                  </p>
                </div>
                
                <div className="space-y-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Resumen Operativo</p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10 hover:border-[#00d2ff]/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00d2ff]/0 to-[#00d2ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#00d2ff]" />
                          <p className="text-xs font-medium text-slate-300/90">Clientes B2B</p>
                        </div>
                        <p className="text-2xl font-black text-white">250+</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <p className="text-xs font-medium text-slate-300/90">Entregas OTIF</p>
                        </div>
                        <p className="text-2xl font-black text-white">98%</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-400" />
                          <p className="text-xs font-medium text-slate-300/90">Certificaciones</p>
                        </div>
                        <p className="text-xl font-black text-white">ANSI · ISO</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10 hover:border-[#00b5e2]/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00b5e2]/0 to-[#00b5e2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#00b5e2]" />
                          <p className="text-xs font-medium text-slate-300/90">Cobertura</p>
                        </div>
                        <p className="text-xl font-black text-white">Nacional</p>
                      </div>
                    </motion.div>
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

