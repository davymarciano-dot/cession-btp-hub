import { Link } from "react-router-dom";
import CountUp from "react-countup";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl -bottom-20 -left-20 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Success Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium">543 entreprises vendues avec succès</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Vendez votre entreprise BTP en 
            <span className="text-orange-400"> 45 jours</span>
          </h1>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            La seule plateforme 100% spécialisée BTP qui connecte vendeurs et acheteurs qualifiés
          </p>
          
          {/* Double CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/vendre" 
              className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-2xl transform hover:scale-105 transition-all inline-flex items-center justify-center"
            >
              Je vends mon entreprise
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
            <Link 
              to="/acheter" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold shadow-xl transform hover:scale-105 transition-all inline-flex items-center justify-center"
            >
              Je cherche à reprendre
            </Link>
          </div>
          
          {/* Animated Statistics */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold">
                <CountUp end={95} duration={2} suffix="%" />
              </div>
              <p className="text-sm opacity-75 mt-1">Taux de réussite</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">
                <CountUp end={45} duration={2} suffix="j" />
              </div>
              <p className="text-sm opacity-75 mt-1">Délai moyen</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">
                <CountUp end={2} duration={2} suffix="%" />
              </div>
              <p className="text-sm opacity-75 mt-1">Success fee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
