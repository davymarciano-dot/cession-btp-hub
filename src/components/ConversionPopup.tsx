import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, Users } from 'lucide-react';

export const ConversionPopup = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds if not shown before
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('conversion_popup_shown');
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('conversion_popup_shown', 'true');
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleSellerClick = () => {
    navigate('/vendre?type=seller');
    setShowPopup(false);
  };

  const handleBuyerClick = () => {
    navigate('/acheter?type=buyer');
    setShowPopup(false);
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎯 Ne partez pas sans votre estimation gratuite !
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-muted-foreground">
            Découvrez la valeur réelle de votre entreprise BTP en moins de 48h
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleSellerClick}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-14 text-lg font-bold"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Je veux vendre mon entreprise
            </Button>

            <Button
              onClick={handleBuyerClick}
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-2"
            >
              <Users className="w-5 h-5 mr-2" />
              Je cherche à reprendre
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              127 entreprises vendues ce mois-ci
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground underline mx-auto block"
          >
            Non merci, je continue ma visite
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
