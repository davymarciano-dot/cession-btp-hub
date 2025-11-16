import { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icône Leaflet via CDN pour éviter les soucis d'assets bundlés
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Coordonnées (échantillon, peut être complété)
const departementsCoords: Record<string, [number, number]> = {
  '01': [46.2044, 5.2258],
  '06': [43.7102, 7.2620],
  '13': [43.2965, 5.3698],
  '31': [43.6047, 1.4442],
  '33': [44.8378, -0.5792],
  '59': [50.6292, 3.0573],
  '69': [45.7640, 4.8357],
  '75': [48.8566, 2.3522],
};

interface Listing {
  id: string;
  secteur_activite?: string;
  ville?: string;
  departement?: string;
  ca_n1?: number;
  prix_vente?: number;
}

interface ListingsMapProps {
  listings: Listing[];
}

// Composant SANS react-leaflet (Leaflet pur) pour contourner les erreurs Context/react-leaflet
const ListingsMap = ({ listings }: ListingsMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [hasError, setHasError] = useState(false);

  const markers = useMemo(() => {
    try {
      return (listings || []).map((l) => {
        const coords = departementsCoords[l.departement || ''] || [48.8566, 2.3522];
        return { ...l, coords } as Listing & { coords: [number, number] };
      });
    } catch (e) {
      console.error('Préparation des marqueurs - erreur:', e);
      setHasError(true);
      return [] as (Listing & { coords: [number, number] })[];
    }
  }, [listings]);

  useEffect(() => {
    if (!containerRef.current || hasError) return;

    try {
      // Init carte une seule fois
      if (!mapRef.current) {
        mapRef.current = L.map(containerRef.current, {
          center: [46.603354, 1.888334],
          zoom: 6,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapRef.current);

        markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      }

      // Rafraîchir les marqueurs
      if (markersLayerRef.current) {
        markersLayerRef.current.clearLayers();
        markers.forEach((m) => {
          const marker = L.marker(m.coords);
          const html = `
            <div style="min-width:220px">
              <div style="font-weight:700;margin-bottom:6px">${m.secteur_activite || 'Entreprise BTP'}</div>
              ${m.ville ? `<div style="color:#475569;margin-bottom:4px">${m.ville} (${m.departement || ''})</div>` : ''}
              ${typeof m.ca_n1 === 'number' ? `<div>CA: ${m.ca_n1.toLocaleString('fr-FR')}€</div>` : ''}
              ${typeof m.prix_vente === 'number' ? `<div>Prix: ${m.prix_vente.toLocaleString('fr-FR')}€</div>` : ''}
            </div>
          `;
          marker.bindPopup(html);
          marker.addTo(markersLayerRef.current!);
        });
      }
    } catch (e) {
      console.error('Initialisation/maj de la carte - erreur:', e);
      setHasError(true);
    }

    return () => {
      // Ne pas détruire la carte entre les re-render du même montage
    };
  }, [markers, hasError]);

  if (hasError) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl bg-slate-100 flex items-center justify-center border border-slate-200">
        <p className="text-sm text-muted-foreground">Carte temporairement indisponible</p>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl" />;
};

export default ListingsMap;
