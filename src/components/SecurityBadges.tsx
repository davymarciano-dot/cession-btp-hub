const SecurityBadges = () => {
  return (
    <section className="bg-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <span>Experts certifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>Données sécurisées RGPD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span>Site sécurisé SSL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityBadges;
