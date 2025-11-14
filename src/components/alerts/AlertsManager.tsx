import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "./MultiSelect";
import { ActiveAlertsList } from "./ActiveAlertsList";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";

interface AlertCriteria {
  sectors: string[];
  departments: string[];
  minRevenue: number;
  maxRevenue: number;
  minEmployees: number;
  maxEmployees: number;
  email?: string;
}

export const AlertsManager = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState<AlertCriteria>({
    sectors: [],
    departments: [],
    minRevenue: 0,
    maxRevenue: 1000000,
    minEmployees: 0,
    maxEmployees: 50,
  });

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-alerts', {
        body: { method: 'LIST' },
      });

      if (error) throw error;
      setAlerts(data.data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const createAlert = async () => {
    setLoading(true);
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user && !criteria.email) {
        toast({
          title: "Email requis",
          description: "Veuillez entrer votre email pour créer une alerte.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('manage-alerts', {
        body: { 
          method: 'CREATE',
          criteria: {
            ...criteria,
            email: criteria.email || user?.email,
          }
        },
      });

      if (error) throw error;

      toast({
        title: "✅ Alerte créée !",
        description: "Vous serez notifié par email des nouvelles annonces correspondantes.",
      });

      // Reset form
      setCriteria({
        sectors: [],
        departments: [],
        minRevenue: 0,
        maxRevenue: 1000000,
        minEmployees: 0,
        maxEmployees: 50,
      });

      fetchAlerts();
    } catch (error) {
      console.error('Error creating alert:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'alerte. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sectorOptions = [
    { value: "electricite", label: "Électricité" },
    { value: "plomberie", label: "Plomberie" },
    { value: "chauffage", label: "Chauffage" },
    { value: "climatisation", label: "Climatisation" },
    { value: "maconnerie", label: "Maçonnerie" },
    { value: "menuiserie", label: "Menuiserie" },
    { value: "couverture", label: "Couverture" },
    { value: "peinture", label: "Peinture" },
    { value: "carrelage", label: "Carrelage" },
    { value: "terrassement", label: "Terrassement" },
  ];

  const departmentOptions = [
    { value: "75", label: "75 - Paris" },
    { value: "13", label: "13 - Bouches-du-Rhône" },
    { value: "69", label: "69 - Rhône" },
    { value: "31", label: "31 - Haute-Garonne" },
    { value: "44", label: "44 - Loire-Atlantique" },
    { value: "33", label: "33 - Gironde" },
    { value: "59", label: "59 - Nord" },
    { value: "92", label: "92 - Hauts-de-Seine" },
    { value: "93", label: "93 - Seine-Saint-Denis" },
    { value: "94", label: "94 - Val-de-Marne" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Créer une alerte
          </h3>
        </div>

        <div className="space-y-6">
          {/* Email field for non-authenticated users */}
          <div>
            <Label htmlFor="email">Email de notification</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={criteria.email || ''}
              onChange={(e) => setCriteria({ ...criteria, email: e.target.value })}
            />
          </div>

          {/* Multi-selects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MultiSelect
              label="Secteurs d'activité"
              options={sectorOptions}
              value={criteria.sectors}
              onChange={(val) => setCriteria({ ...criteria, sectors: val })}
              placeholder="Tous les secteurs"
            />
            <MultiSelect
              label="Départements"
              options={departmentOptions}
              value={criteria.departments}
              onChange={(val) => setCriteria({ ...criteria, departments: val })}
              placeholder="Tous les départements"
            />
          </div>

          {/* Revenue range */}
          <div className="space-y-2">
            <Label>
              Chiffre d'affaires: {formatCurrency(criteria.minRevenue)} - {formatCurrency(criteria.maxRevenue)}
            </Label>
            <Slider
              min={0}
              max={5000000}
              step={50000}
              value={[criteria.minRevenue, criteria.maxRevenue]}
              onValueChange={(val) =>
                setCriteria({
                  ...criteria,
                  minRevenue: val[0],
                  maxRevenue: val[1],
                })
              }
            />
          </div>

          {/* Employee range */}
          <div className="space-y-2">
            <Label>
              Nombre de salariés: {criteria.minEmployees} - {criteria.maxEmployees}
            </Label>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[criteria.minEmployees, criteria.maxEmployees]}
              onValueChange={(val) =>
                setCriteria({
                  ...criteria,
                  minEmployees: val[0],
                  maxEmployees: val[1],
                })
              }
            />
          </div>

          <Button
            onClick={createAlert}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Création..." : "Créer l'alerte"}
          </Button>
        </div>
      </Card>

      <ActiveAlertsList alerts={alerts} onUpdate={fetchAlerts} />
    </div>
  );
};