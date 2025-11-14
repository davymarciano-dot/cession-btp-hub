import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import logo from "@/assets/logo-cessionbtp.png";
import { NotificationCenter } from "./notifications/NotificationCenter";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 bg-white shadow-md border-b z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CessionBTP" className="h-12 w-auto" style={{ maxHeight: '48px' }} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/vendre" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Vendre
            </Link>
            <Link to="/acheter" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Acheter
            </Link>
            <Link to="/entreprises" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Entreprises
            </Link>
            <Link to="/estimer" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Estimer
            </Link>
            <Link to="/tarifs" className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Tarifs
            </Link>
            {user && (
              <>
                <Link to="/messages" className="text-gray-700 hover:text-primary font-semibold transition-colors">
                  Messages
                </Link>
                <Link to="/mes-matchs" className="text-gray-700 hover:text-primary font-semibold transition-colors">
                  Mes Matchs
                </Link>
                <Link to="/dashboard-vendeur" className="text-gray-700 hover:text-primary font-semibold transition-colors">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user && <NotificationCenter />}
            {user ? (
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Mon Espace
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                onClick={() => navigate('/auth')}
              >
                Connexion
              </Button>
            )}
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-md"
              onClick={() => navigate('/estimer')}
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
            <Link to="/vendre" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
              Vendre
            </Link>
            <Link to="/acheter" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
              Acheter
            </Link>
            <Link to="/entreprises" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
              Entreprises
            </Link>
            <Link to="/estimer" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
              Estimer
            </Link>
            <Link to="/tarifs" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
              Tarifs
            </Link>
            {user && (
              <>
                <Link to="/messages" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
                  Messages
                </Link>
                <Link to="/mes-matchs" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
                  Mes Matchs
                </Link>
                <Link to="/dashboard-vendeur" className="block text-gray-700 hover:text-primary font-semibold transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                  onClick={() => navigate('/dashboard')}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Mon Espace
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                  onClick={() => navigate('/auth')}
                >
                  Connexion
                </Button>
              )}
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-md"
                onClick={() => navigate('/estimer')}
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
