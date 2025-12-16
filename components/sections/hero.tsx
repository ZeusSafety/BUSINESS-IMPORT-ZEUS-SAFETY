'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Clock, Package, Users, CheckCircle2, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type RegionData = { REGION: string; TOTAL: number };

const apiURL =
  'https://crudventas-2946605267.us-central1.run.app?area=VENTAS_REGIONES';

const fallbackData: RegionData[] = [
  { REGION: 'LIMA', TOTAL: 4778414.63 },
  { REGION: 'ICA', TOTAL: 41675.0 },
  { REGION: 'AREQUIPA', TOTAL: 280000.0 },
  { REGION: 'CUSCO', TOTAL: 190000.0 },
  { REGION: 'PIURA', TOTAL: 230000.0 },
  { REGION: 'LA LIBERTAD', TOTAL: 310000.0 },
  { REGION: 'ANCASH', TOTAL: 180000.0 },
  { REGION: 'CAJAMARCA', TOTAL: 150000.0 },
  { REGION: 'LAMBAYEQUE', TOTAL: 120000.0 },
  { REGION: 'JUNIN', TOTAL: 140000.0 },
  { REGION: 'AYACUCHO', TOTAL: 95000.0 },
  { REGION: 'APURIMAC', TOTAL: 85000.0 },
  { REGION: 'HUANCAVELICA', TOTAL: 75000.0 },
  { REGION: 'PASCO', TOTAL: 65000.0 },
  { REGION: 'HUANUCO', TOTAL: 55000.0 },
  { REGION: 'SAN MARTIN', TOTAL: 45000.0 },
  { REGION: 'MOQUEGUA', TOTAL: 35000.0 },
  { REGION: 'TACNA', TOTAL: 25000.0 },
  { REGION: 'PUNO', TOTAL: 30000.0 },
];

// Mapeo de nombres de regiones a IDs del SVG
const regionToSvgId: Record<string, string> = {
  'LIMA': 'PELMA',
  'LIMA PROVINCE': 'PELIM',
  'LIMA PROVINCIA': 'PELIM',
  'LIMA METROPOLITANA': 'PELMA',
  'LIMA METROPOLITAN': 'PELMA',
  'CALLAO': 'PECAL',
  'PROVINCIA CONSTITUCIONAL DEL CALLAO': 'PECAL',
  'ICA': 'PEICA',
  'AREQUIPA': 'PEARE',
  'CUSCO': 'PECUS',
  'CUSC': 'PECUS',
  'CUSCO REGION': 'PECUS',
  'PIURA': 'PEPIU',
  'LA LIBERTAD': 'PELAL',
  'LIBERTAD': 'PELAL',
  'LIBERTAD REGION': 'PELAL',
  'ANCASH': 'PEANC',
  'ÁNCASH': 'PEANC',
  'ANCASH REGION': 'PEANC',
  'CAJAMARCA': 'PECAJ',
  'LAMBAYEQUE': 'PELAM',
  'TUMBES': 'PETUM',
  'AMAZONAS': 'PEAMA',
  'LORETO': 'PELOR',
  'SAN MARTIN': 'PESAM',
  'SAN MARTÍN': 'PESAM',
  'SAN MARTIN REGION': 'PESAM',
  'UCAYALI': 'PEUCA',
  'UCAYAL': 'PEUCA',
  'UCAYALI REGION': 'PEUCA',
  'MADRE DE DIOS': 'PEMDD',
  'MADRE DE DIOS REGION': 'PEMDD',
  'PASCO': 'PEPAS',
  'HUANUCO': 'PEHUC',
  'HUÁNUCO': 'PEHUC',
  'HUANUCO REGION': 'PEHUC',
  'JUNIN': 'PEJUN',
  'JUNÍN': 'PEJUN',
  'JUNIN REGION': 'PEJUN',
  'HUANCAYO': 'PEJUN',
  'HUANCAVELICA': 'PEHUV',
  'HUANCAVELICA REGION': 'PEHUV',
  'AYACUCHO': 'PEAYA',
  'AYACUCHO REGION': 'PEAYA',
  'APURIMAC': 'PEAPU',
  'APURÍMAC': 'PEAPU',
  'APURIMAC REGION': 'PEAPU',
  'PUNO': 'PEPUN',
  'PUNO REGION': 'PEPUN',
  'MOQUEGUA': 'PEMOQ',
  'MOQUEGUA REGION': 'PEMOQ',
  'TACNA': 'PETAC',
  'TACNA REGION': 'PETAC',
};

// Función de color igual al mapa principal
function heroIntensityColor(value: number) {
  // Gradiente de azul muy claro a azul oscuro (de menos a más intensidad)
  // value ya viene normalizado logarítmicamente (0 a 1)
  const start = [240, 248, 255]; // azul muy claro (casi blanco) - menos intensidad
  const end = [11, 45, 96]; // azul muy oscuro (#0b2d60) - más intensidad
  
  // Aplicar una curva de potencia para suavizar el gradiente
  const eased = Math.pow(value, 0.9);
  
  // Asegurar un mínimo visible para valores > 0
  const finalValue = value > 0 ? Math.max(eased, 0.15) : 0;
  const clamp = Math.min(Math.max(finalValue, 0), 1);
  
  const channel = start.map((s, i) =>
    Math.round(s + (end[i] - s) * clamp),
  );
  return `rgb(${channel[0]}, ${channel[1]}, ${channel[2]})`;
}

const normalizeRegionName = (name: string): string => {
  return name
    .toUpperCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export function HeroSection() {
  const [data, setData] = useState<RegionData[]>(fallbackData);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    
    fetch(apiURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((incoming: unknown) => {
        if (cancelled) return;
        
        if (Array.isArray(incoming) && incoming.length > 0) {
          const validData = incoming.filter(
            (item): item is RegionData =>
              item &&
              typeof item === 'object' &&
              'REGION' in item &&
              'TOTAL' in item &&
              item.REGION !== null &&
              item.REGION !== undefined &&
              typeof item.REGION === 'string' &&
              item.REGION.trim() !== '' &&
              (typeof item.TOTAL === 'number' || typeof item.TOTAL === 'string')
          ).map((item) => ({
            REGION: String(item.REGION).trim(),
            TOTAL: typeof item.TOTAL === 'string' ? parseFloat(item.TOTAL) || 0 : Number(item.TOTAL) || 0,
          }));
          
          if (validData.length > 0) {
            setData(validData);
          }
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.warn('Error al cargar datos de la API, usando datos de respaldo:', error);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    fetch('/pe.svg')
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch(() => {});
  }, []);

  const max = useMemo(() => {
    const totals = data
      .filter((d) => {
        const regionName = d?.REGION?.toUpperCase().trim();
        // Excluir Lima del cálculo del max
        return regionName !== 'LIMA' && regionName !== 'LIMA METROPOLITANA' && regionName !== 'LIMA METROPOLITAN';
      })
      .map((d) => d?.TOTAL)
      .filter((total): total is number => typeof total === 'number' && total > 0);
    return totals.length > 0 ? Math.max(...totals) : 1;
  }, [data]);

  const regionIntensities = useMemo(() => {
    const intensities: Record<string, number> = {};
    
    const normalizedMap: Record<string, string> = {};
    Object.entries(regionToSvgId).forEach(([key, value]) => {
      const normalized = normalizeRegionName(key);
      if (!normalizedMap[normalized]) {
        normalizedMap[normalized] = value;
      }
    });

    data.forEach((item) => {
      if (!item?.REGION || typeof item.TOTAL !== 'number') return;
      const regionName = item.REGION.toUpperCase().trim();
      
      // Excluir Lima del coloreado
      if (regionName === 'LIMA' || regionName === 'LIMA METROPOLITANA' || regionName === 'LIMA METROPOLITAN') {
        return;
      }

      let svgId = regionToSvgId[regionName];

      if (!svgId) {
        const normalizedName = normalizeRegionName(regionName);
        svgId = normalizedMap[normalizedName];

        if (!svgId) {
          const matchingKey = Object.keys(normalizedMap).find(
            (key) =>
              normalizedName.includes(key) || key.includes(normalizedName)
          );
          if (matchingKey) {
            svgId = normalizedMap[matchingKey];
          }
        }
      }

      if (svgId) {
        if (max && item.TOTAL > 0) {
          const logValue = Math.log10(item.TOTAL + 1) / Math.log10(max + 1);
          intensities[svgId] = logValue;
        } else {
          intensities[svgId] = 0;
        }
      }
    });

    return intensities;
  }, [data, max]);

  const modifiedSvg = useMemo(() => {
    if (!svgContent) return '';
    return svgContent;
  }, [svgContent]);

  // Aplicar colores al mapa después de que se renderice
  useEffect(() => {
    if (!modifiedSvg) return;

    const timeoutId = setTimeout(() => {
      const svgContainers = document.querySelectorAll('[data-svg-container] svg');

      svgContainers.forEach((svg) => {
        // Aplicar colores a las regiones con datos
        Object.entries(regionIntensities).forEach(([svgId, intensity]) => {
          const color = heroIntensityColor(intensity);
          const element = svg.querySelector(`#${svgId}`) as SVGGeometryElement | null;

          if (element && 'getBBox' in element) {
            element.setAttribute('fill', color);
          }
        });

        // Aplicar color base a las regiones sin datos
        const allRegions = svg.querySelectorAll('path[id^="PE"], circle[id^="PE"], polygon[id^="PE"], rect[id^="PE"]');
        allRegions.forEach((element) => {
          const svgId = element.getAttribute('id');
          if (svgId && !regionIntensities[svgId]) {
            element.setAttribute('fill', '#e6f3ff');
          }
        });
      });
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [modifiedSvg, regionIntensities]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1528] via-[#0b2d60] to-[#0c1427] text-white">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,181,226,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(16,58,123,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,181,226,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
      
      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-2 py-8 sm:gap-10 sm:py-6 sm:px-3 lg:grid-cols-[1.1fr_0.9fr] lg:px-4 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4 sm:space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-black leading-[1.1] sm:text-4xl sm:leading-[1.1] lg:text-6xl tracking-tight"
          >
            Protección total para{' '}
            <span className="block bg-gradient-to-r from-[#00d2ff] via-[#00b5e2] to-[#00d2ff] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              tu fuerza laboral
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg max-w-2xl"
          >
            Equipamos a equipos de alto riesgo<br />
            con EPP certificado y asesoría especializada<br />
            para minería, energía, construcción y oil & gas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1"
          >
            <Button 
              size="lg" 
              className="group relative px-4 py-3 text-xs font-semibold sm:px-6 sm:py-5 sm:text-sm bg-gradient-to-r from-[#103a7b] to-[#0b2d60] hover:from-[#154a9b] hover:to-[#0d3d70] shadow-xl shadow-[#103a7b]/40 hover:shadow-[#103a7b]/60 transition-all duration-300 hover:scale-[1.02] border border-white/10 overflow-hidden" 
              asChild
            >
              <Link href="/productos" className="relative z-10 flex items-center">
                Ver catálogo
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="group relative px-4 py-3 text-xs font-semibold sm:px-6 sm:py-5 sm:text-sm bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/30 shadow-md shadow-black/20" 
              asChild
            >
              <Link href="/cotizacion" className="relative z-10 flex items-center">
                <PlayCircle className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Hablar con un asesor
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-4"
          >
            <div className="group flex items-center gap-2 rounded-lg bg-gradient-to-br from-white/8 to-white/4 px-3 py-2 sm:gap-2.5 sm:px-4 sm:py-2.5 backdrop-blur-md border border-white/15 hover:border-white/25 hover:from-white/12 hover:to-white/6 transition-all duration-300 shadow-md shadow-black/10">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-400/20 sm:h-8 sm:w-8">
                <Clock className="h-3 w-3 text-emerald-300 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mb-0.5 sm:text-[10px]">Respuesta rápida</p>
                <p className="text-[10px] font-bold text-white sm:text-xs">&lt; 30 minutos</p>
              </div>
            </div>
            <div className="group flex items-center gap-2 rounded-lg bg-gradient-to-br from-white/8 to-white/4 px-3 py-2 sm:gap-2.5 sm:px-4 sm:py-2.5 backdrop-blur-md border border-white/15 hover:border-white/25 hover:from-white/12 hover:to-white/6 transition-all duration-300 shadow-md shadow-black/10">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#00b5e2]/30 to-[#00d2ff]/20 border border-[#00b5e2]/20 sm:h-8 sm:w-8">
                <Package className="h-3 w-3 text-[#00d2ff] sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mb-0.5 sm:text-[10px]">Stock disponible</p>
                <p className="text-[10px] font-bold text-white sm:text-xs">Proyectos gran escala</p>
              </div>
            </div>
          </motion.div>

          {/* Cuadros de métricas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 pt-2 sm:pt-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm border border-white/10 hover:border-[#00d2ff]/30 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#00d2ff]" />
                  <p className="text-[9px] sm:text-[10px] font-medium text-slate-300/90 leading-tight">Clientes B2B</p>
                </div>
                <p className="text-base sm:text-lg font-black text-white">250+</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />
                  <p className="text-[9px] sm:text-[10px] font-medium text-slate-300/90 leading-tight">Entregas OTIF</p>
                </div>
                <p className="text-base sm:text-lg font-black text-white">98%</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                  <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
                  <p className="text-[9px] sm:text-[10px] font-medium text-slate-300/90 leading-tight">Certificaciones</p>
                </div>
                <p className="text-sm sm:text-base font-black text-white">ANSI · ISO</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-sm border border-white/10 hover:border-[#00b5e2]/30 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#00b5e2]" />
                  <p className="text-[9px] sm:text-[10px] font-medium text-slate-300/90 leading-tight">Cobertura</p>
                </div>
                <p className="text-sm sm:text-base font-black text-white">Nacional</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          {/* Mapa de Perú */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] p-2 sm:p-3 shadow-xl shadow-black/50 border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,181,226,0.1),transparent_70%)]" />
            {isLoading ? (
              <div className="relative flex h-[200px] sm:h-[320px] items-center justify-center z-10">
                <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-[#00d2ff] border-t-transparent" />
              </div>
            ) : modifiedSvg ? (
              <div 
                className="relative w-full [&_svg]:w-full [&_svg]:h-auto z-10"
                data-svg-container
                dangerouslySetInnerHTML={{ __html: modifiedSvg }}
              />
            ) : (
              <div className="relative flex h-[200px] sm:h-[320px] items-center justify-center text-slate-300 z-10 text-sm sm:text-base">
                Cargando mapa...
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

