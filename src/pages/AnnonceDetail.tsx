import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2, MapPin, Calendar, TrendingUp, Users, Euro,
  Award, FileText, Phone, Mail, ArrowLeft, Eye, Loader2, MessageCircle
} from "lucide-react";
import { exempleAnnonces } from "@/data/exemple-annonces";

const AnnonceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [annonce, setAnnonce] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isContacting, setIsContacting] = useState(false);

  useEffect(() => {
    checkUser();
    if (id) {
      fetchAnnonce();
      if (!id.startsWith("exemple-")) {
        incrementVues();
      }
    }
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchAnnonce = async () => {
    try {
      // Check if it's an example annonce
      if (id && id.startsWith("exemple-")) {
        const exampleData = exempleAnnonces[id];
        if (exampleData) {
          setAnnonce(exampleData);
          setIsLoading(false);
          return;
        }
      }

      // Otherwise fetch from Supabase
      const { data, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('id', id)
        .eq('statut', 'publiee')
        .single();

      if (error) throw error;
      setAnnonce(data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger cette annonce.",
        variant: "destructive",
      });
      navigate("/entreprises");
    } finally {
      setIsLoading(false);
    }
  };

  const incrementVues = async () => {
    try {
      const { data: currentAnnonce } = await supabase
        .from('annonces')
        .select('nombre_vues')
        .eq('id', id)
        .single();

      if (currentAnnonce) {
        await supabase
          .from('annonces')
          .update({ nombre_vues: (currentAnnonce.nombre_vues || 0) + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const handleContact = async () => {
    // Pour les annonces d'exemple, rediriger vers l'inscription
    if (id && id.startsWith("exemple-")) {
      toast({
        title: "Annonce d'exemple",
        description: "Ceci est une annonce de démonstration. Créez un compte pour voir les vraies annonces.",
      });
      navigate("/auth");
      return;
    }

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour contacter le vendeur",
      });
      navigate("/auth");
      return;
    }

    if (user.id === annonce.user_id) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas contacter votre propre annonce",
        variant: "destructive"
      });
      return;
    }

    setIsContacting(true);

    try {
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id")
        .eq("annonce_id", annonce.id)
        .eq("acheteur_id", user.id)
        .eq("vendeur_id", annonce.user_id)
        .single();

      let conversationId = existingConv?.id;

      if (!existingConv) {
        // Create new conversation
        const { data: newConv, error: createError } = await supabase
          .from("conversations")
          .insert({
            annonce_id: annonce.id,
            acheteur_id: user.id,
            vendeur_id: annonce.user_id
          })
          .select()
          .single();

        if (createError) throw createError;
        conversationId = newConv.id;

        // Send initial message
        await supabase.from("messages").insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: `Bonjour, je suis intéressé par votre annonce "${annonce.raison_sociale || 'Entreprise anonyme'}".`
        });
      }

      navigate(`/messages?conversation=${conversationId}`);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de contacter le vendeur",
        variant: "destructive"
      });
    } finally {
      setIsContacting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!annonce) {
    return null;
  }

  const anciennete = new Date().getFullYear() - annonce.annee_creation;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/entreprises")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux annonces
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {annonce.ville} ({annonce.departement})
                      </Badge>
                      <Badge variant="outline">{annonce.secteur_activite}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {annonce.nombre_vues || 0} vues
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {annonce.prix_vente.toLocaleString('fr-FR')} €
                    </div>
                    {annonce.prix_negociable && (
                      <span className="text-sm text-green-600">Prix négociable</span>
                    )}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{anciennete} ans</div>
                    <div className="text-xs text-muted-foreground">Ancienneté</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{(annonce.ca_n1 / 1000).toFixed(0)}K€</div>
                    <div className="text-xs text-muted-foreground">CA annuel</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{annonce.nombre_salaries}</div>
                    <div className="text-xs text-muted-foreground">Salariés</div>
                  </div>
                  <div className="text-center">
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="font-semibold">{annonce.forme_juridique}</div>
                    <div className="text-xs text-muted-foreground">Forme</div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              {annonce.description_activite && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Description de l'activité</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {annonce.description_activite}
                  </p>
                </Card>
              )}

              {/* Photos */}
              {(annonce.photos_entreprise?.length > 0 || 
                annonce.photos_materiel?.length > 0 || 
                annonce.photos_realisations?.length > 0) && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      ...(annonce.photos_entreprise || []),
                      ...(annonce.photos_materiel || []),
                      ...(annonce.photos_realisations || [])
                    ].map((photo: string, idx: number) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </Card>
              )}

              {/* Points forts */}
              {annonce.atouts_principaux && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Points Forts
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {annonce.atouts_principaux}
                  </p>
                </Card>
              )}

              {/* Informations détaillées */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Informations Détaillées</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">Finances</h3>
                    <ul className="space-y-1 text-sm">
                      <li>CA N-1 : {annonce.ca_n1.toLocaleString('fr-FR')} €</li>
                      {annonce.ca_n2 && <li>CA N-2 : {annonce.ca_n2.toLocaleString('fr-FR')} €</li>}
                      <li>Résultat N-1 : {annonce.resultat_net_n1.toLocaleString('fr-FR')} €</li>
                      {annonce.ebe_n1 && <li>EBE : {annonce.ebe_n1.toLocaleString('fr-FR')} €</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-primary">Équipe</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Total : {annonce.nombre_salaries} salariés</li>
                      {annonce.nombre_cdi && <li>CDI : {annonce.nombre_cdi}</li>}
                      {annonce.nombre_cdd && <li>CDD : {annonce.nombre_cdd}</li>}
                      {annonce.nombre_apprentis && <li>Apprentis : {annonce.nombre_apprentis}</li>}
                    </ul>
                  </div>

                  {annonce.certifications && annonce.certifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-primary">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {annonce.certifications.map((cert: string, idx: number) => (
                          <Badge key={idx} variant="secondary">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2 text-primary">Locaux</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Situation : {annonce.situation_locaux}</li>
                      {annonce.surface_locaux && <li>Surface : {annonce.surface_locaux} m²</li>}
                      {annonce.loyer_mensuel && <li>Loyer : {annonce.loyer_mensuel} €/mois</li>}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Colonne latérale - Contact */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Contacter le vendeur</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="blur-sm select-none">XX XX XX XX XX</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="blur-sm select-none">contact@exemple.fr</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Les coordonnées complètes sont dévoilées après connexion
                </p>

                <Button 
                  onClick={handleContact}
                  className="w-full bg-secondary hover:bg-secondary/90"
                  size="lg"
                  disabled={isContacting}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isContacting ? "Connexion..." : "Envoyer un message"}
                </Button>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm">📋 Informations</h3>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Annonce #{annonce.id.slice(0, 8)}</li>
                    <li>• Publiée le {new Date(annonce.created_at).toLocaleDateString('fr-FR')}</li>
                    <li>• Formule : {annonce.formule_abonnement}</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnonceDetail;