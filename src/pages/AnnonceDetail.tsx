import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useListingView } from "@/hooks/useListingView";
import { useAutoMatching } from "@/hooks/useAutoMatching";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import { ListingAnalytics } from "@/components/analytics/ListingAnalytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2, MapPin, Calendar, TrendingUp, Users, Euro,
  Award, FileText, Phone, Mail, ArrowLeft, Eye, Loader2, MessageCircle, Camera, Share2, Copy, Linkedin, BarChart3, Sparkles
} from "lucide-react";
import { exempleAnnonces } from "@/data/exemple-annonces";
import { analyticsEvents } from "@/lib/analytics";

const AnnonceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [annonce, setAnnonce] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isContacting, setIsContacting] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { runMatching, isLoading: isMatchingLoading, results: matchingResults } = useAutoMatching();

  // Track listing view (disabled for example listings and own listings)
  const isRealListing = id && !id.startsWith("exemple-");
  const isOwner = user && annonce && user.id === annonce.user_id;
  useListingView({
    listingId: id || "",
    enabled: isRealListing && !isOwner,
  });

  useEffect(() => {
    checkUser();
    if (id) {
      fetchAnnonce();
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
      // Track send message event
      analyticsEvents.clickSendMessage(annonce.id);
      
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

  const handleShare = (method: 'copy' | 'email' | 'linkedin') => {
    const url = window.location.href;
    const title = `${annonce.raison_sociale || 'Entreprise BTP'} à vendre - ${annonce.prix_vente.toLocaleString('fr-FR')}€`;
    
    switch(method) {
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Lien copié !",
          description: "Le lien de l'annonce a été copié dans le presse-papier.",
        });
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Découvrez cette opportunité : ${url}`)}`;
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  const handleRunMatching = async () => {
    if (!id || id.startsWith("exemple-")) {
      toast({
        title: "Non disponible",
        description: "Le matching automatique n'est pas disponible pour les annonces d'exemple.",
      });
      return;
    }

    try {
      await runMatching(id);
      toast({
        title: "Matching terminé !",
        description: matchingResults ? `${matchingResults.totalMatches} acheteurs correspondants trouvés` : "Matching effectué avec succès",
      });
    } catch (error) {
      // Error already handled in hook
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
                      {isOwner && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAnalytics(!showAnalytics)}
                            className="h-6"
                          >
                            <BarChart3 className="w-3 h-3 mr-1" />
                            {showAnalytics ? "Masquer" : "Voir"} les stats
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRunMatching}
                            disabled={isMatchingLoading}
                            className="h-6"
                          >
                            {isMatchingLoading ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 mr-1" />
                            )}
                            Lancer le matching
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="text-3xl font-bold text-primary">
                      {annonce.prix_vente.toLocaleString('fr-FR')} €
                    </div>
                    {annonce.prix_negociable && (
                      <span className="text-sm text-green-600">Prix négociable</span>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShare('copy')}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copier le lien
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('email')}>
                          <Mail className="w-4 h-4 mr-2" />
                          Partager par email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                          <Linkedin className="w-4 h-4 mr-2" />
                          Partager sur LinkedIn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

                {/* Analytics Section - Only visible to owner */}
                {isOwner && showAnalytics && (
                  <>
                    <Separator className="my-6" />
                    <ListingAnalytics listingId={annonce.id} />
                  </>
                )}

                {/* Matching Results - Only visible to owner */}
                {isOwner && matchingResults && (
                  <>
                    <Separator className="my-6" />
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="text-lg font-bold">Résultats du Matching</h3>
                          <p className="text-sm text-muted-foreground">
                            {matchingResults.totalMatches} acheteur{matchingResults.totalMatches > 1 ? 's' : ''} correspondant{matchingResults.totalMatches > 1 ? 's' : ''} trouvé{matchingResults.totalMatches > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      {matchingResults.matches.length > 0 && (
                        <div className="space-y-3">
                          {matchingResults.matches.map((match, index) => (
                            <div key={index} className="bg-background p-4 rounded-lg border">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{match.email}</span>
                                <Badge variant="secondary" className="ml-2">
                                  Score: {match.score}/100
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {match.criteria.location && (
                                  <Badge variant="outline" className="text-xs">
                                    📍 Zone géographique
                                  </Badge>
                                )}
                                {match.criteria.budget && (
                                  <Badge variant="outline" className="text-xs">
                                    💰 Budget
                                  </Badge>
                                )}
                                {match.criteria.sector && (
                                  <Badge variant="outline" className="text-xs">
                                    🏗️ Secteur
                                  </Badge>
                                )}
                                {match.criteria.size && (
                                  <Badge variant="outline" className="text-xs">
                                    👥 Taille
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
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
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-primary" />
                    Galerie Photos
                  </h2>
                  
                  {/* Photos de l'entreprise */}
                  {annonce.photos_entreprise?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                        Entreprise & Locaux
                      </h3>
                      <PhotoGallery 
                        photos={annonce.photos_entreprise} 
                        title="Photos de l'entreprise"
                      />
                    </div>
                  )}

                  {/* Photos du matériel */}
                  {annonce.photos_materiel?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                        Matériel & Véhicules
                      </h3>
                      <PhotoGallery 
                        photos={annonce.photos_materiel} 
                        title="Photos du matériel"
                      />
                    </div>
                  )}

                  {/* Photos des réalisations */}
                  {annonce.photos_realisations?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                        Réalisations
                      </h3>
                      <PhotoGallery 
                        photos={annonce.photos_realisations} 
                        title="Photos des réalisations"
                      />
                    </div>
                  )}

                  {/* Vidéo de présentation */}
                  {annonce.video_presentation && (
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-3">Vidéo de présentation</h3>
                      <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                        <iframe
                          src={annonce.video_presentation}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* Points forts */}
              {annonce.atouts_principaux && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Points forts
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