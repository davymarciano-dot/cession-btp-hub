import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const footerLinks = {
    entreprise: [
      { labelKey: "footer.links.howItWorks", path: "/comment-ca-marche" },
      { labelKey: "footer.links.team", path: "/equipe" },
      { labelKey: "footer.links.contact", path: "/contact" },
      { labelKey: "footer.links.blog", path: "/blog" },
      { labelKey: "footer.links.careers", path: "/contact" },
    ],
    vendeurs: [
      { labelKey: "footer.links.sellBusiness", path: "/vendre" },
      { labelKey: "footer.links.freeEstimate", path: "/estimer" },
      { labelKey: "footer.links.sellerPricing", path: "/tarifs" },
      { labelKey: "footer.links.successStories", path: "/success-stories" },
      { labelKey: "footer.links.sellerFaq", path: "/faq" },
    ],
    acheteurs: [
      { labelKey: "footer.links.browseListings", path: "/entreprises" },
      { labelKey: "footer.links.rgeCompanies", path: "/entreprises-rge" },
      { labelKey: "footer.links.aiMatching", path: "/matching-ia" },
      { labelKey: "footer.links.myMatches", path: "/mes-matchs" },
      { labelKey: "footer.links.buyerFaq", path: "/faq" },
    ],
    legal: [
      { labelKey: "footer.links.legalNotice", path: "/mentions-legales" },
      { labelKey: "footer.links.terms", path: "/cgv" },
      { labelKey: "footer.links.privacy", path: "/mentions-legales" },
      { labelKey: "footer.links.cookies", path: "/mentions-legales" },
      { labelKey: "footer.links.sitemap", path: "/sitemap" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/cessionbtp", label: "LinkedIn" },
    { icon: Facebook, url: "https://facebook.com/cessionbtp", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/cessionbtp", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com/cessionbtp", label: "Instagram" },
  ];

  const stats = [
    { number: "187", labelKey: "footer.stats.soldCompanies" },
    { number: "45j", labelKey: "footer.stats.avgTime" },
    { number: "95%", labelKey: "footer.stats.matchingRate" },
    { number: "2%", labelKey: "footer.stats.successFee" },
  ];

  return (
    <>
      {/* ========== STATS BAR SECTION ========== */}
      <section className="bg-gradient-to-r from-[hsl(16,100%,60%)] to-[hsl(27,100%,63%)] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl md:text-[56px] font-black mb-3 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg font-medium opacity-95">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER PRINCIPAL ========== */}
      <footer className="bg-gradient-to-br from-[hsl(214,56%,10%)] to-[hsl(214,48%,25%)] text-white">
        <div className="container mx-auto px-4 pt-20 pb-8 max-w-[1200px]">
          
          {/* ========== FOOTER GRID ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] gap-12 md:gap-16 lg:gap-[60px] mb-16">
            
            {/* ========== BRAND SECTION ========== */}
            <div className="lg:pr-10">
              <div className="text-3xl font-black mb-5 bg-gradient-to-r from-[hsl(16,100%,60%)] to-[hsl(35,100%,63%)] bg-clip-text text-transparent">
                🏗️ CessionBTP
              </div>
              
              <p className="text-white/85 font-medium mb-6 leading-relaxed">
                {t("footer.tagline")}
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t("footer.features.matching")}</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t("footer.features.fee")}</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t("footer.features.support")}</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t("footer.features.sales")}</span>
                </li>
              </ul>
            </div>

            {/* ========== ENTREPRISE COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                {t("footer.sections.company")}
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== VENDEURS COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                {t("footer.sections.sellers")}
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.vendeurs.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== ACHETEURS COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                {t("footer.sections.buyers")}
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.acheteurs.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== CONFIANCE COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                {t("footer.sections.trust")}
              </h4>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex gap-6">
                  {/* Trust badges à gauche */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-white/85">
                      <span className="text-2xl">🛡️</span>
                      <span className="whitespace-nowrap">{t("footer.trust.ssl")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/85">
                      <span className="text-2xl">⚡</span>
                      <span className="whitespace-nowrap">{t("footer.trust.fastSale")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/85">
                      <span className="text-2xl">✓</span>
                      <span className="whitespace-nowrap">{t("footer.trust.certified")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/85">
                      <span className="text-2xl">🎯</span>
                      <span className="whitespace-nowrap">{t("footer.trust.matching")}</span>
                    </div>
                  </div>

                  {/* Stats à droite */}
                  <div className="flex flex-col justify-center pl-6 border-l border-white/10 space-y-4">
                    <div className="text-sm text-white/70">
                      <div className="text-[hsl(16,100%,60%)] text-2xl font-bold mb-1">
                        4.9★
                      </div>
                      (234 {t("footer.trust.reviews")})
                    </div>
                    <div className="text-sm text-white/70">
                      <div className="text-[hsl(16,100%,60%)] text-2xl font-bold mb-1">187</div>
                      {t("footer.trust.sales")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== CONTACT COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                {t("footer.sections.contact")}
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-white/75 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">contact@cessionbtp.fr</span>
                </div>
                <div className="flex items-center gap-3 text-white/75 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3 text-white/75">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Paris, France</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/10 hover:bg-gradient-to-br hover:from-[hsl(16,100%,60%)] hover:to-[hsl(27,100%,63%)] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* ========== LANGUAGE SELECTOR ========== */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">{t("footer.language")}</p>
                <LanguageSelector variant="footer" />
              </div>
            </div>
          </div>
        </div>

        {/* ========== FOOTER BOTTOM ========== */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8 max-w-[1200px]">
            <div className="text-center mb-4">
              <p className="text-white/60 text-sm">
                {t("footer.copyright")}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/60 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
