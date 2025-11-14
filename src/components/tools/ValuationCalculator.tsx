import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Award, Users } from 'lucide-react';

export const ValuationCalculator = () => {
  const [formData, setFormData] = useState({
    secteur: '',
    ca: '',
    ebe: '',
    effectif: '',
    certification: 'non'
  });
  const [result, setResult] = useState<any>(null);
  
  const multiples: Record<string, { min: number; max: number }> = {
    'gros-oeuvre': { min: 0.4, max: 0.6 },
    'second-oeuvre': { min: 0.6, max: 0.8 },
    'plomberie': { min: 0.5, max: 0.7 },
    'electricite': { min: 0.6, max: 0.8 },
    'pompe-chaleur': { min: 0.8, max: 1.2 },
    'photovoltaique': { min: 0.8, max: 1.1 },
    'maconnerie': { min: 0.4, max: 0.5 }
  };
  
  const calculateValuation = () => {
    const ca = parseFloat(formData.ca) || 0;
    const ebe = parseFloat(formData.ebe) || 0;
    const effectif = parseInt(formData.effectif) || 0;
    
    const sectorMultiples = multiples[formData.secteur] || { min: 0.5, max: 0.7 };
    
    // Calcul base
    let baseMin = ca * sectorMultiples.min;
    let baseMax = ca * sectorMultiples.max;
    
    // Ajustements
    if (formData.certification === 'oui') {
      baseMin *= 1.15;
      baseMax *= 1.20;
    }
    
    if (ebe / ca > 0.12) {
      baseMin *= 1.10;
      baseMax *= 1.10;
    }
    
    if (effectif > 5) {
      baseMin *= 1.05;
      baseMax *= 1.05;
    }
    
    setResult({
      min: Math.round(baseMin),
      max: Math.round(baseMax),
      moyenne: Math.round((baseMin + baseMax) / 2),
      multiple: ((baseMin + baseMax) / 2 / ca).toFixed(2)
    });
  };
  
  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Calculateur de Valorisation</h2>
          <p className="text-muted-foreground">Estimez la valeur de votre entreprise BTP</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label>Secteur d'activité</Label>
          <Select value={formData.secteur} onValueChange={v => setFormData({...formData, secteur: v})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gros-oeuvre">Gros œuvre (maçonnerie, terrassement)</SelectItem>
              <SelectItem value="second-oeuvre">Second œuvre (carrelage, peinture)</SelectItem>
              <SelectItem value="plomberie">Plomberie / Chauffage</SelectItem>
              <SelectItem value="electricite">Électricité</SelectItem>
              <SelectItem value="pompe-chaleur">Pompe à chaleur RGE</SelectItem>
              <SelectItem value="photovoltaique">Photovoltaïque RGE</SelectItem>
              <SelectItem value="maconnerie">Maçonnerie</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Chiffre d'affaires annuel (€)</Label>
          <Input 
            type="number" 
            placeholder="800000"
            value={formData.ca}
            onChange={e => setFormData({...formData, ca: e.target.value})}
          />
        </div>
        
        <div>
          <Label>Excédent Brut d'Exploitation - EBE (€)</Label>
          <Input 
            type="number" 
            placeholder="100000"
            value={formData.ebe}
            onChange={e => setFormData({...formData, ebe: e.target.value})}
          />
        </div>
        
        <div>
          <Label>Nombre de salariés</Label>
          <Input 
            type="number" 
            placeholder="5"
            value={formData.effectif}
            onChange={e => setFormData({...formData, effectif: e.target.value})}
          />
        </div>
        
        <div>
          <Label>Certifications RGE / Qualibat</Label>
          <Select value={formData.certification} onValueChange={v => setFormData({...formData, certification: v})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui">Oui (RGE, Qualibat, etc.)</SelectItem>
              <SelectItem value="non">Non</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculateValuation} className="w-full" size="lg">
          <Calculator className="w-5 h-5 mr-2" />
          Calculer la valorisation
        </Button>
        
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border-2 border-primary/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Résultat de l'estimation
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Valorisation minimale</div>
                <div className="text-2xl font-bold text-orange-600">{result.min.toLocaleString()}€</div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-primary">
                <div className="text-sm text-muted-foreground mb-1">Valorisation moyenne</div>
                <div className="text-3xl font-bold text-primary">{result.moyenne.toLocaleString()}€</div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Valorisation maximale</div>
                <div className="text-2xl font-bold text-green-600">{result.max.toLocaleString()}€</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-primary" />
                <span>Multiple de valorisation appliqué : <strong>{result.multiple}x CA</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>Délai de vente estimé : <strong>45-60 jours</strong></span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                ⚠️ Cette estimation est indicative et basée sur les multiples sectoriels 2024.
              </p>
              <Button className="w-full" variant="default">
                Obtenir une estimation précise gratuite
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
