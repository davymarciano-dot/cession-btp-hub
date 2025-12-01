import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, CheckCircle2, Shield, Zap, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  return (
    <>
      {/* ========== STATS BAR SECTION ========== */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] py-12 md:py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">187</div>
              <div className="text-base md:text-lg font-medium opacity-95">Entreprises vendues 2024</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">45j</div>
              <div className="text-base md:text-lg font-medium opacity-95">Délai moyen de vente</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">95%</div>
              <div className="text-base md:text-lg font-medium opacity-95">Taux matching IA</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">2%</div>
              <div className="text-base md:text-lg font-medium opacity-95">Success Fee seulement</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER PRINCIPAL ========== */}
      <footer className="bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] text-white">
        <div className="container mx-auto px-4 pt-20 pb-8">
          
          {/* ========== NEWSLETTER SECTION ========== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#FF6B35]/10 border-2 border-[#FF6B35]/20 rounded-2xl p-6 md:p-8 mb-16"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">🔔 Alertes Nouvelles Annonces</h3>
            <p className="text-white/70 mb-5 text-sm md:text-base">
              Recevez les meilleures opportunités BTP directement dans votre boîte mail
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-0 mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email professionnel"
                required
                className="flex-1 px-5 py-4 border-2 border-white/10 bg-white/5 rounded-xl sm:rounded-r-none sm:rounded-l-xl text-white placeholder:text-white/50 focus:border-[#FF6B35]/50 focus:bg-white/8 outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-xl sm:rounded-l-none sm:rounded-r-xl text-white font-semibold hover:scale-105 transition-transform"
              >
                S'abonner →
              </button>
            </form>
            <p className="text-xs text-white/60">
              ✓ Gratuit • ✓ 1 email/semaine • ✓ Désinscription en 1 clic
            </p>
          </motion.div>

          {/* ========== FOOTER GRID ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* ========== BRAND SECTION ========== */}
            <div className="lg:col-span-2 pr-0 lg:pr-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-black mb-5 bg-gradient-to-r from-[#FF6B35] to-[#FFB347] bg-clip-text text-transparent">
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
                  <a href="mailto:contact@cessionbtp.fr" className="flex items-center gap-3 text-white/75 hover:text-white/95 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>contact@cessionbtp.fr</span>
                  </a>
                  <a href="tel:+33123456789" className="flex items-center gap-3 text-white/75 hover:text-white/95 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>01 23 45 67 89</span>
                  </a>
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
                      className="w-11 h-11 bg-white/10 hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ========== ENTREPRISE COLUMN ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35] mb-6">Entreprise</h4>
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
            </motion.div>

            {/* ========== VENDEURS COLUMN ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35] mb-6">Vendeurs</h4>
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
            </motion.div>

            {/* ========== ACHETEURS COLUMN ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35] mb-6">Acheteurs</h4>
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
            </motion.div>

            {/* ========== TRUST COLUMN (replaces Ressources) ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35] mb-6">Confiance</h4>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="space-y-4 mb-5">
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <Shield className="w-6 h-6 text-white" />
                    <span>SSL & Cryptage</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <Zap className="w-6 h-6 text-white" />
                    <span>Vente rapide 45j</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                    <span>Certifié Pro BTP</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/85">
                    <Award className="w-6 h-6 text-white" />
                    <span>Matching IA 95%</span>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="text-sm text-white/70">
                    <div className="text-[#FF6B35] text-2xl font-bold mb-1 flex items-center gap-1">
                      4.9<Star className="w-5 h-5 fill-current" />
                    </div>
                    (234 avis)
                  </div>
                  <div className="text-sm text-white/70">
                    <div className="text-[#FF6B35] text-2xl font-bold mb-1">187</div>
                    ventes 2024
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========== FOOTER BOTTOM ========== */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
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
