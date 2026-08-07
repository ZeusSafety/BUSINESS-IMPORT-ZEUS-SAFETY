'use client';

import Image from 'next/image';
import { HomeAbout } from '@/components/sections/home-about';
import { HomeConfia } from '@/components/sections/home-confia';
import { HomeEmpresa } from '@/components/sections/home-empresa';
import { HomeImportAsia } from '@/components/sections/home-import-asia';
import { HomePeruCoverage } from '@/components/sections/home-peru-coverage';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[300px] lg:h-[340px]">
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
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Empresa
          </p>
          <h1 className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
            Sobre <span className="text-[#F5C400]">nosotros</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Conoce a Zeus Safety: importadores y especialistas en EPP industrial
            para operaciones seguras en todo el Perú.
          </p>
        </div>
      </section>

      <HomeAbout />
      <HomeConfia />
      <HomePeruCoverage />
      <HomeImportAsia />
      <HomeEmpresa />
    </div>
  );
}
