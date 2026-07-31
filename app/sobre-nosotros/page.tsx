'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Eye,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, FormEvent } from 'react';

const DynamicMap = dynamic(
  () => import('@/components/ui/map').then((mod) => ({ default: mod.Map })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Cargando mapa...</p>
      </div>
    ),
  },
);

const importCountries = [
  {
    title: 'China',
    description:
      'Proveedores de EPP industrial con certificaciones internacionales y volumen para proyectos grandes.',
    flag: '/flags/cn.png',
    href: '/productos',
  },
  {
    title: 'Japón',
    description:
      'Tecnología y estándares de alta calidad en protección personal para operaciones exigentes.',
    flag: '/flags/jp.png',
    href: '/productos',
  },
  {
    title: 'Corea',
    description:
      'Equipos certificados con innovación en diseño y desempeño para entornos de alto riesgo.',
    flag: '/flags/kr.png',
    href: '/productos',
  },
  {
    title: 'Australia',
    description:
      'Soluciones robustas pensadas para minería, energía y condiciones de trabajo extremas.',
    flag: '/flags/au.png',
    href: '/productos',
  },
];

const pillars = [
  {
    title: 'Misión',
    description:
      'Proporcionar soluciones integrales de seguridad industrial que protejan la vida de los trabajadores con EPP certificado, asesoría técnica y logística confiable.',
    icon: Target,
  },
  {
    title: 'Visión',
    description:
      'Ser el referente líder en seguridad industrial en Latinoamérica por excelencia operativa, innovación y compromiso con entornos laborales más seguros.',
    icon: Eye,
  },
  {
    title: 'Seguridad',
    description:
      'Operamos bajo estándares globales y auditorías constantes para proteger a tu fuerza laboral en campo.',
    icon: Shield,
  },
  {
    title: 'Calidad',
    description:
      'EPP certificados internacionalmente con trazabilidad de lotes y cumplimiento normativo en cada entrega.',
    icon: Award,
  },
];

export default function AboutPage() {
  const [showMap, setShowMap] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Page hero */}
      <section className="relative flex h-[280px] items-center justify-center overflow-hidden sm:h-[320px]">
        <Image
          src="/zeus2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/75" />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 text-4xl font-black uppercase tracking-wide text-white sm:text-5xl lg:text-6xl"
        >
          Sobre nosotros
        </motion.h1>
      </section>

      {/* 2. Países de donde importamos */}
      <section className="relative overflow-hidden bg-[#f3f5f8] py-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(11,45,96,0.04) 40px, rgba(11,45,96,0.04) 80px)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#0c1427] sm:text-3xl">
              Países de donde importamos
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-14 bg-[#F5C400]" />
          </div>

          <div className="rounded-2xl bg-white px-6 py-10 shadow-[0_10px_40px_rgba(11,45,96,0.08)] sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {importCountries.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="mb-5 relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-slate-100 shadow-md">
                    <Image
                      src={item.flag}
                      alt={`Bandera de ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-[#0c1427]">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0c1427] transition-colors hover:text-[#F5C400]"
                  >
                    Ver más
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Peru map + text */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex min-h-[320px] items-center justify-center lg:min-h-[420px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,45,96,0.06),transparent_70%)]" />
            <Image
              src="/pe.svg"
              alt="Cobertura en el Perú"
              width={480}
              height={560}
              className="relative z-0 h-auto w-full max-w-md opacity-40 brightness-0"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60] shadow-lg">
                  <MapPin className="h-7 w-7" strokeWidth={2.25} />
                </span>
                <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0b2d60] shadow-sm">
                  Lima, Perú
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold leading-tight text-[#0c1427] sm:text-[2.15rem]">
              Más de una década protegiendo
              operaciones en todo el Perú
            </h2>
            <div className="h-[3px] w-16 bg-[#F5C400]" />
            <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-[17px]">
              Nacimos en el campo, acompañando cuadrillas mineras y equipos de
              infraestructura. Hoy conectamos marcas internacionales de EPP con
              operaciones que exigen continuidad, cumplimiento normativo y
              soporte técnico inmediato en minería, energía, construcción y oil
              & gas.
            </p>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="inline-flex h-12 items-center gap-2 bg-[#F5C400] px-7 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
            >
              Ver ubicación
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {showMap && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-[70vh] w-full max-w-3xl overflow-hidden bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="absolute right-3 top-3 z-10 bg-[#0b2d60] px-3 py-1.5 text-xs font-bold uppercase text-white"
            >
              Cerrar
            </button>
            <DynamicMap
              lat={-12.0464}
              lng={-77.0428}
              address="Av. Industrial 123, Lima - Perú"
            />
          </div>
        </div>
      )}

      {/* 4. Split: yellow + navy — Mission & Vision once */}
      <section className="grid lg:grid-cols-[0.38fr_0.62fr]">
        <div className="flex flex-col justify-center bg-[#F5C400] px-8 py-14 sm:px-12 lg:px-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black uppercase leading-tight text-[#0b2d60] sm:text-4xl">
              Nuestra
              <span className="block">empresa</span>
            </h2>
            <div className="h-[2px] w-14 bg-[#0b2d60]" />
            <p className="text-base leading-relaxed text-[#0b2d60]/85">
              Combinamos distribución de EPP certificado, asesoría consultiva y
              logística para proyectos de gran escala. Nuestro compromiso es
              claro: que tu equipo regrese a casa seguro.
            </p>
            <Link
              href="/productos"
              className="inline-flex h-11 w-fit items-center gap-2 bg-[#0b2d60] px-6 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
            >
              Leer más
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden">
          <Image
            src="/zeus2.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 62vw"
          />
          <div className="absolute inset-0 bg-[#0b2d60]/82" />
          <div className="relative z-10 grid h-full gap-8 p-8 sm:grid-cols-2 sm:gap-10 sm:p-12 lg:p-14">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="space-y-3"
                >
                  <Icon
                    className="h-9 w-9 text-[#F5C400]"
                    strokeWidth={1.75}
                  />
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Contact form */}
      <section className="relative overflow-hidden bg-[#eef1f5] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 opacity-20 lg:block">
          <Image
            src="/zeus2.jpg"
            alt=""
            fill
            className="object-cover object-left"
            sizes="33vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <div className="bg-white px-6 py-10 shadow-lg sm:px-10 sm:py-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#0c1427] sm:text-3xl">
              ¿Quieres asesoría personalizada?
            </h2>
            {formSent ? (
              <p className="text-center text-base text-slate-600">
                Gracias. Un asesor de Zeus Safety se pondrá en contacto contigo
                pronto.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    placeholder="Nombre"
                    className="h-12 border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#F5C400]"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-12 border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#F5C400]"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    name="phone"
                    placeholder="Teléfono"
                    className="h-12 border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#F5C400]"
                  />
                  <select
                    name="interest"
                    defaultValue=""
                    className="h-12 border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition-colors focus:border-[#F5C400]"
                  >
                    <option value="" disabled>
                      Tipo de consulta
                    </option>
                    <option value="catalogo">Catálogo / productos</option>
                    <option value="cotizacion">Cotización</option>
                    <option value="asesoria">Asesoría técnica</option>
                  </select>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center bg-[#F5C400] px-8 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                  >
                    Enviar solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 bg-[#0b2d60] px-6 py-5 text-white sm:flex-row sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-white/70">Lun – Sáb 9:00 – 17:30</p>
                <a
                  href="tel:+5115555555"
                  className="text-lg font-bold text-[#F5C400] hover:underline"
                >
                  +51 1 555 5555
                </a>
              </div>
            </div>
            <Link
              href="/asesores"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#F5C400]"
            >
              <Users className="h-4 w-4" />
              Hablar con un asesor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
