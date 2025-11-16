import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface ContactSellerDialogProps {
  annonceId: string;
  secteurActivite: string;
}

const ContactSellerDialog = ({ annonceId, secteurActivite }: ContactSellerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("demandes_contact")
        .insert({
          annonce_id: annonceId,
          nom_acheteur: formData.nom,
          email_acheteur: formData.email,
          telephone_acheteur: formData.telephone,
          message: formData.message,
        });

      if (error) throw error;

      // Send notification email to seller
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "contact_request",
          annonce_id: annonceId,
          buyer_name: formData.nom,
          buyer_email: formData.email,
          buyer_phone: formData.telephone,
          message: formData.message,
        },
      });

      toast.success("Demande envoyée avec succès !");
      toast.info("Le vendeur sera notifié et vous recontactera rapidement.");
      setOpen(false);
      setFormData({ nom: "", email: "", telephone: "", message: "" });
    } catch (error) {
      console.error("Error sending contact request:", error);
      toast.error("Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
          <Mail className="mr-2 h-5 w-5" />
          Contacter le vendeur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Demande de contact sécurisée</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour entrer en contact avec le vendeur de cette entreprise {secteurActivite}.
            Vos informations seront transmises de manière confidentielle.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nom">Nom complet *</Label>
            <Input
              id="nom"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jean.dupont@email.com"
            />
          </div>
          <div>
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              type="tel"
              required
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="06 12 34 56 78"
            />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Présentez-vous et décrivez votre projet d'acquisition..."
              rows={4}
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-900">
            <p className="font-semibold mb-1">🔒 Confidentialité garantie</p>
            <p>Votre demande sera transmise au vendeur via CessionBTP. Vos coordonnées ne seront dévoilées qu'après son accord.</p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer la demande"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;
