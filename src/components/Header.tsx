import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Vendre", path: "/vendre" },
    { label: "Acheter", path: "/acheter" },
    { label: "Entreprises", path: "/entreprises" },
    { label: "Estimer", path: "/estimer" },
    { label: "Tarifs", path: "/tarifs" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO CESSIONBTP */}
          <Link to="/" className="hover:scale-105 transition-transform">
            <img 
              src="/images/logo-cessionbtp.png" 
              alt="CessionBTP" 
              className="block object-contain h-24 md:h-40 lg:h-48 w-auto shrink-0"
            />
          </Link>


          {/* NAVIGATION DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-700 hover:text-orange-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* BOUTONS CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-slate-300 hover:border-orange-500 transition-colors"
            >
              Connexion
            </Button>
            <Button
              onClick={() => navigate("/estimer")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Estimer Gratuitement
            </Button>
          </div>

          {/* BURGER MENU Mobile */}
          <button
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 space-y-3 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full border-slate-300 font-medium py-6 rounded-xl"
              >
                Connexion
              </Button>
              <Button
                onClick={() => {
                  navigate("/estimer");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-6 rounded-xl shadow-lg"
              >
                Estimer Gratuitement
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
