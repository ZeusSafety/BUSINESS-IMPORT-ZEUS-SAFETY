/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';

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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
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

const EMAIL = 'ventas@zeussafety.com';
const PHONE_DISPLAY = '+51 1 555 5555';
const PHONE_HREF = 'tel:+5115555555';
const WA_NUMBER = '51999999999';
const ADDRESS = 'Av. Industrial 123, Lima';

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

const fieldClass =
  'h-11 rounded-none border-slate-200 bg-white text-sm text-[#0c1427] transition-colors focus:border-[#0b2d60] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      `Nombre: ${name.trim()}`,
      `Correo: ${email.trim()}`,
      `Teléfono: ${phone.trim()}`,
      `Asunto: ${subject.trim()}`,
      '',
      message.trim(),
    ].join('\n');

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject.trim() || 'Consulta Zeus Safety',
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  const displayedAdvisors = advisors.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
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

      {/* Contacto + redes */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <h2 className="mb-8 text-center text-xl font-black uppercase tracking-wide text-[#0c1427]">
            Contacto
          </h2>
          <div className="mx-auto grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2">
            <a
              href={PHONE_HREF}
              className="flex items-start gap-3 transition-opacity hover:opacity-80"
            >
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2d60]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#0c1427]">
                Teléfono:{' '}
                <span className="font-semibold normal-case tracking-normal text-slate-700">
                  {PHONE_DISPLAY}
                </span>
              </p>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${DEFAULT_WA_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition-opacity hover:opacity-80"
            >
              <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#0c1427]">
                WhatsApp:{' '}
                <span className="font-semibold normal-case tracking-normal text-slate-700">
                  Escríbenos ahora
                </span>
              </p>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-start gap-3 transition-opacity hover:opacity-80"
            >
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2d60]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#0c1427]">
                Correo:{' '}
                <span className="break-all font-semibold normal-case tracking-normal text-slate-700">
                  {EMAIL}
                </span>
              </p>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2d60]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#0c1427]">
                Dirección:{' '}
                <span className="font-semibold normal-case tracking-normal text-slate-700">
                  {ADDRESS}
                </span>
              </p>
            </div>
          </div>

          <h3 className="mb-6 mt-12 text-center text-xl font-black uppercase tracking-wide text-[#0c1427]">
            Redes sociales
          </h3>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:justify-between sm:px-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0c1427] transition-colors hover:text-[#F5C400]"
            >
              <Facebook className="h-5 w-5 text-[#0b2d60]" />
              Facebook: Zeus Safety
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0c1427] transition-colors hover:text-[#F5C400]"
            >
              <TikTokIcon className="h-5 w-5 text-[#0b2d60]" />
              TikTok: zeus_safety
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0c1427] transition-colors hover:text-[#F5C400]"
            >
              <Instagram className="h-5 w-5 text-[#0b2d60]" />
              Instagram: zeussafety
            </a>
          </div>
        </div>
      </section>

      {/* Formulario Contáctenos */}
      <section className="border-b border-slate-200 bg-[#f3f5f8] py-12 lg:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(11,45,96,0.08)] sm:p-7"
            noValidate
          >
            <div className="mb-5 flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0c1427]">
                  Formulario Contáctenos
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Todos los campos son necesarios para atenderte mejor
                </p>
              </div>
              <span className="hidden h-10 w-1 shrink-0 bg-[#F5C400] sm:block" />
            </div>

            <div className="space-y-3">
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombres"
                className={fieldClass}
                aria-label="Nombres"
              />
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                className={fieldClass}
                aria-label="Correo"
              />
              <Input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className={fieldClass}
                aria-label="Teléfono"
              />
              <Input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Asunto"
                className={fieldClass}
                aria-label="Asunto"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mensaje"
                rows={4}
                aria-label="Mensaje"
                className="w-full resize-none border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0c1427] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0b2d60] focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
              />
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
            >
              <Send className="h-4 w-4" />
              Enviar consulta
            </button>

            {sent && (
              <p className="mt-3 text-center text-xs font-medium text-emerald-700">
                Se abrirá tu correo para enviar la consulta.
              </p>
            )}
          </motion.form>
        </div>
      </section>

      {/* Asesores — 4 en fila, más altos */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-14 xl:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C400]">
              Equipo
            </p>
            <h2 className="text-2xl font-black text-[#0c1427] sm:text-3xl">
              Nuestros asesores
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {displayedAdvisors.map((advisor, index) => (
                <motion.article
                  key={advisor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[#0b2d60]/30 hover:shadow-[0_14px_36px_rgba(11,45,96,0.12)]"
                >
                  <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden bg-slate-100 sm:min-h-[320px]">
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 z-10 h-8 w-10 bg-[#0b2d60]"
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
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0b2d60] text-5xl font-black text-white">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2d60]/90 via-[#0b2d60]/40 to-transparent px-3 pb-3 pt-16">
                      <h3 className="line-clamp-2 text-sm font-bold text-white">
                        {advisor.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#F5C400]">
                        <Award className="h-3 w-3" />
                        {advisor.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-3.5">
                    <ul className="mb-3 space-y-1.5 text-[11px] text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-[#0b2d60]" />
                        Respuesta inmediata
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Asesoría técnica
                      </li>
                    </ul>

                    {advisor.phone ? (
                      <a
                        href={`https://wa.me/${advisor.phone}?text=${DEFAULT_WA_MESSAGE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex h-10 w-full items-center justify-center gap-1.5 bg-[#25D366] text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A]"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    ) : (
                      <p className="mt-auto flex h-10 items-center justify-center gap-1.5 border border-slate-200 text-[11px] text-slate-500">
                        <Phone className="h-3 w-3" />
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

      {/* CTA dudas — full bleed arriba del FAQ */}
      <section className="relative w-full overflow-hidden bg-[#0b2d60]">
        <div className="relative h-[250px] w-full sm:h-[310px] lg:h-[380px]">
          <Image
            src="/dudas-cta.png"
            alt="¿Aún tienes dudas? Arma tu cotización o escribe a un asesor ahora."
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="w-full max-w-[560px] px-5 pb-6 pt-10 sm:px-10 sm:pb-10 lg:px-14 xl:px-20">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cotizacion"
                  className="inline-flex h-11 items-center bg-[#F5C400] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] shadow-lg transition-colors hover:bg-[#ffd233]"
                >
                  Arma tu cotización
                </Link>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex h-11 items-center border-2 border-white bg-white/10 px-5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0b2d60]"
                >
                  Escribirnos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14 xl:px-10">
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
