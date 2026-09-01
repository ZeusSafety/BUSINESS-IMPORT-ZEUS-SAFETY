/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock,
  Headphones,
  MapPin,
  MessageCircle,
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
import { IconBox } from '@/components/ui/icon-box';
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

const WA_NUMBER = '51999999999';
const EMAIL = 'ventas@zeussafety.com';
const ADDRESS = 'Av. Industrial 123, Lima';

const CONTACT_MOTIVOS = [
  { value: 'Consulta general', label: 'Consulta general' },
  { value: 'Soporte postventa', label: 'Soporte postventa' },
  { value: 'Alianzas comerciales', label: 'Alianzas comerciales' },
  { value: 'Otro', label: 'Otro' },
];

const ADVISOR_PERKS = [
  { icon: Zap, label: 'Respuesta inmediata', accent: 'brand' as const },
  { icon: Headphones, label: 'Asesoría técnica', accent: 'sky' as const },
  { icon: ShieldCheck, label: 'EPP certificado', accent: 'yellow' as const },
];

const CTA_FEATURES = [
  {
    icon: Truck,
    title: 'Entrega rápida',
    text: 'Despachos ágiles',
    accent: 'yellow' as const,
  },
  {
    icon: BadgeCheck,
    title: 'Precios competitivos',
    text: 'Mejor relación valor',
    accent: 'yellow' as const,
  },
  {
    icon: MapPin,
    title: 'Cobertura nacional',
    text: 'Envíos a todo el Perú',
    accent: 'yellow' as const,
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
      {/* Hero — solo texto, estilo Blog */}
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

      {/* Asesores — 4 en fila */}
      <section
        id="asesores"
        className="scroll-mt-28 w-full bg-[#f6f6f6] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#F5C400]">
              Equipo Zeus
            </p>
            <h2 className="text-2xl font-black tracking-tight text-[#0b2d60] sm:text-3xl">
              Nuestros asesores
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-14 bg-[#F5C400]" />
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
              {displayedAdvisors.map((advisor, index) => (
                <motion.article
                  key={advisor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group zeus-card flex flex-col overflow-hidden border-[#0b2d60]/10 transition duration-300 hover:-translate-y-1 hover:border-[#F5C400]/40 hover:shadow-[0_18px_44px_rgba(11,45,96,0.14)]"
                >
                  <div className="relative aspect-[4/5] max-h-[300px] overflow-hidden bg-[#0b2d60] sm:max-h-[320px]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 z-10 h-full w-1 bg-[#F5C400]"
                    />
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 z-10 h-9 w-11 bg-[#0b2d60]"
                      style={{
                        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 z-10 h-5 w-7 bg-[#F5C400]"
                      style={{
                        clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)',
                      }}
                    />
                    {advisor.avatar ? (
                      <img
                        src={advisor.avatar}
                        alt={advisor.name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl font-black text-white">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2d60] via-[#0b2d60]/90 to-transparent px-3.5 pb-3 pt-12">
                      <p className="mb-1 inline-flex max-w-full items-center gap-1.5 rounded-md border border-[#F5C400]/30 bg-[#F5C400] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0b2d60]">
                        <Phone className="h-3 w-3 shrink-0" strokeWidth={2.5} />
                        <span className="truncate">{advisor.specialty}</span>
                      </p>
                      <h3 className="line-clamp-2 text-sm font-black uppercase leading-tight tracking-wide text-white">
                        {advisor.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col bg-white p-3.5">
                    <div className="mb-3 grid grid-cols-3 gap-1.5">
                      {ADVISOR_PERKS.map((perk) => (
                        <div
                          key={perk.label}
                          className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-100 bg-[#f8fafc] px-1 py-2 text-center transition-colors group-hover:border-[#0b2d60]/15"
                        >
                          <IconBox
                            icon={perk.icon}
                            accent={perk.accent}
                            size="sm"
                            rounded="lg"
                            className="!rounded-lg"
                          />
                          <span className="text-[9px] font-bold uppercase leading-tight tracking-wide text-[#0b2d60]/80">
                            {perk.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {advisor.phone ? (
                      <a
                        href={`https://wa.me/${advisor.phone}?text=${DEFAULT_WA_MESSAGE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Escribir por WhatsApp
                        <ArrowRight className="h-3.5 w-3.5 opacity-80" />
                      </a>
                    ) : (
                      <p className="mt-auto flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-[#f8f9fb] text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        <Phone className="h-3.5 w-3.5" />
                        No disponible
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA servicios — imagen superior recortada + panel contenido */}
      <section className="relative overflow-hidden bg-[#071f45]">
        <div className="absolute left-0 top-0 z-10 h-full w-1.5 bg-[#F5C400]" />

        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative h-[200px] overflow-hidden sm:h-[240px] lg:h-auto lg:min-h-[400px]">
            <Image
              src="/asesores-cta-bg.png"
              alt="Zeus Safety — consulta nuestros servicios"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={false}
              className="object-cover object-[center_top] lg:object-[left_top]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#071f45]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#071f45]/90"
            />
          </div>

          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F5C400]">
              Zeus Safety
            </p>
            <h2 className="max-w-lg text-2xl font-black uppercase leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[2rem]">
              ¡Consulta ahora los servicios que{' '}
              <span className="text-[#F5C400]">necesitas!</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Cotiza EPP certificado, recibe asesoría técnica y coordina
              despachos a nivel nacional con el equipo Zeus Safety.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {CTA_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0b2d60]/60 px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2"
                >
                  <IconBox
                    icon={item.icon}
                    accent={item.accent}
                    size="sm"
                    rounded="lg"
                    className="!rounded-lg !bg-[#F5C400] !text-[#0b2d60]"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{item.title}</p>
                    <p className="text-[10px] text-white/60">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs font-semibold text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                EPP certificado
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headphones className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                Asesoría técnica
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#F5C400]" strokeWidth={2.25} />
                Respuesta rápida
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a
                href="#contacto"
                className="group zeus-btn-primary inline-flex h-11 items-center justify-center gap-2 px-6 text-xs"
              >
                Contáctanos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/cotizacion"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/35 bg-transparent px-6 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                <MessageCircle className="h-4 w-4" />
                Arma tu cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section id="contacto" className="scroll-mt-24 bg-[#f6f6f6] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
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

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3.5 rounded-xl bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
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
            <div className="flex items-start gap-3.5 rounded-xl bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)]">
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
              className="flex items-start gap-3.5 rounded-xl bg-white px-4 py-4 shadow-[0_8px_24px_rgba(11,45,96,0.06)] transition-shadow hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
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
            className="rounded-xl bg-white p-5 shadow-[0_12px_36px_rgba(11,45,96,0.08)] sm:p-7"
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
                className="zeus-btn-primary inline-flex h-12 items-center justify-center gap-2 px-8 text-sm"
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

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14 xl:px-10">
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
                  className={`overflow-hidden rounded-lg border bg-white transition-colors ${
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
