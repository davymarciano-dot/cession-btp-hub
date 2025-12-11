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
            {t("header.sell")}
          </Link>
          <Link to="/entreprises" className="text-gray-700 hover:text-primary transition-colors font-medium">
            {t("header.companies")}
          </Link>
          <Link to="/estimer" className="text-gray-700 hover:text-primary transition-colors font-medium">
            {t("header.estimate")}
          </Link>
          <Link to="/tarifs" className="text-gray-700 hover:text-primary transition-colors font-medium">
            {t("header.pricing")}
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors font-medium">
            {t("header.blog")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-primary">
                  <Link to="/dashboard">{t("header.dashboard")}</Link>
                </Button>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-primary">
                  <Link to="/messages">{t("header.messages")}</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-gray-700 hover:text-primary">
                  {t("header.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-primary font-medium">
                  <Link to="/auth">{t("header.login")}</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 font-medium shadow-md">
                  <Link to="/auth">{t("header.createAccount")}</Link>
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
              {t("header.sell")}
            </Link>
            <Link
              to="/entreprises"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.companies")}
            </Link>
            <Link
              to="/estimer"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.estimate")}
            </Link>
            <Link
              to="/tarifs"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.pricing")}
            </Link>
            <Link
              to="/blog"
              className="text-[#64748B] hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.blog")}
            </Link>
            
            <div className="pt-4 border-t flex flex-col gap-2">
              {session ? (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      {t("header.dashboard")}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
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
                    className="w-full"
                  >
                    {t("header.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t("header.login")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-primary">
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
