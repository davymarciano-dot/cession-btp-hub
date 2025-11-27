import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-[#F0F4FF] to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B] leading-tight">
            Trouvez l'entreprise BTP idéale
            <br />
            <span className="text-primary">pour votre projet</span>
          </h1>

          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            La première plateforme 100% dédiée à la transmission d'entreprises du bâtiment
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#64748B]">Secteur</label>
                <input 
                  type="text" 
                  placeholder="Électricité, plomberie..." 
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#64748B]">Localisation</label>
                <input 
                  type="text" 
                  placeholder="Ville, département..." 
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#64748B]">Prix max</label>
                <input 
                  type="text" 
                  placeholder="Budget..." 
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <Button 
              size="lg"
              onClick={() => navigate("/entreprises")}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-6 text-lg rounded-xl"
            >
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg"
              onClick={() => navigate("/vendre")}
              className="px-8 py-6 text-lg bg-secondary hover:bg-secondary/90 text-white rounded-xl"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Vendre mon entreprise
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/estimation")}
              className="px-8 py-6 text-lg border-2 rounded-xl"
            >
              Obtenir une estimation gratuite
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
