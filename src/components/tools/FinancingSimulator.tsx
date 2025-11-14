import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PiggyBank, TrendingUp, AlertCircle } from 'lucide-react';

export const FinancingSimulator = () => {
  const [formData, setFormData] = useState({
    prixAchat: '',
    apportPerso: '',
    creditVendeur: '',
    garantieBPI: 'non'
  });
  const [result, setResult] = useState<any>(null);
  
  const calculateFinancing = () => {
    const prix = parseFloat(formData.prixAchat) || 0;
    const apport = parseFloat(formData.apportPerso) || 0;
    const creditVendeur = parseFloat(formData.creditVendeur) || 0;
    
    const besoinFinancement = prix - apport - creditVendeur;
    const tauxBase = 4.5;
    const tauxAvecBPI = formData.garantieBPI === 'oui' ? 3.5 : tauxBase;
    
    const duree = 7; // années
    const mensualiteBanque = (besoinFinancement * (tauxAvecBPI / 100 / 12)) / (1 - Math.pow(1 + (tauxAvecBPI / 100 / 12), -duree * 12));
    const mensualiteCreditVendeur = creditVendeur > 0 ? (creditVendeur * (4 / 100 / 12)) / (1 - Math.pow(1 + (4 / 100 / 12), -5 * 12)) : 0;
    
    const mensualiteTotal = mensualiteBanque + mensualiteCreditVendeur;
    const coutTotal = (mensualiteBanque * duree * 12) + (mensualiteCreditVendeur * 5 * 12) - besoinFinancement - creditVendeur;
    
    const apportPct = (apport / prix * 100).toFixed(1);
    const faisable = parseFloat(apportPct) >= 15;
    
    setResult({
      besoinFinancement,
      mensualiteBanque: Math.round(mensualiteBanque),
      mensualiteCreditVendeur: Math.round(mensualiteCreditVendeur),
      mensualiteTotal: Math.round(mensualiteTotal),
      coutTotal: Math.round(coutTotal),
      tauxMoyen: tauxAvecBPI,
      apportPct,
      faisable,
      recommendations: generateRecommendations(prix, apport, creditVendeur, formData.garantieBPI)
    });
  };
  
  const generateRecommendations = (prix: number, apport: number, cv: number, bpi: string) => {
    const reco = [];
    
    if (apport / prix < 0.20) {
      reco.push("💡 Augmentez votre apport à 20% pour obtenir de meilleures conditions");
    }
    
    if (cv === 0 && prix < 500000) {
      reco.push("💡 Négociez un crédit vendeur (20-30%) pour réduire votre apport");
    }
    
    if (bpi === 'non') {
      reco.push("💡 Demandez une garantie BPI France pour réduire votre taux de 1%");
    }
    
    if (prix > 300000 && apport / prix < 0.25) {
      reco.push("💡 Envisagez un montage holding (LBO) pour optimiser fiscalement");
    }
    
    return reco;
  };
  
  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <PiggyBank className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Simulateur de Financement</h2>
          <p className="text-muted-foreground">Calculez votre plan de financement</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label>Prix d'achat de l'entreprise (€)</Label>
          <Input 
            type="number" 
            placeholder="400000"
            value={formData.prixAchat}
            onChange={e => setFormData({...formData, prixAchat: e.target.value})}
          />
        </div>
        
        <div>
          <Label>Votre apport personnel (€)</Label>
          <Input 
            type="number" 
            placeholder="120000"
            value={formData.apportPerso}
            onChange={e => setFormData({...formData, apportPerso: e.target.value})}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommandé : minimum 20% du prix d'achat
          </p>
        </div>
        
        <div>
          <Label>Crédit vendeur négocié (€)</Label>
          <Input 
            type="number" 
            placeholder="0"
            value={formData.creditVendeur}
            onChange={e => setFormData({...formData, creditVendeur: e.target.value})}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Généralement 20-30% du prix, remboursé sur 3-5 ans
          </p>
        </div>
        
        <div>
          <Label>Garantie BPI France</Label>
          <Select value={formData.garantieBPI} onValueChange={v => setFormData({...formData, garantieBPI: v})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui">Oui (garantie jusqu'à 70%)</SelectItem>
              <SelectItem value="non">Non</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculateFinancing} className="w-full" size="lg">
          <PiggyBank className="w-5 h-5 mr-2" />
          Simuler le financement
        </Button>
        
        {result && (
          <div className="mt-8 space-y-4">
            <div className={`p-6 rounded-lg border-2 ${result.faisable ? 'bg-green-50 dark:bg-green-950 border-green-500' : 'bg-red-50 dark:bg-red-950 border-red-500'}`}>
              <div className="flex items-center gap-2 mb-3">
                {result.faisable ? (
                  <>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-600">Financement FAISABLE</h3>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-red-600">Apport insuffisant</h3>
                  </>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Apport personnel :</span>
                  <strong>{result.apportPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Besoin financement bancaire :</span>
                  <strong>{result.besoinFinancement.toLocaleString()}€</strong>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-4">💰 Plan de financement</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span>Mensualité prêt bancaire :</span>
                  <strong className="text-lg">{result.mensualiteBanque.toLocaleString()}€</strong>
                </div>
                {parseFloat(formData.creditVendeur) > 0 && (
                  <div className="flex justify-between pb-2 border-b">
                    <span>Mensualité crédit vendeur :</span>
                    <strong className="text-lg">{result.mensualiteCreditVendeur.toLocaleString()}€</strong>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b bg-muted/50 p-2 rounded">
                  <span className="font-semibold">TOTAL mensualité :</span>
                  <strong className="text-xl text-primary">{result.mensualiteTotal.toLocaleString()}€</strong>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Coût total intérêts :</span>
                  <span>{result.coutTotal.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taux moyen :</span>
                  <span>{result.tauxMoyen}%</span>
                </div>
              </div>
            </div>
            
            {result.recommendations.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold mb-3">📋 Recommandations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((reco: string, idx: number) => (
                    <li key={idx} className="text-sm">{reco}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button className="w-full" variant="default">
              Être mis en relation avec un courtier
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
