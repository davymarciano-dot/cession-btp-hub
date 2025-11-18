const ComparisonTable = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💎</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nous ne sommes PAS les moins chers... et tant mieux !
          </h2>
          <p className="text-xl text-muted-foreground">
            Comparaison honnête avec les plateformes généralistes
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full bg-card rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Critère</th>
                <th className="px-6 py-4 text-left font-bold">Sites Généralistes</th>
                <th className="px-6 py-4 text-left font-bold">CessionBTP ✅</th>
                <th className="px-6 py-4 text-left font-bold">Exemples</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 font-semibold">Prix</td>
                <td className="px-6 py-4">250€/an (12 mois)</td>
                <td className="px-6 py-4 font-semibold text-primary">290€ (3 mois)</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">BPI France Transmission, Fusacq</td>
              </tr>
              <tr className="border-b bg-muted/60">
                <td className="px-6 py-4 font-semibold">Coût mensuel</td>
                <td className="px-6 py-4">21€</td>
                <td className="px-6 py-4 font-semibold text-primary">97€</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr className="border-b bg-muted/60">
                <td className="px-6 py-4 font-bold">Délai moyen de vente</td>
                <td className="px-6 py-4">
                  <span className="font-bold">18-24 mois</span> ⏳
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-success text-xl">45 jours</span> ⚡
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-semibold">Spécialisation</td>
                <td className="px-6 py-4">Tous secteurs</td>
                <td className="px-6 py-4 font-semibold text-primary">100% BTP & ENR</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr className="border-b bg-muted/60">
                <td className="px-6 py-4 font-semibold">Repreneurs actifs</td>
                <td className="px-6 py-4">Grand public</td>
                <td className="px-6 py-4 font-semibold text-primary">2000+ qualifiés BTP</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-semibold">Valorisation</td>
                <td className="px-6 py-4">Non incluse (+500€)</td>
                <td className="px-6 py-4 font-semibold text-success">✅ Incluse</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr className="border-b bg-slate-50">
                <td className="px-6 py-4 font-semibold">Support</td>
                <td className="px-6 py-4">Email générique</td>
                <td className="px-6 py-4 font-semibold text-primary">Expert BTP dédié</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Success fee</td>
                <td className="px-6 py-4">Forfait</td>
                <td className="px-6 py-4 font-semibold text-primary">2% uniquement</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">-</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4 text-right">
            * Données issues d'une étude comparative interne - Janvier 2025
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-card p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">🧮 Le vrai calcul :</h3>
          <div className="space-y-4 text-lg">
            <p>
              <strong>Généralistes :</strong> 250€ + 500€ valorisation + 18 mois d'attente = 
              <span className="text-destructive font-bold"> 750€ et 540 jours perdus</span>
            </p>
            <p>
              <strong>CessionBTP :</strong> 290€ tout compris + 45 jours = 
              <span className="text-success font-bold"> VENDU ✅</span>
            </p>
          </div>
          <div className="mt-6 p-6 bg-primary/10 rounded-lg">
            <p className="text-xl font-bold text-primary">
              💰 Pour 40€ de plus : Vendez 12x plus vite | Économisez 17 mois | Valorisation incluse (500€)
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-xl shadow-xl">
          <blockquote className="text-lg italic mb-4">
            "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. 
            Avec CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie."
          </blockquote>
          <p className="font-semibold">
            - Marc L., Plomberie-Chauffage, Toulouse ⭐⭐⭐⭐⭐
          </p>
        </div>

        <div className="text-center mt-12">
          <button className="bg-secondary hover:bg-secondary/90 text-white font-bold text-2xl py-4 px-12 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            💰 COMMENCER MON ESTIMATION GRATUITE
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
