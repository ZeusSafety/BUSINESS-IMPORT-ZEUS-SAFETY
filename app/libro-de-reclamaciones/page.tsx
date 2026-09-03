'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { FormSelect } from '@/components/ui/form-select';

const COMPANY = {
  name: 'ZEUS SAFETY S.A.C.',
  brand: 'Zeus Safety',
  ruc: '20601234567',
  address: 'Av. Guillermo Dansey 401, C.C Plaza Ferretero Las Malvinas, Lima',
  code: '0001',
  email: 'reclamaciones@zeussafety.com',
};

const SEDE_OPTIONS = [
  { value: '0001', label: '0001 - SEDE PRINCIPAL' },
];

const DOC_OPTIONS = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'CE' },
  { value: 'Pasaporte', label: 'Pasaporte' },
  { value: 'RUC', label: 'RUC' },
];

const COMPROBANTE_OPTIONS = [
  { value: 'Sin comprobante', label: 'Sin comprobante' },
  { value: 'Boleta', label: 'Boleta' },
  { value: 'Factura', label: 'Factura' },
  { value: 'Nota de venta', label: 'Nota de venta' },
  { value: 'Otro', label: 'Otro' },
];

const DISTRITO_OPTIONS = [
  'Ancón',
  'Ate',
  'Barranco',
  'Breña',
  'Callao',
  'Carabayllo',
  'Chorrillos',
  'Comas',
  'El Agustino',
  'Independencia',
  'Jesús María',
  'La Molina',
  'La Victoria',
  'Lima',
  'Lince',
  'Los Olivos',
  'Magdalena del Mar',
  'Miraflores',
  'Pueblo Libre',
  'Puente Piedra',
  'Rímac',
  'San Borja',
  'San Isidro',
  'San Juan de Lurigancho',
  'San Juan de Miraflores',
  'San Luis',
  'San Martín de Porres',
  'San Miguel',
  'Santa Anita',
  'Santiago de Surco',
  'Surquillo',
  'Villa El Salvador',
  'Villa María del Triunfo',
  'Otro',
].map((d) => ({ value: d, label: d }));

const fieldClass =
  'h-10 w-full border border-slate-200 bg-[#f7f8fa] px-3 text-sm text-[#0c1427] outline-none transition placeholder:text-slate-400 focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]';

function formatLongDate(date: Date) {
  const raw = new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export default function ComplaintsBookPage() {
  const todayLabel = useMemo(() => formatLongDate(new Date()), []);
  const [view, setView] = useState<'form' | 'consult'>('form');

  const [sede, setSede] = useState('0001');
  const [personType, setPersonType] = useState<'natural' | 'juridica'>(
    'natural',
  );
  const [isMinor, setIsMinor] = useState(false);
  const [docType, setDocType] = useState('DNI');
  const [docNumber, setDocNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');

  const [bienType, setBienType] = useState<'producto' | 'servicio'>('producto');
  const [comprobanteType, setComprobanteType] = useState('Sin comprobante');
  const [comprobanteNumber, setComprobanteNumber] = useState('');
  const [monto, setMonto] = useState('');
  const [bienDescripcion, setBienDescripcion] = useState('');

  const [claimType, setClaimType] = useState<'queja' | 'reclamo'>('reclamo');
  const [detalle, setDetalle] = useState('');
  const [pedido, setPedido] = useState('');
  const [fileName, setFileName] = useState('');
  const [consent, setConsent] = useState(false);
  const [humanCheck, setHumanCheck] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [consultCode, setConsultCode] = useState('');
  const [consultError, setConsultError] = useState(false);

  const needsComprobante = comprobanteType !== 'Sin comprobante';
  const sedeLabel =
    SEDE_OPTIONS.find((s) => s.value === sede)?.label ?? SEDE_OPTIONS[0].label;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!consent) {
      setError('Debes autorizar el tratamiento de datos personales.');
      return;
    }
    if (!humanCheck) {
      setError('Marca la casilla de verificación para continuar.');
      return;
    }

    const body = [
      'LIBRO DE RECLAMACIONES — ZEUS SAFETY',
      `Fecha: ${todayLabel}`,
      `Sede: ${sedeLabel}`,
      `RUC: ${COMPANY.ruc}`,
      '',
      '1. CONSUMIDOR',
      `Tipo: ${personType === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}`,
      `Menor de edad: ${isMinor ? 'Sí' : 'No'}`,
      `Documento: ${docType} ${docNumber}`,
      `Nombres: ${fullName}`,
      `Teléfono: ${phone}`,
      `Correo: ${email}`,
      `Distrito: ${district}`,
      `Dirección: ${address}`,
      '',
      '2. BIEN CONTRATADO',
      `Tipo: ${bienType === 'producto' ? 'Producto' : 'Servicio'}`,
      `Comprobante: ${comprobanteType} ${comprobanteNumber}`.trim(),
      `Monto reclamado: ${monto || '—'}`,
      `Descripción: ${bienDescripcion}`,
      '',
      '3. DETALLE',
      `Tipo: ${claimType === 'queja' ? 'Queja' : 'Reclamo'}`,
      `Detalle: ${detalle}`,
      `Pedido: ${pedido}`,
      fileName ? `Archivo: ${fileName}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const subject = encodeURIComponent(
      `[Libro de Reclamaciones] ${claimType === 'queja' ? 'Queja' : 'Reclamo'} — ${fullName}`,
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const handleConsult = (e: FormEvent) => {
    e.preventDefault();
    if (!consultCode.trim()) {
      setConsultError(true);
      return;
    }
    setConsultError(false);
    const subject = encodeURIComponent(
      `Consulta de reclamo — código ${consultCode.trim()}`,
    );
    const body = encodeURIComponent(
      `Deseo consultar el estado de mi reclamo/queja.\nCódigo: ${consultCode.trim()}`,
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#eef1f5]">
      {/* Barra Volver */}
      <div className="bg-[#0b2d60]">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-2.5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:text-[#F5C400]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al sitio
          </Link>
        </div>
      </div>

      {/* Header libro */}
      <header className="bg-[#F5C400]">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-7">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-black uppercase tracking-wide text-[#0b2d60] sm:text-3xl">
              {COMPANY.name}
            </h1>
            <p className="mt-1 text-base font-bold text-[#0b2d60] sm:text-lg">
              Libro de Reclamaciones
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#0b2d60]/85">
              Conforme a lo establecido en el Código de Protección y Defensa del
              Consumidor, esta institución cuenta con un Libro de Reclamaciones
              Virtual a su disposición.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setView((v) => (v === 'consult' ? 'form' : 'consult'))
            }
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start border-2 border-[#0b2d60] bg-transparent px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white lg:self-center"
          >
            <Search className="h-4 w-4" />
            Consultar reclamo
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {view === 'consult' ? (
          <div className="mx-auto max-w-lg overflow-hidden border border-slate-200 bg-white shadow-[0_16px_48px_rgba(11,45,96,0.12)]">
            <div className="h-1.5 w-full bg-[#F5C400]" />
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Seguimiento
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-[#0b2d60]">
                Consultar su reclamo
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Ingresa el código que recibiste por correo para consultar el
                estado de tu queja o reclamo.
              </p>

              <form onSubmit={handleConsult} className="mt-7 space-y-5">
                <label className="block text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                  Código de solicitud
                  <div className="relative mt-2">
                    <input
                      value={consultCode}
                      onChange={(e) => {
                        setConsultCode(e.target.value);
                        setConsultError(false);
                      }}
                      placeholder="Ej. ZR-2026-0001"
                      className={`h-12 w-full border bg-white px-4 text-sm font-medium text-[#0c1427] outline-none transition placeholder:font-normal placeholder:text-slate-400 ${
                        consultError
                          ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                          : 'border-slate-200 focus:border-[#0b2d60] focus:shadow-[0_0_0_3px_rgba(11,45,96,0.1)]'
                      }`}
                    />
                    {consultError && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-red-500">
                        !
                      </span>
                    )}
                  </div>
                  {consultError && (
                    <span className="mt-1.5 block text-[11px] font-medium normal-case tracking-normal text-red-600">
                      Ingresa un código válido para continuar.
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </button>

                <button
                  type="button"
                  onClick={() => setView('form')}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#0b2d60] text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0a2552]"
                >
                  <BookOpen className="h-4 w-4" />
                  Ir al libro de reclamaciones
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-slate-200 bg-white shadow-[0_8px_30px_rgba(11,45,96,0.06)]"
            noValidate
          >
            <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h2 className="text-base font-bold text-[#0c1427]">
                Hoja de Reclamación o Queja
              </h2>
              <p className="text-sm text-slate-500">{todayLabel}</p>
            </div>

            {/* Establecimiento */}
            <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Sede / Establecimiento
                  </p>
                  <FormSelect
                    value={sede}
                    onChange={setSede}
                    options={SEDE_OPTIONS}
                    aria-label="Sede / Establecimiento"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-500">RUC</p>
                  <p className="mt-1 font-bold text-[#0c1427]">{COMPANY.ruc}</p>
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-500">Razón Social</p>
                  <p className="mt-1 font-bold text-[#0c1427]">{COMPANY.name}</p>
                </div>
                <div className="text-xs sm:col-span-2">
                  <p className="font-semibold text-slate-500">
                    Dirección Sucursal
                  </p>
                  <p className="mt-1 font-bold text-[#0c1427]">
                    {COMPANY.address}
                  </p>
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-500">
                    Código de identificación
                  </p>
                  <p className="mt-1 font-bold text-[#0c1427]">{COMPANY.code}</p>
                </div>
              </div>
            </div>

            {/* 1. Consumidor */}
            <section>
              <div className="bg-[#0b2d60] px-4 py-2.5 sm:px-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                  1. Identificación del consumidor reclamante
                </h3>
              </div>
              <div className="space-y-4 px-4 py-5 sm:px-6">
                <div className="flex flex-wrap items-center gap-5">
                  <label className="inline-flex items-center gap-2 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="personType"
                      checked={personType === 'natural'}
                      onChange={() => setPersonType('natural')}
                      className="accent-[#0b2d60]"
                    />
                    Persona Natural
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="personType"
                      checked={personType === 'juridica'}
                      onChange={() => setPersonType('juridica')}
                      className="accent-[#0b2d60]"
                    />
                    Persona Jurídica
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#0c1427]">
                    <input
                      type="checkbox"
                      checked={isMinor}
                      onChange={(e) => setIsMinor(e.target.checked)}
                      className="accent-[#0b2d60]"
                    />
                    Soy menor de edad
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Tipo de Documento
                    </p>
                    <FormSelect
                      value={docType}
                      onChange={setDocType}
                      options={DOC_OPTIONS}
                      aria-label="Tipo de Documento"
                    />
                  </div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Número de Documento
                    <input
                      required
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-1">
                    {personType === 'juridica'
                      ? 'Razón Social / Nombres'
                      : 'Nombres y Apellidos'}
                    <input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Teléfono
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Correo Electrónico
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Distrito
                    </p>
                    <FormSelect
                      value={district}
                      onChange={setDistrict}
                      options={DISTRITO_OPTIONS}
                      placeholder="Seleccione"
                      aria-label="Distrito"
                    />
                  </div>
                  <label className="block text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-3">
                    Dirección de Domicilio
                    <input
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* 2. Bien */}
            <section>
              <div className="bg-[#0b2d60] px-4 py-2.5 sm:px-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                  2. Identificación del bien contratado
                </h3>
              </div>
              <div className="space-y-4 px-4 py-5 sm:px-6">
                <div className="flex flex-wrap gap-5">
                  <label className="inline-flex items-center gap-2 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="bienType"
                      checked={bienType === 'producto'}
                      onChange={() => setBienType('producto')}
                      className="accent-[#0b2d60]"
                    />
                    Producto
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="bienType"
                      checked={bienType === 'servicio'}
                      onChange={() => setBienType('servicio')}
                      className="accent-[#0b2d60]"
                    />
                    Servicio
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Tipo de Documento
                    </p>
                    <FormSelect
                      value={comprobanteType}
                      onChange={(v) => {
                        setComprobanteType(v);
                        if (v === 'Sin comprobante') setComprobanteNumber('');
                      }}
                      options={COMPROBANTE_OPTIONS}
                      aria-label="Tipo de comprobante"
                    />
                  </div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Número de Documento
                    <input
                      value={comprobanteNumber}
                      onChange={(e) => setComprobanteNumber(e.target.value)}
                      disabled={!needsComprobante}
                      className={`${fieldClass} mt-1 disabled:cursor-not-allowed disabled:opacity-55`}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">
                    Monto Reclamado
                    <input
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      placeholder="S/"
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-3">
                    Descripción del Producto o Servicio
                    <textarea
                      required
                      value={bienDescripcion}
                      onChange={(e) => setBienDescripcion(e.target.value)}
                      rows={3}
                      className="mt-1 w-full resize-y border border-slate-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-[#0c1427] outline-none transition focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* 3. Detalle */}
            <section>
              <div className="bg-[#0b2d60] px-4 py-2.5 sm:px-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                  3. Detalle de la reclamación y pedido del consumidor
                </h3>
              </div>
              <div className="space-y-4 px-4 py-5 sm:px-6">
                <div className="space-y-3">
                  <label className="flex items-start gap-2.5 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="claimType"
                      checked={claimType === 'queja'}
                      onChange={() => setClaimType('queja')}
                      className="mt-1 accent-[#0b2d60]"
                    />
                    <span>
                      <span className="font-bold">Queja:</span> Disconformidad
                      no relacionada a los productos o servicios; o, malestar o
                      descontento respecto a la atención al público.
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 text-sm text-[#0c1427]">
                    <input
                      type="radio"
                      name="claimType"
                      checked={claimType === 'reclamo'}
                      onChange={() => setClaimType('reclamo')}
                      className="mt-1 accent-[#0b2d60]"
                    />
                    <span>
                      <span className="font-bold">Reclamo:</span> Disconformidad
                      relacionada a los productos o servicios.
                    </span>
                  </label>
                </div>

                <label className="block text-xs font-semibold text-slate-600">
                  Detalle
                  <textarea
                    required
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    rows={4}
                    className="mt-1 w-full resize-y border border-slate-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-[#0c1427] outline-none transition focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
                  />
                </label>

                <label className="block text-xs font-semibold text-slate-600">
                  Pedido
                  <textarea
                    required
                    value={pedido}
                    onChange={(e) => setPedido(e.target.value)}
                    rows={3}
                    className="mt-1 w-full resize-y border border-slate-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-[#0c1427] outline-none transition focus:border-[#0b2d60] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]"
                  />
                </label>

                <div>
                  <p className="text-xs font-semibold text-slate-600">
                    Archivo Adjunto{' '}
                    <span className="font-normal text-slate-500">
                      (Tipos aceptados .jpg, .png, .pdf, .doc, .xls — hasta
                      20MB)
                    </span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 border border-slate-200 bg-[#f7f8fa] px-3 py-2">
                    <label className="inline-flex h-9 cursor-pointer items-center bg-[#0b2d60] px-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#0a2552]">
                      Seleccionar archivo
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name ?? '')
                        }
                      />
                    </label>
                    <span className="text-sm text-slate-500">
                      {fileName || 'Ningún archivo seleccionado'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border border-slate-200 bg-[#f7f8fa] p-4 text-xs leading-relaxed text-slate-600">
                  <p>
                    <span className="font-bold text-[#0c1427]">
                      Observaciones y acciones tomadas por el proveedor.
                    </span>{' '}
                    La respuesta a la presente será atendida mediante correo
                    electrónico a la dirección que usted ha consignado en la
                    presente hoja de reclamación.
                  </p>
                </div>

                <div className="space-y-2 border border-slate-200 bg-[#f7f8fa] p-4 text-xs leading-relaxed text-slate-600">
                  <p>
                    <span className="font-bold text-[#0c1427]">1.</span> La
                    formulación del reclamo no impide acudir a otras vías de
                    solución de controversias ni es requisito previo para
                    presentar una denuncia ante el INDECOPI.
                  </p>
                  <p>
                    <span className="font-bold text-[#0c1427]">2.</span> El
                    proveedor deberá dar respuesta al reclamo en un plazo no
                    mayor a quince (15) días hábiles, improrrogables.
                  </p>
                </div>

                <label className="flex items-start gap-2.5 text-sm text-[#0c1427]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#0b2d60]"
                  />
                  <span>
                    Declaro ser el titular del contenido del presente
                    formulario, y autorizo el tratamiento de mis datos
                    personales exclusivamente para la gestión de mi reclamo.
                  </span>
                </label>

                {/* Captcha + Enviar alineados */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <button
                    type="button"
                    onClick={() => setHumanCheck((v) => !v)}
                    className={`inline-flex h-12 items-center gap-3 border bg-white px-4 text-sm text-[#0c1427] transition-colors sm:min-w-[200px] ${
                      humanCheck
                        ? 'border-[#0b2d60]'
                        : 'border-slate-200 hover:border-[#0b2d60]/40'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
                        humanCheck
                          ? 'border-[#0b2d60] bg-[#0b2d60] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {humanCheck && (
                        <svg
                          viewBox="0 0 12 10"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <path d="M1 5l3.5 3.5L11 1" />
                        </svg>
                      )}
                    </span>
                    No soy un robot
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-12 flex-1 items-center justify-center bg-[#F5C400] px-8 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] sm:max-w-xs"
                  >
                    Enviar reclamo
                  </button>
                </div>

                {error && (
                  <p className="text-sm font-medium text-red-600">{error}</p>
                )}
                {sent && (
                  <p className="text-sm font-medium text-emerald-700">
                    Se abrirá tu correo para enviar el reclamo. Conserva una
                    copia de tu mensaje como constancia.
                  </p>
                )}
              </div>
            </section>
          </form>
        )}
      </main>

      {/* Footer propio */}
      <footer className="mt-auto bg-[#0b2d60] text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="max-w-3xl text-xs leading-relaxed text-white/85 sm:text-sm">
            Una vez registrada tu hoja de reclamación, recibirás un correo de
            confirmación con un código de seguimiento. La respuesta se emitirá
            en un plazo máximo de quince (15) días hábiles, conforme a la Ley
            N.º 29571 — Código de Protección y Defensa del Consumidor.
          </p>
          <p className="font-semibold text-[#F5C400]">
            © {new Date().getFullYear()} {COMPANY.brand}. Libro de Reclamaciones
            Virtual.
          </p>
          <Link
            href="/"
            className="mt-1 inline-flex h-11 items-center gap-2 bg-[#F5C400] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio Zeus Safety
          </Link>
        </div>
      </footer>
    </div>
  );
}
