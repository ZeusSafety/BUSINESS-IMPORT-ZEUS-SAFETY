'use client';

import { advisors } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AdvisorsPage() {
  const specialties = [
    { icon: '⛏️', name: 'Minería' },
    { icon: '🛢️', name: 'Oil & Gas' },
    { icon: '🏗️', name: 'Construcción' },
    { icon: '⚡', name: 'Eléctrico' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              Asesores especializados
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Equipo de{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                expertos
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-200 sm:text-xl">
              Contacta directamente con nuestros especialistas según tu industria. 
              Respuesta inmediata y asesoría técnica personalizada para tu proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Specialties Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#00b5e2]" />
            <h2 className="text-lg font-bold text-slate-900">Especialidades que cubrimos</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specialties.map((specialty, index) => (
              <div
                key={specialty.name}
                className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:shadow-md"
              >
                <span className="text-3xl">{specialty.icon}</span>
                <p className="text-sm font-medium text-slate-700">{specialty.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advisors Grid */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Nuestros asesores
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              Expertos certificados con años de experiencia en seguridad industrial
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00b5e2]/5 via-transparent to-[#103a7b]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Avatar Section */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#e7f2ff] via-white to-[#f4f7fb]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {advisor.avatar ? (
                        <Image
                          src={advisor.avatar}
                          alt={advisor.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            // Fallback si la imagen no existe
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2] to-[#103a7b] text-4xl font-bold text-white shadow-lg">
                          {advisor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Badge de disponibilidad */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      Disponible
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6">
                    <div className="mb-4 space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">{advisor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-600" />
                        <p className="text-sm font-semibold text-amber-700">
                          {advisor.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock className="h-3.5 w-3.5 text-[#00b5e2]" />
                        <span className="font-medium">Respuesta inmediata</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-medium">Asesoría técnica especializada</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        <span className="font-medium">Certificaciones internacionales</span>
                      </div>
                    </div>

                    {/* WhatsApp Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg group-hover:scale-[1.02]"
                      asChild
                    >
                      <a
                        href={`https://wa.me/${advisor.phone}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chatear por WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] p-8 text-center text-white shadow-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(0,181,226,0.15),transparent_70%)]" />
          <div className="relative space-y-4">
            <h3 className="text-2xl font-bold sm:text-3xl">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="mx-auto max-w-2xl text-slate-200">
              Nuestro equipo está listo para ayudarte a encontrar las mejores soluciones 
              de seguridad industrial para tu proyecto.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-[#103a7b] hover:bg-slate-100"
                asChild
              >
                <a href="tel:+51999999999">Llamar ahora</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="mailto:contacto@zeussafety.com">Enviar email</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

