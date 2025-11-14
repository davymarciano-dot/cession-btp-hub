import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Automation {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  expectedResults: string[];
}

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}

const AutomationTester = () => {
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, TestResult>>({});
  
  const automations: Automation[] = [
    {
      id: 'matching',
      name: '🎯 Matching IA',
      description: 'Test le matching vendeurs/acheteurs',
      endpoint: 'test-matching',
      expectedResults: ['matchesFound', 'emailsSent']
    },
    {
      id: 'upsells',
      name: '📧 Upsells Emails',
      description: 'Test les emails de boost automatiques',
      endpoint: 'test-upsell',
      expectedResults: ['emailsSent', 'targetsFound']
    },
    {
      id: 'carts',
      name: '🛒 Cart Recovery',
      description: 'Test la récupération des paniers',
      endpoint: 'test-cart-recovery',
      expectedResults: ['processed', 'recovered']
    },
    {
      id: 'referrals',
      name: '👥 Commissions Parrainage',
      description: 'Test le calcul des commissions',
      endpoint: 'test-referral',
      expectedResults: ['calculated', 'pending']
    }
  ];
  
  const runTest = async (automation: Automation) => {
    setRunning({...running, [automation.id]: true});
    
    try {
      const { data, error } = await supabase.functions.invoke(automation.endpoint, {
        body: { test_mode: true }
      });
      
      if (error) throw error;
      
      setResults({
        ...results,
        [automation.id]: {
          success: true,
          data,
          timestamp: new Date()
        }
      });
      
      // TODO: Log to automation_logs when table is available
      console.log(`Test ${automation.id} completed:`, data);
      
      toast.success(`✅ ${automation.name} réussi`);
    } catch (error: any) {
      setResults({
        ...results,
        [automation.id]: {
          success: false,
          error: error.message,
          timestamp: new Date()
        }
      });
      toast.error(`❌ Erreur: ${error.message}`);
    }
    
    setRunning({...running, [automation.id]: false});
  };
  
  const runAllTests = async () => {
    for (const automation of automations) {
      await runTest(automation);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">🧪 Tests Manuels</h2>
      
      <div className="space-y-4">
        {automations.map(automation => (
          <Card key={automation.id} className="p-4 border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold">{automation.name}</h3>
                <p className="text-sm text-muted-foreground">{automation.description}</p>
              </div>
              
              <Button
                onClick={() => runTest(automation)}
                disabled={running[automation.id]}
                variant={running[automation.id] ? "secondary" : "default"}
                className="bg-green-600 hover:bg-green-700"
              >
                {running[automation.id] ? '⏳ En cours...' : '▶️ Lancer'}
              </Button>
            </div>
            
            {results[automation.id] && (
              <div className={`mt-3 p-3 rounded-lg ${
                results[automation.id].success ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    {results[automation.id].success ? '✅ Succès' : '❌ Échec'}
                  </span>
                  <span className="text-muted-foreground">
                    {results[automation.id].timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {results[automation.id].data && (
                  <div className="text-sm space-y-1">
                    {automation.expectedResults.map(key => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">
                          {results[automation.id].data?.[key] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
      
      <Button
        onClick={runAllTests}
        className="w-full mt-6"
        size="lg"
      >
        🚀 Lancer tous les tests
      </Button>
    </Card>
  );
};

export default AutomationTester;
