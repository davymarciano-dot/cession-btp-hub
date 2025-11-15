import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGV = () => {
  return (
    <>
      <SEO
        title="Conditions Générales de Vente | CessionBTP"
        description="Conditions générales de vente et d'utilisation de la plateforme CessionBTP."
        url="https://cessionbtp.fr/cgv"
      />
      <Header />

      <main className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Objet</h2>
                <p className="text-muted-foreground">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                  CessionBTP SAS (ci-après "CessionBTP") et toute personne physique ou morale (ci-après "le Client") 
                  souhaitant utiliser les services proposés sur la plateforme CessionBTP.fr.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Services proposés</h2>
                <p className="text-muted-foreground mb-4">
                  CessionBTP propose les services suivants :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Mise en relation entre vendeurs et acheteurs d'entreprises BTP</li>
                  <li>Valorisation gratuite d'entreprise</li>
                  <li>Accompagnement dans le processus de cession</li>
                  <li>Diffusion d'annonces de cession</li>
                  <li>Outils de comparaison et d'analyse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Tarifs et paiement</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Formule Success Fee</h3>
                <p className="text-muted-foreground">
                  La formule Success Fee est gratuite jusqu'à la vente effective de l'entreprise. En cas de 
                  transaction réussie, une commission de 3% du prix de vente est facturée au vendeur.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Formules d'abonnement</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Formule Gratuite :</strong> Accès limité aux fonctionnalités de base</li>
                  <li><strong>Formule Pro (299€/mois) :</strong> Accès complet à la plateforme et outils avancés</li>
                  <li><strong>Formule Premium (599€/mois) :</strong> Accompagnement personnalisé et visibilité maximale</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Modalités de paiement</h3>
                <p className="text-muted-foreground">
                  Les paiements s'effectuent par carte bancaire, virement ou prélèvement SEPA. Les abonnements 
                  sont payables mensuellement ou annuellement selon l'option choisie.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Obligations du Client</h2>
                <p className="text-muted-foreground mb-4">Le Client s'engage à :</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Fournir des informations exactes et à jour sur son entreprise</li>
                  <li>Ne pas diffuser de contenu illicite, diffamatoire ou trompeur</li>
                  <li>Respecter la confidentialité des informations partagées</li>
                  <li>Utiliser la plateforme conformément à sa destination</li>
                  <li>Régler les sommes dues dans les délais convenus</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Obligations de CessionBTP</h2>
                <p className="text-muted-foreground mb-4">CessionBTP s'engage à :</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Assurer la disponibilité de la plateforme dans la mesure du possible</li>
                  <li>Protéger la confidentialité des données clients</li>
                  <li>Fournir un accompagnement de qualité selon la formule choisie</li>
                  <li>Vérifier l'identité des utilisateurs de la plateforme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Confidentialité</h2>
                <p className="text-muted-foreground">
                  CessionBTP s'engage à garantir la confidentialité des informations sensibles partagées sur la 
                  plateforme. Un accord de confidentialité (NDA) peut être signé entre les parties avant tout 
                  échange d'informations détaillées.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Résiliation</h2>
                <p className="text-muted-foreground">
                  Les abonnements peuvent être résiliés à tout moment par le Client avec un préavis d'un mois. 
                  CessionBTP se réserve le droit de suspendre ou résilier un compte en cas de non-respect des 
                  présentes CGV.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  CessionBTP agit en tant qu'intermédiaire et ne peut être tenu responsable de l'échec d'une 
                  transaction ou de litiges entre acheteurs et vendeurs. La responsabilité de CessionBTP est 
                  limitée au montant des sommes effectivement perçues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Droit applicable et juridiction</h2>
                <p className="text-muted-foreground">
                  Les présentes CGV sont régies par le droit français. Tout litige relatif à leur interprétation 
                  ou leur exécution relève de la compétence exclusive des tribunaux français.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Modification des CGV</h2>
                <p className="text-muted-foreground">
                  CessionBTP se réserve le droit de modifier les présentes CGV à tout moment. Les Clients seront 
                  informés de toute modification par email au moins 30 jours avant leur entrée en vigueur.
                </p>
              </section>

              <section className="bg-muted/30 rounded-lg p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Pour toute question concernant ces CGV, contactez-nous à : contact@cessionbtp.fr
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CGV;