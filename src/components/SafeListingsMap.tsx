import { lazy, Suspense, Component, ReactNode } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

const ListingsMap = lazy(() => import('./ListingsMap'));

interface SafeListingsMapProps {
  listings: any[];
  onError?: () => void;
}

const FallbackError = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="h-[600px] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
    <div className="text-center text-muted-foreground max-w-md px-4">
      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
      <h3 className="text-lg font-semibold mb-2">Carte temporairement indisponible</h3>
      <p className="text-sm mb-4">
        La visualisation cartographique n'est pas disponible pour le moment.
      </p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm text-primary hover:underline">
          Retour à la vue liste
        </button>
      )}
    </div>
  </div>
);

const FallbackLoading = () => (
  <div className="h-[600px] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 animate-pulse">
    <div className="text-center text-muted-foreground">
      <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50 animate-bounce" />
      <p className="text-lg font-medium">Chargement de la carte...</p>
    </div>
  </div>
);

class SafeBoundary extends Component<{ children: ReactNode; onError?: () => void }, { hasError: boolean }>{
  constructor(props: any){
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(){
    return { hasError: true };
  }
  componentDidCatch(error: Error){
    console.error('SafeListingsMap error:', error);
    if (this.props.onError) setTimeout(this.props.onError, 200);
  }
  render(){
    if (this.state.hasError) return <FallbackError onRetry={this.props.onError} />;
    return this.props.children;
  }
}

const SafeListingsMap = ({ listings, onError }: SafeListingsMapProps) => (
  <SafeBoundary onError={onError}>
    <Suspense fallback={<FallbackLoading />}> 
      <ListingsMap listings={listings} />
    </Suspense>
  </SafeBoundary>
);

export default SafeListingsMap;
