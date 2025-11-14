interface CartData {
  userId: string | null;
  product: string;
  price: number;
  startTime: number;
  steps: Array<{ step: string; timestamp: number }>;
  completed?: boolean;
}

class CartTracker {
  static init() {
    if (typeof window === 'undefined') return;
    
    if (window.location.pathname.includes('/checkout') || 
        window.location.pathname.includes('/boost') ||
        window.location.pathname.includes('/tarifs')) {
      this.startTracking();
    }
  }
  
  static startTracking() {
    const cartData: CartData = {
      userId: this.getUserId(),
      product: this.detectProduct(),
      price: this.detectPrice(),
      startTime: Date.now(),
      steps: []
    };
    
    sessionStorage.setItem('cartTracking', JSON.stringify(cartData));
    this.trackStep('viewed');
    
    window.addEventListener('beforeunload', this.handleAbandon.bind(this));
  }
  
  static getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }
  
  static detectProduct(): string {
    const path = window.location.pathname;
    if (path.includes('boost')) return 'boost';
    if (path.includes('premium')) return 'premium';
    if (path.includes('featured')) return 'featured';
    return 'standard';
  }
  
  static detectPrice(): number {
    const priceElement = document.querySelector('[data-price]');
    if (priceElement) {
      return parseInt(priceElement.getAttribute('data-price') || '0');
    }
    
    const path = window.location.pathname;
    if (path.includes('boost')) return 49;
    if (path.includes('premium')) return 199;
    return 99;
  }
  
  static trackStep(stepName: string) {
    const dataStr = sessionStorage.getItem('cartTracking');
    if (!dataStr) return;
    
    const data: CartData = JSON.parse(dataStr);
    data.steps.push({
      step: stepName,
      timestamp: Date.now()
    });
    sessionStorage.setItem('cartTracking', JSON.stringify(data));
  }
  
  static async handleAbandon() {
    const dataStr = sessionStorage.getItem('cartTracking');
    if (!dataStr) return;
    
    const data: CartData = JSON.parse(dataStr);
    
    if (!data.completed && data.userId) {
      try {
        // Log to console for now - edge function will handle saving to DB
        console.log('Cart abandoned:', {
          userId: data.userId,
          product: data.product,
          price: data.price,
          lastStep: data.steps[data.steps.length - 1]?.step || 'unknown'
        });
      } catch (error) {
        console.error('Failed to track abandoned cart:', error);
      }
    }
  }
  
  static completeCart() {
    const dataStr = sessionStorage.getItem('cartTracking');
    if (!dataStr) return;
    
    const data: CartData = JSON.parse(dataStr);
    data.completed = true;
    sessionStorage.setItem('cartTracking', JSON.stringify(data));
  }
}

export default CartTracker;

export const useCartTracking = () => {
  const trackStep = (step: string) => CartTracker.trackStep(step);
  const completeCart = () => CartTracker.completeCart();
  
  return { trackStep, completeCart };
};
