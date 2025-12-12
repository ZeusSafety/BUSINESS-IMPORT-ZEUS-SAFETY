'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { useEffect, useMemo, useState } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

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
  // Lima
  'LIMA': 'PELMA',
  'LIMA PROVINCE': 'PELIM',
  'LIMA PROVINCIA': 'PELIM',
  'LIMA METROPOLITANA': 'PELMA',
  'LIMA METROPOLITAN': 'PELMA',
  // Callao
  'CALLAO': 'PECAL',
  'PROVINCIA CONSTITUCIONAL DEL CALLAO': 'PECAL',
  // Costa Norte
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
  // Selva
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
  // Sierra
  'PASCO': 'PEPAS',
  'HUANUCO': 'PEHUC',
  'HUÁNUCO': 'PEHUC',
  'HUANUCO REGION': 'PEHUC',
  'JUNIN': 'PEJUN',
  'JUNÍN': 'PEJUN',
  'JUNIN REGION': 'PEJUN',
  'HUANCAYO': 'PEJUN', // Huancayo es la capital de Junín
  'HUANCAVELICA': 'PEHUV',
  'HUANCAVELICA REGION': 'PEHUV',
  'AYACUCHO': 'PEAYA',
  'AYACUCHO REGION': 'PEAYA',
  'APURIMAC': 'PEAPU',
  'APURÍMAC': 'PEAPU',
  'APURIMAC REGION': 'PEAPU',
  'PUNO': 'PEPUN',
  'PUNO REGION': 'PEPUN',
  // Sur
  'MOQUEGUA': 'PEMOQ',
  'MOQUEGUA REGION': 'PEMOQ',
  'TACNA': 'PETAC',
  'TACNA REGION': 'PETAC',
};

function intensityColor(value: number) {
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

// Función para formatear números con separadores de miles
function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function PresenceMapSection() {
  const [data, setData] = useState<RegionData[]>(fallbackData);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<{
    name: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const [highlightedRegionId, setHighlightedRegionId] = useState<string | null>(null);

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
        
        // Log para debugging
        console.log('Datos recibidos de la API:', incoming);
        
        // Validar que la respuesta sea un array
        if (Array.isArray(incoming) && incoming.length > 0) {
          // Validar que cada elemento tenga la estructura correcta
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
          
          console.log('Datos válidos procesados:', validData);
          console.log('Regiones encontradas:', validData.map(d => d.REGION));
          
          if (validData.length > 0) {
            setData(validData);
          }
        } else {
          console.warn('La API no devolvió un array válido o está vacío');
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.warn('Error al cargar datos de la API, usando datos de respaldo:', error);
          // Mantenemos los datos de fallback
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

  // Cargar el SVG
  useEffect(() => {
    fetch('/pe.svg')
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch(() => {
        // Si falla, usar SVG inline
      });
  }, []);

  const max = useMemo(() => {
    const totals = data
      .map((d) => d?.TOTAL)
      .filter((total): total is number => typeof total === 'number' && total > 0);
    return totals.length > 0 ? Math.max(...totals) : 1;
  }, [data]);

  // Función auxiliar para normalizar nombres de regiones
  const normalizeRegionName = (name: string): string => {
    return name
      .toUpperCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^A-Z0-9\s]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();
  };

  // Crear un mapa de intensidades por ID de SVG
  const regionIntensities = useMemo(() => {
    const intensities: Record<string, number> = {};
    const unmatchedRegions: string[] = [];
    
    // Crear un mapa normalizado para búsqueda más flexible
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
      
      // Intentar encontrar el ID del SVG directamente
      let svgId = regionToSvgId[regionName];
      
      // Si no se encuentra, intentar búsqueda normalizada
      if (!svgId) {
        const normalizedName = normalizeRegionName(regionName);
        svgId = normalizedMap[normalizedName];
        
        // Si aún no se encuentra, intentar búsqueda parcial
        if (!svgId) {
          // Buscar por coincidencia parcial (contiene o es contenido)
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
        // Usar escala logarítmica para distribuir mejor los valores
        // Esto hace que valores pequeños tengan más diferencia visual
        if (max && item.TOTAL > 0) {
          // Normalización logarítmica: log(x + 1) / log(max + 1)
          const logValue = Math.log10(item.TOTAL + 1) / Math.log10(max + 1);
          intensities[svgId] = logValue;
        } else {
          intensities[svgId] = 0;
        }
        console.log(`Mapeado: "${regionName}" -> ${svgId} (valor: ${item.TOTAL}, intensidad: ${intensities[svgId].toFixed(3)})`);
      } else {
        unmatchedRegions.push(regionName);
      }
    });
    
    if (unmatchedRegions.length > 0) {
      console.warn('⚠️ Regiones no mapeadas encontradas:', unmatchedRegions);
      console.warn('Regiones disponibles en el mapeo:', Object.keys(regionToSvgId));
    }
    
    console.log(`✅ Intensidades calculadas para ${Object.keys(intensities).length} regiones:`, intensities);
    return intensities;
  }, [data, max]);

  // Crear mapeo de nombre de región a SVG ID
  const regionNameToSvgId = useMemo(() => {
    const mapping: Record<string, string> = {};
    data.forEach((item) => {
      if (!item?.REGION || typeof item.TOTAL !== 'number') return;
      const regionName = item.REGION.toUpperCase().trim();
      const normalizedName = normalizeRegionName(regionName);
      
      // Buscar el SVG ID correspondiente
      let svgId = regionToSvgId[regionName];
      if (!svgId) {
        const normalizedMap: Record<string, string> = {};
        Object.entries(regionToSvgId).forEach(([key, value]) => {
          const normalized = normalizeRegionName(key);
          if (!normalizedMap[normalized]) {
            normalizedMap[normalized] = value;
          }
        });
        svgId = normalizedMap[normalizedName];
        
        if (!svgId) {
          const matchingKey = Object.keys(normalizedMap).find(
            (key) => normalizedName.includes(key) || key.includes(normalizedName)
          );
          if (matchingKey) {
            svgId = normalizedMap[matchingKey];
          }
        }
      }
      
      if (svgId) {
        mapping[regionName] = svgId;
      }
    });
    return mapping;
  }, [data]);

  // Crear mapeo inverso de SVG ID a datos de región
  const svgIdToRegionData = useMemo(() => {
    const mapping: Record<string, { name: string; value: number }> = {};
    
    data.forEach((item) => {
      if (!item?.REGION || typeof item.TOTAL !== 'number') return;
      const regionName = item.REGION.toUpperCase().trim();
      
      // Intentar encontrar el ID del SVG
      let svgId = regionToSvgId[regionName];
      
      if (!svgId) {
        const normalizedName = normalizeRegionName(regionName);
        const normalizedMap: Record<string, string> = {};
        Object.entries(regionToSvgId).forEach(([key, value]) => {
          const normalized = normalizeRegionName(key);
          if (!normalizedMap[normalized]) {
            normalizedMap[normalized] = value;
          }
        });
        svgId = normalizedMap[normalizedName];
      }
      
      if (svgId) {
        mapping[svgId] = {
          name: item.REGION,
          value: item.TOTAL,
        };
      }
    });
    
    return mapping;
  }, [data]);

  // Modificar el SVG para colorear las regiones
  const modifiedSvg = useMemo(() => {
    if (!svgContent) return '';
    
    let modified = svgContent;
    let coloredCount = 0;
    
    // Primero, cambiar el fill por defecto del SVG raíz a un color base claro y removerlo para que no se herede
    modified = modified.replace(/<svg([^>]*)fill="#6f9c76"/g, '<svg$1');
    // También remover cualquier fill del grupo
    modified = modified.replace(/<g([^>]*)fill="[^"]*"/g, '<g$1');
    
    // Modificar cada elemento (path, circle, etc.) según su intensidad
    Object.entries(regionIntensities).forEach(([svgId, intensity]) => {
      const color = intensityColor(intensity);
      
      // Patrón que maneja elementos en una o múltiples líneas
      // Busca el elemento con el id y captura hasta el cierre
      const pattern = new RegExp(
        `(<(?:path|circle|polygon|rect|ellipse)[^>]*id="${svgId}"[^>]*?)(/?>)`,
        'gis'
      );
      
      if (pattern.test(modified)) {
        modified = modified.replace(pattern, (match, before, closeTag) => {
          // Remover cualquier fill existente
          let updated = before.replace(/fill="[^"]*"/gi, '');
          // Remover style si existe
          updated = updated.replace(/style="[^"]*"/gi, '');
          // Agregar fill y style nuevos antes del cierre
          return `${updated} fill="${color}" style="cursor: pointer;"${closeTag}`;
        });
        coloredCount++;
        console.log(`✅ Coloreado: ${svgId} con color ${color} (intensidad: ${intensity.toFixed(3)})`);
      } else {
        // Intentar con patrón más flexible para elementos en múltiples líneas
        const flexiblePattern = new RegExp(
          `(<(?:path|circle)[^>]*id="${svgId}"[^>]*?)(\\s*/?>)`,
          'gis'
        );
        if (flexiblePattern.test(modified)) {
          modified = modified.replace(flexiblePattern, (match, before, closeTag) => {
            let updated = before.replace(/fill="[^"]*"/gi, '');
            updated = updated.replace(/style="[^"]*"/gi, '');
            return `${updated} fill="${color}" style="cursor: pointer;"${closeTag}`;
          });
          coloredCount++;
          console.log(`✅ Coloreado (flexible): ${svgId} con color ${color}`);
        } else {
          console.warn(`⚠️ No se encontró ningún elemento con id="${svgId}" en el SVG`);
        }
      }
    });
    
    // Asegurar que todas las regiones sin datos tengan un color base claro
    // Buscar todos los paths/circles que no tengan fill explícito
    const allRegionPattern = /(<(?:path|circle)[^>]*id="PE[^"]*"[^>]*)(>)/gi;
    modified = modified.replace(allRegionPattern, (match, before, closeTag) => {
      // Si no tiene fill, agregarlo
      if (!before.includes('fill=')) {
        return `${before} fill="#e6f3ff"${closeTag}`;
      }
      return match;
    });
    
    console.log(`🎨 Total de regiones coloreadas: ${coloredCount} de ${Object.keys(regionIntensities).length}`);
    console.log(`📊 Intensidades disponibles:`, Object.entries(regionIntensities).map(([id, int]) => `${id}: ${int.toFixed(3)}`).join(', '));
    
    // Asegurar que el stroke sea blanco para mejor contraste
    modified = modified.replace(/stroke="#ffffff"/g, 'stroke="#ffffff" stroke-width="0.5"');
    
    // Debug: verificar que los colores se aplicaron
    const testPattern = /fill="rgb\([^)]+\)"/g;
    const colorMatches = modified.match(testPattern);
    console.log(`🎨 Colores aplicados encontrados: ${colorMatches ? colorMatches.length : 0}`);
    
    return modified;
  }, [svgContent, regionIntensities]);

  // Función para resaltar una región en el mapa
  const highlightRegionOnMap = (regionName: string) => {
    const svgId = regionNameToSvgId[regionName.toUpperCase().trim()];
    if (!svgId) {
      console.warn(`⚠️ No se encontró SVG ID para la región: ${regionName}`);
      return;
    }

    setHighlightedRegionId(svgId);

    // Encontrar el elemento SVG y obtener su posición para el tooltip
    const svgContainers = document.querySelectorAll('[data-svg-container]');
    svgContainers.forEach((svgContainer) => {
      const svg = svgContainer.querySelector('svg');
      if (!svg) return;

      const element = svg.querySelector(`#${svgId}`) as SVGGeometryElement | null;
      if (element && 'getBBox' in element) {
        // Obtener la posición del elemento para mostrar el tooltip
        const bbox = element.getBBox();
        const containerRect = svgContainer.getBoundingClientRect();
        
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        
        // Convertir coordenadas SVG a coordenadas del contenedor
        const point = svg.createSVGPoint();
        point.x = centerX;
        point.y = centerY;
        const svgMatrix = svg.getScreenCTM();
        if (svgMatrix) {
          const transformedPoint = point.matrixTransform(svgMatrix);
          const x = transformedPoint.x - containerRect.left;
          const y = transformedPoint.y - containerRect.top;

          // Encontrar los datos de la región
          const regionData = data.find(
            (item) => item.REGION && item.REGION.toUpperCase().trim() === regionName.toUpperCase().trim()
          );

          if (regionData) {
            setSelectedRegion({
              name: regionData.REGION,
              value: regionData.TOTAL,
              x: x,
              y: y,
            });
          }
        }
      }
    });
  };

  // Aplicar colores directamente en el DOM después de renderizar
  useEffect(() => {
    if (!modifiedSvg || Object.keys(regionIntensities).length === 0) return;

    const timeoutId = setTimeout(() => {
      const svgContainers = document.querySelectorAll('[data-svg-container] svg');
      
      svgContainers.forEach((svg) => {
        // Aplicar colores a cada región
        Object.entries(regionIntensities).forEach(([svgId, intensity]) => {
          const color = intensityColor(intensity);
          const element = svg.querySelector(`#${svgId}`) as SVGElement;
          
          if (element) {
            element.setAttribute('fill', color);
            element.style.cursor = 'pointer';
            
            // Aplicar resaltado si es la región seleccionada
            if (highlightedRegionId === svgId) {
              element.style.stroke = '#103a7b';
              element.style.strokeWidth = '3px';
              element.style.filter = 'drop-shadow(0 0 8px rgba(16, 58, 123, 0.6))';
            } else {
              element.style.stroke = '';
              element.style.strokeWidth = '';
              element.style.filter = '';
            }
            
            console.log(`✅ Color aplicado en DOM: ${svgId} -> ${color}`);
          }
        });
      });
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [modifiedSvg, regionIntensities, highlightedRegionId]);

  // Agregar event listeners a los elementos SVG después de renderizar
  useEffect(() => {
    if (!modifiedSvg) return;

    const handleRegionClick = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      mouseEvent.stopPropagation();
      console.log('🖱️ Click detectado en el mapa');
      
      const target = mouseEvent.target as SVGElement;
      console.log('🎯 Elemento clickeado:', target.tagName, target.getAttribute('id'));
      
      let svgId = target.getAttribute('id');
      
      // Si no tiene id, buscar en el elemento padre o en los elementos cercanos
      if (!svgId || !svgId.startsWith('PE')) {
        // Buscar en el elemento actual y sus padres
        let current: Element | null = target;
        let depth = 0;
        while (current && !svgId && depth < 5) {
          svgId = current.getAttribute('id');
          if (svgId && svgId.startsWith('PE')) {
            console.log(`✅ ID encontrado en elemento padre (nivel ${depth}): ${svgId}`);
            break;
          }
          current = current.parentElement;
          depth++;
        }
      }
      
      console.log(`🔍 ID encontrado: ${svgId}`);
      console.log(`📊 Datos disponibles:`, Object.keys(svgIdToRegionData));
      
      if (svgId && svgId.startsWith('PE')) {
        if (svgIdToRegionData[svgId]) {
          const regionData = svgIdToRegionData[svgId];
          const svgContainer = target.closest('[data-svg-container]') as HTMLElement;
          
          if (svgContainer) {
            const containerRect = svgContainer.getBoundingClientRect();
            const x = mouseEvent.clientX - containerRect.left;
            const y = mouseEvent.clientY - containerRect.top;
            
            console.log(`📍 Región seleccionada: ${regionData.name} - S/ ${formatNumber(regionData.value)}`);
            console.log(`📍 Posición: x=${x}, y=${y}`);
            
            setHighlightedRegionId(svgId);
            setSelectedRegion({
              name: regionData.name,
              value: regionData.value,
              x: x,
              y: y,
            });
          } else {
            console.warn('⚠️ No se encontró el contenedor SVG');
          }
        } else {
          console.warn(`⚠️ Región ${svgId} no tiene datos asociados en svgIdToRegionData`);
          console.warn(`📋 Mapeo disponible:`, svgIdToRegionData);
        }
      } else {
        console.warn(`⚠️ No se encontró un ID válido de región (debe empezar con PE)`);
      }
    };

    // Usar setTimeout para asegurar que el DOM se haya actualizado
    const timeoutId = setTimeout(() => {
      const svgContainers = document.querySelectorAll('[data-svg-container]');
      console.log(`📦 Contenedores SVG encontrados: ${svgContainers.length}`);
      
      svgContainers.forEach((svgContainer, index) => {
        // Buscar todos los elementos SVG con IDs que empiecen con PE
        const regionElements = svgContainer.querySelectorAll('path[id^="PE"], circle[id^="PE"], polygon[id^="PE"], rect[id^="PE"]');
        console.log(`🗺️ Contenedor ${index + 1}: ${regionElements.length} elementos de región encontrados`);
        
        regionElements.forEach((element, elIndex) => {
          const elementId = element.getAttribute('id');
          element.addEventListener('click', handleRegionClick);
          (element as SVGElement).style.cursor = 'pointer';
          
          if (elIndex < 5) { // Log solo los primeros 5 para no saturar
            console.log(`  ✅ Listener agregado a: ${elementId}`);
          }
        });
        
        // También agregar listener al SVG completo como fallback
        const svg = svgContainer.querySelector('svg');
        if (svg) {
          svg.addEventListener('click', (e) => {
            const target = e.target as SVGElement;
            if (target.tagName === 'path' || target.tagName === 'circle' || target.tagName === 'polygon' || target.tagName === 'rect') {
              handleRegionClick(e);
            }
          });
        }
      });

      return () => {
        svgContainers.forEach((svgContainer) => {
          const regionElements = svgContainer.querySelectorAll('path[id^="PE"], circle[id^="PE"], polygon[id^="PE"], rect[id^="PE"]');
          regionElements.forEach((element) => {
            element.removeEventListener('click', handleRegionClick);
          });
        });
      };
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      const svgContainers = document.querySelectorAll('[data-svg-container]');
      svgContainers.forEach((svgContainer) => {
        const regionElements = svgContainer.querySelectorAll('path[id^="PE"], circle[id^="PE"], polygon[id^="PE"], rect[id^="PE"]');
        regionElements.forEach((element) => {
          element.removeEventListener('click', handleRegionClick);
        });
      });
    };
  }, [modifiedSvg, svgIdToRegionData]);

  // Cerrar tooltip al hacer click fuera o en otra región
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Cerrar si se hace click fuera del tooltip y no es en una región del mapa o en la lista
      if (
        selectedRegion &&
        !target.closest('[data-tooltip]') &&
        !target.closest('path[id^="PE"]') &&
        !target.closest('circle[id^="PE"]') &&
        !target.closest('polygon[id^="PE"]') &&
        !target.closest('[data-region-item]')
      ) {
        setSelectedRegion(null);
        setHighlightedRegionId(null);
      }
    };

    if (selectedRegion) {
      // Usar un pequeño delay para evitar que se cierre inmediatamente
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [selectedRegion]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            title="Nuestra presencia a nivel nacional"
            subtitle="Visualizamos la intensidad de operaciones por región"
          />
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-[#103a7b]">Mapa dinámico</p>
            <p>Gradiente según peso relativo de ventas por región.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#e7f2ff] via-white to-[#f4f7fb] p-6 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <button
                onClick={() => setIsMaximized(true)}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-[#103a7b] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                aria-label="Maximizar mapa"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Maximizar</span>
              </button>
              {modifiedSvg ? (
                <div
                  data-svg-container
                  className="h-full w-full flex items-center justify-center relative [&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:object-contain [&>svg_path]:transition-all [&>svg_path]:duration-300 [&>svg_path]:cursor-pointer [&>svg_path]:hover:opacity-90 [&>svg_path]:hover:stroke-[#103a7b] [&>svg_path]:hover:stroke-[1.5px] [&>svg_path]:hover:drop-shadow-md [&>svg_circle]:transition-all [&>svg_circle]:duration-300 [&>svg_circle]:cursor-pointer [&>svg_circle]:hover:opacity-90 [&>svg_circle]:hover:stroke-[#103a7b] [&>svg_circle]:hover:stroke-[1.5px]"
                  dangerouslySetInnerHTML={{ __html: modifiedSvg }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <div className="text-center">
                    <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#103a7b] mx-auto"></div>
                    <p>Cargando mapa...</p>
                  </div>
                </div>
              )}
              {/* Tooltip para mostrar información de la región */}
              {selectedRegion && (
                <div
                  data-tooltip
                  className="absolute z-30 rounded-xl border-2 border-[#103a7b]/20 bg-white p-5 shadow-2xl backdrop-blur-sm"
                  style={{
                    left: `${Math.min(selectedRegion.x + 15, window.innerWidth - 250)}px`,
                    top: `${Math.max(selectedRegion.y - 10, 10)}px`,
                    transform: selectedRegion.y < 100 ? 'translateY(0)' : 'translateY(-100%)',
                    pointerEvents: 'auto',
                    minWidth: '200px',
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#103a7b]"></div>
                      <h3 className="font-bold text-[#103a7b] text-base uppercase tracking-wide">
                        {selectedRegion.name}
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedRegion(null);
                          setHighlightedRegionId(null);
                        }}
                        className="ml-auto rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Cerrar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div 
                    className="absolute h-3 w-3 rotate-45 border-b border-r border-[#103a7b]/20 bg-white"
                    style={{
                      bottom: selectedRegion.y < 100 ? '-6px' : 'auto',
                      top: selectedRegion.y < 100 ? 'auto' : '-6px',
                      left: '20px',
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b2d60]">
              Intensidad
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Menos
              </span>
              <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-[#f0f8ff] via-[#87ceeb] via-[#4682b4] to-[#0b2d60] shadow-inner" />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Más
              </span>
            </div>
            <div className="grid gap-2.5 text-sm text-slate-700 max-h-[400px] overflow-y-auto pr-1">
              {data
                .filter((item) => item.REGION && item.TOTAL > 0)
                .sort((a, b) => b.TOTAL - a.TOTAL)
                .map((item, index) => {
                  // Usar la misma escala logarítmica que en el mapa
                  const logIntensity = max && item.TOTAL > 0 
                    ? Math.log10(item.TOTAL + 1) / Math.log10(max + 1)
                    : 0;
                  
                  return (
                    <div
                      key={item.REGION}
                      data-region-item
                      onClick={() => highlightRegionOnMap(item.REGION)}
                      className="group flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-3 transition-all hover:border-[#103a7b]/30 hover:bg-slate-50 hover:shadow-md cursor-pointer"
                      style={{
                        borderColor: highlightedRegionId === regionNameToSvgId[item.REGION.toUpperCase().trim()] 
                          ? '#103a7b' 
                          : undefined,
                        backgroundColor: highlightedRegionId === regionNameToSvgId[item.REGION.toUpperCase().trim()] 
                          ? '#e7f2ff' 
                          : undefined,
                        boxShadow: highlightedRegionId === regionNameToSvgId[item.REGION.toUpperCase().trim()] 
                          ? '0 4px 12px rgba(16, 58, 123, 0.15)' 
                          : undefined,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#103a7b]/10 text-xs font-bold text-[#103a7b]">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-[#103a7b] text-sm">
                          {item.REGION}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                          className="h-2.5 rounded-full transition-all duration-300 group-hover:h-3"
                          style={{
                            backgroundColor: intensityColor(logIntensity),
                            boxShadow: '0 0 0 1.5px rgba(16,58,123,0.1)',
                            width: `${Math.max(logIntensity * 100, 10)}%`,
                            minWidth: '32px',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de mapa maximizado */}
      {isMaximized && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => {
            setIsMaximized(false);
            setSelectedRegion(null);
            setHighlightedRegionId(null);
          }}
        >
          <div
            className="relative h-full w-full max-w-7xl rounded-3xl border border-slate-200 bg-gradient-to-br from-[#e7f2ff] via-white to-[#f4f7fb] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)] rounded-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <button
                onClick={() => {
            setIsMaximized(false);
            setSelectedRegion(null);
            setHighlightedRegionId(null);
          }}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-[#103a7b] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                aria-label="Minimizar mapa"
              >
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Minimizar</span>
              </button>
              {modifiedSvg ? (
                <div
                  data-svg-container
                  className="h-full w-full flex items-center justify-center relative [&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:object-contain [&>svg_path]:transition-all [&>svg_path]:duration-300 [&>svg_path]:cursor-pointer [&>svg_path]:hover:opacity-90 [&>svg_path]:hover:stroke-[#103a7b] [&>svg_path]:hover:stroke-[1.5px] [&>svg_path]:hover:drop-shadow-md [&>svg_circle]:transition-all [&>svg_circle]:duration-300 [&>svg_circle]:cursor-pointer [&>svg_circle]:hover:opacity-90 [&>svg_circle]:hover:stroke-[#103a7b] [&>svg_circle]:hover:stroke-[1.5px]"
                  dangerouslySetInnerHTML={{ __html: modifiedSvg }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <div className="text-center">
                    <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#103a7b] mx-auto"></div>
                    <p>Cargando mapa...</p>
                  </div>
                </div>
              )}
              {/* Tooltip para mostrar información de la región en modal */}
              {selectedRegion && (
                <div
                  data-tooltip
                  className="absolute z-30 rounded-xl border-2 border-[#103a7b]/20 bg-white p-5 shadow-2xl backdrop-blur-sm"
                  style={{
                    left: `${Math.min(selectedRegion.x + 15, window.innerWidth - 250)}px`,
                    top: `${Math.max(selectedRegion.y - 10, 10)}px`,
                    transform: selectedRegion.y < 100 ? 'translateY(0)' : 'translateY(-100%)',
                    pointerEvents: 'auto',
                    minWidth: '200px',
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#103a7b]"></div>
                      <h3 className="font-bold text-[#103a7b] text-base uppercase tracking-wide">
                        {selectedRegion.name}
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedRegion(null);
                          setHighlightedRegionId(null);
                        }}
                        className="ml-auto rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Cerrar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div 
                    className="absolute h-3 w-3 rotate-45 border-b border-r border-[#103a7b]/20 bg-white"
                    style={{
                      bottom: selectedRegion.y < 100 ? '-6px' : 'auto',
                      top: selectedRegion.y < 100 ? 'auto' : '-6px',
                      left: '20px',
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

