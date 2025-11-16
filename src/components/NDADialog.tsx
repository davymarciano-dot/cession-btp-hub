import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileCheck } from "lucide-react";

interface NDADialogProps {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
  buyerName: string;
  listingTitle: string;
}

const NDADialog = ({ open, onAccept, onCancel, buyerName, listingTitle }: NDADialogProps) => {
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <DialogTitle>Accord de confidentialité</DialogTitle>
          </div>
          <DialogDescription>
            Veuillez lire et accepter cet accord avant d'accéder aux informations complètes
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-lg mb-2">ACCORD DE CONFIDENTIALITÉ ET D'ENGAGEMENT</h3>
              <p className="text-muted-foreground">
                Entre CessionBTP (ci-après "la Plateforme") et {buyerName} (ci-après "l'Acheteur")
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Objet</h4>
              <p>
                Le présent accord encadre l'accès aux informations confidentielles concernant l'annonce : 
                <span className="font-semibold"> {listingTitle}</span>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Article 1 - Confidentialité</h4>
              <p className="mb-2">L'Acheteur s'engage à :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Traiter de manière strictement confidentielle toutes les informations reçues</li>
                <li>Ne pas divulguer ces informations à des tiers sans autorisation écrite</li>
                <li>Utiliser ces informations uniquement dans le cadre de son projet d'acquisition</li>
                <li>Ne pas contacter directement le vendeur en dehors de la plateforme CessionBTP</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Article 2 - Interdiction de contournement</h4>
              <p className="mb-2">L'Acheteur reconnaît et accepte que :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tout contact avec le vendeur doit transiter par CessionBTP</li>
                <li>Toute négociation doit être menée avec l'assistance de la Plateforme</li>
                <li>Le contournement de la Plateforme constitue une violation grave du présent accord</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Article 3 - Commission de réussite</h4>
              <p className="mb-2">L'Acheteur s'engage à :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Informer CessionBTP de toute offre d'achat formulée</li>
                <li>Verser une commission de 2% du prix de vente en cas de transaction réussie</li>
                <li>Cette commission est due même si la transaction se finalise après la fin de cet accord</li>
                <li>Le paiement intervient au moment de la signature de l'acte de cession</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Article 4 - Durée</h4>
              <p>
                Le présent accord prend effet à sa signature et reste valable pendant 24 mois, 
                ou jusqu'à la finalisation d'une transaction concernant l'entreprise visée.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Article 5 - Sanctions</h4>
              <p className="mb-2">En cas de violation du présent accord :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Exclusion immédiate de la plateforme CessionBTP</li>
                <li>Paiement de dommages et intérêts correspondant au double de la commission due</li>
                <li>Actions légales pour récupération des sommes dues</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-900">
                <strong>📌 Important :</strong> En cochant la case ci-dessous, vous reconnaissez avoir lu, 
                compris et accepté l'intégralité des termes de cet accord de confidentialité.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="nda-accept" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
            />
            <label
              htmlFor="nda-accept"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              J'ai lu et j'accepte les termes de cet accord de confidentialité. Je m'engage à respecter 
              toutes les clauses énoncées ci-dessus sous peine de sanctions.
            </label>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onCancel}
              variant="outline"
              className="flex-1"
            >
              Refuser et annuler
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={!agreed}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Signer et accepter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NDADialog;
