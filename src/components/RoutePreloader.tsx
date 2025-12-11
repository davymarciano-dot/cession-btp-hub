import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ⚡ PRÉCHARGEMENT INTELLIGENT DES ROUTES
 * Précharge les modules JS des routes probables en fonction de la page actuelle
 * pour améliorer la navigation perçue
 */

// Mapping des routes vers leurs imports dynamiques
const ROUTE_MODULES: Record<string, () => Promise<unknown>> = {
  '/vendre': () => import('@/pages/Vendre'),
  '/entreprises': () => import('@/pages/Entreprises'),
  '/estimer': () => import('@/pages/Estimer'),
  '/tarifs': () => import('@/pages/Tarifs'),
  '/auth': () => import('@/pages/Auth'),
  '/blog': () => import('@/pages/blog/BlogIndex'),
  '/faq': () => import('@/pages/FAQ'),
  '/contact': () => import('@/pages/Contact'),
  '/dashboard': () => import('@/pages/Dashboard'),
};

// Prédictions de navigation basées sur la page actuelle
const ROUTE_PREDICTIONS: Record<string, string[]> = {
  '/': ['/vendre', '/entreprises', '/estimer'],
  '/vendre': ['/estimer', '/tarifs', '/auth'],
  '/entreprises': ['/estimer', '/auth'],
  '/estimer': ['/vendre', '/auth', '/tarifs'],
  '/tarifs': ['/vendre', '/auth'],
  '/auth': ['/dashboard', '/vendre'],
  '/blog': ['/faq', '/contact'],
  '/faq': ['/contact', '/blog'],
};

export const RoutePreloader = () => {
  const location = useLocation();

  const preloadRoute = useCallback((route: string) => {
    const moduleLoader = ROUTE_MODULES[route];
    if (moduleLoader) {
      // Précharger le module JS
      moduleLoader().catch(() => {
        // Silently fail - not critical
      });
    }
    
    // Aussi ajouter un prefetch link pour le navigateur
    const existingLink = document.querySelector(`link[href="${route}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const routesToPreload = ROUTE_PREDICTIONS[currentPath] || [];

    // Précharger après 1.5 secondes d'inactivité sur la page
    const timer = setTimeout(() => {
      routesToPreload.forEach(preloadRoute);
    }, 1500);

    // Précharger au survol des liens
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && ROUTE_MODULES[href]) {
          preloadRoute(href);
        }
      }
    };

    document.addEventListener('mouseover', handleLinkHover, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, [location.pathname, preloadRoute]);

  return null;
};
