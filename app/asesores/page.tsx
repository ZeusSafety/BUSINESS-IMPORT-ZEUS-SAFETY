/* eslint-disable @next/next/no-img-element */
 'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Award, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
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
  'Hola 👋, me gustaría recibir información y cotizar productos de seguridad industrial de Zeus Safety.'
);

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const specialties = [
    { icon: '⛏️', name: 'Minería' },
    { icon: '🛢️', name: 'Oil & Gas' },
    { icon: '🏗️', name: 'Construcción' },
    { icon: '⚡', name: 'Eléctrico' },
  ];

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
        setError('No se pudieron cargar los asesores. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1528] via-[#0b2d60] to-[#0c1427] text-white">
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,181,226,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(16,58,123,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,181,226,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
        
        {/* Patrón de grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              Asesores especializados
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Equipo de{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                expertos
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-200 sm:text-xl">
              Contacta directamente con nuestros especialistas según tu industria. 
              Respuesta inmediata y asesoría técnica personalizada para tu proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
        {/* Specialties Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00b5e2] to-[#103a7b]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Especialidades que cubrimos</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specialties.map((specialty) => (
              <div
                key={specialty.name}
                className="group flex flex-col items-center gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-white p-5 text-center border border-slate-200 transition-all hover:border-[#103a7b]/30 hover:shadow-md"
              >
                <div className="text-4xl transition-transform group-hover:scale-110">{specialty.icon}</div>
                <p className="text-sm font-semibold text-slate-900">{specialty.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advisors Grid */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Nuestros asesores
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              Expertos certificados con años de experiencia en seguridad industrial
            </p>
          </motion.div>

          {loading && (
            <p className="text-center text-slate-500">Cargando asesores...</p>
          )}

          {error && !loading && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && advisors.length === 0 && (
            <p className="text-center text-slate-500">
              No hay asesores disponibles en este momento.
            </p>
          )}

          {!loading && !error && advisors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={advisor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#103a7b]/30"
                >
                  {/* Subtle gradient accent at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d2ff] via-[#00b5e2] to-[#103a7b]" />
                  
                  {/* Avatar Section */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {advisor.avatar ? (
                        <img
                          src={advisor.avatar}
                          alt={advisor.name}
                          className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2] to-[#103a7b] text-2xl font-bold text-white shadow-md ring-4 ring-white/50">
                          {advisor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative flex-1 flex flex-col p-5 bg-white">
                    {/* Name and Specialty */}
                    <div className="mb-4 space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2">
                        {advisor.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-50">
                          <Award className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <p className="text-sm font-semibold text-amber-700">
                          {advisor.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-5 space-y-2 border-t border-slate-100 pt-4 flex-1">
                      <div className="flex items-center gap-2.5 text-xs text-slate-700">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[#00b5e2]/10 shrink-0">
                          <Clock className="h-3.5 w-3.5 text-[#00b5e2]" />
                        </div>
                        <span className="font-medium">Respuesta inmediata</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-100 shrink-0">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                        <span className="font-medium">Asesoría técnica especializada</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 shrink-0">
                          <Award className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <span className="font-medium">Certificaciones internacionales</span>
                      </div>
                    </div>

                    {/* WhatsApp Button */}
                    {advisor.phone ? (
                      <a
                        href={`https://wa.me/${advisor.phone}?text=${DEFAULT_WA_MESSAGE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-11 px-4 text-sm inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>Chatear por WhatsApp</span>
                      </a>
                    ) : (
                      <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-center">
                        <p className="text-xs font-medium text-slate-500 flex items-center justify-center gap-2">
                          <Phone className="h-3.5 w-3.5" />
                          Teléfono no disponible
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] p-8 text-center text-white shadow-xl"
        >
          <div className="relative space-y-4">
            <h3 className="text-2xl font-bold sm:text-3xl">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="mx-auto max-w-2xl text-slate-200">
              Nuestro equipo está listo para ayudarte a encontrar las mejores soluciones 
              de seguridad industrial para tu proyecto.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] text-white font-semibold shadow-lg hover:from-[#00b5e2] hover:to-[#0099cc] hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="tel:+51999999999">Llamar ahora</a>
              </Button>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white font-semibold hover:bg-white/20 hover:border-white/60 transition-all duration-300"
                asChild
              >
                <a href="mailto:contacto@zeussafety.com">Enviar email</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

