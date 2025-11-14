import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseListingViewProps {
  listingId: string;
  enabled?: boolean;
}

/**
 * Hook to track listing views with duration and analytics
 */
export const useListingView = ({ listingId, enabled = true }: UseListingViewProps) => {
  const startTimeRef = useRef<number>(Date.now());
  const viewIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !listingId) return;

    const trackView = async () => {
      try {
        // Get user info
        const { data: { user } } = await supabase.auth.getUser();
        
        // Get device info
        const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? 'mobile'
          : /Tablet|iPad/i.test(navigator.userAgent)
          ? 'tablet'
          : 'desktop';

        // Create view record - using any to bypass type issues
        const { data, error } = await supabase
          .from('listing_views' as any)
          .insert({
            listing_id: listingId,
            viewer_id: user?.id || null,
            referrer: document.referrer || null,
            device_type: deviceType,
          } as any)
          .select('id')
          .single() as any;

        if (error) {
          console.error('Error tracking view:', error);
          return;
        }

        viewIdRef.current = data.id;
        console.log('View tracked:', data.id);
      } catch (error) {
        console.error('Error in trackView:', error);
      }
    };

    trackView();

    // Update duration on unmount
    return () => {
      if (viewIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        
        supabase
          .from('listing_views' as any)
          .update({ duration } as any)
          .eq('id', viewIdRef.current)
          .then(() => console.log('View duration updated:', duration));
      }
    };
  }, [listingId, enabled]);
};