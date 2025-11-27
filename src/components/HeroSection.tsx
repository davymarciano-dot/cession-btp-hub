import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#5A7D9A] via-[#6B8FA8] to-[#7CA1B6] py-32 overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Trouvez l'entreprise BTP idéale
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            La première plateforme 100% dédiée à la transmission d'entreprises du bâtiment
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Rechercher par secteur (électricité, plomberie...)" 
                  className="w-full px-5 py-4 text-base border-0 focus:outline-none focus:ring-0 rounded-xl bg-gray-50"
                />
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Localisation (ville, département...)" 
                  className="w-full px-5 py-4 text-base border-0 focus:outline-none focus:ring-0 rounded-xl bg-gray-50"
                />
              </div>
              <Button 
                size="lg"
                onClick={() => navigate("/entreprises")}
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate("/vendre")}
              className="px-8 py-6 text-base bg-white text-primary hover:bg-gray-50 rounded-xl font-semibold shadow-lg"
            >
              Vendre mon entreprise
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/estimation")}
              className="px-8 py-6 text-base border-2 border-white text-white hover:bg-white/10 rounded-xl font-semibold"
            >
              Obtenir une estimation gratuite
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
