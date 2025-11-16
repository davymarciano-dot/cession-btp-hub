import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-cessionbtp.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-slate-50 to-white border-b-4 border-gradient-to-r from-orange-500 via-blue-500 to-orange-500 shadow-lg">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between gap-8">
          {/* LOGO GÉANT - Prend toute la hauteur du menu */}
          <Link to="/" className="hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="CessionBTP" className="h-auto w-full max-w-md" />
          </Link>

          {/* NAVIGATION DESKTOP - Alignée à droite */}
          <nav className="hidden xl:flex items-center gap-6 flex-1 justify-end">
            <Link
              to="/vendre"
              className="group relative text-slate-800 hover:text-orange-500 transition-all duration-300 font-semibold text-lg px-4 py-2"
            >
              <span className="relative z-10">Vendre</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/entreprises"
              className="group relative text-slate-800 hover:text-orange-500 transition-all duration-300 font-semibold text-lg px-4 py-2"
            >
              <span className="relative z-10">
                <span className="hidden md:inline">Entreprises à Vendre</span>
                <span className="md:hidden">Entreprises</span>
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/estimer"
              className="group relative text-slate-800 hover:text-orange-500 transition-all duration-300 font-semibold text-lg px-4 py-2"
            >
              <span className="relative z-10">Estimer</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/tarifs"
              className="group relative text-slate-800 hover:text-orange-500 transition-all duration-300 font-semibold text-lg px-4 py-2"
            >
              <span className="relative z-10">Tarifs</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/blog"
              className="group relative text-slate-800 hover:text-orange-500 transition-all duration-300 font-semibold text-lg px-4 py-2"
            >
              <span className="relative z-10">Blog</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Séparateur vertical */}
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent mx-2"></div>

            {/* BOUTONS CTA */}
            <Button
              variant="outline"
              className="border-2 border-slate-400 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold text-base px-6 h-12"
              asChild
            >
              <Link to="/connexion">Connexion</Link>
            </Button>

            <Button
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 hover:from-orange-600 hover:via-orange-700 hover:to-pink-600 text-white font-bold text-base px-8 h-12 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/estimer">🚀 Estimer Gratuitement</Link>
            </Button>
          </nav>

          {/* BOUTON MENU MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-3 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-6 pb-6 border-t-2 border-slate-200 pt-6 animate-in slide-in-from-top bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 -mx-2">
            <nav className="flex flex-col gap-3">
              <Link
                to="/vendre"
                className="text-slate-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all font-semibold text-lg py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                💼 Vendre
              </Link>

              <Link
                to="/entreprises"
                className="text-slate-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all font-semibold text-lg py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏢 Entreprises
              </Link>

              <Link
                to="/estimer"
                className="text-slate-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all font-semibold text-lg py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                📊 Estimer
              </Link>

              <Link
                to="/tarifs"
                className="text-slate-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all font-semibold text-lg py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                💰 Tarifs
              </Link>

              <Link
                to="/blog"
                className="text-slate-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all font-semibold text-lg py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✍️ Blog
              </Link>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3"></div>

              <Button
                variant="outline"
                className="w-full border-2 border-slate-400 hover:border-orange-500 hover:bg-orange-50 h-14 text-lg font-semibold"
                asChild
              >
                <Link to="/connexion" onClick={() => setMobileMenuOpen(false)}>
                  Connexion
                </Link>
              </Button>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 h-14 text-lg font-bold shadow-xl"
                asChild
              >
                <Link to="/estimer" onClick={() => setMobileMenuOpen(false)}>
                  🚀 Estimer Gratuitement
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
