import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export const TestMatchingButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const testMatching = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('test-matching');
      
      if (error) throw error;
      
      setResult(data);
      toast.success('✅ Matching exécuté avec succès !');
    } catch (error) {
      console.error('Erreur lors du test de matching:', error);
      toast.error('Erreur lors du test de matching');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🧪 Test du Matching IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Lance le matching automatique entre vendeurs et acheteurs manuellement
        </p>
        
        <Button
          onClick={testMatching}
          disabled={loading}
          className="w-full"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Matching en cours...' : 'Lancer le matching manuel'}
        </Button>
        
        {result && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-green-800 font-semibold">✅ Résultats du matching :</p>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Statut : {result.success ? 'Succès' : 'Échec'}</p>
              <p>• Message : {result.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};