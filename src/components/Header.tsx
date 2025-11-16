import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
    { label: "Roadmap", path: "/roadmap" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO - Plus gros et visible */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            {/* Logo SVG */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* X bleu et orange */}
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* X bleu */}
                <path
                  d="M20 20 L50 50 L20 80 L35 80 L65 50 L35 20 Z"
                  fill="#2563eb"
                  className="group-hover:fill-blue-600 transition-colors"
                />
                {/* X orange */}
                <path
                  d="M80 20 L50 50 L80 80 L65 80 L35 50 L65 20 Z"
                  fill="#f97316"
                  className="group-hover:fill-orange-600 transition-colors"
                />
              </svg>
            </div>

            {/* Texte CessionBTP */}
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-orange-500 tracking-tight">Cession</span>
              <span className="text-3xl font-extrabold text-blue-900 tracking-tight">BTP</span>
            </div>
          </Link>

          {/* MENU DESKTOP - Navigation principale */}
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

          {/* BOUTONS CTA - Desktop */}
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

          {/* BURGER MENU - Mobile */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE - Dropdown */}
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

            {/* CTA Mobile */}
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
