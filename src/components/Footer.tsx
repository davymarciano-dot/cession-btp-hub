import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-cessionbtp.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="CessionBTP" className="h-12" />
            </div>
            <p className="text-slate-400 mb-6">
              La plateforme leader française de cession d'entreprises BTP et ENR
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Vendre
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Acheter
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Valorisation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Audit BTP
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Secteurs */}
          <div>
            <h3 className="text-lg font-bold mb-4">Secteurs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Plomberie
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Électricité
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Maçonnerie
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Chauffage
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Couverture
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Peinture
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 CessionBTP. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="bg-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span>🏗️</span>
              <span>Experts certifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Données sécurisées RGPD</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Site sécurisé SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
