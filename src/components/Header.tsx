import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { NotificationCenter } from "./notifications/NotificationCenter";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

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
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="/logo-hd.png" 
              alt="CessionBTP - Plateforme de cession d'entreprises BTP" 
              className="h-12 md:h-14 w-auto" 
              style={{ maxHeight: '60px' }} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link 
              to="/vendre" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/vendre') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              Vendre
            </Link>
            <Link 
              to="/acheter" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/acheter') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              Acheter
            </Link>
            <Link 
              to="/entreprises" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/entreprises') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              Entreprises
            </Link>
            <Link 
              to="/estimer" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/estimer') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              Estimer
            </Link>
            <Link 
              to="/tarifs" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/tarifs') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              Tarifs
            </Link>
            <Link 
              to="/faq" 
              className={`font-semibold transition-colors pb-1 border-b-2 ${
                isActive('/faq') 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-800 hover:text-blue-600 border-transparent hover:border-blue-200'
              }`}
            >
              FAQ
            </Link>
            {user && (
              <>
                <Link 
                  to="/messages" 
                  className={`font-semibold transition-colors ${
                    isActive('/messages') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  Messages
                </Link>
                <Link 
                  to="/mes-matchs" 
                  className={`font-semibold transition-colors ${
                    isActive('/mes-matchs') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  Mes Matchs
                </Link>
                <Link 
                  to="/dashboard-vendeur" 
                  className={`font-semibold transition-colors ${
                    isActive('/dashboard-vendeur') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
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
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Mon Espace
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2"
                onClick={() => navigate('/auth')}
              >
                Connexion
              </Button>
            )}
            <Button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all px-4 md:px-6 py-2.5"
              onClick={() => navigate('/estimer')}
            >
              Estimer Gratuitement
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-3">
            <Link 
              to="/vendre" 
              className={`block py-2 font-semibold transition-colors ${
                isActive('/vendre') ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              Vendre
            </Link>
            <Link 
              to="/acheter" 
              className={`block py-2 font-semibold transition-colors ${
                isActive('/acheter') ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              Acheter
            </Link>
            <Link 
              to="/entreprises" 
              className={`block py-2 font-semibold transition-colors ${
                isActive('/entreprises') ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              Entreprises
            </Link>
            <Link 
              to="/estimer" 
              className={`block py-2 font-semibold transition-colors ${
                isActive('/estimer') ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              Estimer
            </Link>
            <Link 
              to="/tarifs" 
              className={`block py-2 font-semibold transition-colors ${
                isActive('/tarifs') ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              Tarifs
            </Link>
            {user && (
              <>
                <Link 
                  to="/messages" 
                  className={`block py-2 font-semibold transition-colors ${
                    isActive('/messages') ? 'text-blue-600' : 'text-gray-800'
                  }`}
                >
                  Messages
                </Link>
                <Link 
                  to="/mes-matchs" 
                  className={`block py-2 font-semibold transition-colors ${
                    isActive('/mes-matchs') ? 'text-blue-600' : 'text-gray-800'
                  }`}
                >
                  Mes Matchs
                </Link>
                <Link 
                  to="/dashboard-vendeur" 
                  className={`block py-2 font-semibold transition-colors ${
                    isActive('/dashboard-vendeur') ? 'text-blue-600' : 'text-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold"
                  onClick={() => navigate('/dashboard')}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Mon Espace
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold"
                  onClick={() => navigate('/auth')}
                >
                  Connexion
                </Button>
              )}
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-lg transition-all"
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
