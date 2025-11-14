import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CartData {
  id: string;
  user_id: string | null;
  product_type: string;
  price: number;
  started_at: Date;
  last_step: string;
  completed: boolean;
  updated_at?: Date;
}

const getCurrentUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
};

const handleCartAbandonment = async (cartData: CartData) => {
  const startTime = new Date(cartData.started_at).getTime();
  const timeSpent = Date.now() - startTime;
  
  // Ne pas tracker si complété ou si session < 30 secondes
  if (cartData.completed || timeSpent < 30000) {
    return;
  }
  
  try {
    // Enregistrer l'abandon (pour l'instant on log juste)
    console.log('Cart abandoned:', {
      user_id: cartData.user_id,
      product_type: cartData.product_type,
      price: cartData.price,
      last_step: cartData.last_step,
      time_spent: Math.round(timeSpent / 1000),
      abandoned_at: new Date()
    });
    
    // TODO: Implémenter l'insertion dans la table abandoned_carts quand elle sera créée
    /*
    await supabase.from('abandoned_carts').insert({
      user_id: cartData.user_id,
      product_type: cartData.product_type,
      price: cartData.price,
      last_step: cartData.last_step,
      time_spent: timeSpent,
      abandoned_at: new Date()
    });
    */
  } catch (error) {
    console.error('Error tracking abandoned cart:', error);
  }
};

export const useCartTracking = (productType: string, price: number) => {
  useEffect(() => {
    const initTracking = async () => {
      // Initialiser le tracking
      const cartId = `cart_${Date.now()}`;
      const startTime = Date.now();
      const userId = await getCurrentUserId();
      
      const cartData: CartData = {
        id: cartId,
        user_id: userId,
        product_type: productType,
        price: price,
        started_at: new Date(startTime),
        last_step: 'view_product',
        completed: false
      };
      
      // Sauvegarder dans sessionStorage
      sessionStorage.setItem('activeCart', JSON.stringify(cartData));
      
      // TODO: Tracker dans Supabase quand la table sera créée
      /*
      await supabase.from('cart_sessions').insert(cartData);
      */
      console.log('Cart tracking initialized:', cartData);
    };
    
    initTracking();
    
    // Cleanup on unmount
    return () => {
      const dataStr = sessionStorage.getItem('activeCart');
      if (dataStr) {
        const data: CartData = JSON.parse(dataStr);
        if (!data.completed) {
          handleCartAbandonment(data);
        }
      }
    };
  }, [productType, price]);
  
  const trackStep = async (stepName: string) => {
    const dataStr = sessionStorage.getItem('activeCart');
    if (!dataStr) return;
    
    const data: CartData = JSON.parse(dataStr);
    data.last_step = stepName;
    data.updated_at = new Date();
    
    sessionStorage.setItem('activeCart', JSON.stringify(data));
    
    console.log('Cart step tracked:', stepName);
    
    // TODO: Update dans Supabase quand la table sera créée
    /*
    await supabase
      .from('cart_sessions')
      .update({ last_step: stepName, updated_at: new Date() })
      .eq('id', data.id);
    */
  };
  
  const completeCart = async () => {
    const dataStr = sessionStorage.getItem('activeCart');
    if (!dataStr) return;
    
    const data: CartData = JSON.parse(dataStr);
    data.completed = true;
    
    sessionStorage.setItem('activeCart', JSON.stringify(data));
    
    console.log('Cart completed:', data.id);
    
    // TODO: Update dans Supabase quand la table sera créée
    /*
    await supabase
      .from('cart_sessions')
      .update({ completed: true, completed_at: new Date() })
      .eq('id', data.id);
    */
  };
  
  return { trackStep, completeCart };
};
