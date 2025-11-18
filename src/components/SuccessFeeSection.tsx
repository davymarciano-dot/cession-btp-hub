const SuccessFeeSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Fee Transparente
          </h2>
          <div className="text-9xl font-bold text-success mb-4">2%</div>
          <p className="text-2xl text-muted-foreground">
            Seulement en cas de vente réussie
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold mb-4 text-center">Exemple concret :</h3>
          <div className="text-center text-xl">
            <p className="mb-2">
              Vente <span className="font-bold text-primary">500 000 €</span> = 
              <span className="font-bold text-success"> 10 000 € de commission</span>
            </p>
            <p className="text-muted-foreground">
              (vs 25 000€ à 40 000€ chez les concurrents)
            </p>
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
