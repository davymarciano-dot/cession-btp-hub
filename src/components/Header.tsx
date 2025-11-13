import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import logo from "@/assets/logo-cessionbtp.png";

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
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <nav className="max-w-4xl mx-auto px-4 py-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CessionBTP" className="h-32" />
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
            <Link to="/estimer" className="text-foreground hover:text-primary font-medium transition-colors">
              Estimer
            </Link>
            <Link to="/tarifs" className="text-foreground hover:text-primary font-medium transition-colors">
              Tarifs
            </Link>
            {user && (
              <Link to="/messages" className="text-foreground hover:text-primary font-medium transition-colors">
                Messages
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Mon Espace
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigate('/auth')}
              >
                Connexion
              </Button>
            )}
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white"
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
            <Link to="/vendre" className="block text-foreground hover:text-primary font-medium transition-colors">
              Vendre
            </Link>
            <Link to="/acheter" className="block text-foreground hover:text-primary font-medium transition-colors">
              Acheter
            </Link>
            <Link to="/entreprises" className="block text-foreground hover:text-primary font-medium transition-colors">
              Entreprises
            </Link>
            <Link to="/estimer" className="block text-foreground hover:text-primary font-medium transition-colors">
              Estimer
            </Link>
            <Link to="/tarifs" className="block text-foreground hover:text-primary font-medium transition-colors">
              Tarifs
            </Link>
            {user && (
              <Link to="/messages" className="block text-foreground hover:text-primary font-medium transition-colors">
                Messages
              </Link>
            )}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate('/dashboard')}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Mon Espace
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate('/auth')}
                >
                  Connexion
                </Button>
              )}
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
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
