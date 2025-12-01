import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    // TODO: Implement newsletter subscription
    setEmail("");
  };

  const footerLinks = {
    entreprise: [
      { label: "Comment ça marche", path: "/comment-ca-marche" },
      { label: "Notre équipe", path: "/equipe" },
      { label: "Contact", path: "/contact" },
      { label: "Blog", path: "/blog" },
      { label: "Carrières", path: "/contact" },
    ],
    vendeurs: [
      { label: "Vendre mon entreprise", path: "/vendre" },
      { label: "Estimer gratuitement", path: "/estimer" },
      { label: "Tarifs vendeurs", path: "/tarifs" },
      { label: "Success stories", path: "/success-stories" },
      { label: "FAQ Vendeurs", path: "/faq" },
    ],
    acheteurs: [
      { label: "Parcourir annonces", path: "/entreprises" },
      { label: "Entreprises RGE", path: "/entreprises-rge" },
      { label: "Matching IA", path: "/matching-ia" },
      { label: "Mes matchs", path: "/mes-matchs" },
      { label: "FAQ Acheteurs", path: "/faq" },
    ],
    legal: [
      { label: "Mentions légales", path: "/mentions-legales" },
      { label: "CGV", path: "/cgv" },
      { label: "Confidentialité", path: "/mentions-legales" },
      { label: "Cookies", path: "/mentions-legales" },
      { label: "Plan du site", path: "/sitemap" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/cessionbtp", label: "LinkedIn" },
    { icon: Facebook, url: "https://facebook.com/cessionbtp", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/cessionbtp", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com/cessionbtp", label: "Instagram" },
  ];

  const stats = [
    { number: "187", label: "Entreprises vendues 2024" },
    { number: "45j", label: "Délai moyen de vente" },
    { number: "95%", label: "Taux matching IA" },
    { number: "2%", label: "Success Fee seulement" },
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
                  {stat.label}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-12 md:gap-16 lg:gap-[60px] mb-16">
            
            {/* ========== BRAND SECTION ========== */}
            <div className="lg:pr-10">
              <div className="text-3xl font-black mb-5 bg-gradient-to-r from-[hsl(16,100%,60%)] to-[hsl(35,100%,63%)] bg-clip-text text-transparent">
                🏗️ CessionBTP
              </div>
              
              <p className="text-white/85 font-medium mb-6 leading-relaxed">
                La plateforme n°1 pour acheter et vendre des entreprises du BTP en France
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Matching IA 95%</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Success Fee 2% seulement</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Accompagnement personnalisé</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>187 entreprises vendues en 2024</span>
                </li>
              </ul>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/75">
                  <Mail className="w-5 h-5" />
                  <span>contact@cessionbtp.fr</span>
                </div>
                <div className="flex items-center gap-3 text-white/75">
                  <Phone className="w-5 h-5" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3 text-white/75">
                  <MapPin className="w-5 h-5" />
                  <span>Paris, France</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
            </div>

            {/* ========== ENTREPRISE COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                Entreprise
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== VENDEURS COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                Vendeurs
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.vendeurs.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== ACHETEURS COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                Acheteurs
              </h4>
              <ul className="space-y-3.5">
                {footerLinks.acheteurs.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========== CONFIANCE COLUMN ========== */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(16,100%,60%)] mb-6">
                Confiance
              </h4>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="space-y-4 mb-5">
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <span className="text-2xl">🛡️</span>
                    <span>SSL & Cryptage</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <span className="text-2xl">⚡</span>
                    <span>Vente rapide 45j</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <span className="text-2xl">✓</span>
                    <span>Certifié Pro BTP</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <span className="text-2xl">🎯</span>
                    <span>Matching IA 95%</span>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="text-sm text-white/70">
                    <div className="text-[hsl(16,100%,60%)] text-2xl font-bold mb-1">
                      4.9★
                    </div>
                    (234 avis)
                  </div>
                  <div className="text-sm text-white/70">
                    <div className="text-[hsl(16,100%,60%)] text-2xl font-bold mb-1">187</div>
                    ventes 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== FOOTER BOTTOM ========== */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8 max-w-[1200px]">
            <div className="text-center mb-4">
              <p className="text-white/60 text-sm">
                © 2025 CessionBTP • Spécialiste #1 Cession Entreprises BTP France
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/60 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {link.label}
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
