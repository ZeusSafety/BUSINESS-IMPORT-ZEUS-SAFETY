'use client';

import Image from 'next/image';

const brands = [
  { name: 'Zeus Safety', src: '/Logo de Zeus.png', invert: false },
  { name: 'uvex', src: '/marca-uvex-removebg-preview.png', invert: false },
  { name: 'MSA', src: '/marca-MSA-removebg-preview.png', invert: false },
  {
    name: 'Caterpillar',
    src: '/marca-caterpillar-removebg-preview.png',
    invert: false,
  },
  { name: '3M', src: '/marca-3M.png', invert: true },
] as const;

const certifications = [
  {
    name: 'ANSI',
    src: '/Certificacion_ANSI-removebg-preview.png',
    invert: false,
  },
  {
    name: 'ISO 9001',
    src: '/norma-9001-1-removebg-preview.png',
    invert: false,
  },
  {
    name: 'OSHA',
    src: '/certificaicon-osha-removebg-preview.png',
    invert: false,
  },
  { name: 'BASC', src: '/BASC-certificado-removebg-preview.png', invert: false },
  {
    name: 'ASTM',
    src: '/certificado-ASTM-removebg-preview.png',
    invert: false,
  },
  {
    name: 'NIOSH',
    src: '/Niosh-Cetificado-removebg-preview.png',
    invert: false,
  },
] as const;

function LogoTile({
  name,
  src,
  invert = false,
}: {
  name: string;
  src: string;
  invert?: boolean;
}) {
  return (
    <div className="group flex flex-col">
      <div className="relative flex aspect-[5/3.4] w-full items-center justify-center overflow-hidden border border-[#0b2d60]/12 bg-[#f4f7fb] px-5 py-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#F5C400] group-hover:bg-white group-hover:shadow-[0_14px_32px_rgba(11,45,96,0.1)] sm:px-6 sm:py-7">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 group-hover:scale-x-100"
        />
        <div className="relative h-14 w-full sm:h-16 lg:h-[4.5rem]">
          <Image
            src={src}
            alt={name}
            fill
            className={`object-contain transition duration-300 group-hover:scale-[1.05] ${
              invert
                ? 'brightness-0 opacity-80 group-hover:opacity-100'
                : 'opacity-95 group-hover:opacity-100'
            }`}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 220px"
          />
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#0b2d60] sm:text-[13px]">
        {name}
      </p>
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Respaldo
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b2d60] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
            Marcas y certificaciones que nos respaldan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Trabajamos con fabricantes líderes y estándares internacionales
            para que tu operación reciba EPP con calidad comprobada.
          </p>
        </div>

        <div className="mt-10 overflow-hidden border border-[#0b2d60]/12 bg-[#0b2d60] shadow-[0_20px_50px_rgba(11,45,96,0.12)] sm:mt-12">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex flex-col justify-center bg-[#071f45] px-6 py-7 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
                Marcas
              </p>
              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Partners de confianza
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Distribuimos y representamos marcas reconocidas en seguridad
                industrial.
              </p>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
                {brands.map((brand) => (
                  <LogoTile
                    key={brand.name}
                    name={brand.name}
                    src={brand.src}
                    invert={brand.invert}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex flex-col justify-center bg-[#071f45] px-6 py-7 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
                Certificaciones
              </p>
              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Cumplimiento real
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Normas y sellos que respaldan la calidad de cada línea de EPP.
              </p>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                {certifications.map((cert) => (
                  <LogoTile
                    key={cert.name}
                    name={cert.name}
                    src={cert.src}
                    invert={cert.invert}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
