'use client';

import Image from 'next/image';
import { HomeAbout } from '@/components/sections/home-about';
import { HomeConfia } from '@/components/sections/home-confia';
import { HomeEmpresa } from '@/components/sections/home-empresa';
import { HomeImportAsia } from '@/components/sections/home-import-asia';
import { HomePeruCoverage } from '@/components/sections/home-peru-coverage';

function AdditionalInfoHeader() {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-5 py-4 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3">
        <span className="hidden h-9 w-1.5 bg-[#F5C400] sm:block" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Más sobre Zeus
          </p>
          <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
            Información adicional
          </h2>
          <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
            Cobertura, importación y ventajas que respaldan tu operación
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden sm:h-[280px] lg:h-[300px]">
        <Image
          src="/zeus2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/72" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Empresa
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Sobre <span className="text-[#F5C400]">nosotros</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85">
            Conoce a Zeus Safety: importadores y especialistas en EPP industrial
            para operaciones seguras en todo el Perú.
          </p>
        </div>
      </section>

      <HomeEmpresa />
      <HomeAbout />

      <div className="bg-[#f4f6f9]">
        <AdditionalInfoHeader />
        <HomeConfia />
        <HomePeruCoverage />
        <HomeImportAsia />
      </div>
    </div>
  );
}
