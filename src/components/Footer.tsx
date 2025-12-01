import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, ArrowRight, Sparkles, Shield, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    entreprise: [
      { label: "Comment ça marche", path: "/comment-ca-marche" },
      { label: "Notre équipe", path: "/equipe" },
      { label: "Contact", path: "/contact" },
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
      { label: "Parcourir les annonces", path: "/entreprises" },
      { label: "Entreprises RGE", path: "/entreprises-rge" },
      { label: "Matching IA", path: "/matching-ia" },
      { label: "Mes matchs", path: "/mes-matchs" },
      { label: "FAQ Acheteurs", path: "/faq" },
    ],
    ressources: [
      { label: "Guides gratuits", path: "/ressources" },
      { label: "Outils gratuits", path: "/outils-gratuits" },
      { label: "Lexique BTP", path: "/lexique-btp" },
      { label: "Marketplace services", path: "/marketplace" },
    ],
    legal: [
      { label: "Mentions légales", path: "/mentions-legales" },
      { label: "CGV", path: "/cgv" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/cessionbtp", label: "LinkedIn" },
    { icon: Facebook, url: "https://facebook.com/cessionbtp", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com/cessionbtp", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com/cessionbtp", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Trust Badge Section */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                <Shield className="w-8 h-8" />
              </div>
              <div className="text-sm font-semibold text-white/90">Sécurisé</div>
              <div className="text-xs text-white/60">SSL & Cryptage</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-sm font-semibold text-white/90">Rapide</div>
              <div className="text-xs text-white/60">Vente en 45j</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-sm font-semibold text-white/90">Certifié</div>
              <div className="text-xs text-white/60">Pro BTP</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-sm font-semibold text-white/90">IA</div>
              <div className="text-xs text-white/60">Matching 95%</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Colonne Logo et Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <img 
                  src="/images/logo-cessionbtp.png" 
                  alt="CessionBTP" 
                  className="h-14 w-auto block object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed">
                La plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Matching IA · Success Fee 2% · Accompagnement personnalisé.
              </p>

              {/* Coordonnées avec effets hover */}
              <div className="space-y-4 mb-8">
                <a href="mailto:contact@cessionbtp.fr" className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-orange-500/10 flex items-center justify-center transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">contact@cessionbtp.fr</span>
                </a>
                
                <a href="tel:+33123456789" className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-orange-500/10 flex items-center justify-center transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">01 23 45 67 89</span>
                </a>
                
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Paris, France</span>
                </div>
              </div>

              {/* Réseaux sociaux modernisés */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 rounded-xl transition-all duration-300 flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Colonnes de liens avec animations */}
          {/* Colonne Entreprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 text-sm transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Vendeurs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              Vendeurs
            </h3>
            <ul className="space-y-3">
              {footerLinks.vendeurs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 text-sm transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Acheteurs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              Acheteurs
            </h3>
            <ul className="space-y-3">
              {footerLinks.acheteurs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 text-sm transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Ressources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 text-sm transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar - Copyright */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              © {currentYear} <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">CessionBTP</span>. Tous droits réservés.
            </motion.p>

            {/* Liens légaux */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
