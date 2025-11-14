import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  price: number;
  [key: string]: any;
}

interface ComparisonBarProps {
  items: ComparisonItem[];
  onRemove: (item: ComparisonItem) => void;
  onCompare: () => void;
}

const ComparisonBar = ({ items, onRemove, onCompare }: ComparisonBarProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  if (items.length === 0) return null;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-card shadow-2xl border-t z-40 transition-all ${
      isMinimized ? 'h-16' : 'h-32'
    }`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Items sélectionnés */}
          <div className="flex items-center gap-4 flex-1">
            <span className="font-semibold text-muted-foreground">
              Comparer ({items.length}/3)
            </span>
            
            {!isMinimized && (
              <div className="flex gap-2">
                {items.map(item => (
                  <Card 
                    key={item.id}
                    className="bg-accent border-primary/20 px-3 py-2 flex items-center gap-2"
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.price?.toLocaleString()}€</p>
                    </div>
                    <button
                      onClick={() => onRemove(item)}
                      className="text-destructive hover:bg-destructive/10 rounded p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Card>
                ))}
                
                {items.length < 3 && (
                  <Card className="border-2 border-dashed border-border px-3 py-2 text-muted-foreground">
                    <p className="text-sm">+ Ajouter</p>
                    <p className="text-xs">{3 - items.length} restant(s)</p>
                  </Card>
                )}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={onCompare}
              disabled={items.length < 2}
              size="lg"
            >
              Comparer →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
