import { localStats, metierLocalInsights, getLocalTestimonial } from '@/data/local-stats';
import { metiersComplete } from '@/data/metiers-complete';
import { renewableEnergies } from '@/data/renewable-energy';

interface UniqueContentParams {
  metier: string;
  ville: string;
}

// Génère du contenu 100% unique en combinant données réelles
export const generateUniqueContent = ({ metier, ville }: UniqueContentParams) => {
  const cityStats = localStats[ville as keyof typeof localStats];
  const metierData = metiersComplete.find(m => m.slug === metier);
  const renewableData = renewableEnergies.find(r => r.slug === metier);
  const localInsights = metierLocalInsights[metier as keyof typeof metierLocalInsights]?.(ville);
  const testimonial = getLocalTestimonial(ville, metier);
  
  return {
    hero: {
      title: `Entreprise ${metierData?.name || metier} à vendre ${ville.charAt(0).toUpperCase() + ville.slice(1)}`,
      subtitle: `${cityStats?.entreprisesBTP.toLocaleString() || '500+'} entreprises BTP actives • Marché: ${cityStats?.caTotal || '1+ milliard €'}`
    },
    
    marketAnalysis: {
      title: `Marché ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} en 2024`,
      content: `
        Le marché de la ${metierData?.name || metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} 
        représente un secteur dynamique avec ${cityStats?.entreprisesBTP.toLocaleString() || '500+'} entreprises BTP actives.
        
        **Chiffres clés ${ville.charAt(0).toUpperCase() + ville.slice(1)}:**
        - Population: ${cityStats?.population.toLocaleString() || 'N/A'}
        - CA total BTP: ${cityStats?.caTotal || '1+ milliard €'}
        - Prix m² moyen: ${cityStats?.prixM2.toLocaleString() || 'N/A'}€
        - Croissance métier: ${localInsights?.croissance || '+10%'} par an
        
        **Projets majeurs en cours:**
        ${cityStats?.projetsMajeurs.map(p => `- ${p}`).join('\n') || '- Développement urbain'}
        
        **Opportunités spécifiques:**
        ${cityStats?.opportunites || 'Marché en croissance'}
      `
    },
    
    localSpecifics: {
      title: `Spécificités ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)}`,
      demande: localInsights?.demande || 'Demande soutenue',
      specifique: localInsights?.specifique || 'Marché local dynamique',
      concurrence: localInsights?.concurrence || 'Moyenne',
      atouts: [
        `Bassin de ${cityStats?.population.toLocaleString() || '100,000+'} habitants`,
        `${cityStats?.entreprisesBTP || '500+'} entreprises BTP (réseau professionnel)`,
        `Prix immobilier: ${cityStats?.prixM2 || 3000}€/m² (vs 5500€ moyenne nationale)`,
        localInsights?.specifique || 'Positionnement stratégique'
      ]
    },
    
    pricing: {
      title: `Prix entreprises ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)}`,
      ranges: [
        {
          type: 'TPE (0-2 salariés)',
          ca: '100-300k€',
          prix: calculateLocalPrice('tpe', ville, cityStats?.prixM2),
          details: 'Idéal premier achat, peu d\'immobilisations'
        },
        {
          type: 'PME (3-9 salariés)',
          ca: '300k-1M€',
          prix: calculateLocalPrice('pme', ville, cityStats?.prixM2),
          details: 'Structure établie, carnet de commandes'
        },
        {
          type: 'ETI (10-20 salariés)',
          ca: '1-3M€',
          prix: calculateLocalPrice('eti', ville, cityStats?.prixM2),
          details: 'Position marché solide, clients récurrents'
        }
      ]
    },
    
    testimonial: testimonial ? {
      nom: testimonial.nom,
      entreprise: testimonial.entreprise,
      ville: ville.charAt(0).toUpperCase() + ville.slice(1),
      temoignage: testimonial.temoignage
    } : null,
    
    faq: [
      {
        q: `Combien vaut une entreprise de ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} ?`,
        a: `Le prix moyen varie entre ${calculateLocalPrice('tpe', ville, cityStats?.prixM2)} (TPE) 
        et ${calculateLocalPrice('eti', ville, cityStats?.prixM2)} (ETI) selon la taille, le CA, 
        et la rentabilité. Le prix m² immobilier à ${ville.charAt(0).toUpperCase() + ville.slice(1)} 
        (${cityStats?.prixM2 || 3000}€/m²) impacte fortement la valorisation si des locaux sont inclus.`
      },
      {
        q: `Quelles sont les opportunités ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} ?`,
        a: `${cityStats?.opportunites || 'Le marché local présente de belles opportunités.'}
        Les projets majeurs comme ${cityStats?.projetsMajeurs[0] || 'le développement urbain'} 
        créent une demande soutenue. ${localInsights?.demande || ''}`
      },
      {
        q: `Comment financer l'achat d'une entreprise ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} ?`,
        a: `Les banques locales financent généralement 60-70% du prix. Prévoyez 30-40% d'apport 
        (${calculateLocalPrice('pme', ville, cityStats?.prixM2).split('-')[0]} à 
        ${(parseInt(calculateLocalPrice('pme', ville, cityStats?.prixM2).split('-')[1]) * 0.4).toFixed(0)}k€ pour une PME). 
        BPI France propose des garanties jusqu'à 70%.`
      },
      {
        q: `Quel délai pour vendre une entreprise ${metier} à ${ville.charAt(0).toUpperCase() + ville.slice(1)} ?`,
        a: `Délai moyen: 45-60 jours. ${ville === 'paris' ? 'Paris' : ville.charAt(0).toUpperCase() + ville.slice(1)} 
        étant un marché actif avec ${cityStats?.entreprisesBTP.toLocaleString() || '500+'} entreprises BTP, 
        les acquéreurs qualifiés sont nombreux. ${testimonial ? `${testimonial.nom} a vendu en 32 jours.` : ''}`
      }
    ],
    
    seoKeywords: [
      `entreprise ${metier} à vendre ${ville}`,
      `societe ${metier} ${ville}`,
      `reprendre entreprise ${metier} ${ville}`,
      `achat entreprise ${metier} ${ville}`,
      `cession entreprise ${metier} ${ville}`,
      `prix entreprise ${metier} ${ville}`,
      `entreprise btp ${ville}`,
      ...(renewableData ? [`entreprise rge ${ville}`, `${renewableData.certifications[0]} ${ville}`] : [])
    ]
  };
};

// Calcule prix local ajusté selon coût immobilier ville
const calculateLocalPrice = (size: 'tpe' | 'pme' | 'eti', ville: string, prixM2?: number): string => {
  const basePrice = {
    tpe: { min: 120, max: 250 },
    pme: { min: 350, max: 800 },
    eti: { min: 1000, max: 2500 }
  };
  
  // Ajustement selon prix m² local (impact locaux commerciaux)
  const adjustment = prixM2 ? prixM2 / 3500 : 1; // 3500€ = moyenne nationale
  
  const adjusted = {
    min: Math.round(basePrice[size].min * adjustment),
    max: Math.round(basePrice[size].max * adjustment)
  };
  
  return `${adjusted.min}-${adjusted.max}k€`;
};

// Génère une meta description unique
export const generateMetaDescription = ({ metier, ville }: UniqueContentParams): string => {
  const cityStats = localStats[ville as keyof typeof localStats];
  const metierData = metiersComplete.find(m => m.slug === metier);
  
  return `${cityStats?.entreprisesBTP || '50+'} entreprises ${metierData?.name || metier} à vendre à ${ville.charAt(0).toUpperCase() + ville.slice(1)}. Prix: ${calculateLocalPrice('pme', ville, cityStats?.prixM2)}. Marché: ${cityStats?.caTotal || '1+ milliard €'}. Vente en 45 jours.`;
};

// Génère H1 unique
export const generateH1 = ({ metier, ville }: UniqueContentParams): string => {
  const metierData = metiersComplete.find(m => m.slug === metier);
  return `${metierData?.name || metier.charAt(0).toUpperCase() + metier.slice(1)} à Vendre ${ville.charAt(0).toUpperCase() + ville.slice(1)} | Reprise Entreprise BTP`;
};

// Vérifie unicité du contenu (anti-duplicate)
export const calculateContentUniqueness = (content1: any, content2: any): number => {
  const str1 = JSON.stringify(content1);
  const str2 = JSON.stringify(content2);
  
  let matches = 0;
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  
  words1.forEach(word => {
    if (words2.includes(word)) matches++;
  });
  
  return 100 - (matches / words1.length * 100); // % d'unicité
};
