const SuccessFeeSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Commission progressive transparente
          </h2>
          <div className="text-6xl md:text-7xl font-bold text-success mb-4">3% à 8%</div>
          <p className="text-2xl text-muted-foreground">
            Seulement en cas de vente réussie
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Barème progressif :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span>Moins de 300 000€</span>
              <span className="font-bold text-primary">8%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span>300 000€ à 500 000€</span>
              <span className="font-bold text-primary">6%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span>500 000€ à 1 000 000€</span>
              <span className="font-bold text-primary">5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span>1 000 000€ à 2 000 000€</span>
              <span className="font-bold text-primary">4%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg md:col-span-2 md:max-w-xs md:mx-auto">
              <span>Plus de 2 000 000€</span>
              <span className="font-bold text-primary">3%</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Commission minimum : 8 000€ HT
          </p>
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-lg font-semibold mb-3 text-center">Exemple concret :</h4>
            <div className="text-center text-xl">
              <p className="mb-2">
                Vente <span className="font-bold text-primary">500 000 €</span> = 
                <span className="font-bold text-success"> 25 000 € de commission (5%)</span>
              </p>
              <p className="text-muted-foreground">
                (vs 40 000€ à 60 000€ chez les concurrents)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3">Confidentialité</h3>
            <p className="text-muted-foreground">
              100% sécurisé et anonyme
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Rapidité</h3>
            <p className="text-muted-foreground">
              2x plus rapide que la concurrence
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Résultats</h3>
            <p className="text-muted-foreground">
              95% de taux de satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessFeeSection;
