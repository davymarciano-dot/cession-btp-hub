import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    <header className="sticky top-0 z-50 w-full bg-[hsl(16,100%,60%)] shadow-md">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl font-black text-white">🏗️ CessionBTP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/vendre" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            {t("header.sell")}
          </Link>
          <Link to="/entreprises" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            {t("header.companies")}
          </Link>
          <Link to="/estimer" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            {t("header.estimate")}
          </Link>
          <Link to="/tarifs" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            {t("header.pricing")}
          </Link>
          <Link to="/blog" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            {t("header.blog")}
          </Link>
          <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium text-sm">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <Button variant="ghost" asChild className="text-white hover:text-white hover:bg-white/20 text-sm">
                  <Link to="/dashboard">{t("header.dashboard")}</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:text-white hover:bg-white/20 text-sm">
                  <Link to="/messages">{t("header.messages")}</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-white hover:bg-white/20 text-sm">
                  {t("header.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-white hover:text-white hover:bg-white/20 font-medium text-sm">
                  <Link to="/auth">{t("header.login")}</Link>
                </Button>
                <Button asChild className="bg-white text-[hsl(16,100%,50%)] hover:bg-white/90 rounded-lg px-5 font-semibold text-sm shadow-md">
                  <Link to="/auth">{t("header.createAccount")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-[hsl(16,100%,55%)]">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/vendre"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.sell")}
            </Link>
            <Link
              to="/entreprises"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.companies")}
            </Link>
            <Link
              to="/estimer"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.estimate")}
            </Link>
            <Link
              to="/tarifs"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.pricing")}
            </Link>
            <Link
              to="/blog"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.blog")}
            </Link>
            <Link
              to="/contact"
              className="text-white/90 hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-white/20 flex flex-col gap-2">
              {session ? (
                <>
                  <Button variant="ghost" asChild className="w-full text-white hover:bg-white/20">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      {t("header.dashboard")}
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full text-white hover:bg-white/20">
                    <Link to="/messages" onClick={() => setIsMenuOpen(false)}>
                      {t("header.messages")}
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-white hover:bg-white/20"
                  >
                    {t("header.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="w-full text-white hover:bg-white/20">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t("header.login")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-white text-[hsl(16,100%,50%)] hover:bg-white/90">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t("header.createAccount")}
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
