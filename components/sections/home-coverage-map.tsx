'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Minus, Navigation, Phone, Plus } from 'lucide-react';

type City = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  note: string;
};

const cities: City[] = [
  {
    id: 'lima',
    name: 'Lima',
    region: 'Lima Metropolitana',
    lat: -12.0464,
    lng: -77.0428,
    note: 'Sede principal y centro de distribución',
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    region: 'Arequipa',
    lat: -16.409,
    lng: -71.5375,
    note: 'Cobertura sur — minería y energía',
  },
  {
    id: 'cusco',
    name: 'Cusco',
    region: 'Cusco',
    lat: -13.5319,
    lng: -71.9675,
    note: 'Despachos a operaciones de sierra sur',
  },
  {
    id: 'piura',
    name: 'Piura',
    region: 'Piura',
    lat: -5.1945,
    lng: -80.6328,
    note: 'Cobertura norte — oil & gas e industria',
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    region: 'La Libertad',
    lat: -8.1116,
    lng: -79.0288,
    note: 'Despacho costa norte',
  },
  {
    id: 'ica',
    name: 'Ica',
    region: 'Ica',
    lat: -14.0678,
    lng: -75.7286,
    note: 'Agroindustria y proyectos de campo',
  },
  {
    id: 'cajamarca',
    name: 'Cajamarca',
    region: 'Cajamarca',
    lat: -7.1617,
    lng: -78.5128,
    note: 'Soporte a operaciones mineras',
  },
  {
    id: 'huancayo',
    name: 'Huancayo',
    region: 'Junín',
    lat: -12.0651,
    lng: -75.2049,
    note: 'Cobertura sierra central',
  },
];

type LeafletBundle = {
  MapContainer: ComponentType<any>;
  TileLayer: ComponentType<any>;
  Marker: ComponentType<any>;
  Popup: ComponentType<any>;
  CircleMarker: ComponentType<any>;
  useMap: () => any;
  L: any;
};

function MapFlyTo({
  city,
  useMap,
}: {
  city: City;
  useMap: () => any;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.flyTo([city.lat, city.lng], 10, { duration: 1.1 });
  }, [city, map]);
  return null;
}

function MapReady({
  useMap,
  onReady,
}: {
  useMap: () => any;
  onReady: (map: any) => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (map) onReady(map);
  }, [map, onReady]);
  return null;
}

function CoverageLeafletMap({
  bundle,
  activeCity,
  onSelect,
  onMapReady,
}: {
  bundle: LeafletBundle;
  activeCity: City;
  onSelect: (id: string) => void;
  onMapReady: (map: any) => void;
}) {
  const { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap, L } =
    bundle;

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: 'zeus-map-marker',
        html: `<div style="width:20px;height:20px;border-radius:9999px;background:#F5C400;border:3px solid #0b2d60;box-shadow:0 4px 14px rgba(11,45,96,.4)"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12],
      }),
    [L],
  );

  return (
    <MapContainer
      center={[-9.19, -75.0152]}
      zoom={5.5}
      minZoom={5}
      maxZoom={14}
      scrollWheelZoom
      zoomControl={false}
      className="zeus-coverage-map h-full w-full"
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapFlyTo city={activeCity} useMap={useMap} />
      <MapReady useMap={useMap} onReady={onMapReady} />
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={markerIcon}
          eventHandlers={{
            click: () => onSelect(city.id),
          }}
        >
          <Popup>
            <div className="min-w-[160px] p-1">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                {city.name}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{city.region}</p>
              <p className="mt-1.5 text-xs leading-snug text-slate-700">
                {city.note}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      <CircleMarker
        center={[activeCity.lat, activeCity.lng]}
        radius={22}
        pathOptions={{
          color: '#0b2d60',
          fillColor: '#F5C400',
          fillOpacity: 0.25,
          weight: 2,
        }}
      />
    </MapContainer>
  );
}

export function HomeCoverageMap() {
  const [bundle, setBundle] = useState<LeafletBundle | null>(null);
  const [activeId, setActiveId] = useState<string>('lima');
  const [mapInstance, setMapInstance] = useState<any>(null);

  const activeCity = useMemo(
    () => cities.find((c) => c.id === activeId) ?? cities[0],
    [activeId],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existing = document.querySelector('link[data-leaflet-css]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-leaflet-css', '1');
      document.head.appendChild(link);
    }

    Promise.all([import('react-leaflet'), import('leaflet')])
      .then(([rl, LMod]) => {
        const L = (LMod as any).default || LMod;
        if (L.Icon?.Default) {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconRetinaUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl:
              'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        }
        setBundle({
          MapContainer: rl.MapContainer,
          TileLayer: rl.TileLayer,
          Marker: rl.Marker,
          Popup: rl.Popup,
          CircleMarker: rl.CircleMarker,
          useMap: rl.useMap,
          L,
        });
      })
      .catch((err) => console.error('Error loading map:', err));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative z-20 w-full bg-[#0b2d60]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4 px-4 py-6 sm:px-6 lg:px-10 xl:px-12">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
              Cobertura nacional
            </p>
            <h2 className="text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl">
              Llegamos a todo el Perú
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/70">
              Mapa interactivo de presencia Zeus Safety. Explora ciudades y
              regiones con despacho y soporte.
            </p>
          </div>
          <Link
            href="/cotizacion"
            className="group inline-flex h-11 items-center gap-2 bg-[#F5C400] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
          >
            Cotizar envío
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="relative grid w-full lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative h-[520px] w-full overflow-hidden sm:h-[600px] lg:h-[680px]">
          {!bundle ? (
            <div className="flex h-full w-full items-center justify-center bg-[#e8eef6] text-[#0b2d60]">
              <div className="text-center">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#0b2d60]/20 border-t-[#F5C400]" />
                <p className="text-sm font-semibold">Cargando mapa…</p>
              </div>
            </div>
          ) : (
            <CoverageLeafletMap
              bundle={bundle}
              activeCity={activeCity}
              onSelect={setActiveId}
              onMapReady={setMapInstance}
            />
          )}

          {/* Zoom solo dentro del mapa — z bajo para no tapar el header sticky */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="pointer-events-auto absolute bottom-5 left-4 flex flex-col overflow-hidden border border-[#0b2d60]/15 bg-white shadow-[0_10px_28px_rgba(11,45,96,0.2)] sm:bottom-6 sm:left-6">
              <button
                type="button"
                aria-label="Acercar"
                onClick={() => mapInstance?.zoomIn()}
                className="flex h-10 w-10 items-center justify-center border-b border-slate-200 text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                aria-label="Alejar"
                onClick={() => mapInstance?.zoomOut()}
                className="flex h-10 w-10 items-center justify-center text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
              >
                <Minus className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex h-[320px] flex-col bg-[#0b2d60] sm:h-[360px] lg:h-[680px]"
        >
          <div className="shrink-0 border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-[#F5C400]" />
              <p className="text-xs font-bold uppercase tracking-wide text-white">
                Ciudades con cobertura
              </p>
            </div>
            <p className="mt-1 text-[11px] text-white/60">
              Haz clic para centrar el mapa
            </p>
          </div>

          <div className="zeus-map-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {cities.map((city) => {
              const active = city.id === activeId;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setActiveId(city.id)}
                  className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3.5 text-left transition-colors ${
                    active ? 'bg-[#F5C400]/18' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center ${
                      active
                        ? 'bg-[#F5C400] text-[#0b2d60]'
                        : 'bg-white/10 text-[#F5C400]'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-white">
                      {city.name}
                    </span>
                    <span className="block text-[11px] text-white/55">
                      {city.region}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug text-white/75">
                      {city.note}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="shrink-0 border-t border-white/10 px-4 py-3">
            <a
              href="tel:+5115555555"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5C400] hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              Coordinar despacho
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
