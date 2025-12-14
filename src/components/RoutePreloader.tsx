import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ⚡ PRÉCHARGEMENT INTELLIGENT DES ROUTES
 * Précharge les routes probables en fonction de la page actuelle
 * pour améliorer la navigation perçue
 */

const ROUTE_PREDICTIONS: Record<string, string[]> = {
  '/': ['/vendre', '/entreprises', '/estimation'],
  '/vendre': ['/estimation', '/tarifs', '/auth'],
  '/entreprises': ['/estimation', '/auth'],
  '/estimation': ['/vendre', '/auth'],
  '/tarifs': ['/vendre', '/auth'],
};

export const RoutePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const routesToPreload = ROUTE_PREDICTIONS[currentPath] || [];

    // Précharger après 2 secondes d'inactivité
    const timer = setTimeout(() => {
      routesToPreload.forEach((route) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};
