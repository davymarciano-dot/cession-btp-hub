import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icône Leaflet (utilise les assets CDN pour éviter les problèmes de bundling)
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Coordonnées simples par département (peuvent être complétées)
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

interface ListingsMapProps {
  listings: Array<{
    id: string;
    secteur_activite?: string;
    ville?: string;
    departement?: string;
    ca_n1?: number;
    prix_vente?: number;
  }>;
}

const ListingsMap = ({ listings }: ListingsMapProps) => {
  const [hasError, setHasError] = useState(false);

  // Prépare les marqueurs avec garde d'erreurs
  const markers = useMemo(() => {
    try {
      return (listings || []).map((listing) => {
        const coords = departementsCoords[listing.departement || ''] || [48.8566, 2.3522];
        return { ...listing, coords } as (typeof listing & { coords: [number, number] });
      });
    } catch (e) {
      console.error('Erreur lors de la préparation des marqueurs:', e);
      setHasError(true);
      return [] as any[];
    }
  }, [listings]);

  if (hasError) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl bg-slate-100 flex items-center justify-center border border-slate-200">
        <p className="text-sm text-muted-foreground">Carte temporairement indisponible</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl">
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {markers.map((listing) => (
          <Marker key={listing.id} position={listing.coords as [number, number]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{listing.secteur_activite || 'Entreprise BTP'}</h3>
                {listing.ville && <p>{listing.ville}</p>}
                {typeof listing.ca_n1 === 'number' && <p>CA: {listing.ca_n1.toLocaleString('fr-FR')}€</p>}
                {typeof listing.prix_vente === 'number' && <p>Prix: {listing.prix_vente.toLocaleString('fr-FR')}€</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ListingsMap;
