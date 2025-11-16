import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-cessionbtp-final.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="hover:scale-105 transition-transform duration-300">
            <img 
              src={logo}
              alt="CessionBTP" 
              className="h-16 md:h-20"
            />
          </Link>

          {/* NAVIGATION DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/vendre" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Vendre
            </Link>
            <Link 
              to="/acheter" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Acheter
            </Link>
            <Link 
              to="/entreprises" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Entreprises
            </Link>
            <Link 
              to="/estimer" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Estimer
            </Link>
            <Link 
              to="/tarifs" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Tarifs
            </Link>
            <Link 
              to="/blog" 
              className="text-slate-700 hover:text-orange-500 transition-colors duration-200 font-medium text-base"
            >
              Blog
            </Link>
          </nav>

          {/* BOUTONS CTA DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-2 border-slate-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
              asChild
            >
              <Link to="/auth">Connexion</Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <Link to="/estimer">Estimer Gratuitement</Link>
            </Button>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-orange-500 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4 animate-in slide-in-from-top">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/vendre" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vendre
              </Link>
              <Link 
                to="/acheter" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Acheter
              </Link>
              <Link 
                to="/entreprises" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entreprises
              </Link>
              <Link 
                to="/estimer" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Estimer
              </Link>
              <Link 
                to="/tarifs" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link 
                to="/blog" 
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              <div className="flex flex-col gap-3 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-slate-300"
                  asChild
                >
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500"
                  asChild
                >
                  <Link to="/estimer" onClick={() => setMobileMenuOpen(false)}>
                    Estimer Gratuitement
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
