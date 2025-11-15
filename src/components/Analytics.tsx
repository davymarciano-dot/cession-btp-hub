import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}

const Analytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Google Analytics 4 - Track page views
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }
    
    // Hotjar - Track page changes
    if (window.hj) {
      window.hj('stateChange', location.pathname);
    }
  }, [location]);
  
  return null;
};

export default Analytics;
