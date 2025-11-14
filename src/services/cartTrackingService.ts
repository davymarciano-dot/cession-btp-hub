class CartTrackingService {
  static init() {
    if (typeof window === 'undefined') return;
    
    this.setupTracking();
    this.setupEventListeners();
  }
  
  static setupTracking() {
    const path = window.location.pathname;
    let productType: string | null = null;
    let price: number | null = null;
    
    if (path.includes('/tarifs') || path.includes('/pricing')) {
      productType = 'pricing_view';
      price = 0;
    } else if (path.includes('/boost')) {
      productType = this.detectBoostType();
      price = this.detectPrice();
    } else if (path.includes('/premium')) {
      productType = 'premium_subscription';
      price = 299;
    }
    
    if (productType) {
      this.startCartSession(productType, price);
    }
  }
  
  static startCartSession(productType: string, price: number) {
    const session = {
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: this.getUserId(),
      product_type: productType,
      price: price,
      started_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
      steps_completed: ['view_product'],
      completed: false
    };
    
    sessionStorage.setItem('activeCart', JSON.stringify(session));
    
    console.log('Cart session started:', session);
    
    this.setupAbandonDetection(session);
  }
  
  static setupAbandonDetection(session: any) {
    window.addEventListener('beforeunload', () => {
      const cart = JSON.parse(sessionStorage.getItem('activeCart') || '{}');
      
      if (!cart.completed && cart.id) {
        const abandonData = {
          cart_id: cart.id,
          abandoned_at: new Date().toISOString(),
          last_step: cart.steps_completed[cart.steps_completed.length - 1],
          time_spent: Date.now() - new Date(cart.started_at).getTime()
        };
        
        console.log('Cart abandoned:', abandonData);
        
        navigator.sendBeacon('/api/cart-abandon', JSON.stringify(abandonData));
      }
    });
    
    let inactivityTimer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        this.markAsInactive();
      }, 5 * 60 * 1000);
    };
    
    ['mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
    
    resetTimer();
  }
  
  static setupEventListeners() {
    // Tracker clics sur boutons de paiement
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-track-cart]')) {
        const step = target.getAttribute('data-track-cart') || 'button_click';
        this.trackStep(step);
      }
    });
  }
  
  static trackStep(stepName: string) {
    const cart = JSON.parse(sessionStorage.getItem('activeCart') || '{}');
    
    if (cart.id) {
      cart.steps_completed.push(stepName);
      cart.last_activity = new Date().toISOString();
      
      sessionStorage.setItem('activeCart', JSON.stringify(cart));
      
      console.log('Cart step tracked:', stepName);
    }
  }
  
  static completeCart(orderId: string) {
    const cart = JSON.parse(sessionStorage.getItem('activeCart') || '{}');
    
    if (cart.id) {
      cart.completed = true;
      cart.completed_at = new Date().toISOString();
      cart.order_id = orderId;
      
      sessionStorage.setItem('activeCart', JSON.stringify(cart));
      
      console.log('Cart completed:', orderId);
      
      setTimeout(() => {
        sessionStorage.removeItem('activeCart');
      }, 1000);
    }
  }
  
  static markAsInactive() {
    const cart = JSON.parse(sessionStorage.getItem('activeCart') || '{}');
    
    if (cart.id && !cart.completed) {
      console.log('Cart inactive for 5 minutes');
    }
  }
  
  static getUserId(): string {
    return localStorage.getItem('userId') || `anonymous_${Date.now()}`;
  }
  
  static detectBoostType(): string {
    const title = document.querySelector('h1')?.textContent || '';
    if (title.includes('30 jours')) return 'boost_30';
    if (title.includes('7 jours')) return 'boost_7';
    return 'boost_standard';
  }
  
  static detectPrice(): number {
    const priceElement = document.querySelector('[data-price]');
    if (priceElement) {
      return parseInt(priceElement.getAttribute('data-price') || '0');
    }
    return 0;
  }
}

if (typeof window !== 'undefined') {
  (window as any).CartTracking = CartTrackingService;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      CartTrackingService.init();
    });
  } else {
    CartTrackingService.init();
  }
}

export default CartTrackingService;
