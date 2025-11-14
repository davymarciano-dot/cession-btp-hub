import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  price: number;
  location?: string;
  revenue?: number;
  hasRGE?: boolean;
  employees?: number;
  [key: string]: any;
}

interface ComparisonBarProps {
  items: ComparisonItem[];
  onRemove: (item: ComparisonItem) => void;
  onCompare: () => void;
}

const ComparisonBar = ({ items, onRemove, onCompare }: ComparisonBarProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  if (items.length === 0) return null;
  
  return (
    <>
      {/* Tooltip d'aide */}
      {showTooltip && items.length === 1 && (
        <div className="fixed bottom-40 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="text-sm">💡 Sélectionnez 2 autres entreprises pour comparer</p>
          <div className="absolute bottom-0 right-6 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
          </div>
        </div>
      )}
      
      {/* Barre principale */}
      <div className={`fixed bottom-0 left-0 right-0 bg-card shadow-2xl border-t-2 border-primary z-40 transition-all duration-300 animate-slide-in-bottom ${
        isMinimized ? 'h-16' : 'h-auto'
      }`}>
        <div className="container mx-auto px-4">
          {!isMinimized ? (
            // Vue étendue
            <div className="py-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg">
                    Comparaison ({items.length}/3)
                  </h3>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i <= items.length ? 'bg-primary scale-110' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Items sélectionnés */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {items.map((item, index) => (
                  <Card
                    key={item.id}
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 p-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-primary">#{index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(item)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h4 className="font-semibold mb-1 line-clamp-1">{item.title}</h4>
                    {item.location && (
                      <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
                    )}
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Prix:</span>
                        <span className="font-bold text-primary">
                          {item.price?.toLocaleString()}€
                        </span>
                      </div>
                      {item.revenue && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CA:</span>
                          <span>{item.revenue?.toLocaleString()}€</span>
                        </div>
                      )}
                      {item.employees && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Effectif:</span>
                          <span>{item.employees} salariés</span>
                        </div>
                      )}
                      {item.hasRGE && (
                        <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-700">
                          ✓ RGE
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
                
                {/* Slots vides */}
                {[...Array(3 - items.length)].map((_, i) => (
                  <Card
                    key={`empty-${i}`}
                    className="border-2 border-dashed border-border p-8 flex flex-col items-center justify-center text-muted-foreground"
                  >
                    <Plus className="h-8 w-8 mb-2" />
                    <p className="text-sm">Sélectionner</p>
                  </Card>
                ))}
              </div>
              
              {/* Boutons d'action */}
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => items.forEach(item => onRemove(item))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Tout effacer
                </Button>
                
                <Button
                  onClick={onCompare}
                  disabled={items.length < 2}
                  size="lg"
                  className={items.length >= 2 ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover-scale' : ''}
                >
                  {items.length >= 2 ? 'Comparer maintenant →' : `Sélectionnez ${2 - items.length} de plus`}
                </Button>
              </div>
            </div>
          ) : (
            // Vue minimisée
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center gap-2"
                >
                  <ChevronUp className="h-4 w-4" />
                  Comparaison ({items.length}/3)
                </Button>
                
                <div className="flex gap-2">
                  {items.map((item) => (
                    <Badge key={item.id} variant="secondary">
                      {item.title.substring(0, 15)}...
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={onCompare}
                disabled={items.length < 2}
                variant={items.length >= 2 ? "default" : "secondary"}
              >
                Comparer
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparisonBar;
