import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MatchingResult {
  success: boolean;
  totalMatches: number;
  topMatches: number;
  matches: Array<{
    email: string;
    score: number;
    criteria: {
      location: boolean;
      budget: boolean;
      sector: boolean;
      size: boolean;
    };
  }>;
}

export const useAutoMatching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MatchingResult | null>(null);

  const runMatching = async (listingId: string) => {
    setIsLoading(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('auto-matching', {
        body: { listingId },
      });

      if (error) throw error;

      setResults(data);
      toast.success(`${data.totalMatches} acheteurs correspondants trouvés !`);
      
      return data;
    } catch (error: any) {
      console.error('Error running auto-matching:', error);
      toast.error('Erreur lors du matching automatique');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    runMatching,
    isLoading,
    results,
  };
};
