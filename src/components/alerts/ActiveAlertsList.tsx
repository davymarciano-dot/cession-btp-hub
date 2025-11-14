import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, BellOff, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  secteurs: string[];
  departements: string[];
  ca_min: number;
  ca_max: number;
  effectif_min: number;
  effectif_max: number;
  active: boolean;
  created_at: string;
}

interface ActiveAlertsListProps {
  alerts: Alert[];
  onUpdate: () => void;
}

export const ActiveAlertsList = ({ alerts, onUpdate }: ActiveAlertsListProps) => {
  const handleDelete = async (alertId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-alerts', {
        body: { method: 'DELETE', alertId },
      });

      if (error) throw error;

      toast({
        title: "Alerte supprimée",
        description: "L'alerte a été supprimée avec succès.",
      });
      onUpdate();
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'alerte.",
        variant: "destructive",
      });
    }
  };

  const handleToggle = async (alertId: string, currentActive: boolean) => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-alerts', {
        body: { 
          method: 'UPDATE', 
          alertId,
          criteria: { active: !currentActive }
        },
      });

      if (error) throw error;

      toast({
        title: currentActive ? "Alerte désactivée" : "Alerte activée",
        description: currentActive 
          ? "Vous ne recevrez plus de notifications pour cette alerte."
          : "Vous recevrez des notifications pour cette alerte.",
      });
      onUpdate();
    } catch (error) {
      console.error('Error toggling alert:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'alerte.",
        variant: "destructive",
      });
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune alerte active. Créez-en une pour être notifié des nouvelles annonces.
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h4 className="font-semibold text-foreground">Mes alertes actives</h4>
      {alerts.map((alert) => (
        <Card key={alert.id} className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={alert.active ? "default" : "secondary"}>
                  {alert.active ? "Active" : "Inactive"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Créée le {new Date(alert.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {alert.secteurs.length > 0 && (
                  <div>
                    <span className="font-medium">Secteurs:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {alert.secteurs.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {alert.departements.length > 0 && (
                  <div>
                    <span className="font-medium">Départements:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {alert.departements.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="font-medium">CA:</span> {formatNumber(alert.ca_min)} - {formatNumber(alert.ca_max)}
                </div>
                
                <div>
                  <span className="font-medium">Effectif:</span> {alert.effectif_min} - {alert.effectif_max} salariés
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggle(alert.id, alert.active)}
                title={alert.active ? "Désactiver" : "Activer"}
              >
                {alert.active ? (
                  <BellOff className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(alert.id)}
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};