'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  Truck,
} from '@phosphor-icons/react';

type City = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  note: string;
  hub?: boolean;
};

const LIMA_HQ = { lat: -12.0464, lng: -77.0428 };

const cities: City[] = [
  {
    id: 'lima',
    name: 'Lima',
    region: 'Lima Metropolitana',
    lat: -12.0464,
    lng: -77.0428,
    note: 'Sede principal y centro de distribución',
    hub: true,
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

/** Mapa colorido y moderno (Carto Voyager) */
const MAP_TILES =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

type LeafletBundle = {
  MapContainer: ComponentType<any>;
  TileLayer: ComponentType<any>;
  Marker: ComponentType<any>;
  Popup: ComponentType<any>;
  CircleMarker: ComponentType<any>;
  Polyline: ComponentType<any>;
  useMap: () => any;
  L: any;
};

function createPinIcon(
  L: any,
  opts: { active: boolean; hub?: boolean },
) {
  const { active, hub } = opts;
  const size = active ? 48 : hub ? 42 : 34;
  const pinClass = [
    'zeus-map-pin',
    active ? 'zeus-map-pin--active' : '',
    hub ? 'zeus-map-pin--hub' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const fill = active || hub ? '#F5C400' : '#ffffff';
  const stroke = '#0b2d60';
  const inner = hub
    ? `<circle cx="16" cy="13" r="4.5" fill="${stroke}"/>`
    : `<circle cx="16" cy="13" r="3.5" fill="${stroke}" opacity="0.9"/>`;

  return L.divIcon({
    className: 'zeus-map-marker',
    html: `
      <div class="${pinClass}" style="width:${size}px;height:${size}px">
        ${active ? '<span class="zeus-map-pin-pulse" aria-hidden="true"></span>' : ''}
        <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="zeus-map-pin-svg">
          <path d="M16 1C9.925 1 5 5.925 5 12c0 8.25 11 27 11 27s11-18.75 11-27c0-6.075-4.925-11-11-11z" fill="${fill}" stroke="${stroke}" stroke-width="2.25"/>
          ${inner}
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
  });
}

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
    map.flyTo([city.lat, city.lng], city.hub ? 11 : 10, { duration: 1.2 });
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
  activeId,
  activeCity,
  onSelect,
  onMapReady,
}: {
  bundle: LeafletBundle;
  activeId: string;
  activeCity: City;
  onSelect: (id: string) => void;
  onMapReady: (map: any) => void;
}) {
  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
    Polyline,
    useMap,
    L,
  } = bundle;

  const iconCache = useMemo(() => new Map<string, any>(), []);

  const getIcon = useCallback(
    (city: City) => {
      const key = `${city.id}-${city.id === activeId}`;
      if (!iconCache.has(key)) {
        iconCache.set(
          key,
          createPinIcon(L, {
            active: city.id === activeId,
            hub: city.hub,
          }),
        );
      }
      return iconCache.get(key)!;
    },
    [L, activeId, iconCache],
  );

  useEffect(() => {
    iconCache.clear();
  }, [activeId, iconCache]);

  return (
    <MapContainer
      center={[-9.19, -75.0152]}
      zoom={5.6}
      minZoom={5}
      maxZoom={14}
      scrollWheelZoom
      zoomControl={false}
      className="zeus-coverage-map h-full w-full"
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
        url={MAP_TILES}
        subdomains="abcd"
        maxZoom={20}
      />
      <MapFlyTo city={activeCity} useMap={useMap} />
      <MapReady useMap={useMap} onReady={onMapReady} />

      {cities
        .filter((c) => !c.hub)
        .map((city) => (
          <Polyline
            key={`route-${city.id}`}
            positions={[
              [LIMA_HQ.lat, LIMA_HQ.lng],
              [city.lat, city.lng],
            ]}
            pathOptions={{
              color: city.id === activeId ? '#F5C400' : '#0b2d60',
              weight: city.id === activeId ? 3.5 : 1.5,
              opacity: city.id === activeId ? 0.9 : 0.18,
              dashArray: city.id === activeId ? '2 10' : '6 10',
              lineCap: 'round',
              className:
                city.id === activeId ? 'zeus-map-route-active' : undefined,
            }}
          />
        ))}

      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={getIcon(city)}
          zIndexOffset={city.id === activeId ? 1000 : city.hub ? 500 : 0}
          eventHandlers={{
            click: () => onSelect(city.id),
          }}
        >
          <Popup className="zeus-map-popup" closeButton={false}>
            <div className="zeus-map-popup-inner">
              {city.hub && (
                <span className="zeus-map-popup-badge">Sede principal</span>
              )}
              <p className="zeus-map-popup-title">{city.name}</p>
              <p className="zeus-map-popup-region">{city.region}</p>
              <p className="zeus-map-popup-note">{city.note}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <CircleMarker
        center={[activeCity.lat, activeCity.lng]}
        radius={activeCity.hub ? 32 : 26}
        pathOptions={{
          color: '#0b2d60',
          fillColor: '#F5C400',
          fillOpacity: 0.15,
          weight: 2,
          opacity: 0.6,
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
        setBundle({
          MapContainer: rl.MapContainer,
          TileLayer: rl.TileLayer,
          Marker: rl.Marker,
          Popup: rl.Popup,
          CircleMarker: rl.CircleMarker,
          Polyline: rl.Polyline,
          useMap: rl.useMap,
          L,
        });
      })
      .catch((err) => console.error('Error loading map:', err));
  }, []);

  return (
    <section
      id="cobertura-envios"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#f3f5f8]"
    >
      {/* Header */}
      <div className="relative z-20 w-full bg-[#0b2d60]">
        <div className="mx-auto max-w-[1600px] px-6 py-7 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
                Cobertura nacional
              </p>
              <h2 className="text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl lg:text-3xl">
                Llegamos a todo el Perú
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                Red logística Zeus Safety desde Lima hacia las principales
                ciudades del país. Selecciona un punto en el mapa o en el panel.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2.5">
              {[
                {
                  icon: MapPin,
                  value: String(cities.length),
                  label: 'Ciudades',
                },
                { icon: Truck, value: '24–48 h', label: 'Despacho' },
                { icon: Package, value: 'Lima', label: 'Stock central' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex min-w-[140px] items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5C400]/20">
                      <Icon
                        size={18}
                        weight="duotone"
                        className="text-[#F5C400]"
                      />
                    </span>
                    <span>
                      <span className="block text-base font-black leading-none text-white">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-white/55">
                        {stat.label}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              href="/cotizacion"
              className="group/btn relative inline-flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#F5C400] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:shadow-[0_8px_22px_rgba(245,196,0,0.35)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <span className="relative z-10">Cotizar envío</span>
              <ArrowRight
                size={16}
                weight="bold"
                className="relative z-10 transition-transform group-hover/btn:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mapa + sidebar */}
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-10 lg:py-6 xl:px-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_48px_rgba(11,45,96,0.1)] lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative h-[480px] w-full overflow-hidden sm:h-[560px] lg:h-[640px]">
            {!bundle ? (
              <div className="flex h-full w-full items-center justify-center bg-[#e8eef6] text-[#0b2d60]">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-[3px] border-[#0b2d60]/15 border-t-[#F5C400]" />
                  <p className="text-sm font-semibold">Cargando mapa…</p>
                </div>
              </div>
            ) : (
              <CoverageLeafletMap
                bundle={bundle}
                activeId={activeId}
                activeCity={activeCity}
                onSelect={setActiveId}
                onMapReady={setMapInstance}
              />
            )}

            {/* Controles zoom */}
            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="pointer-events-auto absolute bottom-4 left-4 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(11,45,96,0.18)] sm:bottom-5 sm:left-5">
                <button
                  type="button"
                  aria-label="Acercar"
                  onClick={() => mapInstance?.zoomIn()}
                  className="flex h-10 w-10 items-center justify-center border-b border-slate-100 text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
                >
                  <Plus size={18} weight="bold" />
                </button>
                <button
                  type="button"
                  aria-label="Alejar"
                  onClick={() => mapInstance?.zoomOut()}
                  className="flex h-10 w-10 items-center justify-center text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
                >
                  <Minus size={18} weight="bold" />
                </button>
              </div>

              {/* Chip ciudad activa */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCity.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute left-4 top-4 max-w-[240px] rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-5 sm:top-5"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5C400]">
                    {activeCity.hub ? 'Hub central' : 'Destino activo'}
                  </p>
                  <p className="mt-0.5 text-sm font-black text-[#0b2d60]">
                    {activeCity.name}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                    {activeCity.note}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 hidden rounded-2xl border border-white/90 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0b2d60]/50">
                  Leyenda
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold text-[#0b2d60]">
                  <span className="h-3 w-3 rounded-full border-2 border-[#0b2d60] bg-[#F5C400]" />
                  Sede / activo
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] font-semibold text-[#0b2d60]">
                  <span className="h-3 w-3 rounded-full border-2 border-[#0b2d60] bg-white" />
                  Cobertura
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar ciudades */}
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex h-[340px] flex-col border-t border-slate-200 bg-[#071a3a] lg:h-[640px] lg:border-l lg:border-t-0"
          >
            <div className="shrink-0 border-b border-white/10 bg-[#0b2d60] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C400]/20">
                  <MapPin
                    size={18}
                    weight="duotone"
                    className="text-[#F5C400]"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    Ciudades con cobertura
                  </p>
                  <p className="text-[11px] text-white/55">
                    Haz clic para centrar el mapa
                  </p>
                </div>
              </div>
            </div>

            <div className="zeus-map-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain p-2.5">
              {cities.map((city, index) => {
                const active = city.id === activeId;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setActiveId(city.id)}
                    className={`group/city relative flex w-full items-start gap-3 overflow-hidden rounded-2xl px-3 py-3 text-left transition-all ${
                      active
                        ? 'bg-[#F5C400] shadow-[0_6px_18px_rgba(245,196,0,0.35)]'
                        : 'bg-white/[0.04] hover:bg-white/[0.08]'
                    }`}
                  >
                    {!active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/15 transition-transform duration-300 ease-out group-hover/city:scale-x-100"
                      />
                    )}
                    <span
                      className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        active
                          ? 'bg-[#0b2d60] text-[#F5C400]'
                          : 'bg-white/10 text-[#F5C400]'
                      }`}
                    >
                      {city.hub ? (
                        <Package size={18} weight="duotone" />
                      ) : (
                        <MapPin size={18} weight="duotone" />
                      )}
                    </span>
                    <span className="relative z-10 min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${
                            active ? 'text-[#0b2d60]' : 'text-white/90'
                          }`}
                        >
                          {city.name}
                        </span>
                        {city.hub && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                              active
                                ? 'bg-[#0b2d60]/15 text-[#0b2d60]'
                                : 'bg-[#F5C400]/20 text-[#F5C400]'
                            }`}
                          >
                            HQ
                          </span>
                        )}
                        <span
                          className={`ml-auto text-[10px] font-bold ${
                            active ? 'text-[#0b2d60]/40' : 'text-white/30'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </span>
                      <span
                        className={`block text-[11px] ${
                          active ? 'text-[#0b2d60]/65' : 'text-white/50'
                        }`}
                      >
                        {city.region}
                      </span>
                      <span
                        className={`mt-1 block text-[11px] leading-snug ${
                          active ? 'text-[#0b2d60]/80' : 'text-white/60'
                        }`}
                      >
                        {city.note}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="shrink-0 border-t border-white/10 bg-[#0b2d60] px-4 py-3.5">
              <a
                href="tel:+51916532849"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-1 text-xs font-bold uppercase tracking-wide text-[#F5C400] transition-colors hover:text-[#ffd233]"
              >
                <Phone size={16} weight="duotone" />
                Coordinar despacho
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
