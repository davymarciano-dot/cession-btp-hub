import { Shield } from "lucide-react";

interface RGEBadgeProps {
  certifications?: string[];
  className?: string;
}

const RGEBadge = ({ certifications, className = "" }: RGEBadgeProps) => {
  if (!certifications || certifications.length === 0) return null;
  
  // Vérifier si l'entreprise a au moins une certification RGE
  const rgeCertifications = certifications.filter(cert => 
    ['RGE', 'Qualibat', 'Qualipac', 'QualiPV', 'Qualibois', 'Qualisol', 'Qualipac+'].includes(cert)
  );
  
  if (rgeCertifications.length === 0) return null;
  
  return (
    <div className={`absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-bold shadow-lg ${className}`}>
      <Shield className="w-4 h-4" />
      <span>RGE</span>
    </div>
  );
};

export default RGEBadge;
