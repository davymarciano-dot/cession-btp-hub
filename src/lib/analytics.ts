// Google Analytics tracking utility
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
      page_title: title,
    });
  }
};

// Predefined events for the app
export const analyticsEvents = {
  // Homepage
  clickEstimateButton: () => trackEvent('click_estimate_button', { location: 'homepage' }),
  clickVendreButton: () => trackEvent('click_vendre_button', { location: 'homepage' }),
  clickAcheterButton: () => trackEvent('click_acheter_button', { location: 'homepage' }),
  
  // Estimation
  startEstimation: () => trackEvent('start_estimation'),
  completeEstimationStep: (step: number) => trackEvent('complete_estimation_step', { step }),
  submitEstimation: (secteur: string, departement: string) => trackEvent('submit_estimation', { secteur, departement }),
  viewEstimationResult: (valeur: number) => trackEvent('view_estimation_result', { value: valeur }),
  
  // Vendre
  startSellForm: () => trackEvent('start_sell_form'),
  completeSellStep: (step: number) => trackEvent('complete_sell_step', { step }),
  selectSubscription: (plan: string, price: number) => trackEvent('select_subscription', { plan, value: price }),
  submitSellForm: (plan: string) => trackEvent('submit_sell_form', { plan }),
  
  // Entreprises
  viewListings: (count: number) => trackEvent('view_listings', { listings_count: count }),
  filterListings: (filters: Record<string, any>) => trackEvent('filter_listings', filters),
  viewEnterpriseDetails: (enterpriseId: string, price: number) => trackEvent('view_enterprise_details', { 
    enterprise_id: enterpriseId,
    value: price 
  }),
  clickContactSeller: (enterpriseId: string) => trackEvent('click_contact_seller', { enterprise_id: enterpriseId }),
  
  // Messaging
  sendMessage: (conversationId: string) => trackEvent('send_message', { conversation_id: conversationId }),
  clickSendMessage: (enterpriseId: string) => trackEvent('click_send_message', { enterprise_id: enterpriseId }),
  
  // Auth
  signUp: (userType: 'vendeur' | 'acheteur') => trackEvent('sign_up', { user_type: userType }),
  signIn: () => trackEvent('sign_in'),
  completeRegistration: (profil: string) => trackEvent('complete_registration', { profil }),
  
  // Payment
  startCheckout: (plan: string, price: number) => trackEvent('begin_checkout', { 
    items: [{ item_name: plan, price }],
    value: price,
    currency: 'EUR'
  }),
  completePayment: (plan: string, price: number, annonceId: string) => trackEvent('purchase', {
    transaction_id: annonceId,
    value: price,
    currency: 'EUR',
    items: [{ item_name: plan, price }]
  }),
};
