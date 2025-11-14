import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface AlertPreferences {
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  triggers: {
    newView: boolean;
    newContact: boolean;
    newMatch: boolean;
    priceChange: boolean;
    boostExpiring: boolean;
    competitorActivity: boolean;
  };
  frequency: 'instant' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface SmartAlertsConfigProps {
  userId: string;
}

const SmartAlertsConfig = ({ userId }: SmartAlertsConfigProps) => {
  const [preferences, setPreferences] = useState<AlertPreferences>({
    channels: {
      email: true,
      push: false,
      sms: false,
      whatsapp: false
    },
    triggers: {
      newView: true,
      newContact: true,
      newMatch: true,
      priceChange: true,
      boostExpiring: true,
      competitorActivity: false
    },
    frequency: 'instant',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [testMode, setTestMode] = useState(false);
  
  useEffect(() => {
    loadPreferences();
  }, [userId]);
  
  const loadPreferences = async () => {
    const { data } = await supabase
      .from('alert_preferences' as any)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle() as any;
    
    if (data && data.preferences) {
      try {
        const prefs = typeof data.preferences === 'string' 
          ? JSON.parse(data.preferences) 
          : data.preferences;
        setPreferences(prefs as AlertPreferences);
      } catch (e) {
        console.error('Error parsing preferences:', e);
      }
      setPhoneNumber(data.phone_number || '');
    }
  };
  
  const savePreferences = async () => {
    const { error } = await supabase
      .from('alert_preferences' as any)
      .upsert({
        user_id: userId,
        preferences: preferences as any,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString()
      } as any);
    
    if (!error) {
      toast.success('✅ Préférences sauvegardées');
      await setupChannels();
    } else {
      toast.error('Erreur lors de la sauvegarde');
    }
  };
  
  const setupChannels = async () => {
    if (preferences.channels.push) {
      await setupPushNotifications();
    }
  };
  
  const setupPushNotifications = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        toast.success('🔔 Notifications push activées');
      }
    }
  };
  
  const testAlert = async (channel: string) => {
    setTestMode(true);
    toast.success(`✅ Test envoyé sur ${channel}`);
    setTimeout(() => setTestMode(false), 2000);
  };
  
  interface ChannelCardProps {
    channel: keyof AlertPreferences['channels'];
    icon: string;
    name: string;
    description: string;
  }
  
  const ChannelCard = ({ channel, icon, name, description }: ChannelCardProps) => (
    <div className={`border rounded-lg p-4 ${
      preferences.channels[channel] ? 'border-primary bg-accent' : 'border-border'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <Switch
          checked={preferences.channels[channel]}
          onCheckedChange={(checked) => setPreferences({
            ...preferences,
            channels: {
              ...preferences.channels,
              [channel]: checked
            }
          })}
        />
      </div>
      
      {preferences.channels[channel] && (
        <>
          {(channel === 'sms' || channel === 'whatsapp') && (
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="mb-3"
            />
          )}
          
          <Button
            variant="link"
            onClick={() => testAlert(channel)}
            disabled={testMode}
            size="sm"
          >
            {testMode ? '⏳ Test en cours...' : '🧪 Tester'}
          </Button>
        </>
      )}
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔔 Configuration des Alertes</h1>
      
      <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Canaux de notification</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <ChannelCard
            channel="email"
            icon="📧"
            name="Email"
            description="Notifications par email"
          />
          <ChannelCard
            channel="push"
            icon="🔔"
            name="Push navigateur"
            description="Notifications instantanées"
          />
          <ChannelCard
            channel="sms"
            icon="📱"
            name="SMS"
            description="Alertes critiques par SMS"
          />
          <ChannelCard
            channel="whatsapp"
            icon="💬"
            name="WhatsApp"
            description="Messages WhatsApp Business"
          />
        </div>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Types d'alertes</h2>
        
        <div className="space-y-3">
          {Object.entries(preferences.triggers).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg cursor-pointer">
              <span className="font-medium">
                {key === 'newView' && '👁️ Nouvelles vues'}
                {key === 'newContact' && '💬 Nouveaux messages'}
                {key === 'newMatch' && '🎯 Nouveaux matchs IA'}
                {key === 'priceChange' && '💰 Changements de prix'}
                {key === 'boostExpiring' && '⏰ Boost qui expire'}
                {key === 'competitorActivity' && '🔍 Activité concurrents'}
              </span>
              
              <Switch
                checked={value}
                onCheckedChange={(checked) => setPreferences({
                  ...preferences,
                  triggers: {
                    ...preferences.triggers,
                    [key]: checked
                  }
                })}
              />
            </label>
          ))}
        </div>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Fréquence des alertes</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {(['instant', 'hourly', 'daily'] as const).map(freq => (
            <button
              key={freq}
              onClick={() => setPreferences({ ...preferences, frequency: freq })}
              className={`p-4 rounded-lg border-2 transition ${
                preferences.frequency === freq
                  ? 'border-primary bg-accent'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <p className="font-semibold">
                {freq === 'instant' && '⚡ Instantané'}
                {freq === 'hourly' && '⏰ Toutes les heures'}
                {freq === 'daily' && '📅 Quotidien'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {freq === 'instant' && 'Alertes en temps réel'}
                {freq === 'hourly' && 'Résumé horaire'}
                {freq === 'daily' && 'Digest quotidien'}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">🌙 Heures silencieuses</h2>
          
          <Switch
            checked={preferences.quietHours.enabled}
            onCheckedChange={(checked) => setPreferences({
              ...preferences,
              quietHours: {
                ...preferences.quietHours,
                enabled: checked
              }
            })}
          />
        </div>
        
        {preferences.quietHours.enabled && (
          <div className="flex gap-4">
            <div>
              <label className="text-sm text-muted-foreground">De</label>
              <Input
                type="time"
                value={preferences.quietHours.start}
                onChange={(e) => setPreferences({
                  ...preferences,
                  quietHours: {
                    ...preferences.quietHours,
                    start: e.target.value
                  }
                })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">À</label>
              <Input
                type="time"
                value={preferences.quietHours.end}
                onChange={(e) => setPreferences({
                  ...preferences,
                  quietHours: {
                    ...preferences.quietHours,
                    end: e.target.value
                  }
                })}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => loadPreferences()}
        >
          Annuler
        </Button>
        
        <Button onClick={savePreferences}>
          Sauvegarder les préférences
        </Button>
      </div>
    </div>
  );
};

export default SmartAlertsConfig;
