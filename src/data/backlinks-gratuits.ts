export interface BacklinkSource {
  nom: string;
  url: string;
  da: number; // Domain Authority
  type: 'annuaire' | 'forum' | 'blog' | 'presse' | 'reseau';
  categorie: 'btp' | 'business' | 'general';
  gratuit: boolean;
  difficulte: 'facile' | 'moyen' | 'difficile';
  valeur: string; // Valeur estimée si payant
  instructions: string;
  delai: string;
}

export const backlinksSources: BacklinkSource[] = [
  // ANNUAIRES BTP (PRIORITÉ 1)
  {
    nom: 'Pages Jaunes Pro',
    url: 'https://www.pagesjaunes.fr/pros',
    da: 85,
    type: 'annuaire',
    categorie: 'general',
    gratuit: true,
    difficulte: 'facile',
    valeur: '150€/mois',
    instructions: 'Créer fiche entreprise gratuite avec lien site',
    delai: '24h'
  },
  {
    nom: 'Societe.com',
    url: 'https://www.societe.com',
    da: 75,
    type: 'annuaire',
    categorie: 'business',
    gratuit: true,
    difficulte: 'facile',
    valeur: '100€/mois',
    instructions: 'Réclamer fiche SIRET, ajouter lien site',
    delai: '48h'
  },
  {
    nom: 'Kompass',
    url: 'https://fr.kompass.com',
    da: 70,
    type: 'annuaire',
    categorie: 'business',
    gratuit: true,
    difficulte: 'moyen',
    valeur: '120€/mois',
    instructions: 'Inscription gratuite, profil complet',
    delai: '72h'
  },
  {
    nom: 'Batiweb',
    url: 'https://www.batiweb.com',
    da: 60,
    type: 'annuaire',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'moyen',
    valeur: '200€/mois',
    instructions: 'Créer profil entreprise BTP',
    delai: '48h'
  },
  {
    nom: 'Batirama',
    url: 'https://www.batirama.com',
    da: 55,
    type: 'annuaire',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'moyen',
    valeur: '150€/mois',
    instructions: 'Inscription annuaire professionnel',
    delai: '72h'
  },
  {
    nom: 'Le Moniteur',
    url: 'https://www.lemoniteur.fr',
    da: 80,
    type: 'presse',
    categorie: 'btp',
    gratuit: false,
    difficulte: 'difficile',
    valeur: '500€/article',
    instructions: 'Proposer communiqué de presse / étude marché',
    delai: '2 semaines'
  },
  {
    nom: 'Batiactu',
    url: 'https://www.batiactu.com',
    da: 70,
    type: 'presse',
    categorie: 'btp',
    gratuit: false,
    difficulte: 'difficile',
    valeur: '400€/article',
    instructions: 'Contacter rédaction avec angle original',
    delai: '2 semaines'
  },
  {
    nom: 'FFB (Fédération Française Bâtiment)',
    url: 'https://www.ffbatiment.fr',
    da: 75,
    type: 'reseau',
    categorie: 'btp',
    gratuit: false,
    difficulte: 'moyen',
    valeur: '300€/an',
    instructions: 'Adhésion + création profil membre',
    delai: '1 semaine'
  },
  {
    nom: 'CAPEB',
    url: 'https://www.capeb.fr',
    da: 65,
    type: 'reseau',
    categorie: 'btp',
    gratuit: false,
    difficulte: 'moyen',
    valeur: '250€/an',
    instructions: 'Adhésion artisans + profil en ligne',
    delai: '1 semaine'
  },
  {
    nom: 'Qualibat',
    url: 'https://www.qualibat.com',
    da: 70,
    type: 'annuaire',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'facile',
    valeur: '0€',
    instructions: 'Si certifié Qualibat, apparition automatique',
    delai: 'Immédiat'
  },
  
  // FORUMS BTP
  {
    nom: 'Forum Batir Moins Cher',
    url: 'https://www.forumconstruire.com',
    da: 50,
    type: 'forum',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'moyen',
    valeur: '50€/mois',
    instructions: 'Participer discussions, signature avec lien',
    delai: '1 semaine'
  },
  {
    nom: 'Forum BricoZone',
    url: 'https://www.bricozone.fr',
    da: 45,
    type: 'forum',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'moyen',
    valeur: '30€/mois',
    instructions: 'Répondre questions, établir expertise',
    delai: '1 semaine'
  },
  
  // BLOGS INVITÉS
  {
    nom: 'Travaux.com Blog',
    url: 'https://www.travaux.com/blog',
    da: 60,
    type: 'blog',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'difficile',
    valeur: '300€/article',
    instructions: 'Proposer article expert (1500 mots min)',
    delai: '3 semaines'
  },
  {
    nom: 'Deco.fr',
    url: 'https://www.deco.fr',
    da: 55,
    type: 'blog',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'difficile',
    valeur: '250€/article',
    instructions: 'Article rénovation avec angle déco',
    delai: '3 semaines'
  },
  
  // ANNUAIRES RÉGIONAUX
  {
    nom: 'CCI Régionales',
    url: 'https://www.cci.fr',
    da: 70,
    type: 'annuaire',
    categorie: 'business',
    gratuit: true,
    difficulte: 'facile',
    valeur: '100€/an',
    instructions: 'Inscription annuaire CCI locale',
    delai: '1 semaine'
  },
  {
    nom: 'Artisans du Bâtiment',
    url: 'https://www.artisans-du-batiment.com',
    da: 40,
    type: 'annuaire',
    categorie: 'btp',
    gratuit: true,
    difficulte: 'facile',
    valeur: '80€/mois',
    instructions: 'Créer profil artisan',
    delai: '48h'
  }
];

export const getTotalBacklinkValue = (): number => {
  return backlinksSources
    .filter(b => b.gratuit)
    .reduce((total, b) => {
      const value = parseInt(b.valeur.replace(/[^0-9]/g, ''));
      return total + value;
    }, 0);
};

export const getBacklinksByDifficulty = (difficulty: 'facile' | 'moyen' | 'difficile') => {
  return backlinksSources.filter(b => b.difficulte === difficulty);
};

export const getBacklinksByCategory = (category: 'btp' | 'business' | 'general') => {
  return backlinksSources.filter(b => b.categorie === category);
};

// Template email guest posting
export const guestPostTemplate = {
  objet: 'Proposition article invité : [TITRE]',
  corps: `Bonjour,

Je m'appelle [NOM] et je dirige CessionBTP.fr, la première plateforme française de cession d'entreprises BTP.

Je suis un lecteur régulier de votre blog et j'apprécie particulièrement vos contenus sur [THÉMATIQUE].

Je souhaiterais vous proposer un article invité sur le thème "[TITRE ARTICLE]". 

Cet article de [1500-2000] mots apporterait une réelle valeur ajoutée à vos lecteurs en abordant :
- [POINT 1]
- [POINT 2]  
- [POINT 3]

L'article serait 100% unique, optimisé SEO, et inclurait des données exclusives de notre observatoire du marché BTP.

En échange, je souhaiterais simplement un lien contextuel vers CessionBTP.fr dans la bio auteur ou l'article.

Seriez-vous intéressé par cette collaboration ?

Cordialement,
[NOM]
CessionBTP.fr`
};

// Sujets articles invités high-value
export const guestPostTopics = [
  {
    titre: 'Comment valoriser son entreprise BTP en 2024',
    angle: 'Guide complet avec méthodes de calcul',
    cible: ['Batiweb', 'Le Moniteur', 'Batiactu'],
    valeur: 'Très haute'
  },
  {
    titre: '10 erreurs à éviter lors de la cession d\'une entreprise BTP',
    angle: 'Retours d\'expérience concrets',
    cible: ['FFB Blog', 'CAPEB', 'CCI'],
    valeur: 'Haute'
  },
  {
    titre: 'Financer la reprise d\'une entreprise BTP : guide 2024',
    angle: 'Banques, aides, crédit vendeur',
    cible: ['Travaux.com', 'BPI France'],
    valeur: 'Haute'
  },
  {
    titre: 'Certification RGE : quel impact sur la valeur de votre entreprise ?',
    angle: 'Étude chiffrée valorisation',
    cible: ['Batiweb', 'Qualit\'EnR'],
    valeur: 'Moyenne'
  },
  {
    titre: 'Transmission entreprise familiale BTP : aspects juridiques et fiscaux',
    angle: 'Donation, succession, pacte Dutreil',
    cible: ['Le Moniteur', 'Expert-comptable.com'],
    valeur: 'Très haute'
  }
];
