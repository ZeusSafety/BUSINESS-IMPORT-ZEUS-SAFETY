'use client';

import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Headphones,
  MapPin,
  Send,
  Shield,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/ui/form-select';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const DEFAULT_WA_MESSAGE = encodeURIComponent(
  'Hola 👋, me gustaría recibir información y cotizar productos de seguridad industrial de Zeus Safety.',
);

const WA_NUMBER = '51999999999';
const EMAIL = 'ventas@zeussafety.com';
const ADDRESS = 'Av. Industrial 123, Lima';

const CONTACT_MOTIVOS = [
  { value: 'Consulta general', label: 'Consulta general' },
  { value: 'Soporte postventa', label: 'Soporte postventa' },
  { value: 'Alianzas comerciales', label: 'Alianzas comerciales' },
  { value: 'Otro', label: 'Otro' },
];

const contactFieldClass =
  'h-11 rounded-lg border-slate-200 bg-[#f7f8fa] text-sm text-[#0c1427] transition-colors focus:border-[#0b2d60] focus:bg-white focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

const FAQS = [
  {
    q: '¿Dónde está ubicada su tienda física?',
    a: `Nuestra tienda y showroom están en ${ADDRESS}. Horario de atención: lunes a sábado de 9:00 a 17:30. También puedes coordinar visita con nuestro equipo.`,
  },
  {
    q: '¿Ofrecen opciones de pago contra entrega?',
    a: 'Sí. Según zona y tipo de pedido podemos coordinar pago contra entrega u otras formas de pago empresariales. Te confirmamos las opciones disponibles para tu caso.',
  },
  {
    q: '¿Está disponible el producto que busco?',
    a: 'Revisa el stock en nuestro catálogo online o escríbenos directamente. Si el ítem no figura, te ayudamos a validar disponibilidad y alternativas equivalentes certificadas.',
  },
  {
    q: '¿Realizan envíos y delivery?',
    a: 'Sí. Contamos con delivery y despachos programados. En zonas seleccionadas ofrecemos entrega en 24 horas; para el resto del país coordinamos el tiempo según destino y volumen.',
  },
  {
    q: '¿Hacen envíos a todo el Perú?',
    a: 'Sí. Atendemos envíos a nivel nacional. El costo y plazo dependen de la ciudad, peso y urgencia. Te cotizamos el despacho junto con tu pedido.',
  },
  {
    q: '¿Los precios publicados son los reales?',
    a: 'Los precios del catálogo son referenciales. El precio final se confirma en la cotización según cantidad, disponibilidad, marca y condiciones comerciales de tu empresa.',
  },
];

export default function AdvisorsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMotivo, setContactMotivo] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      'CONTACTO ZEUS SAFETY',
      `Nombre: ${contactName.trim()}`,
      `Correo: ${contactEmail.trim()}`,
      `Teléfono: ${contactPhone.trim()}`,
      `Motivo: ${contactMotivo || '—'}`,
      '',
      contactMessage.trim(),
    ].join('\n');

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Contacto — ${contactMotivo || 'Consulta'}`,
    )}&body=${encodeURIComponent(body)}`;
    setContactSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[300px] lg:h-[340px]">
        <Image
          src="/inventario.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/72" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h1 className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
            Contáctanos
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Asesoría técnica, cotizaciones ágiles y EPP industrial listo para tu
            operación en Perú.
          </p>
        </div>
      </section>

      <section
        id="contacto"
        className="scroll-mt-28 bg-[#f6f6f6] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Escríbenos
            </p>
            <h2 className="text-2xl font-black text-[#0c1427] sm:text-3xl">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Completa el formulario para consultas generales. Si necesitas
              precios de productos, usa el cotizador.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3.5 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b2d60] text-white">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0c1427]">Horario</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Lun – Sáb · 9:00 a 17:30
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b2d60] text-white">
                <Headphones className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0c1427]">
                  Tiempo de respuesta
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Te respondemos en menos de 24 h
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${DEFAULT_WA_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3.5 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)] transition-shadow hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0c1427]">Chat en línea</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Escríbenos por WhatsApp ahora
                </p>
              </div>
            </a>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="bg-white p-5 shadow-[0_12px_36px_rgba(11,45,96,0.08)] sm:p-7"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-600">
                Nombre
                <Input
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Tu nombre"
                  className={`${contactFieldClass} mt-1.5`}
                />
              </label>
              <label className="block text-xs font-semibold text-slate-600">
                Correo
                <Input
                  required
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className={`${contactFieldClass} mt-1.5`}
                />
              </label>
              <label className="block text-xs font-semibold text-slate-600">
                Teléfono
                <Input
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+51 999 999 999"
                  className={`${contactFieldClass} mt-1.5`}
                />
              </label>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-slate-600">
                  Motivo
                </p>
                <FormSelect
                  value={contactMotivo}
                  onChange={setContactMotivo}
                  options={CONTACT_MOTIVOS}
                  placeholder="Elige un motivo"
                  aria-label="Motivo de contacto"
                />
              </div>
              <label className="block text-xs font-semibold text-slate-600 sm:col-span-2">
                Mensaje
                <textarea
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  rows={4}
                  className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-[#0c1427] outline-none transition placeholder:text-slate-400 focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#F5C400] px-8 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
              >
                <Send className="h-4 w-4" />
                Enviar mensaje
              </button>
              {contactSent && (
                <p className="text-xs font-medium text-emerald-700">
                  Se abrirá tu correo para enviar el mensaje.
                </p>
              )}
              <p className="text-center text-[11px] text-slate-400">
                ¿Buscas precios?{' '}
                <Link
                  href="/cotizacion"
                  className="font-semibold text-[#0b2d60] underline-offset-2 hover:underline"
                >
                  Ir al cotizador
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0b2d60]">
        <div className="relative w-full">
          <Image
            src="/asesores-cta-bg.png"
            alt="Zeus Safety — consulta nuestros servicios"
            width={1717}
            height={916}
            quality={95}
            sizes="100vw"
            priority={false}
            className="h-auto w-full"
          />

          <div className="absolute inset-0 flex items-center">
            <div className="ml-auto w-full max-w-md px-5 py-8 sm:max-w-lg sm:px-8 lg:mr-[8%] lg:max-w-xl lg:px-0 xl:mr-[12%] xl:max-w-[34rem]">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
                Zeus Safety
              </p>
              <h2 className="text-2xl font-black leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
                ¡Consulta ahora los servicios que{' '}
                <span className="text-[#F5C400]">necesitas!</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-[15px]">
                Cotiza EPP certificado, recibe asesoría técnica y coordina
                despachos a nivel nacional con Zeus Safety.
              </p>

              <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <div className="flex items-center gap-2.5 border border-white/15 bg-[#0b2d60] px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2 sm:px-3.5 sm:py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">
                      Entrega rápida
                    </p>
                    <p className="hidden text-[11px] text-white/70 sm:block">
                      Despachos ágiles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 border border-white/15 bg-[#0b2d60] px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2 sm:px-3.5 sm:py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">
                      Precios competitivos
                    </p>
                    <p className="hidden text-[11px] text-white/70 sm:block">
                      Mejor relación valor
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 border border-white/15 bg-[#0b2d60] px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2 sm:px-3.5 sm:py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">
                      Cobertura nacional
                    </p>
                    <p className="hidden text-[11px] text-white/70 sm:block">
                      Envíos a todo el Perú
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/90 sm:mt-5 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#F5C400]" />
                  EPP certificado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Headphones className="h-3.5 w-3.5 text-[#F5C400]" />
                  Asesoría técnica
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#F5C400]" />
                  Respuesta rápida
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contacto"
                  className="inline-flex h-11 items-center bg-[#F5C400] px-6 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] sm:h-12 sm:px-7 sm:text-sm"
                >
                  Contáctanos
                </a>
                <Link
                  href="/cotizacion"
                  className="inline-flex h-11 items-center border-2 border-white bg-transparent px-6 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#0b2d60] sm:h-12 sm:px-7 sm:text-sm"
                >
                  Arma tu cotización
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14 xl:px-10"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C400]">
              Ayuda
            </p>
            <h2 className="text-2xl font-black uppercase tracking-wide text-[#0c1427] sm:text-3xl">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((item, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden border bg-white transition-colors ${
                    open
                      ? 'border-[#0b2d60]'
                      : 'border-slate-200 hover:border-[#0b2d60]/35'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="text-sm font-bold uppercase tracking-wide text-[#0b2d60]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#0b2d60] transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
