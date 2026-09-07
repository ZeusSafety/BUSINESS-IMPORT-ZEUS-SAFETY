'use client';

import { HomeAbout } from '@/components/sections/home-about';
import { HomeConfia } from '@/components/sections/home-confia';
import {
  AboutEmpresaIntro,
  HomeEmpresa,
} from '@/components/sections/home-empresa';
import { HomeImportAsia } from '@/components/sections/home-import-asia';
import { HomePeruCoverage } from '@/components/sections/home-peru-coverage';

function AdditionalInfoHeader() {
  return (
    <div className="border-b border-slate-200/80 px-6 py-5 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
          Más sobre Zeus
        </p>
        <h2 className="mt-1 text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
          Información adicional
        </h2>
        <div className="mt-2 h-1.5 w-14 rounded-full bg-[#F5C400]" />
        <p className="mt-2 hidden text-xs text-slate-500 sm:block">
          Cobertura, importación y ventajas que respaldan tu operación
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <AboutEmpresaIntro />
      <HomeAbout />
      <HomeEmpresa />

      <div className="bg-[#f3f5f8]">
        <AdditionalInfoHeader />
        <HomeConfia />
        <HomePeruCoverage />
        <HomeImportAsia />
      </div>
    </div>
  );
}
