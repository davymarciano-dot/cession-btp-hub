import { metiersComplete, villesFrance } from '@/data/metiers-complete';
import { certifications } from '@/data/seo-data';
import { regions } from '@/data/seo-data';

export interface SeoPage {
  path: string;
  title: string;
  priority: number;
  changefreq: string;
  type: 'metier' | 'metier-ville' | 'certification' | 'region' | 'keyword';
}

export const generateAllSeoPages = (): SeoPage[] => {
  const pages: SeoPage[] = [];
  
  // 1. Pages métier simple (ex: /entreprise-plomberie-a-vendre)
  metiersComplete.forEach(metier => {
    pages.push({
      path: `/entreprise-${metier.slug}-a-vendre`,
      title: `Entreprise ${metier.name} à vendre`,
      priority: 0.9,
      changefreq: 'daily',
      type: 'metier'
    });
  });
  
  // 2. Pages métier + ville (ex: /entreprise-plomberie-paris-a-vendre)
  // Limiter aux 20 premières villes pour ne pas surcharger
  metiersComplete.slice(0, 15).forEach(metier => {
    villesFrance.slice(0, 20).forEach(ville => {
      pages.push({
        path: `/entreprise-${metier.slug}-${ville}-a-vendre`,
        title: `Entreprise ${metier.name} à vendre ${ville}`,
        priority: 0.8,
        changefreq: 'weekly',
        type: 'metier-ville'
      });
    });
  });
  
  // 3. Pages certification (ex: /entreprise-rge-a-vendre)
  certifications.forEach(cert => {
    pages.push({
      path: `/entreprise-${cert.slug}-a-vendre`,
      title: `Entreprise ${cert.name} à vendre`,
      priority: 0.9,
      changefreq: 'daily',
      type: 'certification'
    });
  });
  
  // 4. Pages région (ex: /entreprise-btp-a-vendre-ile-de-france)
  regions.forEach(region => {
    pages.push({
      path: `/entreprise-btp-a-vendre-${region.slug}`,
      title: `Entreprise BTP à vendre ${region.name}`,
      priority: 0.8,
      changefreq: 'daily',
      type: 'region'
    });
  });
  
  // 5. Pages vendeur intent (ex: /vendre-entreprise-plomberie)
  metiersComplete.slice(0, 10).forEach(metier => {
    pages.push({
      path: `/vendre-entreprise-${metier.slug}`,
      title: `Vendre entreprise ${metier.name}`,
      priority: 0.9,
      changefreq: 'weekly',
      type: 'keyword'
    });
  });
  
  return pages;
};

export const getTotalSeoPages = () => {
  const pages = generateAllSeoPages();
  return {
    total: pages.length,
    byType: {
      metier: pages.filter(p => p.type === 'metier').length,
      metierVille: pages.filter(p => p.type === 'metier-ville').length,
      certification: pages.filter(p => p.type === 'certification').length,
      region: pages.filter(p => p.type === 'region').length,
      keyword: pages.filter(p => p.type === 'keyword').length
    }
  };
};
