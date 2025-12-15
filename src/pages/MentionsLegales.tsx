import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <>
      <SEO
        title="Mentions Légales | CessionBTP"
        description="Mentions légales de la plateforme CessionBTP - Information sur l'éditeur, l'hébergeur et les conditions d'utilisation."
        url="https://cessionbtp.fr/mentions-legales"
      />
      <Header />

      <main className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
                <p className="text-muted-foreground mb-4">
                  Le site CessionBTP.fr est édité par :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Raison sociale :</strong> VERIFDECENNALE SAS (marque CessionBTP)</li>
                  <li><strong>Capital social :</strong> 770 €</li>
                  <li><strong>Siège social :</strong> 28 rue Georges Ferrand, 94380 Bonneuil-sur-Marne</li>
                  <li><strong>SIRET :</strong> 993 536 358 00019</li>
                  <li><strong>RCS :</strong> Créteil</li>
                  <li><strong>N° TVA intracommunautaire :</strong> FR70993536358</li>
                  <li><strong>Email :</strong> contact@cessionbtp.fr</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Directeur de la publication</h2>
                <p className="text-muted-foreground">
                  Le directeur de la publication est M. Davy Marciano, en qualité de Président de VERIFDECENNALE SAS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Hébergement</h2>
                <p className="text-muted-foreground mb-4">
                  Le site est hébergé par :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Hébergeur :</strong> OVH SAS</li>
                  <li><strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
                  <li><strong>Téléphone :</strong> 1007</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
                  documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-muted-foreground mt-4">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Protection des données personnelles</h2>
                <p className="text-muted-foreground">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement 
                  Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, 
                  de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-muted-foreground mt-4">
                  Pour exercer ce droit, vous pouvez nous contacter à l'adresse : contact@cessionbtp.fr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques 
                  de visite. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
                </p>
                <p className="text-muted-foreground mt-4">
                  Vous pouvez à tout moment désactiver les cookies depuis les paramètres de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  CessionBTP s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
                  Toutefois, CessionBTP ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
                  mises à disposition sur ce site.
                </p>
                <p className="text-muted-foreground mt-4">
                  En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux 
                  français seront seuls compétents.
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
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MentionsLegales;