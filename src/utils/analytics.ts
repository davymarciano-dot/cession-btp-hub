// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXX', {
      page_path: url,
      page_title: title
    });
  }
};

export const trackListing = {
  view: (metier: string, ville?: string, price?: string) => {
    trackEvent('view_listing', {
      metier,
      ville: ville || 'none',
      price_range: price ? getPriceRange(parseInt(price)) : 'unknown'
    });
  },
  
  contact: (listingId: string, metier: string) => {
    trackEvent('contact_seller', {
      listing_id: listingId,
      metier
    });
  },
  
  favorite: (listingId: string) => {
    trackEvent('add_to_favorites', {
      listing_id: listingId
    });
  }
};

export const trackForm = {
  start: (formType: 'estimation' | 'vendre' | 'acheter') => {
    trackEvent('form_start', {
      form_type: formType
    });
  },
  
  complete: (formType: string, metier?: string) => {
    trackEvent('form_submit', {
      form_type: formType,
      metier: metier || 'unknown'
    });
  },
  
  abandon: (formType: string, step: number) => {
    trackEvent('form_abandon', {
      form_type: formType,
      step
    });
  }
};

export const trackCTA = {
  click: (ctaType: string, location: string, metier?: string) => {
    trackEvent('click_cta', {
      cta_type: ctaType,
      location,
      metier: metier || 'none'
    });
  }
};

export const trackSearch = {
  filter: (filterType: string, filterValue: string) => {
    trackEvent('search_filter', {
      filter_type: filterType,
      filter_value: filterValue
    });
  },
  
  query: (searchQuery: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: searchQuery,
      results_count: resultsCount
    });
  }
};

const getPriceRange = (price: number): string => {
  if (price < 200000) return '0-200k';
  if (price < 500000) return '200k-500k';
  if (price < 1000000) return '500k-1M';
  return '1M+';
};

// Initialize analytics
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX';
    document.head.appendChild(script);
    
    window.gtag = function() {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXX', {
      send_page_view: false // We'll send manually
    });
  }
};
