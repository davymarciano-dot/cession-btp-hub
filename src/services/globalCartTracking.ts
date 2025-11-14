interface CartSession {
  id: string;
  userId: string;
  startedAt: Date;
  page: string;
  referrer: string;
  steps: Array<{
    page?: string;
    action: string;
    data?: any;
    timestamp: number;
  }>;
  completed?: boolean;
}

class GlobalCartTracking {
  private static SESSION_KEY = 'cartSession';
  
  static init() {
    if (typeof window === 'undefined') return;
    
    this.setupGlobalTracking();
    this.trackUserBehavior();
    this.setupAbandonDetection();
  }
  
  static setupGlobalTracking() {
    const trackingPages = [
      '/boost',
      '/premium',
      '/checkout',
      '/estimation',
      '/tarifs'
    ];
    
    const currentPath = window.location.pathname;
    
    if (trackingPages.some(page => currentPath.includes(page))) {
      this.startSession();
    }
  }
  
  static startSession() {
    const session: CartSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: this.getUserId(),
      startedAt: new Date(),
      page: window.location.pathname,
      referrer: document.referrer,
      steps: [{
        page: window.location.pathname,
        timestamp: Date.now(),
        action: 'page_view'
      }]
    };
    
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    
    // Track in Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cart_session_start', {
        page: session.page
      });
    }
  }
  
  static trackAction(action: string, data: any = {}) {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return;
    
    const session: CartSession = JSON.parse(sessionData);
    
    session.steps.push({
      action,
      data,
      timestamp: Date.now()
    });
    
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    
    // Send to backend
    fetch('/api/tracking/cart-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session.id,
        action,
        data
      })
    }).catch(err => console.error('Failed to track action:', err));
  }
  
  static trackUserBehavior() {
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"]')) {
        this.trackAction('click', {
          element: target.tagName,
          text: target.textContent?.substring(0, 50)
        });
      }
    });
  }
  
  static setupAbandonDetection() {
    let lastActivity = Date.now();
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      lastActivity = Date.now();
      clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        this.handleInactivity();
      }, 3 * 60 * 1000); // 3 minutes
    };
    
    ['click', 'scroll', 'keypress'].forEach(event => {
      document.addEventListener(event, resetTimer);
    });
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      }
    });
    
    resetTimer();
  }
  
  static handleInactivity() {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return;
    
    const session: CartSession = JSON.parse(sessionData);
    
    if (!session.completed) {
      this.trackAction('inactivity_detected', {
        duration: Date.now() - session.startedAt.getTime()
      });
    }
  }
  
  static handlePageHidden() {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return;
    
    const session: CartSession = JSON.parse(sessionData);
    
    if (!session.completed) {
      navigator.sendBeacon('/api/tracking/cart-abandon', JSON.stringify({
        sessionId: session.id,
        reason: 'page_hidden',
        lastStep: session.steps[session.steps.length - 1]
      }));
    }
  }
  
  static completeSession() {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return;
    
    const session: CartSession = JSON.parse(sessionData);
    session.completed = true;
    
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    
    this.trackAction('session_completed', {});
  }
  
  static getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', userId);
    }
    return userId;
  }
}

// Auto-init
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    GlobalCartTracking.init();
  });
}

export default GlobalCartTracking;
