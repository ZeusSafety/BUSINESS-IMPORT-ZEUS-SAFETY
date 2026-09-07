/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ClipboardList,
  Clock,
  Headphones,
  MapPin,
  Phone,
  Send,
  Shield,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
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

type ApiAdvisor = {
  NOMBRE: string;
  SEGUNDO_NOMBRE: string | null;
  APELLIDO: string;
  SEGUNDO_APELLIDO: string | null;
  IMAGE_URL: string | null;
  DATOS: string;
};

type ContactData = {
  TIPO: string;
  MEDIO: string;
  NOMBRE: string;
  CONTENIDO: string;
};

type Advisor = {
  id: string;
  name: string;
  specialty: string;
  avatar?: string | null;
  phone?: string | null;
};

const API_URL =
  'https://productoscrud-2946605267.us-central1.run.app?metodo=ASESORES_PAGINA_ESTATICA';

const DEFAULT_WA_MESSAGE = encodeURIComponent(
  'Hola 👋, me gustaría recibir información y cotizar productos de seguridad industrial de Zeus Safety.',
);

const WA_NUMBER = '51916532849';
const EMAIL = 'zeus.safety2020@gmail.com';
const ADDRESS = 'Av. Guillermo Dansey 401, C.C Plaza Ferretero Las Malvinas, Lima';

const CONTACT_MOTIVOS = [
  { value: 'Consulta general', label: 'Consulta general' },
  { value: 'Soporte postventa', label: 'Soporte postventa' },
  { value: 'Alianzas comerciales', label: 'Alianzas comerciales' },
  { value: 'Otro', label: 'Otro' },
];

const CTA_FEATURES = [
  {
    icon: Truck,
    title: 'Entrega rápida',
    text: 'Despachos ágiles',
  },
  {
    icon: BadgeCheck,
    title: 'Precios competitivos',
    text: 'Mejor relación valor',
  },
  {
    icon: MapPin,
    title: 'Cobertura nacional',
    text: 'Envíos a todo el Perú',
  },
];

const contactFieldClass =
  'h-11 rounded-lg border-slate-200 bg-[#f7f8fa] text-sm text-[#0c1427] transition-colors focus:border-[#0b2d60] focus:bg-white focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

const FAQS = [
  {
    q: '¿Dónde está ubicada su tienda física?',
    a: `Nuestra tienda y showroom están en ${ADDRESS}. Horario de atención: lunes a sábado de 9:00 a 17:30. También puedes coordinar visita con un asesor.`,
  },
  {
    q: '¿Ofrecen opciones de pago contra entrega?',
    a: 'Sí. Según zona y tipo de pedido podemos coordinar pago contra entrega u otras formas de pago empresariales. Un asesor te confirma las opciones disponibles para tu caso.',
  },
  {
    q: '¿Está disponible el producto que busco?',
    a: 'Revisa el stock en nuestro catálogo online o consulta directamente con un asesor. Si el ítem no figura, te ayudamos a validar disponibilidad y alternativas equivalentes certificadas.',
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
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMotivo, setContactMotivo] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error al cargar asesores (${response.status})`);
        }

        const data: ApiAdvisor[] = await response.json();

        const mapped: Advisor[] = data.map((item, index) => {
          let contacts: ContactData[] = [];
          try {
            contacts = JSON.parse(item.DATOS || '[]') as ContactData[];
          } catch {
            contacts = [];
          }

          const phoneContact =
            contacts.find((c) => c.MEDIO.toUpperCase() === 'TELEFONO') ?? null;

          const rawPhone = phoneContact?.CONTENIDO?.trim() ?? null;

          let waPhone: string | null = rawPhone;
          if (rawPhone && /^[0-9]{9}$/.test(rawPhone)) {
            waPhone = `51${rawPhone}`;
          }

          const fullName = [
            item.NOMBRE,
            item.SEGUNDO_NOMBRE,
            item.APELLIDO,
            item.SEGUNDO_APELLIDO,
          ]
            .filter(Boolean)
            .join(' ');

          return {
            id: `${index}-${fullName}`,
            name: fullName,
            specialty: phoneContact?.NOMBRE || 'Asesor corporativo',
            avatar: item.IMAGE_URL,
            phone: waPhone,
          };
        });

        setAdvisors(mapped);
      } catch (err) {
        console.error(err);
        setError(
          'No se pudieron cargar los asesores. Intenta nuevamente más tarde.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

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

  const displayedAdvisors = advisors.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Asesores */}
      <section
        id="asesores"
        className="scroll-mt-28 w-full bg-[#f3f5f8] px-3 py-12 sm:px-4 lg:px-6 lg:py-16 xl:px-8"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Equipo Zeus
            </p>
            <h2 className="text-2xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-3xl">
              Nuestros asesores
            </h2>
            <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-[#F5C400]" />
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
              Especialistas listos para cotizar y orientarte en EPP industrial.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <Spinner size="md" />
            </div>
          )}

          {error && !loading && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && advisors.length === 0 && (
            <p className="text-center text-slate-500">
              No hay asesores disponibles en este momento.
            </p>
          )}

          {!loading && !error && displayedAdvisors.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {displayedAdvisors.map((advisor) => (
                <article
                  key={advisor.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_32px_rgba(11,45,96,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0b2d60]/30 hover:shadow-[0_20px_48px_rgba(11,45,96,0.14)]"
                >
                  <div className="relative h-[320px] overflow-hidden bg-[#e8eef5] sm:h-[360px]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 z-10 h-full w-1 bg-[#F5C400]"
                    />
                    {advisor.avatar ? (
                      <img
                        src={advisor.avatar}
                        alt={advisor.name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0b2d60] text-5xl font-black text-white">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col border-t border-slate-100 px-5 pb-5 pt-4">
                    <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0b2d60]/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
                      <Phone className="h-3 w-3 text-[#F5C400]" strokeWidth={2.5} />
                      {advisor.specialty}
                    </p>
                    <h3 className="mt-2.5 line-clamp-2 text-[15px] font-bold uppercase leading-snug tracking-wide text-[#0b2d60]">
                      {advisor.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      Asesor Zeus Safety · Cotización y orientación en EPP
                      industrial.
                    </p>

                    <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.4} />
                        Respuesta rápida
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.4} />
                        EPP certificado
                      </span>
                    </div>

                    {advisor.phone ? (
                      <a
                        href={`https://wa.me/${advisor.phone}?text=${DEFAULT_WA_MESSAGE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn relative mt-4 inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] text-[11px] font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)]"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 origin-left scale-x-0 bg-[#20BA5A] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                        />
                        <WhatsAppIcon className="relative z-10 h-4 w-4" />
                        <span className="relative z-10">Escribir por WhatsApp</span>
                        <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="mt-4 flex h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-[#f8f9fb] text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        <Phone className="h-3.5 w-3.5" />
                        No disponible
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA servicios — imagen visible + panel sólido */}
      <section className="relative overflow-hidden bg-[#0b2d60]">
        <div className="absolute left-0 top-0 z-20 h-full w-1.5 bg-[#F5C400]" />

        <div className="mx-auto grid min-h-[560px] max-w-[1600px] lg:min-h-[640px] lg:grid-cols-2">
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[640px]">
            <Image
              src="/asesores-cta-bg.png"
              alt="Zeus Safety — consulta nuestros servicios"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_20%] lg:object-[left_center]"
              priority={false}
            />
          </div>

          <div className="relative flex items-center bg-[#0b2d60] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-14">
            <div className="w-full max-w-xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F5C400]">
                Zeus Safety
              </p>
              <h2 className="text-2xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-3xl lg:text-[2.4rem]">
                ¡Consulta ahora los servicios que{' '}
                <span className="text-[#F5C400]">necesitas!</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-[15px]">
                Cotiza EPP certificado, recibe asesoría técnica y coordina
                despachos a nivel nacional con el equipo Zeus Safety.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {CTA_FEATURES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/15 bg-[#103a7b] px-4 py-4 transition-colors hover:border-[#F5C400]/60"
                    >
                      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C400] text-[#0b2d60]">
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/65">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.4} />
                  EPP certificado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Headphones className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.4} />
                  Asesoría técnica
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.4} />
                  Respuesta rápida
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contacto"
                  className="group/btn relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F5C400] px-6 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(245,196,0,0.4)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <span className="relative z-10">Contáctanos</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
                <Link
                  href="/cotizacion"
                  className="group/btn relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/40 bg-transparent px-6 text-xs font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-[#F5C400]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                  />
                  <ClipboardList
                    className="relative z-10 h-4 w-4 transition-colors group-hover/btn:text-[#0b2d60]"
                    strokeWidth={2.4}
                  />
                  <span className="relative z-10 transition-colors group-hover/btn:text-[#0b2d60]">
                    Arma tu cotización
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contáctanos */}
      <section
        id="contacto"
        className="scroll-mt-24 bg-[#f6f6f6] px-2 py-10 sm:px-3 lg:px-4 lg:py-14 xl:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Contáctanos
            </p>
            <h2 className="text-2xl font-black text-[#0c1427] sm:text-3xl">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Escríbenos para consultas generales. Si necesitas precios de
              productos, usa el cotizador.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
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
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
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
              className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)] transition-shadow hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0c1427]">
                  Chat en línea
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Escríbenos por WhatsApp ahora
                </p>
              </div>
            </a>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_36px_rgba(11,45,96,0.08)] sm:p-7"
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
                  className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-[#0c1427] outline-none transition placeholder:text-slate-400 focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <button
                type="submit"
                className="group/btn relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white px-8 text-sm font-bold uppercase tracking-wide text-[#0b2d60] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5C400] hover:shadow-[0_6px_18px_rgba(245,196,0,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                />
                <Send className="relative z-10 h-4 w-4" strokeWidth={2.4} />
                <span className="relative z-10">Enviar mensaje</span>
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

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 border-t border-slate-200 bg-white px-2 py-10 sm:px-3 lg:px-4 lg:py-14 xl:px-6"
      >
        <div className="mx-auto max-w-5xl">
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
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
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
