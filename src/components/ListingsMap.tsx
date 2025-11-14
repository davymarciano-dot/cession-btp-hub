import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

interface Listing {
  id: string;
  secteur_activite: string;
  ville: string;
  departement: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  lat?: number;
  lng?: number;
}

interface ListingsMapProps {
  listings: Listing[];
}

// Coordonnées approximatives des départements français (centroïdes)
const departementCoords: Record<string, [number, number]> = {
  '01': [46.2044, 5.2254], '02': [49.5639, 3.6197], '03': [46.5667, 3.3333],
  '04': [44.0927, 6.2389], '05': [44.6611, 6.0797], '06': [43.9450, 7.1239],
  '07': [44.7363, 4.5997], '08': [49.7667, 4.7167], '09': [42.9653, 1.6083],
  '10': [48.2972, 4.0803], '11': [43.2128, 2.3531], '12': [44.3503, 2.5750],
  '13': [43.5297, 5.4474], '14': [49.1829, -0.3707], '15': [45.0367, 2.5217],
  '16': [45.6500, 0.1500], '17': [45.7472, -0.6389], '18': [47.0833, 2.3978],
  '19': [45.2678, 1.7672], '21': [47.3222, 5.0411], '22': [48.5136, -2.7606],
  '23': [46.1708, 1.8714], '24': [45.1847, 0.7208], '25': [47.2378, 6.0244],
  '26': [44.9339, 5.0511], '27': [49.0961, 0.8706], '28': [48.4469, 1.4886],
  '29': [48.2020, -4.0970], '2A': [41.9267, 8.7369], '2B': [42.4983, 9.1503],
  '30': [43.8378, 4.3603], '31': [43.6047, 1.4442], '32': [43.6456, 0.5883],
  '33': [44.8378, -0.5792], '34': [43.6108, 3.8767], '35': [48.1173, -1.6778],
  '36': [46.8108, 1.6919], '37': [47.3939, 0.6892], '38': [45.1886, 5.7245],
  '39': [46.6739, 5.5544], '40': [43.8944, -0.4958], '41': [47.5858, 1.3358],
  '42': [45.4397, 4.3872], '43': [45.0431, 3.8850], '44': [47.2184, -1.5536],
  '45': [47.9022, 2.3983], '46': [44.4472, 1.4406], '47': [44.2028, 0.6200],
  '48': [44.5181, 3.5003], '49': [47.4736, -0.5519], '50': [49.1167, -1.0833],
  '51': [49.0431, 4.3681], '52': [48.1128, 5.1383], '53': [48.0697, -0.7703],
  '54': [48.6844, 6.1844], '55': [49.1619, 5.3825], '56': [47.7483, -2.7603],
  '57': [49.1197, 6.1764], '58': [47.0000, 3.5333], '59': [50.6292, 3.0573],
  '60': [49.4175, 2.8256], '61': [48.4333, 0.0833], '62': [50.5111, 2.6328],
  '63': [45.7772, 3.0870], '64': [43.2951, -0.3708], '65': [43.2328, 0.0783],
  '66': [42.6986, 2.8956], '67': [48.5734, 7.7521], '68': [47.7469, 7.3389],
  '69': [45.7640, 4.8357], '70': [47.6292, 6.1561], '71': [46.6561, 4.5569],
  '72': [48.0061, 0.1997], '73': [45.5647, 6.3289], '74': [46.0636, 6.3608],
  '75': [48.8566, 2.3522], '76': [49.4431, 1.0993], '77': [48.8433, 2.6511],
  '78': [48.8036, 2.1303], '79': [46.3239, -0.4642], '80': [49.8942, 2.2958],
  '81': [43.9289, 2.1481], '82': [44.0181, 1.3556], '83': [43.4642, 6.2378],
  '84': [43.9492, 5.0514], '85': [46.6706, -1.4269], '86': [46.5802, 0.3404],
  '87': [45.8315, 1.2578], '88': [48.1722, 6.4511], '89': [47.7983, 3.5672],
  '90': [47.6389, 6.8628], '91': [48.6314, 2.4289], '92': [48.8922, 2.2197],
  '93': [48.9086, 2.4514], '94': [48.7931, 2.5208], '95': [49.0500, 2.0833]
};

const ListingsMap = ({ listings }: ListingsMapProps) => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [enrichedListings, setEnrichedListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Enrichir les listings avec les coordonnées
    const enriched = listings.map(listing => {
      const coords = departementCoords[listing.departement];
      if (coords) {
        // Ajouter un léger offset aléatoire pour éviter les marqueurs superposés
        const randomOffset = () => (Math.random() - 0.5) * 0.1;
        return {
          ...listing,
          lat: coords[0] + randomOffset(),
          lng: coords[1] + randomOffset(),
        };
      }
      return listing;
    }).filter(listing => listing.lat && listing.lng);

    setEnrichedListings(enriched);
  }, [listings]);

  if (enrichedListings.length === 0) {
    return (
      <div className="h-[500px] w-full rounded-lg bg-slate-100 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Aucune entreprise à afficher sur la carte</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg border border-slate-200">
      <MapContainer 
        center={[46.603354, 1.888334] as L.LatLngExpression}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {enrichedListings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat!, listing.lng!] as L.LatLngExpression}
            eventHandlers={{
              click: () => setSelectedListing(listing),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h4 className="font-bold text-base mb-2">{listing.secteur_activite}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    📍 {listing.ville} ({listing.departement})
                  </p>
                  <p className="font-semibold text-primary">
                    💰 {listing.prix_vente?.toLocaleString('fr-FR')} €
                  </p>
                  <p>
                    📊 CA: {listing.ca_n1?.toLocaleString('fr-FR')} €
                  </p>
                  <p>
                    👥 Effectif: {listing.nombre_salaries} personnes
                  </p>
                </div>
                <a
                  href={`/annonce/${listing.id}`}
                  className="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Voir les détails →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ListingsMap;
