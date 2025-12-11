import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'cessionbtp-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      if (stored && (stored === 'fr' || stored === 'en')) {
        return stored;
      }
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'en' ? 'en' : 'fr';
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations object
const translations: Record<Language, Record<string, any>> = {
  fr: {
    // Header
    header: {
      sell: "Vendre",
      companies: "Entreprises à vendre",
      estimate: "Estimer",
      pricing: "Tarifs",
      blog: "Blog",
      login: "Connexion",
      dashboard: "Dashboard",
      messages: "Messages",
      logout: "Déconnexion",
    },
    // Footer
    footer: {
      tagline: "La plateforme n°1 pour acheter et vendre des entreprises du BTP en France",
      features: {
        matching: "Matching IA 95%",
        fee: "Success Fee 2% seulement",
        support: "Accompagnement personnalisé",
        sales: "187 entreprises vendues en 2024",
      },
      sections: {
        company: "Entreprise",
        sellers: "Vendeurs",
        buyers: "Acheteurs",
        trust: "Confiance",
        contact: "Contact",
      },
      links: {
        howItWorks: "Comment ça marche",
        team: "Notre équipe",
        contact: "Contact",
        blog: "Blog",
        careers: "Carrières",
        sellBusiness: "Vendre mon entreprise",
        freeEstimate: "Estimer gratuitement",
        sellerPricing: "Tarifs vendeurs",
        successStories: "Success stories",
        sellerFaq: "FAQ Vendeurs",
        browseListings: "Parcourir annonces",
        rgeCompanies: "Entreprises RGE",
        aiMatching: "Matching IA",
        myMatches: "Mes matchs",
        buyerFaq: "FAQ Acheteurs",
        legalNotice: "Mentions légales",
        terms: "CGV",
        privacy: "Confidentialité",
        cookies: "Cookies",
        sitemap: "Plan du site",
      },
      trust: {
        ssl: "SSL & Cryptage",
        fastSale: "Vente rapide 45j",
        certified: "Certifié Pro BTP",
        matching: "Matching IA 95%",
        reviews: "avis",
        sales: "ventes 2024",
      },
      stats: {
        soldCompanies: "Entreprises vendues 2024",
        avgTime: "Délai moyen de vente",
        matchingRate: "Taux matching IA",
        successFee: "Success Fee seulement",
      },
      copyright: "© 2025 CessionBTP • Spécialiste #1 Cession Entreprises BTP France",
      language: "Langue",
    },
    // Home page
    home: {
      hero: {
        title: "Cédez ou reprenez une entreprise BTP en toute confiance",
        subtitle: "La plateforme leader pour la transmission d'entreprises du bâtiment",
        sellCta: "Vendre mon entreprise",
        buyCta: "Trouver une entreprise",
      },
      stats: {
        companies: "entreprises vendues",
        buyers: "repreneurs qualifiés",
        avgTime: "jours délai moyen",
        satisfaction: "satisfaction client",
      },
    },
    // Common
    common: {
      learnMore: "En savoir plus",
      contact: "Contacter",
      viewDetails: "Voir les détails",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      all: "Tous",
      none: "Aucun",
      yes: "Oui",
      no: "Non",
    },
    // Enterprises page
    enterprises: {
      title: "Entreprises BTP à vendre",
      subtitle: "Trouvez l'entreprise parfaite pour votre projet",
      filters: {
        sector: "Secteur d'activité",
        region: "Région",
        budget: "Budget",
        size: "Taille",
        turnover: "Chiffre d'affaires",
      },
      noResults: "Aucune entreprise ne correspond à vos critères",
      opportunities: "opportunités à saisir",
    },
  },
  en: {
    // Header
    header: {
      sell: "Sell",
      companies: "Companies for sale",
      estimate: "Estimate",
      pricing: "Pricing",
      blog: "Blog",
      login: "Login",
      dashboard: "Dashboard",
      messages: "Messages",
      logout: "Logout",
    },
    // Footer
    footer: {
      tagline: "The #1 platform for buying and selling construction companies in France",
      features: {
        matching: "95% AI Matching",
        fee: "Only 2% Success Fee",
        support: "Personalized support",
        sales: "187 companies sold in 2024",
      },
      sections: {
        company: "Company",
        sellers: "Sellers",
        buyers: "Buyers",
        trust: "Trust",
        contact: "Contact",
      },
      links: {
        howItWorks: "How it works",
        team: "Our team",
        contact: "Contact",
        blog: "Blog",
        careers: "Careers",
        sellBusiness: "Sell my business",
        freeEstimate: "Free estimate",
        sellerPricing: "Seller pricing",
        successStories: "Success stories",
        sellerFaq: "Seller FAQ",
        browseListings: "Browse listings",
        rgeCompanies: "RGE Companies",
        aiMatching: "AI Matching",
        myMatches: "My matches",
        buyerFaq: "Buyer FAQ",
        legalNotice: "Legal notice",
        terms: "Terms",
        privacy: "Privacy",
        cookies: "Cookies",
        sitemap: "Sitemap",
      },
      trust: {
        ssl: "SSL & Encryption",
        fastSale: "Fast sale 45 days",
        certified: "Pro BTP Certified",
        matching: "95% AI Matching",
        reviews: "reviews",
        sales: "2024 sales",
      },
      stats: {
        soldCompanies: "Companies sold 2024",
        avgTime: "Average sale time",
        matchingRate: "AI matching rate",
        successFee: "Success Fee only",
      },
      copyright: "© 2025 CessionBTP • #1 Specialist BTP Business Transfer France",
      language: "Language",
    },
    // Home page
    home: {
      hero: {
        title: "Buy or sell a construction company with confidence",
        subtitle: "The leading platform for construction business transfers",
        sellCta: "Sell my company",
        buyCta: "Find a company",
      },
      stats: {
        companies: "companies sold",
        buyers: "qualified buyers",
        avgTime: "days average time",
        satisfaction: "client satisfaction",
      },
    },
    // Common
    common: {
      learnMore: "Learn more",
      contact: "Contact",
      viewDetails: "View details",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      all: "All",
      none: "None",
      yes: "Yes",
      no: "No",
    },
    // Enterprises page
    enterprises: {
      title: "Construction companies for sale",
      subtitle: "Find the perfect company for your project",
      filters: {
        sector: "Business sector",
        region: "Region",
        budget: "Budget",
        size: "Size",
        turnover: "Turnover",
      },
      noResults: "No companies match your criteria",
      opportunities: "opportunities available",
    },
  },
};
