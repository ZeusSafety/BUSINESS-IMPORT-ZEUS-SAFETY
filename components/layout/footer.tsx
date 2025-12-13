import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-gradient-to-b from-[#0b2d60] to-[#081b39] text-slate-100">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600"></div>
      
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Company Info - First Column */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <Link href="/" className="inline-block mb-4 transition-opacity duration-200 hover:opacity-85">
                <Image
                  src="/logo_zeus_azul.jpeg"
                  alt="Zeus Safety"
                  width={180}
                  height={56}
                  className="h-auto w-auto object-contain mx-auto sm:mx-0"
                  style={{ maxHeight: '56px' }}
                />
              </Link>
              <div className="text-sm leading-relaxed text-slate-300 max-w-xs space-y-0.5">
                <p>Protección industrial</p>
                <p>de nivel corporativo</p>
                <p>con asesoría especializada.</p>
              </div>
            </div>
          </div>

          {/* Empresa - Second Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#cbe6ff]">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  href="/sobre-nosotros" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/productos" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link 
                  href="/cotizacion" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Arma tu cotización
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - Third Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#cbe6ff]">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  href="/libro-de-reclamaciones" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Libro de reclamaciones
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Políticas de privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-slate-300 transition-all duration-200 hover:text-[#00b5e2] hover:translate-x-1 inline-block"
                >
                  Términos de uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social - Fourth Column */}
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#cbe6ff] mb-4">
                Síguenos
              </h4>
              <div className="flex gap-2.5">
                {[
                  { Icon: Facebook, href: '#', label: 'Facebook' },
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:border-[#00b5e2] hover:bg-[#00b5e2]/10 hover:scale-110 hover:shadow-lg hover:shadow-[#00b5e2]/20"
                  >
                    <Icon className="h-4.5 w-4.5 text-slate-300 transition-colors duration-300 group-hover:text-[#00b5e2]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#00b5e2] mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Av. Industrial 123, Lima
                </p>
              </div>
              <a 
                href="mailto:ventas@zeussafety.com" 
                className="flex items-center gap-3 text-sm text-slate-300 transition-colors duration-200 hover:text-[#00b5e2] group"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#00b5e2] group-hover:scale-110 transition-transform" />
                <span>ventas@zeussafety.com</span>
              </a>
              <a 
                href="tel:+5115555555" 
                className="flex items-center gap-3 text-sm text-slate-300 transition-colors duration-200 hover:text-[#00b5e2] group"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#00b5e2] group-hover:scale-110 transition-transform" />
                <span>+51 1 555 5555</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-slate-700/50 bg-[#081b39]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              © {year} Zeus Safety. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Hecho con</span>
              <span className="text-red-400">♥</span>
              <span>en Perú</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

