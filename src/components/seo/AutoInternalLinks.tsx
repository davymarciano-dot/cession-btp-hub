import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface InternalLinkItem {
  title: string;
  description: string;
  href: string;
  category: 'action' | 'resource' | 'info';
}

interface AutoInternalLinksProps {
  currentPage: string;
  maxLinks?: number;
}

// 🔥 SYSTÈME DE LIENS INTERNES AUTOMATIQUE INTELLIGENT
// Ce composant génère automatiquement les liens internes pertinents
// selon la page actuelle pour améliorer le maillage SEO

const allInternalLinks: InternalLinkItem[] = [
  // Pages d'action (CTA)
  { 
    title: "Vendre mon entreprise BTP", 
    description: "Publiez votre annonce en 15 minutes et trouvez un repreneur qualifié",
    href: "/vendre",
    category: "action"
  },
  { 
    title: "Trouver une entreprise à reprendre", 
    description: "Parcourez +500 opportunités d'acquisition dans le BTP",
    href: "/entreprises",
    category: "action"
  },
  { 
    title: "Estimer gratuitement mon entreprise", 
    description: "Obtenez une valorisation IA en 2 minutes avec bonus RGE",
    href: "/estimation",
    category: "action"
  },
  
  // Pages ressources
  { 
    title: "Success stories", 
    description: "Découvrez comment 500+ entrepreneurs ont réussi leur transmission",
    href: "/success-stories",
    category: "resource"
  },
  { 
    title: "Comment ça marche", 
    description: "Le processus complet de cession en 5 étapes simples",
    href: "/comment-ca-marche",
    category: "info"
  },
  { 
    title: "Notre équipe", 
    description: "Rencontrez les experts qui vous accompagnent",
    href: "/equipe",
    category: "info"
  },
  { 
    title: "Tarifs transparents", 
    description: "Comparez les formules d'abonnement vendeur et acheteur",
    href: "/tarifs",
    category: "info"
  },
  { 
    title: "Matching IA", 
    description: "Comment notre algorithme connecte vendeurs et repreneurs idéaux",
    href: "/matching-ia",
    category: "resource"
  },
  { 
    title: "Lexique BTP", 
    description: "Tous les termes techniques de la transmission d'entreprise BTP",
    href: "/lexique-btp",
    category: "resource"
  },
  { 
    title: "Blog transmission BTP", 
    description: "Conseils d'experts et actualités du marché de la cession",
    href: "/blog",
    category: "resource"
  },
  { 
    title: "FAQ complète", 
    description: "Toutes les réponses à vos questions sur la cession BTP",
    href: "/faq",
    category: "info"
  },
  { 
    title: "Outils gratuits", 
    description: "Calculateurs de valorisation, simulateurs, checklist",
    href: "/outils-gratuits",
    category: "resource"
  },
];

// 🧠 LOGIQUE INTELLIGENTE DE SÉLECTION DES LIENS
function getRelevantLinks(currentPage: string, maxLinks: number = 6): InternalLinkItem[] {
  // Exclure la page actuelle
  const availableLinks = allInternalLinks.filter(link => link.href !== currentPage);
  
  // Stratégie de sélection selon la page actuelle
  let selectedLinks: InternalLinkItem[] = [];
  
  // PAGE D'ACCUEIL : Mix équilibré CTA + ressources
  if (currentPage === '/') {
    selectedLinks = [
      ...availableLinks.filter(l => l.category === 'action').slice(0, 3),
      ...availableLinks.filter(l => l.category === 'resource').slice(0, 2),
      ...availableLinks.filter(l => l.category === 'info').slice(0, 1),
    ];
  }
  
  // PAGE VENDRE : Outils et ressources pour vendeurs
  else if (currentPage === '/vendre') {
    selectedLinks = [
      availableLinks.find(l => l.href === '/estimation')!,
      availableLinks.find(l => l.href === '/tarifs')!,
      availableLinks.find(l => l.href === '/success-stories')!,
      availableLinks.find(l => l.href === '/comment-ca-marche')!,
      availableLinks.find(l => l.href === '/faq')!,
      availableLinks.find(l => l.href === '/outils-gratuits')!,
    ].filter(Boolean);
  }
  
  // PAGE ENTREPRISES : Outils pour acheteurs
  else if (currentPage === '/entreprises' || currentPage === '/acheter') {
    selectedLinks = [
      availableLinks.find(l => l.href === '/tarifs')!,
      availableLinks.find(l => l.href === '/matching-ia')!,
      availableLinks.find(l => l.href === '/success-stories')!,
      availableLinks.find(l => l.href === '/comment-ca-marche')!,
      availableLinks.find(l => l.href === '/faq')!,
      availableLinks.find(l => l.href === '/estimation')!,
    ].filter(Boolean);
  }
  
  // PAGE ESTIMATION : Convertir en vendeur
  else if (currentPage === '/estimation') {
    selectedLinks = [
      availableLinks.find(l => l.href === '/vendre')!,
      availableLinks.find(l => l.href === '/tarifs')!,
      availableLinks.find(l => l.href === '/success-stories')!,
      availableLinks.find(l => l.href === '/outils-gratuits')!,
      availableLinks.find(l => l.href === '/comment-ca-marche')!,
      availableLinks.find(l => l.href === '/equipe')!,
    ].filter(Boolean);
  }
  
  // PAGES RESSOURCES : Mix CTA + autres ressources
  else if (['/success-stories', '/lexique-btp', '/blog', '/matching-ia', '/outils-gratuits'].includes(currentPage)) {
    selectedLinks = [
      availableLinks.find(l => l.href === '/vendre')!,
      availableLinks.find(l => l.href === '/entreprises')!,
      availableLinks.find(l => l.href === '/estimation')!,
      ...availableLinks.filter(l => l.category === 'resource' && l.href !== currentPage).slice(0, 3),
    ].filter(Boolean);
  }
  
  // PAGES INFO : Convertir en action
  else if (['/comment-ca-marche', '/tarifs', '/faq', '/equipe'].includes(currentPage)) {
    selectedLinks = [
      availableLinks.find(l => l.href === '/vendre')!,
      availableLinks.find(l => l.href === '/entreprises')!,
      availableLinks.find(l => l.href === '/estimation')!,
      ...availableLinks.filter(l => l.category === 'info' && l.href !== currentPage).slice(0, 3),
    ].filter(Boolean);
  }
  
  // Par défaut : priorité aux actions
  else {
    selectedLinks = [
      ...availableLinks.filter(l => l.category === 'action'),
      ...availableLinks.filter(l => l.category === 'resource').slice(0, 2),
      ...availableLinks.filter(l => l.category === 'info').slice(0, 1),
    ];
  }
  
  return selectedLinks.slice(0, maxLinks);
}

export const AutoInternalLinks = ({ currentPage, maxLinks = 6 }: AutoInternalLinksProps) => {
  const links = getRelevantLinks(currentPage, maxLinks);
  
  if (links.length === 0) return null;
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Pour aller plus loin</h2>
            <p className="text-muted-foreground text-lg">
              Découvrez nos autres ressources et services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="group"
              >
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 hover:border-primary hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {link.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
