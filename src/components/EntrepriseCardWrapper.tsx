import EntrepriseCard from "./EntrepriseCard";
import { Database } from "@/integrations/supabase/types";

type Listing = Database['public']['Tables']['annonces']['Row'];

interface EntrepriseCardWrapperProps {
  listing: Listing;
  onCompareToggle?: (listing: any) => void;
  isSelected?: boolean;
  compareCount?: number;
}

const EntrepriseCardWrapper = ({ 
  listing, 
  onCompareToggle, 
  isSelected, 
  compareCount 
}: EntrepriseCardWrapperProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M€`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K€`;
    }
    return `${value}€`;
  };

  const getCertification = () => {
    if (listing.certifications) {
      const certs = Array.isArray(listing.certifications) 
        ? listing.certifications 
        : (listing.certifications as any);
      
      if (Array.isArray(certs) && certs.length > 0) {
        return certs[0].toUpperCase();
      }
    }
    return "QUALIBAT";
  };

  const getCreationYear = () => {
    return listing.annee_creation?.toString() || "N/A";
  };

  return (
    <EntrepriseCard
      id={listing.id}
      type="blue"
      certification={getCertification()}
      status={listing.statut === "publiee" ? "disponible" : "vendu"}
      title={`Entreprise ${listing.secteur_activite}`}
      location={`${listing.ville}, ${listing.departement}`}
      creation={getCreationYear()}
      ca={formatCurrency(listing.ca_n1)}
      effectif={`${listing.nombre_salaries} salarié${listing.nombre_salaries > 1 ? 's' : ''}`}
      secteur={listing.secteur_activite}
      description={listing.description_activite?.substring(0, 100)}
      price={formatCurrency(listing.prix_vente)}
      financement={listing.financement_bancaire === "oui"}
      certifications={Array.isArray(listing.certifications) ? listing.certifications as string[] : []}
      onCompareToggle={onCompareToggle}
      isSelected={isSelected}
      compareCount={compareCount}
    />
  );
};

export default EntrepriseCardWrapper;
