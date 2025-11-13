// Google Analytics event tracking utility
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Predefined events for the app
export const analyticsEvents = {
  clickEstimateButton: () => trackEvent('click_estimate_button', { location: 'homepage' }),
  completeEstimationStep: (step: number) => trackEvent('complete_estimation_step', { step }),
  viewEnterpriseDetails: (enterpriseId: string) => trackEvent('view_enterprise_details', { enterprise_id: enterpriseId }),
  clickSendMessage: (enterpriseId: string) => trackEvent('click_send_message', { enterprise_id: enterpriseId }),
  signUp: (userType: 'vendeur' | 'acheteur') => trackEvent('sign_up', { user_type: userType }),
  selectSubscription: (plan: string, userType: string) => trackEvent('select_subscription', { plan, user_type: userType }),
};
