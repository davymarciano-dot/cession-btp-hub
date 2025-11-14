import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

export const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  
  // Mock data - à remplacer par les vraies données utilisateur
  const referralCode = "CESS2024";
  const referralLink = `https://cessionbtp.fr/?ref=${referralCode}`;
  const referralStats = {
    referrals: 5,
    earnings: 250,
    pending: 2
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Lien copié dans le presse-papier");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erreur lors de la copie");
    }
  };

  const shareToSocial = (platform: string) => {
    const text = "Vendez votre entreprise BTP en 45 jours avec CessionBTP !";
    let url = "";
    
    switch (platform) {
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(text + " " + referralLink)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent("Découvrez CessionBTP")}&body=${encodeURIComponent(text + "\n\n" + referralLink)}`;
        break;
    }
    
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 border-none">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-4xl">🎁</span>
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Gagnez 50€ par parrainage
          </h2>
          <p className="text-white/90">
            Pour chaque entreprise qui vend grâce à votre recommandation
          </p>
        </div>
      </div>
      
      {/* Lien de parrainage */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
        <label className="text-sm font-medium mb-2 block">Votre lien de parrainage</label>
        <div className="flex gap-2">
          <input 
            value={referralLink} 
            readOnly 
            className="flex-1 bg-white/10 border border-white/30 rounded px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Button 
            onClick={copyToClipboard}
            className="bg-white text-purple-600 hover:bg-white/90 flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copié" : "Copier"}
          </Button>
        </div>
      </div>
      
      {/* Partage social */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Partager sur les réseaux sociaux
        </label>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => shareToSocial("linkedin")}
            className="bg-[#0077B5] hover:bg-[#006396] text-white"
          >
            LinkedIn
          </Button>
          <Button
            onClick={() => shareToSocial("twitter")}
            className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
          >
            Twitter
          </Button>
          <Button
            onClick={() => shareToSocial("whatsapp")}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
          >
            WhatsApp
          </Button>
          <Button
            onClick={() => shareToSocial("email")}
            className="bg-gray-700 hover:bg-gray-800 text-white"
          >
            Email
          </Button>
        </div>
      </div>
      
      {/* Stats de parrainage */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{referralStats.referrals}</div>
          <div className="text-sm opacity-75">Parrainages</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">€{referralStats.earnings}</div>
          <div className="text-sm opacity-75">Gains totaux</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{referralStats.pending}</div>
          <div className="text-sm opacity-75">En attente</div>
        </div>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
        <p className="text-sm text-white/90">
          💡 <strong>Comment ça marche ?</strong> Partagez votre lien, votre contact vend son entreprise, 
          vous recevez 50€ par vente finalisée. Simple et transparent !
        </p>
      </div>
    </Card>
  );
};
