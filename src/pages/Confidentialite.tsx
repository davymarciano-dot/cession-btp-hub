import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Clock, UserCheck, Mail, MapPin } from "lucide-react";

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Politique de confidentialité</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : 15 décembre 2025
          </p>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">1. Responsable du traitement</h2>
                <div className="text-muted-foreground space-y-2">
                  <p><strong>VERIFDECENNALE SAS</strong> (marque CessionBTP)</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>28 rue Georges Ferrand, 94380 Bonneuil-sur-Marne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:contact@cessionbtp.fr" className="text-primary hover:underline">
                      contact@cessionbtp.fr
                    </a>
                  </div>
                  <p>SIRET : 993 536 358 00019</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">2. Données collectées</h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>Nous collectons les données suivantes :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Données d'identification :</strong> nom, prénom, email, téléphone, adresse</li>
                    <li><strong>Données professionnelles :</strong> société, SIRET, secteur d'activité</li>
                    <li><strong>Données financières :</strong> chiffre d'affaires, résultats (pour les estimations)</li>
                    <li><strong>Données de navigation :</strong> adresse IP, pages visitées, durée de visite</li>
                    <li><strong>Données de communication :</strong> messages échangés sur la plateforme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">3. Finalités du traitement</h2>
                <div className="text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Gestion des comptes utilisateurs et authentification</li>
                    <li>Publication et gestion des annonces de cession d'entreprises</li>
                    <li>Mise en relation entre vendeurs et acheteurs potentiels</li>
                    <li>Estimation de la valeur des entreprises</li>
                    <li>Traitement des paiements et facturation</li>
                    <li>Communication et support client</li>
                    <li>Amélioration de nos services et analyses statistiques</li>
                    <li>Respect de nos obligations légales</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">4. Base légale</h2>
                <div className="text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Exécution du contrat :</strong> pour la fourniture de nos services</li>
                    <li><strong>Consentement :</strong> pour l'envoi de newsletters et communications marketing</li>
                    <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services</li>
                    <li><strong>Obligation légale :</strong> pour la conservation des données de facturation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">5. Durée de conservation</h2>
                </div>
                <div className="text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Données de compte :</strong> 3 ans après la dernière activité</li>
                    <li><strong>Données d'annonces :</strong> durée de publication + 1 an</li>
                    <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
                    <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                    <li><strong>Messages :</strong> 3 ans après la fin de la conversation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">6. Destinataires des données</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">Vos données peuvent être partagées avec :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nos prestataires techniques (hébergement, paiement)</li>
                    <li>Les autres utilisateurs de la plateforme (selon votre niveau d'anonymat choisi)</li>
                    <li>Les autorités compétentes en cas d'obligation légale</li>
                  </ul>
                  <p className="mt-4">
                    Nous ne vendons jamais vos données à des tiers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">7. Vos droits (RGPD)</h2>
                </div>
                <div className="text-muted-foreground">
                  <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                    <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                    <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@cessionbtp.fr" className="text-primary hover:underline">contact@cessionbtp.fr</a>
                  </p>
                  <p className="mt-2">
                    Vous pouvez également déposer une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">8. Sécurité</h2>
                <div className="text-muted-foreground">
                  <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Chiffrement des données en transit (HTTPS/TLS)</li>
                    <li>Chiffrement des mots de passe</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Sauvegardes régulières sécurisées</li>
                    <li>Audits de sécurité périodiques</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">9. Modifications</h2>
                <p className="text-muted-foreground">
                  Nous pouvons modifier cette politique de confidentialité à tout moment. 
                  La date de dernière mise à jour sera toujours indiquée en haut de cette page. 
                  En cas de modification substantielle, nous vous en informerons par email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confidentialite;
