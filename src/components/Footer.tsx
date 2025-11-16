import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    entreprise: [
      { label: "À propos", path: "/about" },
      { label: "Comment ça marche", path: "/comment-ca-marche" },
      { label: "Notre équipe", path: "/equipe" },
      { label: "Blog", path: "/blog" },
    ],
    vendeurs: [
      { label: "Vendre mon entreprise", path: "/vendre" },
      { label: "Estimer gratuitement", path: "/estimer" },
      { label: "Tarifs vendeurs", path: "/tarifs" },
      { label: "Success stories", path: "/success-stories" },
      { label: "FAQ Vendeurs", path: "/faq" },
    ],
    acheteurs: [
      { label: "Acheter une entreprise", path: "/acheter" },
      { label: "Parcourir les annonces", path: "/entreprises" },
      { label: "Entreprises RGE", path: "/entreprises-rge" },
      { label: "Matching IA", path: "/matching" },
      { label: "FAQ Acheteurs", path: "/faq" },
    ],
    ressources: [
      { label: "Guides gratuits", path: "/ressources" },
      { label: "Outils gratuits", path: "/outils-gratuits" },
      { label: "Calculateurs", path: "/calculateurs" },
      { label: "Lexique BTP", path: "/lexique" },
      { label: "Marketplace services", path: "/marketplace" },
    ],
    legal: [
      { label: "Mentions légales", path: "/mentions-legales" },
      { label: "CGU", path: "/cgu" },
      { label: "CGV", path: "/cgv" },
      { label: "Politique de confidentialité", path: "/confidentialite" },
      { label: "Cookies", path: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/cessionbtp", label: "LinkedIn" },
    { icon: Facebook, url: "https://facebook.com/cessionbtp", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/cessionbtp", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com/cessionbtp", label: "Instagram" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Section principale du footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Colonne 1 : Logo et Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/images/logo-cessionbtp-pure.png" 
                alt="CessionBTP" 
                className="h-12 w-auto block object-contain"
              />
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              La plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Matching IA · Success Fee 2% ·
              Accompagnement personnalisé.
            </p>

            {/* Coordonnées */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@cessionbtp.fr" className="text-sm">
                  contact@cessionbtp.fr
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Phone className="w-5 h-5" />
                <a href="tel:+33123456789" className="text-sm">
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Paris, France</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-orange-500 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Entreprise */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-500">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Vendeurs */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-500">Vendeurs</h3>
            <ul className="space-y-3">
              {footerLinks.vendeurs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Acheteurs */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-500">Acheteurs</h3>
            <ul className="space-y-3">
              {footerLinks.acheteurs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 5 : Ressources */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-500">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre du bas - Copyright & Mentions légales */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="font-semibold text-orange-500">CessionBTP</span>. Tous droits réservés.
            </p>

            {/* Liens légaux */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badge de confiance (optionnel) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm font-medium">
            🔒 Plateforme sécurisée · ⚡ Paiements cryptés · 🏆 Certifiée par les professionnels du BTP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
