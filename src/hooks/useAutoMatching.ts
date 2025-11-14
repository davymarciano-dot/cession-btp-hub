import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NotificationService } from '@/lib/notificationService';

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

      // Send notifications for top 3 matches
      if (data.matches && data.matches.length > 0) {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: listing } = await supabase
          .from('annonces')
          .select('raison_sociale')
          .eq('id', listingId)
          .single();

        if (user?.email && listing) {
          // Send notification to seller for each top match
          const topMatches = data.matches.slice(0, 3);
          for (const match of topMatches) {
            try {
              await NotificationService.sendMatchNotification(
                user.email,
                'Acheteur qualifié',
                match.score,
                0 // Budget not available in current data
              );
            } catch (error) {
              console.error('Error sending match notification:', error);
            }
          }
        }
      }
      
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
