import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src="/images/logo-cessionbtp.png" 
            alt="CessionBTP Logo" 
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/vendre" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Vendre
          </Link>
          <Link to="/entreprises" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Entreprises à vendre
          </Link>
          <Link to="/estimation" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Estimer
          </Link>
          <Link to="/tarifs" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Tarifs
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-primary">
                  <Link to="/dashboard">Mon espace</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-gray-700 hover:text-primary">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-primary font-medium">
                  <Link to="/auth">Connexion</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 font-medium shadow-md">
                  <Link to="/auth">Créer mon compte</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/vendre"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendre
            </Link>
            <Link
              to="/entreprises"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Entreprises
            </Link>
            <Link
              to="/estimation"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Estimer
            </Link>
            <Link
              to="/tarifs"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              to="/blog"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            <div className="pt-4 border-t flex flex-col gap-2">
              {session ? (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-primary">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Inscription
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
