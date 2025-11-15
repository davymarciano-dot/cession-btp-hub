import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '../Analytics';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  user_type: string;
  company?: string;
}

export default function CrispWidget() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Get current user and profile
    const fetchUserProfile = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            user_type: profile.user_type,
            company: profile.company || undefined,
          });
        }
      }
    };

    fetchUserProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
              user_type: profile.user_type,
              company: profile.company || undefined,
            });
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!window.$crisp) return;

    // Configure Crisp with user data
    if (user) {
      window.$crisp.push(['set', 'user:email', [user.email]]);
      window.$crisp.push(['set', 'user:nickname', [user.name]]);
      window.$crisp.push(['set', 'session:data', [[
        ['user_type', user.user_type],
        ['user_id', user.id],
        ['company', user.company || 'N/A']
      ]]]);
    }

    // Track chat events
    window.$crisp.push(['on', 'chat:opened', function() {
      trackEvent('chat_opened', 'Support', 'Widget Opened');
    }]);

    window.$crisp.push(['on', 'message:sent', function() {
      trackEvent('chat_message', 'Support', 'Message Sent');
    }]);

    // Visual configuration
    window.$crisp.push(['config', 'color:theme', ['blue']]);
    window.$crisp.push(['config', 'position:reverse', [false]]);

    // Welcome message for new visitors
    const hasSeenWelcome = sessionStorage.getItem('crisp_welcome_shown');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        window.$crisp.push(['do', 'message:show', [
          'text',
          "👋 Bonjour ! Je suis là pour vous aider. Vous cherchez à vendre ou acheter une entreprise BTP ?"
        ]]);
        sessionStorage.setItem('crisp_welcome_shown', 'true');
      }, 5000);
    }
  }, [user]);

  // Route-specific messages
  useEffect(() => {
    if (!window.$crisp) return;

    const path = window.location.pathname;
    const hasSeenRouteMessage = sessionStorage.getItem(`crisp_route_${path}`);
    
    if (hasSeenRouteMessage) return;

    const messages: Record<string, { delay: number; text: string }> = {
      '/pricing': {
        delay: 10000,
        text: "💡 Besoin d'aide pour choisir le bon plan ? Je peux vous conseiller !"
      },
      '/acheter': {
        delay: 30000,
        text: "🔍 Vous avez trouvé une entreprise intéressante ? Je peux vous mettre en relation avec le vendeur."
      },
      '/vendre': {
        delay: 15000,
        text: "📊 Besoin d'aide pour évaluer votre entreprise ? Je peux vous guider dans le processus."
      },
    };

    const routeMessage = messages[path];
    if (routeMessage) {
      setTimeout(() => {
        window.$crisp.push(['do', 'message:show', [
          'text',
          routeMessage.text
        ]]);
        sessionStorage.setItem(`crisp_route_${path}`, 'true');
      }, routeMessage.delay);
    }
  }, []);

  return null;
}
