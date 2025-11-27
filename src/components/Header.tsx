import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-cessionbtp.png";
import { OptimizedImage } from "@/components/OptimizedImage";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* LOGO */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <OptimizedImage src={logo} alt="CessionBTP" className="h-12 w-auto" />
          </Link>

          {/* NAVIGATION DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              to="/vendre"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg text-base font-medium"
            >
              Vendre
            </Link>

            <Link
              to="/entreprises"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg text-base font-medium"
            >
              <span className="hidden xl:inline">Entreprises à vendre</span>
              <span className="xl:hidden">Entreprises</span>
            </Link>

            <Link
              to="/estimer"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg text-base font-medium"
            >
              Estimer
            </Link>

            <Link
              to="/tarifs"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg text-base font-medium"
            >
              Tarifs
            </Link>

            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg text-base font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* BOUTONS CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all font-medium"
              asChild
            >
              <Link to="/connexion">Connexion</Link>
            </Button>

            <Button
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm hover:shadow-md transition-all"
              asChild
            >
              <Link to="/estimer">Estimer gratuitement</Link>
            </Button>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link
                to="/vendre"
                className="text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vendre
              </Link>

              <Link
                to="/entreprises"
                className="text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entreprises
              </Link>

              <Link
                to="/estimer"
                className="text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Estimer
              </Link>

              <Link
                to="/tarifs"
                className="text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </Link>

              <Link
                to="/blog"
                className="text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <div className="h-px bg-border my-3"></div>

              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/connexion" onClick={() => setMobileMenuOpen(false)}>
                  Connexion
                </Link>
              </Button>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/estimer" onClick={() => setMobileMenuOpen(false)}>
                  Estimer gratuitement
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
