import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
    <header 
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(15,23,42,0.95)',
        borderBottomColor: 'rgba(255,255,255,0.1)'
      }}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          style={{ transition: 'transform 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="/images/logo-cessionbtp.png" 
            alt="CessionBTP Logo" 
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
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
              className="header-nav-link relative"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-white transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Link to="/dashboard">{t("header.dashboard")}</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-white transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Link to="/messages">{t("header.messages")}</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="text-white transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {t("header.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-white font-medium transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Link to="/auth">{t("header.login")}</Link>
                </Button>
                <Link 
                  to="/auth"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                    boxShadow: '0 4px 15px rgba(37,99,235,0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,99,235,0.4)';
                  }}
                >
                  {t("header.createAccount")}
                </Link>
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
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#3B82F6] shadow-lg"
                  >
                    {t("header.createAccount")}
                  </Link>
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
