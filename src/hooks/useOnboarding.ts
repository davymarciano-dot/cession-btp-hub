import { useState, useEffect } from 'react';

interface OnboardingData {
  sector?: string;
  hasRGE?: boolean;
  timeline?: string;
  [key: string]: any;
}

export const useOnboarding = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  
  useEffect(() => {
    const handleShowOnboarding = () => {
      setShouldShowOnboarding(true);
    };
    
    window.addEventListener('showOnboarding', handleShowOnboarding);
    
    const checkOnboarding = () => {
      const completed = localStorage.getItem('onboardingComplete');
      const skipped = localStorage.getItem('onboardingSkipped');
      const firstVisit = !localStorage.getItem('hasVisited');
      
      if (firstVisit && !completed && !skipped) {
        setTimeout(() => setShouldShowOnboarding(true), 1000);
      }
      
      localStorage.setItem('hasVisited', 'true');
    };
    
    checkOnboarding();
    
    return () => {
      window.removeEventListener('showOnboarding', handleShowOnboarding);
    };
  }, []);
  
  const completeOnboarding = (data: OnboardingData) => {
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('onboardingData', JSON.stringify(data));
    setShouldShowOnboarding(false);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'onboarding_complete', data);
    }
  };
  
  const skipOnboarding = () => {
    localStorage.setItem('onboardingSkipped', 'true');
    setShouldShowOnboarding(false);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'onboarding_skipped');
    }
  };
  
  const restartOnboarding = () => {
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('onboardingSkipped');
    setShouldShowOnboarding(true);
  };
  
  return {
    shouldShowOnboarding,
    completeOnboarding,
    skipOnboarding,
    restartOnboarding
  };
};
