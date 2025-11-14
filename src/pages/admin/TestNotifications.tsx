import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const TestNotifications = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [activeChannels, setActiveChannels] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const notificationTests = [
    {
      id: 'new_view',
      name: '👁️ Nouvelle vue',
      description: 'Simule une vue sur une annonce',
      data: {
        type: 'new_view',
        title: 'Nouvelle vue sur votre annonce',
        message: 'Jean D. vient de consulter votre entreprise de plomberie',
        metadata: { viewer: 'Jean Dupont', location: 'Paris', device: 'mobile' }
      }
    },
    {
      id: 'new_contact',
      name: '💬 Nouveau message',
      description: 'Simule un message d\'acheteur',
      data: {
        type: 'new_contact',
        title: 'Nouveau message reçu',
        message: 'Pierre M. souhaite discuter de votre entreprise',
        metadata: { sender: 'Pierre Martin', verified: true }
      }
    },
    {
      id: 'new_match',
      name: '🎯 Nouveau match IA',
      description: 'Simule un matching IA',
      data: {
        type: 'new_match',
        title: '3 acheteurs matchés !',
        message: 'Notre IA a trouvé des acheteurs parfaits pour votre entreprise',
        metadata: { matches: 3, avgScore: 92 }
      }
    }
  ];
  
  useEffect(() => {
    setupRealtimeChannels();
    return () => cleanupChannels();
  }, []);
  
  const setupRealtimeChannels = () => {
    const testChannel = supabase
      .channel('test-notifications')
      .on('broadcast', { event: 'test-notification' }, (payload) => {
        console.log('📨 Notification reçue:', payload);
        handleNotificationReceived(payload.payload);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = testChannel.presenceState();
        setActiveChannels(state);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          toast.success('✅ Canal temps réel connecté');
        }
      });
    
    testChannel.track({
      user: 'admin-tester',
      online_at: new Date().toISOString()
    });
  };
  
  const cleanupChannels = () => {
    supabase.removeAllChannels();
  };
  
  const handleNotificationReceived = (notification: any) => {
    showNotification(notification);
    
    setTestResults(prev => [{
      ...notification,
      receivedAt: new Date().toISOString(),
      latency: Date.now() - notification.sentAt
    }, ...prev].slice(0, 10));
  };
  
  const showNotification = (notification: any) => {
    toast(
      <div className="flex items-start gap-3">
        <span className="text-2xl">{getIcon(notification.type)}</span>
        <div>
          <p className="font-semibold">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
      </div>
    );
  };
  
  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      'new_view': '👁️',
      'new_contact': '💬',
      'new_match': '🎯',
      'boost_expiring': '⏰',
      'price_drop': '💰'
    };
    return icons[type] || '🔔';
  };
  
  const sendTestNotification = async (test: any) => {
    setLoading({ ...loading, [test.id]: true });
    
    try {
      await supabase
        .channel('test-notifications')
        .send({
          type: 'broadcast',
          event: 'test-notification',
          payload: {
            ...test.data,
            sentAt: Date.now()
          }
        });
      
      toast.success(`✅ Test "${test.name}" envoyé`);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(`❌ Erreur lors du test`);
    }
    
    setLoading({ ...loading, [test.id]: false });
  };
  
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success('✅ Notifications activées');
      }
    }
  };
  
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8">🔔 Test des Notifications Temps Réel</h1>
      
      <div className="bg-card rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">📡 Statut de connexion</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">
              {Object.keys(activeChannels).length > 0 ? '🟢' : '🔴'}
            </div>
            <p className="text-sm">WebSocket</p>
            <p className="text-xs text-muted-foreground">
              {Object.keys(activeChannels).length} connectés
            </p>
          </div>
        </div>
        
        <Button onClick={requestNotificationPermission} className="mt-4">
          Activer les notifications navigateur
        </Button>
      </div>
      
      <div className="bg-card rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">🧪 Tests disponibles</h2>
        
        <div className="space-y-4">
          {notificationTests.map(test => (
            <div key={test.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{test.name}</h3>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </div>
                
                <Button
                  onClick={() => sendTestNotification(test)}
                  disabled={loading[test.id]}
                >
                  {loading[test.id] ? '⏳...' : 'Tester'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">📊 Résultats des tests</h2>
        
        {testResults.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Aucun test effectué pour le moment
          </p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getIcon(result.type)}</span>
                  <div>
                    <p className="font-semibold">{result.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Latence: {result.latency}ms
                    </p>
                  </div>
                </div>
                <span className="text-green-600">✓ Reçu</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestNotifications;
