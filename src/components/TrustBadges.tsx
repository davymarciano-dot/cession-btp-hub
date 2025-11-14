export const TrustBadges = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <p className="font-bold text-gray-900">Leader BTP</p>
              <p className="text-sm text-gray-600">#1 en France</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <p className="font-bold text-gray-900">100% Sécurisé</p>
              <p className="text-sm text-gray-600">Données cryptées</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="font-bold text-gray-900">4.8/5</p>
              <p className="text-sm text-gray-600">127 avis vérifiés</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <p className="font-bold text-gray-900">IA Matching</p>
              <p className="text-sm text-gray-600">Algorithme unique</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
