import { useEffect } from 'react';

/**
 * 📊 MONITORING DES WEB VITALS (Simplifié)
 * Mesure les métriques de performance via Performance API native
 * - LCP (Largest Contentful Paint)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - Load Time
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };
  
  const [good, poor] = thresholds[name] || [1000, 3000];
  
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: PerformanceMetric) {
  // Envoyer à Google Analytics si disponible
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_value: metric.value,
      metric_rating: metric.rating,
    });
  }
  
  // Log en développement
  if (import.meta.env.DEV) {
    console.log(`📊 ${metric.name}:`, {
      value: `${Math.round(metric.value)}ms`,
      rating: metric.rating,
    });
  }
}

export const WebVitals = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    // Observer pour LCP
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          
          sendToAnalytics({
            name: 'LCP',
            value: lcp,
            rating: getRating('LCP', lcp),
          });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP non supporté
      }
    };

    // Mesurer FCP et TTFB au chargement
    const measureLoadMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // TTFB
        const ttfb = navigation.responseStart - navigation.requestStart;
        sendToAnalytics({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
        });
        
        // Load Time
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        sendToAnalytics({
          name: 'LoadTime',
          value: loadTime,
          rating: getRating('LCP', loadTime),
        });
      }
      
      // FCP
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        sendToAnalytics({
          name: 'FCP',
          value: fcpEntry.startTime,
          rating: getRating('FCP', fcpEntry.startTime),
        });
      }
    };

    observeLCP();
    
    // Attendre que la page soit complètement chargée
    if (document.readyState === 'complete') {
      measureLoadMetrics();
    } else {
      window.addEventListener('load', measureLoadMetrics);
    }

    return () => {
      window.removeEventListener('load', measureLoadMetrics);
    };
  }, []);

  return null;
};
