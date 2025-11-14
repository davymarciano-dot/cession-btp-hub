export interface ArticleTemplate {
  titre: string;
  mots: number;
  structure: {
    intro: string;
    sections: {
      titre: string;
      contenu: string;
    }[];
    conclusion: string;
  };
  cta: string;
  keywords: string[];
  platforms: ('blog' | 'linkedin' | 'medium' | 'forum')[];
}

export const articleTemplates: Record<string, ArticleTemplate> = {
  valorisation: {
    titre: "Comment Valoriser Son Entreprise BTP en 2024 : Guide Complet",
    mots: 1800,
    structure: {
      intro: `La valorisation d'une entreprise BTP est un exercice complexe qui nécessite une méthodologie rigoureuse. 
      En 2024, avec les nouvelles normes énergétiques et la pénurie de main-d'œuvre, les critères ont évolué. 
      Voici notre guide complet basé sur l'analyse de 500+ cessions réussies.`,
      sections: [
        {
          titre: "Les 3 Méthodes de Valorisation BTP",
          contenu: `**1. Méthode Patrimoniale**
Valorisation = Actifs - Passifs + Goodwill

Exemple entreprise plomberie :
- Matériel et véhicules : 80,000€
- Stock : 15,000€  
- Dettes : -30,000€
- Goodwill (clientèle) : 120,000€
= **Valorisation : 185,000€**

**2. Méthode des Multiples**
Valorisation = CA × Multiple sectoriel

Multiples moyens BTP 2024 :
- Gros œuvre : 0.4-0.6x CA
- Second œuvre : 0.6-0.8x CA
- RGE énergies renouvelables : 0.8-1.2x CA

**3. Méthode DCF (Flux de trésorerie)**
Pour entreprises +1M€ CA avec historique solide.`
        },
        {
          titre: "Facteurs de Valorisation en 2024",
          contenu: `**Facteurs positifs (+10 à +50%)**
✅ Certifications RGE (QualiPAC, QualiPV)
✅ Carnet de commandes >6 mois
✅ Clients récurrents (>60%)
✅ Équipe stable (ancienneté >3 ans)
✅ Marge nette >12%

**Facteurs négatifs (-20 à -40%)**
❌ Dépendance client >30% CA
❌ Dettes URSSAF/TVA
❌ Matériel vétuste
❌ Pas de présence digitale
❌ Marché local saturé`
        },
        {
          titre: "Cas Pratiques de Valorisation",
          contenu: `**Cas 1 : Entreprise Électricité (5 salariés)**
- CA : 800,000€
- EBE : 96,000€ (12%)
- Certifications : Qualifelec + IRVE
- Valorisation : 520,000€ (0.65x CA)

**Cas 2 : Entreprise Pompe à Chaleur RGE (3 salariés)**  
- CA : 650,000€
- EBE : 110,500€ (17%)
- QualiPAC Chauffage + ECS
- Valorisation : 585,000€ (0.9x CA)
Justification : marché en explosion, marges élevées

**Cas 3 : Maçonnerie (8 salariés)**
- CA : 1,200,000€
- EBE : 120,000€ (10%)
- Qualibat 2111
- Valorisation : 540,000€ (0.45x CA)
Justification : marges serrées, forte concurrence`
        },
        {
          titre: "Erreurs Courantes à Éviter",
          contenu: `**Erreur #1 : Surévaluer son entreprise**
Conséquence : Aucune offre pendant 6+ mois

**Erreur #2 : Oublier les dettes cachées**
URSSAF, congés payés provisions = -30% valorisation

**Erreur #3 : Ne pas documenter son CA**
Sans comptabilité propre = décote -40%

**Erreur #4 : Vendre au mauvais moment**
Vendre en novembre/décembre = -15%
Meilleur moment : mars-mai

**Erreur #5 : Négliger la transmission**
Pas d'accompagnement = échec 30% reprises`
        }
      ],
      conclusion: `La valorisation d'une entreprise BTP nécessite une approche multicritères. 
      N'hésitez pas à faire appel à un expert pour une estimation précise. 
      Sur CessionBTP.fr, nous proposons une estimation gratuite en 48h basée sur notre analyse de marché.`
    },
    cta: "Obtenez votre estimation gratuite sur CessionBTP.fr",
    keywords: ['valorisation entreprise btp', 'prix vente entreprise batiment', 'estimer entreprise construction'],
    platforms: ['blog', 'linkedin', 'medium']
  },
  
  financement: {
    titre: "Financer la Reprise d'une Entreprise BTP : 5 Solutions Méconnues",
    mots: 1600,
    structure: {
      intro: `Reprendre une entreprise BTP nécessite en moyenne 30% d'apport personnel. 
      Mais il existe des solutions de financement méconnues qui peuvent réduire cet apport à 10%. 
      Voici 5 leviers à activer.`,
      sections: [
        {
          titre: "1. Crédit Vendeur : Réduisez Votre Apport de 50%",
          contenu: `Le crédit vendeur permet au vendeur de financer 20-40% du prix.

**Exemple concret :**
Prix entreprise électricité : 400,000€
- Apport : 120,000€ (30%)
- Banque : 200,000€ (50%)
- Crédit vendeur : 80,000€ (20%)

**Avantages :**
✅ Moins d'apport personnel
✅ Vendeur confiant (il reste impliqué)
✅ Facilite accord bancaire

**Conditions :**
- Taux : 3-5% sur 3-5 ans
- Garantie : nantissement parts sociales`
        },
        {
          titre: "2. BPI France : Garanties jusqu'à 70%",
          contenu: `BPI garantit votre prêt bancaire, réduisant l'apport requis.

**Dispositifs 2024 :**
- **Garantie Transmission** : 70% du prêt garanti
- Montant : jusqu'à 3M€
- Coût : 0.5% du montant garanti

**Cas pratique :**
Achat entreprise plomberie 300,000€
- Prêt bancaire : 240,000€
- Garantie BPI : 168,000€ (70%)
→ Risque banque réduit = taux -1%`
        },
        {
          titre: "3. Holding LBO : Le Montage des Pros",
          contenu: `Créer une holding pour racheter l'entreprise avec effet de levier.

**Schéma :**
1. Créer Holding avec 60,000€ apport
2. Holding emprunte 240,000€
3. Holding rachète Cible (300,000€)
4. Dividendes Cible remboursent dette

**Avantages fiscaux :**
- Intégration fiscale
- Déductibilité intérêts
- IS réduit (15% <42k€)

⚠️ Nécessite accompagnement expert-comptable`
        },
        {
          titre: "4. Love Money : Famille et Amis",
          contenu: `Lever auprès de proches avec avantages fiscaux.

**Don familial :**
- 100,000€ exonérés (tous les 15 ans)
- Conditions : <80 ans donateur, >18 ans bénéficiaire

**Prêt familial :**
- Taux libre (0% possible)
- Déclaration obligatoire si >5,000€
- Acte authentique recommandé

**Crowdlending familial :**
Plateforme sécurisée avec contrat type`
        },
        {
          titre: "5. Location-Gérance : Tester Avant d'Acheter",
          contenu: `Gérer l'entreprise pendant 1-2 ans avant l'achat définitif.

**Fonctionnement :**
- Redevance mensuelle au propriétaire
- Option d'achat à terme
- Les loyers s'imputent sur le prix final

**Avantages :**
✅ Apprendre le métier
✅ Sécuriser la transition
✅ Constituer apport progressivement

**Conditions :**
- Durée : 1-3 ans
- Redevance : 3-5% CA
- Prix bloqué dès le départ`
        }
      ],
      conclusion: `Le financement d'une reprise BTP combine plusieurs leviers. 
      L'objectif est de minimiser l'apport cash tout en rassurant les financeurs. 
      Un bon montage peut réduire votre apport de 30% à 15%.`
    },
    cta: "Simulez votre financement sur CessionBTP.fr",
    keywords: ['financement reprise entreprise btp', 'credit vendeur batiment', 'bpi transmission'],
    platforms: ['blog', 'linkedin']
  },
  
  erreurs: {
    titre: "10 Erreurs Fatales lors de la Cession d'une Entreprise BTP",
    mots: 1500,
    structure: {
      intro: `30% des cessions BTP échouent après signature du compromis. 
      Ces échecs coûtent en moyenne 6 mois perdus et 20,000€ de frais. 
      Voici les 10 erreurs à éviter absolument.`,
      sections: [
        {
          titre: "Erreurs Avant-Vente",
          contenu: `**Erreur #1 : Vendre dans l'urgence**
Délai minimum : 6 mois
Vente précipitée = décote -30%

**Erreur #2 : Comptabilité non à jour**
Documents requis :
- 3 derniers bilans certifiés
- Liasse fiscale complète
- Situation intermédiaire N

**Erreur #3 : Négliger la présentation**
Photos, vidéo, dossier = +25% prix

**Erreur #4 : Prix irréaliste**
Surévaluation +20% = 0 visite
Mieux : prix juste dès le départ`
        },
        {
          titre: "Erreurs Pendant Négociation",
          contenu: `**Erreur #5 : Dévoiler trop tôt les faiblesses**
Timing : après visite, avant compromis

**Erreur #6 : Accepter 1ère offre trop vite**
Négocier même sur 1ère offre = +8% prix moyen

**Erreur #7 : Oublier clause earn-out**
Si CA incertain, prévoir complément de prix

**Erreur #8 : Pas de NDA signé**
Avant toute info sensible = NDA obligatoire`
        },
        {
          titre: "Erreurs Post-Compromis",
          contenu: `**Erreur #9 : Transmission bâclée**
Durée accompagnement : 3-6 mois minimum
Formation acheteur = succès reprise

**Erreur #10 : Partir trop vite**
30% échecs = vendeur parti trop tôt
Rester disponible 1 an (consulting)`
        }
      ],
      conclusion: `La cession d'une entreprise BTP est un marathon, pas un sprint. 
      Anticipez, préparez, accompagnez. C'est la clé d'une transmission réussie.`
    },
    cta: "Checklist complète gratuite sur CessionBTP.fr",
    keywords: ['erreurs cession entreprise', 'vendre entreprise btp', 'transmission entreprise'],
    platforms: ['blog', 'linkedin', 'forum']
  }
};

// Générateur d'article personnalisé
export const generateArticle = (template: ArticleTemplate, customData?: {
  metier?: string;
  ville?: string;
  stats?: any;
}): string => {
  let article = `# ${template.titre}\n\n`;
  article += `${template.structure.intro}\n\n`;
  
  template.structure.sections.forEach(section => {
    article += `## ${section.titre}\n\n`;
    article += `${section.contenu}\n\n`;
  });
  
  article += `## Conclusion\n\n${template.structure.conclusion}\n\n`;
  article += `---\n\n**${template.cta}**\n\n`;
  article += `*Mots-clés : ${template.keywords.join(', ')}*\n`;
  article += `*Publié sur : ${template.platforms.join(', ')}*`;
  
  return article;
};

// Templates posts LinkedIn
export const linkedinPostTemplates = [
  {
    type: 'success-story',
    template: `🎯 [MÉTIER] vendu en [X] jours à [VILLE]

Voici comment :
✅ Prix : [PRIX]€
✅ CA : [CA]€  
✅ Effectif : [EFFECTIF] salariés
✅ Accompagnement : [DURÉE]

La clé du succès ?
→ [FACTEUR CLÉ]

💬 Vous vendez votre entreprise BTP ?
Estimation gratuite en 48h sur CessionBTP.fr

#BTP #CessionEntreprise #Transmission`
  },
  {
    type: 'stat-choc',
    template: `📊 Chiffre du jour BTP :

[STAT] des entreprises BTP sont à vendre

Pourquoi ?
• [RAISON 1]
• [RAISON 2]  
• [RAISON 3]

C'est le moment d'acheter ? 👇

[CALL TO ACTION]

#BTP #Reprise #Opportunité`
  },
  {
    type: 'conseil',
    template: `💡 Conseil du jour :

[CONSEIL PRINCIPAL]

Exemple concret :
[CAS PRATIQUE]

Résultat :
→ [BÉNÉFICE]

Vous avez testé cette méthode ?

#BTP #Conseil #Transmission`
  }
];

// Templates emails cold outreach
export const emailTemplates = {
  vendeur: {
    subject: "Vendez votre entreprise [MÉTIER] en 45 jours",
    body: `Bonjour [PRÉNOM],

Je vois que vous dirigez [ENTREPRISE], spécialisée en [MÉTIER] depuis [X] ans.

En tant que leader de la cession BTP, nous vendons 1 entreprise tous les 3 jours.

Notre estimation gratuite indique que votre entreprise vaut entre [MIN]€ et [MAX]€.

Souhaitez-vous :
✅ Une estimation précise ?
✅ Connaître le délai de vente ?
✅ Comprendre le processus ?

Réponse rapide : [LIEN]

Cordialement,
[SIGNATURE]`
  },
  acheteur: {
    subject: "[X] entreprises [MÉTIER] à vendre [VILLE]",
    body: `Bonjour [PRÉNOM],

Vous cherchez à reprendre une entreprise [MÉTIER] ?

Nous avons actuellement [X] opportunités à [VILLE] :

📍 Entreprise 1 : [CA]€ - [PRIX]€
📍 Entreprise 2 : [CA]€ - [PRIX]€  
📍 Entreprise 3 : [CA]€ - [PRIX]€

Financement possible jusqu'à 70%.

Voir les annonces : [LIEN]

À très vite,
[SIGNATURE]`
  }
};
