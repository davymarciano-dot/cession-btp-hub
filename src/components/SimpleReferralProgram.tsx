import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Linkedin, Mail, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const SimpleReferralProgram = () => {
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats] = useState({ totalReferrals: 12, totalEarnings: 600 });
  
  useEffect(() => {
    const loadReferralData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const code = `REF${user.id.substring(0, 6).toUpperCase()}`;
        setReferralLink(`https://cessionbtp.fr?ref=${code}`);
      } else {
        setReferralLink('https://cessionbtp.fr?ref=DEMO123');
      }
    };
    
    loadReferralData();
  }, []);
  
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareToSocial = (platform: string) => {
    const message = encodeURIComponent(`Rejoignez CessionBTP et gagnez 50€ avec mon code de parrainage !`);
    const url = encodeURIComponent(referralLink);
    
    const links: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${encodeURIComponent('Invitation CessionBTP')}&body=${message}%20${url}`,
      whatsapp: `https://wa.me/?text=${message}%20${url}`
    };
    
    window.open(links[platform], '_blank');
  };
  
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🎁 Gagnez 50€ par vente réussie
      </h2>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <p className="text-sm mb-2 opacity-90">Votre lien unique :</p>
        <div className="flex gap-2">
          <input 
            value={referralLink} 
            readOnly 
            className="flex-1 bg-white/10 border border-white/30 px-3 py-2 rounded text-white placeholder:text-white/70"
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
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button
          onClick={() => shareToSocial('linkedin')}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <Linkedin className="w-4 h-4 mr-1" />
          LinkedIn
        </Button>
        <Button
          onClick={() => shareToSocial('email')}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <Mail className="w-4 h-4 mr-1" />
          Email
        </Button>
        <Button
          onClick={() => shareToSocial('whatsapp')}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          <Share2 className="w-4 h-4 mr-1" />
          WhatsApp
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          <div className="text-xs opacity-80">Filleuls actifs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.totalEarnings}€</div>
          <div className="text-xs opacity-80">Gains totaux</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReferralProgram;
