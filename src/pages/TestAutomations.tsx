import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

const TestAutomations = () => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const tests = [
    {
      id: 'matching',
      name: 'Matching IA',
      function: 'test-matching',
      description: 'Lance le matching vendeurs/acheteurs'
    },
    {
      id: 'upsell',
      name: 'Emails Upsell',
      function: 'test-upsell',
      description: 'Envoie les emails de boost'
    },
    {
      id: 'cart_recovery',
      name: 'Récupération Paniers',
      function: 'test-cart-recovery',
      description: 'Traite les paniers abandonnés'
    },
    {
      id: 'referral',
      name: 'Système Parrainage',
      function: 'test-referral',
      description: 'Teste les commissions parrainage'
    }
  ];
  
  const runTest = async (test: typeof tests[0]) => {
    setLoading({ ...loading, [test.id]: true });
    
    try {
      const { data, error } = await supabase.functions.invoke(test.function, {
        body: { test_mode: true }
      });
      
      if (error) throw error;
      
      setTestResults({
        ...testResults,
        [test.id]: {
          success: true,
          data: data,
          timestamp: new Date().toISOString()
        }
      });
      
      toast({
        title: "✅ Test réussi",
        description: `${test.name} exécuté avec succès`
      });
    } catch (error: any) {
      toast({
        title: "❌ Erreur",
        description: error.message,
        variant: "destructive"
      });
      
      setTestResults({
        ...testResults,
        [test.id]: {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      });
    } finally {
      setLoading({ ...loading, [test.id]: false });
    }
  };
  
  const runAllTests = async () => {
    for (const test of tests) {
      await runTest(test);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">🧪 Test des Automatisations</h1>
          
          {/* Bouton test global */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Test Complet</h3>
                  <p className="text-sm text-muted-foreground">
                    Lance tous les tests d'automatisation
                  </p>
                </div>
                <Button
                  onClick={runAllTests}
                  className="bg-primary hover:bg-primary/90"
                >
                  Lancer tous les tests
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tests individuels */}
          <div className="space-y-4">
            {tests.map(test => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-1">{test.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{test.description}</p>
                    </div>
                    
                    <Button
                      onClick={() => runTest(test)}
                      disabled={loading[test.id]}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {loading[test.id] ? 'Test en cours...' : 'Tester'}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {testResults[test.id] && (
                    <div className={`p-4 rounded-lg ${
                      testResults[test.id].success ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {testResults[test.id].success ? '✅ Succès' : '❌ Échec'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(testResults[test.id].timestamp).toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                      
                      {testResults[test.id].data && (
                        <pre className="text-xs bg-background p-2 rounded mt-2 overflow-x-auto">
                          {JSON.stringify(testResults[test.id].data, null, 2)}
                        </pre>
                      )}
                      
                      {testResults[test.id].error && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {testResults[test.id].error}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Console de debug */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Console de Debug</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
                {Object.entries(testResults).length === 0 ? (
                  <p className="text-gray-500">Aucun test exécuté...</p>
                ) : (
                  Object.entries(testResults).map(([id, result]) => (
                    <div key={id}>
                      [{new Date(result.timestamp).toLocaleTimeString('fr-FR')}] {id}: 
                      {result.success ? ' SUCCESS' : ' FAILED'}
                      {result.data && ` - ${JSON.stringify(result.data)}`}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestAutomations;
