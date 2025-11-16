import { lazy, Suspense, Component, ReactNode } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

// Import dynamique de MapView pour éviter les problèmes de SSR
const MapView = lazy(() => import('./MapView'));

interface MapViewWrapperProps {
  listings: any[];
  onError?: () => void;
}

// Composant d'erreur de fallback
const MapViewError = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="h-[600px] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
    <div className="text-center text-muted-foreground max-w-md px-4">
      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
      <h3 className="text-lg font-semibold mb-2">Carte temporairement indisponible</h3>
      <p className="text-sm mb-4">
        La visualisation cartographique n'est pas disponible pour le moment.
        Veuillez utiliser la vue liste pour consulter les entreprises.
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="text-sm text-primary hover:underline"
        >
          Retour à la vue liste
        </button>
      )}
    </div>
  </div>
);

// Composant de chargement
const MapViewLoading = () => (
  <div className="h-[600px] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 animate-pulse">
    <div className="text-center text-muted-foreground">
      <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50 animate-bounce" />
      <p className="text-lg font-medium">Chargement de la carte...</p>
    </div>
  </div>
);

// Error Boundary pour capturer les erreurs React
class MapErrorBoundary extends Component<
  { children: ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('MapView Error:', error, errorInfo);
    // Notifier le composant parent de l'erreur après un court délai
    setTimeout(() => {
      if (this.props.onError) {
        this.props.onError();
      }
    }, 500);
  }

  render() {
    if (this.state.hasError) {
      return <MapViewError onRetry={this.props.onError} />;
    }

    return this.props.children;
  }
}

// Wrapper principal avec gestion d'erreur complète
const MapViewWrapper = ({ listings, onError }: MapViewWrapperProps) => {
  return (
    <MapErrorBoundary onError={onError}>
      <Suspense fallback={<MapViewLoading />}>
        <MapView listings={listings} />
      </Suspense>
    </MapErrorBoundary>
  );
};

export default MapViewWrapper;
