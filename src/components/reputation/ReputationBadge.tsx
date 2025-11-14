import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ReputationBadgeProps {
  userId: string;
}

export const ReputationBadge = ({ userId }: ReputationBadgeProps) => {
  const [reputation, setReputation] = useState<any>(null);

  useEffect(() => {
    loadReputation();
  }, [userId]);

  const loadReputation = async () => {
    const { data } = await supabase
      .from('reputation_scores')
      .select('*')
      .eq('user_id', userId)
      .single();

    setReputation(data || {
      overall_score: 0,
      reviews_count: 0,
      response_rate: 0,
      response_time_hours: 0,
      badges: []
    });
  };

  const badges = {
    'trusted_seller': { icon: '⭐', label: 'Vendeur de confiance', color: 'gold' },
    'quick_responder': { icon: '⚡', label: 'Réponse rapide', color: 'blue' },
    'verified': { icon: '✅', label: 'Vérifié', color: 'green' },
    'premium': { icon: '👑', label: 'Premium', color: 'purple' }
  };

  return (
    <div className="bg-background rounded-lg shadow border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Réputation</h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.round(reputation?.overall_score || 0) ? 'text-yellow-500' : 'text-gray-300'}>
              ★
            </span>
          ))}
          <span className="ml-2 text-sm">({reputation?.reviews_count || 0} avis)</span>
        </div>
      </div>
      
      {/* Badges */}
      {reputation?.badges && reputation.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {reputation.badges.map((badge: string) => {
            const badgeData = badges[badge as keyof typeof badges];
            return badgeData ? (
              <span 
                key={badge}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                <span>{badgeData.icon}</span>
                {badgeData.label}
              </span>
            ) : null;
          })}
        </div>
      )}
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Taux de réponse</p>
          <p className="font-bold">{reputation?.response_rate || 0}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">Temps de réponse</p>
          <p className="font-bold">&lt; {reputation?.response_time_hours || 0}h</p>
        </div>
      </div>
    </div>
  );
};
