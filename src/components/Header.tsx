import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoCessionBTP from "@/assets/logo-cessionbtp-final.png";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Vendre", path: "/vendre" },
    { label: "Acheter", path: "/acheter" },
    { label: "Entreprises", path: "/entreprises" },
    { label: "🌱 RGE", path: "/entreprises-rge" },
    { label: "Estimer", path: "/estimer" },
    { label: "Tarifs", path: "/tarifs" },
    { label: "FAQ", path: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO CESSIONBTP */}
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src={logoCessionBTP} 
              alt="CessionBTP Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* BOUTONS CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 rounded-xl"
            >
              Connexion
            </Button>
            <Button
              onClick={() => navigate("/estimer")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Estimer Gratuitement
            </Button>
          </div>

          {/* BURGER MENU Mobile */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-6 rounded-xl"
              >
                Connexion
              </Button>
              <Button
                onClick={() => {
                  navigate("/estimer");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-6 rounded-xl shadow-lg"
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
