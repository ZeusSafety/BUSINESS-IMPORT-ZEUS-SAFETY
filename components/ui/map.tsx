'use client';

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  lat: number;
  lng: number;
  address: string;
};

export function Map({ lat, lng, address }: MapProps) {
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Cargar react-leaflet y leaflet solo en el cliente
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet')
      ]).then(([leafletModule, LModule]) => {
        const { MapContainer, TileLayer, Marker, Popup } = leafletModule;
        const L = LModule.default;
        
        // Fix para los iconos de Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        setMapComponents({
          MapContainer,
          TileLayer,
          Marker,
          Popup,
          icon,
        });
      }).catch((error) => {
        console.error('Error loading map libraries:', error);
      });
    }
  }, []);

  if (!MapComponents) {
    return (
      <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-500">Cargando mapa...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, icon } = MapComponents;

  return (
    <div className="h-full w-full rounded-xl overflow-hidden relative">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

