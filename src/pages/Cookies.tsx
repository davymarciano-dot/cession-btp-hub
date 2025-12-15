import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, BarChart3, Shield, ExternalLink } from "lucide-react";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cookie className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Politique de cookies</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : 15 décembre 2025
          </p>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Qu'est-ce qu'un cookie ?</h2>
                <p className="text-muted-foreground">
                  Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) 
                  lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et 
                  préférences pendant une période donnée, afin que vous n'ayez pas à les saisir à nouveau lors de 
                  vos prochaines visites.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold">Cookies essentiels</h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Nom</th>
                          <th className="text-left py-2 pr-4">Finalité</th>
                          <th className="text-left py-2">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">sb-access-token</td>
                          <td className="py-2 pr-4">Authentification utilisateur</td>
                          <td className="py-2">Session</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">sb-refresh-token</td>
                          <td className="py-2 pr-4">Maintien de la session</td>
                          <td className="py-2">7 jours</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">language</td>
                          <td className="py-2 pr-4">Préférence de langue</td>
                          <td className="py-2">1 an</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold">Cookies analytiques</h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site 
                    afin d'améliorer l'expérience utilisateur.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Nom</th>
                          <th className="text-left py-2 pr-4">Fournisseur</th>
                          <th className="text-left py-2 pr-4">Finalité</th>
                          <th className="text-left py-2">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">_ga</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">Distinguer les utilisateurs</td>
                          <td className="py-2">2 ans</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">_ga_*</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">Maintenir l'état de la session</td>
                          <td className="py-2">2 ans</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">_gid</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">Distinguer les utilisateurs</td>
                          <td className="py-2">24 heures</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-6 w-6 text-orange-600" />
                  <h2 className="text-2xl font-bold">Cookies fonctionnels</h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Ces cookies permettent des fonctionnalités améliorées comme le chat en direct 
                    et la personnalisation de l'interface.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Nom</th>
                          <th className="text-left py-2 pr-4">Fournisseur</th>
                          <th className="text-left py-2 pr-4">Finalité</th>
                          <th className="text-left py-2">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">crisp-client/*</td>
                          <td className="py-2 pr-4">Crisp</td>
                          <td className="py-2 pr-4">Chat en direct</td>
                          <td className="py-2">6 mois</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono text-sm">cart_session</td>
                          <td className="py-2 pr-4">CessionBTP</td>
                          <td className="py-2 pr-4">Suivi du panier</td>
                          <td className="py-2">30 jours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Comment gérer les cookies ?</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Vous pouvez à tout moment modifier vos préférences concernant les cookies. 
                    Voici comment procéder selon votre navigateur :
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <a 
                      href="https://support.google.com/chrome/answer/95647" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <span>Google Chrome</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a 
                      href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <span>Mozilla Firefox</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a 
                      href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <span>Safari</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a 
                      href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <span>Microsoft Edge</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <p className="text-amber-800 text-sm">
                      <strong>⚠️ Attention :</strong> La désactivation de certains cookies peut affecter le fonctionnement 
                      du site et limiter l'accès à certaines fonctionnalités.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Désactiver Google Analytics</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Pour désactiver spécifiquement le suivi Google Analytics sur tous les sites web, 
                    vous pouvez installer le module complémentaire de navigateur proposé par Google :
                  </p>
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Module de désactivation Google Analytics
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant notre utilisation des cookies, contactez-nous à :{" "}
                  <a href="mailto:contact@cessionbtp.fr" className="text-primary hover:underline">
                    contact@cessionbtp.fr
                  </a>
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

export default Cookies;
