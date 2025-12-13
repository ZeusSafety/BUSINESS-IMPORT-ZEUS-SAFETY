'use client';

import { Shield, Award, Users, Target, Eye, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    { 
      title: 'Seguridad', 
      description: 'Operamos bajo estándares globales y auditorías constantes para garantizar la protección integral de tu fuerza laboral.',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      title: 'Calidad', 
      description: 'EPP certificados internacionalmente con trazabilidad completa de lotes para cada entrega y cumplimiento normativo.',
      icon: Award,
      color: 'from-amber-500 to-amber-600'
    },
    { 
      title: 'Confianza', 
      description: 'Asesoría consultiva especializada y soporte técnico continuo para optimizar tus proyectos de seguridad industrial.',
      icon: Users,
      color: 'from-[#00b5e2] to-[#103a7b]'
    },
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
              Sobre nosotros
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Ingeniería en seguridad industrial
              <span className="block bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                para equipos de alto riesgo
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-200 sm:text-xl">
              Somos especialistas en protección industrial con más de una década de experiencia
              acompañando operaciones críticas en minería, energía, construcción y oil & gas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <section className="mb-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Nuestra historia
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Nacimos en el campo, acompañando directamente a cuadrillas mineras y equipos
                    de obras de infraestructura. Esta experiencia de primera línea nos permitió
                    entender las necesidades reales de protección en entornos de alto riesgo.
                  </p>
                  <p>
                    Hoy, conectamos a las principales marcas internacionales de Equipos de
                    Protección Personal (EPP) con operaciones que requieren continuidad operativa,
                    cumplimiento normativo estricto y soporte técnico inmediato.
                  </p>
                  <p>
                    Nuestro enfoque integral combina la distribución de EPP certificados con
                    asesoría especializada, gestión de inventarios y logística optimizada para
                    proyectos de gran escala.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                      <div className="relative">
                        <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${value.color} p-2.5 text-white shadow-sm`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-900">
                          {value.title}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,181,226,0.08),transparent_70%)]" />
                <div className="relative space-y-6">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#e7f2ff] via-white to-[#f4f7fb] border border-slate-200 flex items-center justify-center">
                    <Building2 className="h-24 w-24 text-slate-300" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#103a7b] text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Ubicación</p>
                        <p className="text-sm text-slate-600">Av. Industrial 123, Lima - Perú</p>
                      </div>
                    </div>
                    <div className="h-48 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                      <p className="text-sm text-slate-500">Google Maps embed (placeholder)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-20 grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b5e2]/5 via-transparent to-[#103a7b]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b5e2] to-[#103a7b] text-white shadow-lg">
                  <Target className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00b5e2]">
                    Nuestra
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">Misión</h3>
                </div>
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                Proporcionar soluciones integrales de seguridad industrial que protejan la vida
                y el bienestar de los trabajadores en entornos de alto riesgo, mediante la
                distribución de EPP certificados de las mejores marcas internacionales, asesoría
                técnica especializada y un servicio logístico confiable que garantice la
                continuidad operativa de nuestros clientes.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#103a7b]/5 via-transparent to-[#00b5e2]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#103a7b] to-[#00b5e2] text-white shadow-lg">
                  <Eye className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#103a7b]">
                    Nuestra
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">Visión</h3>
                </div>
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                Ser el referente líder en seguridad industrial en Latinoamérica, reconocido por
                nuestra excelencia operativa, innovación en soluciones de protección y compromiso
                inquebrantable con la seguridad de los trabajadores. Aspiramos a establecer
                nuevos estándares de calidad y servicio en la industria, contribuyendo a crear
                entornos laborales más seguros y sostenibles.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#f0f4fa] to-white p-8 shadow-sm lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              Combinamos experiencia técnica, productos certificados y servicio excepcional
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle2, text: 'EPP certificados ANSI, ISO y NOM' },
              { icon: CheckCircle2, text: 'Stock disponible para proyectos grandes' },
              { icon: CheckCircle2, text: 'Asesoría técnica especializada' },
              { icon: CheckCircle2, text: 'Cobertura nacional con logística optimizada' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

