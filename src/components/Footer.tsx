import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Footer = () => {
  const { t, language } = useLanguage();

  const platformLinks = [
    { label: language === 'fr' ? "Entreprises à vendre" : "Companies for sale", path: "/entreprises" },
    { label: language === 'fr' ? "Estimer" : "Estimate", path: "/estimer" },
    { label: language === 'fr' ? "Tarifs" : "Pricing", path: "/tarifs" },
    { label: language === 'fr' ? "Vendre" : "Sell", path: "/vendre" },
  ];

  const resourceLinks = [
    { label: "Blog", path: "/blog" },
    { label: "FAQ", path: "/faq" },
    { label: language === 'fr' ? "CGV" : "Terms", path: "/cgv" },
    { label: language === 'fr' ? "Mentions légales" : "Legal Notice", path: "/mentions-legales" },
  ];

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/cessionbtp", label: "LinkedIn" },
    { icon: Facebook, url: "https://facebook.com/cessionbtp", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/cessionbtp", label: "X" },
  ];

  const bottomLinks = [
    { label: language === 'fr' ? "Confidentialité" : "Privacy", path: "/confidentialite" },
    { label: "Cookies", path: "/cookies" },
    { label: language === 'fr' ? "Plan du site" : "Sitemap", path: "/sitemap" },
  ];

  return (
    <footer className="bg-[#2563EB] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        
        {/* ========== MAIN FOOTER GRID - 4 COLUMNS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* ========== COLUMN 1: LOGO & BRAND ========== */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="text-2xl font-black">
                <span className="text-[hsl(16,100%,60%)]">🏗️</span> CessionBTP
              </div>
            </Link>
            
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              {language === 'fr' 
                ? "La plateforme n°1 de cession d'entreprises BTP en France"
                : "France's #1 platform for BTP company transfers"
              }
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-lg">🏆</span>
                <span>{language === 'fr' ? "187 ventes en 2024" : "187 sales in 2024"}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-lg">⭐</span>
                <span>4.9/5 (234 {language === 'fr' ? "avis" : "reviews"})</span>
              </div>
            </div>
          </div>

          {/* ========== COLUMN 2: PLATEFORME ========== */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {language === 'fr' ? "Plateforme" : "Platform"}
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== COLUMN 3: RESSOURCES ========== */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {language === 'fr' ? "Ressources" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== COLUMN 4: CONTACT ========== */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Contact
            </h4>
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:contact@cessionbtp.fr" 
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@cessionbtp.fr
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                Bonneuil-sur-Marne, France
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-[hsl(16,100%,60%)] rounded-full flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <LanguageSelector variant="footer" />
          </div>
        </div>
      </div>

      {/* ========== FOOTER BOTTOM ========== */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 text-sm text-white/60">
            <span>© 2025 CessionBTP</span>
            <span className="hidden md:inline mx-3">│</span>
            {bottomLinks.map((link, index) => (
              <span key={link.path + link.label} className="flex items-center">
                <Link
                  to={link.path}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
                {index < bottomLinks.length - 1 && (
                  <span className="mx-3 hidden md:inline">│</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
