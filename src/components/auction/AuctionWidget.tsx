import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AuctionWidgetProps {
  listingId: string;
}

export const AuctionWidget = ({ listingId }: AuctionWidgetProps) => {
  const [auction, setAuction] = useState<any>(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    loadAuction();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [listingId]);

  const loadAuction = async () => {
    const { data } = await supabase
      .from('auctions')
      .select('*')
      .eq('listing_id', listingId)
      .eq('status', 'active')
      .single();

    if (data) {
      setAuction(data);
      setCurrentBid(data.current_price || data.start_price);
      setBidAmount(data.current_price + data.increment);
    }
  };

  const updateTimeLeft = () => {
    if (!auction) return;
    
    const end = new Date(auction.end_date).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      setTimeLeft('Terminée');
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  const placeBid = async () => {
    if (bidAmount <= currentBid) {
      toast.error('Votre enchère doit être supérieure');
      return;
    }

    const { error } = await supabase.from('bids').insert({
      auction_id: auction.id,
      buyer_id: (await supabase.auth.getUser()).data.user?.id,
      amount: bidAmount
    });

    if (error) {
      toast.error('Erreur lors de l\'enchère');
    } else {
      toast.success('Enchère placée avec succès');
      loadAuction();
    }
  };

  if (!auction) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔥 Enchères Privées</h3>
      
      <div className="text-center mb-6">
        <p className="text-sm opacity-90">Offre actuelle</p>
        <p className="text-4xl font-bold">{currentBid.toLocaleString()}€</p>
        <p className="text-sm mt-2">⏰ {timeLeft}</p>
      </div>

      <div className="space-y-4">
        <Input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          placeholder={`Min: ${(currentBid + auction.increment).toLocaleString()}€`}
        />
        <Button 
          onClick={placeBid}
          className="w-full bg-white text-red-600 hover:bg-white/90"
        >
          Placer une enchère
        </Button>
      </div>

      <div className="mt-4 text-xs opacity-80 text-center">
        {auction.bids_count} enchères • {auction.watchers} observateurs
      </div>
    </div>
  );
};
