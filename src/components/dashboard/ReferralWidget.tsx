import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralWidgetProps {
  userId: string;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  earnings: number;
  pendingEarnings: number;
  conversionRate: number;
}

const ReferralWidget = ({ userId }: ReferralWidgetProps) => {
  const [stats] = useState<ReferralStats>({
    totalReferrals: 12,
    activeReferrals: 5,
    earnings: 350,
    pendingEarnings: 250,
    conversionRate: 42
  });
  
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    if (userId) {
      generateReferralCode();
    }
  }, [userId]);
  
  const generateReferralCode = () => {
    const code = `CESS${userId.substring(0, 6).toUpperCase()}`;
    setReferralCode(code);
  };
  
  const copyLink = () => {
    const link = `https://cessionbtp.fr?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Lien copié dans le presse-papier !');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareOnLinkedIn = () => {
    const text = `Je vends mon entreprise BTP sur CessionBTP. Utilisez mon code ${referralCode} pour -50% !`;
    const url = `https://linkedin.com/sharing/share-offsite/?url=https://cessionbtp.fr?ref=${referralCode}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Vendez votre entreprise BTP');
    const body = encodeURIComponent(`Bonjour,\n\nUtilisez mon code ${referralCode} pour obtenir -50% sur votre annonce sur CessionBTP : https://cessionbtp.fr?ref=${referralCode}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Vendez votre entreprise BTP avec mon code ${referralCode} pour -50% : https://cessionbtp.fr?ref=${referralCode}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };
  
  return (
    <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold mb-1">Programme Parrainage</h3>
          <p className="text-sm opacity-90">Gagnez 50€ par vente réussie</p>
        </div>
        <Button 
          onClick={() => setShowDetails(!showDetails)}
          variant="secondary"
          size="sm"
        >
          {showDetails ? 'Masquer' : 'Détails'}
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{stats.earnings}€</p>
          <p className="text-xs opacity-80">Gains totaux</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{stats.pendingEarnings}€</p>
          <p className="text-xs opacity-80">En attente</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{stats.totalReferrals}</p>
          <p className="text-xs opacity-80">Parrainages</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          <p className="text-xs opacity-80">Conversion</p>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <p className="text-sm mb-2 font-semibold">Votre lien unique :</p>
        <div className="flex gap-2">
          <input 
            value={`cessionbtp.fr?ref=${referralCode}`}
            readOnly
            className="flex-1 bg-white/10 border border-white/30 px-3 py-2 rounded text-sm text-white"
          />
          <Button 
            onClick={copyLink}
            variant="secondary"
            size="icon"
          >
            {copied ? '✅' : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button 
          onClick={shareOnLinkedIn}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <Linkedin className="w-4 h-4 mr-1" />
          LinkedIn
        </Button>
        <Button 
          onClick={shareViaEmail}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <Mail className="w-4 h-4 mr-1" />
          Email
        </Button>
        <Button 
          onClick={shareViaWhatsApp}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          WhatsApp
        </Button>
      </div>
      
      {showDetails && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="font-semibold mb-3">Comment ça marche ?</h4>
          <ol className="text-sm space-y-2 opacity-90">
            <li>1. Partagez votre lien unique</li>
            <li>2. Vos contacts s'inscrivent avec -50%</li>
            <li>3. Vous gagnez 50€ par vente réussie</li>
            <li>4. Paiement automatique chaque mois</li>
          </ol>
          
          <div className="mt-4 p-3 bg-white/10 rounded">
            <p className="text-xs">
              💡 Astuce : Les entreprises RGE convertissent 3x mieux !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralWidget;
