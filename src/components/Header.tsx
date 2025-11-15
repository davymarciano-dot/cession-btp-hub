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
              className={`font-semibold transition-colors ${
                isActive('/vendre') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Vendre
            </Link>
            <Link 
              to="/acheter" 
              className={`font-semibold transition-colors ${
                isActive('/acheter') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Acheter
            </Link>
            <Link 
              to="/entreprises" 
              className={`font-semibold transition-colors ${
                isActive('/entreprises') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Entreprises
            </Link>
            <Link 
              to="/entreprises-rge" 
              className={`font-semibold transition-colors ${
                isActive('/entreprises-rge') ? 'text-green-600' : 'text-green-700 hover:text-green-600'
              }`}
            >
              🌱 RGE
            </Link>
            <Link 
              to="/estimer" 
              className={`font-semibold transition-colors ${
                isActive('/estimer') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Estimer
            </Link>
            <Link 
              to="/tarifs" 
              className={`font-semibold transition-colors ${
                isActive('/tarifs') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Tarifs
            </Link>
            <Link 
              to="/faq" 
              className={`font-semibold transition-colors ${
                isActive('/faq') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/roadmap" 
              className={`font-semibold transition-colors ${
                isActive('/roadmap') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Roadmap
            </Link>
            <Link 
              to="/admin" 
              className={`font-semibold transition-colors ${
                isActive('/admin') ? 'text-orange-600' : 'text-orange-700 hover:text-orange-600'
              }`}
            >
              🔧 Admin
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
            <div className="lg:hidden fixed inset-0 top-20 bg-white z-50 overflow-y-auto animate-fade-in">
              <div className="flex flex-col px-6 py-8 space-y-6">
                <Link 
                  to="/vendre" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/vendre') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Vendre
                </Link>
                <Link 
                  to="/acheter"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/acheter') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Acheter
                </Link>
                <Link 
                  to="/entreprises"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/entreprises') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Entreprises
                </Link>
                <Link 
                  to="/entreprises-rge"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/entreprises-rge') 
                      ? 'text-green-600 bg-green-50 border-l-4 border-green-600' 
                      : 'text-green-700 hover:bg-green-50'
                  }`}
                >
                  🌱 RGE
                </Link>
                <Link 
                  to="/estimer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/estimer') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Estimer
                </Link>
                <Link 
                  to="/tarifs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/tarifs') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Tarifs
                </Link>
                <Link 
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/faq') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  FAQ
                </Link>
                <Link 
                  to="/roadmap"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-all py-3 px-4 rounded-lg ${
                    isActive('/roadmap') 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Roadmap
                </Link>

                {user ? (
                  <div className="space-y-6 pt-6 border-t border-gray-200">
                    <Link 
                      to="/messages"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xl font-semibold flex items-center gap-3 py-3 px-4 rounded-lg ${
                        isActive('/messages') 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Messages
                    </Link>
                    <Link 
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xl font-semibold flex items-center gap-3 py-3 px-4 rounded-lg ${
                        isActive('/dashboard') 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Mon Espace
                    </Link>
                    <Button 
                      onClick={async () => {
                        await supabase.auth.signOut();
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-lg py-6"
                    >
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <Button 
                      onClick={() => {
                        navigate('/auth');
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-lg py-6"
                    >
                      Connexion
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/vendre');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg py-6"
                    >
                      Publier une annonce
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
      </nav>
    </header>
  );
};

export default Header;
