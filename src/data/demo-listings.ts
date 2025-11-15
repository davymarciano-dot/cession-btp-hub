export interface DemoListing {
  id: number;
  title: string;
  price: number;
  revenue: number;
  employees: number;
  image: string;
  badge: string;
  location: string;
  sector: string;
  description: string;
}

export const demoListings: DemoListing[] = [
  {
    id: 1,
    title: "Entreprise de maçonnerie - Paris",
    price: 750000,
    revenue: 1200000,
    employees: 8,
    image: "/demo/macon.jpg",
    badge: "Coup de cœur",
    location: "Paris (75)",
    sector: "Maçonnerie",
    description: "Société établie depuis 15 ans, clientèle fidèle et carnet de commandes rempli"
  },
  {
    id: 2,
    title: "Société de plomberie - Lyon",
    price: 450000,
    revenue: 800000,
    employees: 5,
    image: "/demo/plombier.jpg",
    badge: "Urgent",
    location: "Lyon (69)",
    sector: "Plomberie",
    description: "Départ en retraite du gérant. Affaire saine avec matériel récent"
  },
  {
    id: 3,
    title: "Électricité générale - Marseille",
    price: 580000,
    revenue: 950000,
    employees: 6,
    image: "/demo/elec.jpg",
    badge: "Négociable",
    location: "Marseille (13)",
    sector: "Électricité",
    description: "Spécialisée tertiaire et résidentiel haut de gamme"
  },
  {
    id: 4,
    title: "Entreprise de couverture - Toulouse",
    price: 620000,
    revenue: 1050000,
    employees: 7,
    image: "/demo/couvreur.jpg",
    badge: "Nouveauté",
    location: "Toulouse (31)",
    sector: "Couverture",
    description: "Qualibat RGE, nombreux contrats d'entretien récurrents"
  },
  {
    id: 5,
    title: "Menuiserie bois/alu - Bordeaux",
    price: 890000,
    revenue: 1450000,
    employees: 10,
    image: "/demo/menuiserie.jpg",
    badge: "Rentable",
    location: "Bordeaux (33)",
    sector: "Menuiserie",
    description: "Atelier moderne, marque reconnue localement depuis 25 ans"
  },
  {
    id: 6,
    title: "Peinture décoration - Nantes",
    price: 380000,
    revenue: 650000,
    employees: 4,
    image: "/demo/peinture.jpg",
    badge: "Prix attractif",
    location: "Nantes (44)",
    sector: "Peinture",
    description: "Spécialiste ravalement de façades, portefeuille syndics"
  }
];

export const platformStats = {
  totalListings: "2,847",
  successfulSales: "543",
  totalValue: "127M€",
  avgTime: "45 jours",
  activeRepreners: "2,347",
  satisfactionRate: "95%"
};

export const recentActivities = [
  {
    id: 1,
    action: "vente",
    company: "Entreprise de maçonnerie à Paris",
    amount: 750000,
    timeAgo: "Il y a 2h"
  },
  {
    id: 2,
    action: "inscription",
    company: "Repreneur qualifié",
    region: "Île-de-France",
    timeAgo: "Il y a 3h"
  },
  {
    id: 3,
    action: "estimation",
    company: "Société de plomberie à Lyon",
    timeAgo: "Il y a 5h"
  }
];
