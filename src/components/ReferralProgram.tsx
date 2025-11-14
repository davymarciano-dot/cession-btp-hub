import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Linkedin, Twitter, Mail } from "lucide-react";
import { toast } from "sonner";

const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "CESS2024";
  const referralLink = `https://cessionbtp.fr/?ref=${referralCode}`;
  const stats = {
    totalReferrals: 12,
    totalEarnings: 340,
    pendingReferrals: 3
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Lien copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erreur lors de la copie");
    }
  };
  
  const shareToSocial = (platform: string) => {
    const message = encodeURIComponent(`Rejoignez-moi sur CessionBTP et obtenez 50% de réduction avec mon code : ${referralCode}`);
    const url = encodeURIComponent(referralLink);
    
    const links = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}&url=${url}`,
      whatsapp: `https://wa.me/?text=${message}%20${url}`,
      email: `mailto:?subject=${encodeURIComponent('Invitation CessionBTP')}&body=${message}%20${url}`
    };
    
    window.open(links[platform as keyof typeof links], '_blank');
  };

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-4xl">🎁</span>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Programme de Parrainage
            </h2>
            <p className="text-white/90">
              Gagnez 50€ par filleul actif
            </p>
          </div>
        </div>

        {/* Lien de parrainage */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
          <label className="text-sm font-medium mb-2 block">Votre lien unique</label>
          <div className="flex gap-2">
            <input 
              value={referralLink} 
              readOnly 
              className="flex-1 bg-white/10 border border-white/30 rounded px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button 
              onClick={copyToClipboard}
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              {copied ? "✓" : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Boutons de partage */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <Button
            onClick={() => shareToSocial("linkedin")}
            className="bg-[#0077B5] hover:bg-[#006396]"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            onClick={() => shareToSocial("twitter")}
            className="bg-[#1DA1F2] hover:bg-[#1a8cd8]"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Button
            onClick={() => shareToSocial("whatsapp")}
            className="bg-[#25D366] hover:bg-[#20bd5a]"
          >
            WhatsApp
          </Button>
          <Button
            onClick={() => shareToSocial("email")}
            className="bg-white/20 hover:bg-white/30"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <div className="text-xs text-white/80">Filleuls</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalEarnings}€</div>
            <div className="text-xs text-white/80">Gains</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.pendingReferrals}</div>
            <div className="text-xs text-white/80">En attente</div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-white/90 mb-2 font-semibold">Comment ça marche ?</p>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• Partagez votre lien unique</li>
            <li>• Votre filleul obtient 50% de réduction</li>
            <li>• Vous recevez 50€ quand il vend</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralProgram;