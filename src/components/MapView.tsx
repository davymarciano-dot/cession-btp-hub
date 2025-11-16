import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Euro, TrendingUp, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordsDepartement, addRandomOffset } from '@/data/departements-coords';
import { Button } from './ui/button';

// Fix pour les icônes Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Icône personnalisée orange
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Listing {
  id: string;
  secteur_activite: string;
  ville: string;
  departement: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  description_activite?: string;
}

interface MapViewProps {
  listings: Listing[];
}

// Composant pour recentrer la carte
const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapView = ({ listings }: MapViewProps) => {
  const navigate = useNavigate();
  const [enrichedListings, setEnrichedListings] = useState<(Listing & { lat: number; lng: number })[]>([]);

  useEffect(() => {
    // Enrichir les listings avec les coordonnées GPS
    const enriched = listings
      .map(listing => {
        const coords = getCoordsDepartement(listing.departement);
        if (coords) {
          const [lat, lng] = addRandomOffset(coords);
          return { ...listing, lat, lng };
        }
        return null;
      })
      .filter((listing): listing is Listing & { lat: number; lng: number } => listing !== null);

    setEnrichedListings(enriched);
  }, [listings]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M€`;
    }
    if (value >= 1000) {
      return `${Math.round(value / 1000)}K€`;
    }
    return `${value}€`;
  };

  if (enrichedListings.length === 0) {
    return (
      <div className="h-[600px] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Aucune entreprise à afficher sur la carte</p>
          <p className="text-sm mt-2">Essayez de modifier vos critères de recherche</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-2xl border-2 border-primary/20">
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter center={[46.603354, 1.888334]} />
        
        {enrichedListings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={orangeIcon}
          >
            <Popup maxWidth={300} minWidth={250}>
              <div className="p-3 min-w-[250px]">
                {/* En-tête */}
                <div className="flex items-start gap-3 mb-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base text-foreground mb-1">
                      {listing.secteur_activite}
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {listing.ville} ({listing.departement})
                    </p>
                  </div>
                </div>

                {/* Informations clés */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      Prix de vente
                    </span>
                    <span className="text-base font-bold text-primary">
                      {formatCurrency(listing.prix_vente)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      CA annuel
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatCurrency(listing.ca_n1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Effectif
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {listing.nombre_salaries} salarié{listing.nombre_salaries > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Description courte */}
                {listing.description_activite && (
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {listing.description_activite}
                  </p>
                )}

                {/* Bouton CTA */}
                <Button
                  onClick={() => navigate(`/entreprises/${listing.id}`)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                  size="sm"
                >
                  Voir les détails →
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
