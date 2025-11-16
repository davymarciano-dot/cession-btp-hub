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

// Fonction pour formater les montants
const formatCurrency = (value: number | undefined): string => {
  if (!value) return 'N/A';
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K€`;
  return `${value}€`;
};

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
          
          // HTML stylé pour le popup avec bouton
          const popupContent = document.createElement('div');
          popupContent.className = 'p-3 min-w-[200px]';
          popupContent.innerHTML = `
            <h3 style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.5rem; color: #1e293b;">
              ${m.secteur_activite || 'Entreprise BTP'}
            </h3>
            <p style="font-size: 0.875rem; color: #475569; margin-bottom: 0.25rem;">
              📍 ${m.ville || 'N/A'}, ${m.departement || ''}
            </p>
            <p style="font-size: 0.875rem; margin-bottom: 0.25rem; color: #1e293b;">
              💰 CA: ${formatCurrency(m.ca_n1)}
            </p>
            <p style="font-size: 0.875rem; font-weight: 600; color: #16a34a; margin-bottom: 0.75rem;">
              Prix: ${formatCurrency(m.prix_vente)}
            </p>
            <button 
              class="listing-details-btn w-full px-4 py-2 text-sm font-semibold text-white rounded-md transition-all duration-200"
              style="background: linear-gradient(to right, #f97316, #ec4899); cursor: pointer; border: none;"
              onmouseover="this.style.background='linear-gradient(to right, #ea580c, #db2777)'"
              onmouseout="this.style.background='linear-gradient(to right, #f97316, #ec4899)'"
              data-listing-id="${m.id}"
            >
              Voir détails →
            </button>
          `;

          // Event listener sur le bouton
          const button = popupContent.querySelector('.listing-details-btn');
          if (button) {
            button.addEventListener('click', () => {
              window.location.href = `/entreprises/${m.id}`;
            });
          }

          marker.bindPopup(popupContent);
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
