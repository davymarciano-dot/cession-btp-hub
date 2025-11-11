import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">
              <span className="text-primary">Cession</span>
              <span className="text-secondary">BTP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/vendre" className="text-foreground hover:text-primary font-medium transition-colors">
              Vendre
            </Link>
            <Link to="/acheter" className="text-foreground hover:text-primary font-medium transition-colors">
              Acheter
            </Link>
            <Link to="/entreprises" className="text-foreground hover:text-primary font-medium transition-colors">
              Entreprises
            </Link>
            <Link to="/tarifs" className="text-foreground hover:text-primary font-medium transition-colors">
              Tarifs
            </Link>
            <Link to="/ressources" className="text-foreground hover:text-primary font-medium transition-colors">
              Ressources
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.location.href = '/auth'}
            >
              Connexion
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => window.location.href = '/vendre'}
            >
              Estimer Gratuitement
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/vendre" className="block text-foreground hover:text-primary font-medium transition-colors">
              Vendre
            </Link>
            <Link to="/acheter" className="block text-foreground hover:text-primary font-medium transition-colors">
              Acheter
            </Link>
            <Link to="/entreprises" className="block text-foreground hover:text-primary font-medium transition-colors">
              Entreprises
            </Link>
            <Link to="/tarifs" className="block text-foreground hover:text-primary font-medium transition-colors">
              Tarifs
            </Link>
            <Link to="/ressources" className="block text-foreground hover:text-primary font-medium transition-colors">
              Ressources
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => window.location.href = '/auth'}
              >
                Connexion
              </Button>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
                onClick={() => window.location.href = '/vendre'}
              >
                Estimer Gratuitement
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
