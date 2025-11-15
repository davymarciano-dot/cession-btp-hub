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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
    
    // Hotjar - Track page changes
    if (window.hj) {
      window.hj('stateChange', location.pathname);
    }
  }, [location]);
  
  return null;
};

// Export trackEvent function for use throughout the app
export const trackEvent = (
  action: string, 
  category: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined tracking functions for common events
export const trackCTAClick = (location: string) => {
  trackEvent('click', 'CTA', location);
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'Lead', formName);
};

export const trackSignUp = (userType: 'seller' | 'buyer') => {
  trackEvent('sign_up', 'User', userType);
};

export const trackListingView = (listingId: string, price?: number) => {
  trackEvent('view_item', 'Listing', listingId, price);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'Engagement', searchTerm);
};

export const trackContactClick = (listingId: string) => {
  trackEvent('contact_click', 'Conversion', listingId);
};

export const trackEstimationRequest = () => {
  trackEvent('estimation_request', 'Lead', 'Estimation gratuite');
};

export default Analytics;
