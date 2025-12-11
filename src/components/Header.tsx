import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Track scroll for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/10 ${
        isScrolled 
          ? "bg-primary/95 backdrop-blur-md" 
          : "bg-primary"
      }`}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/images/logo-cessionbtp.png" 
            alt="CessionBTP Logo" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { to: "/vendre", label: t("header.sell") },
            { to: "/entreprises", label: t("header.companies") },
            { to: "/estimer", label: t("header.estimate") },
            { to: "/tarifs", label: t("header.pricing") },
            { to: "/blog", label: t("header.blog") },
            { to: "/contact", label: t("header.contact") },
          ].map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="relative text-[#E2E8F0] hover:text-white text-sm font-medium transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-[#E2E8F0] hover:text-white hover:bg-white/10 border border-white/30 transition-all duration-300"
                >
                  <Link to="/dashboard">{t("header.dashboard")}</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-[#E2E8F0] hover:text-white hover:bg-white/10 border border-white/30 transition-all duration-300"
                >
                  <Link to="/messages">{t("header.messages")}</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="text-[#E2E8F0] hover:text-white hover:bg-white/10 border border-white/30 transition-all duration-300"
                >
                  {t("header.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-[#E2E8F0] hover:text-white hover:bg-white/10 border border-white/30 font-medium transition-all duration-300"
                >
                  <Link to="/auth">{t("header.login")}</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl px-6 font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/auth">{t("header.createAccount")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {[
              { to: "/vendre", label: t("header.sell") },
              { to: "/entreprises", label: t("header.companies") },
              { to: "/estimer", label: t("header.estimate") },
              { to: "/tarifs", label: t("header.pricing") },
              { to: "/blog", label: t("header.blog") },
              { to: "/contact", label: t("header.contact") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#E2E8F0] hover:text-white transition-colors duration-300 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              {session ? (
                <>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      {t("header.dashboard")}
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
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
                    className="w-full text-white hover:bg-white/10"
                  >
                    {t("header.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t("header.login")}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] shadow-lg"
                  >
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
