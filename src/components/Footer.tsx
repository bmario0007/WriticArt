import React from 'react';
import { Mail, PhoneCall, MapPin, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import logoDark from '../assets/brand/logo-dark.jpg';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-[#181716] text-[#FAF8F5] pt-16 pb-12 border-t border-[#312E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logoDark}
                alt="WriticArt Logo"
                className="h-12 w-auto object-contain rounded cursor-pointer"
                onClick={() => navigateTo('home')}
              />
            </div>
            <p className="font-sans text-xs text-[#A69C91] max-w-sm leading-relaxed">
              « Transformer les mots en œuvres ». Atelier de haute calligraphie et papeterie fine à Dakar. Créateur officiel des coffrets « 365 Jours d'Amour », tableaux sur toile et cadres d'art personnalisés.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/writicart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                title="@writicart Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/221772348521"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Direct +221 77 234 85 21"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href="mailto:kaynubind@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E68314] text-white flex items-center justify-center transition-colors"
                title="Email kaynubind@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links to Dedicated Pages */}
          <div className="space-y-3">
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#E68314]">
              Rubriques & Pages
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Page d'Accueil</button></li>
              <li><button onClick={() => navigateTo('boutique')} className="hover:text-white transition-colors">La Boutique en Ligne</button></li>
              <li><button onClick={() => navigateTo('writiclove')} className="hover:text-white transition-colors font-semibold text-[#E68314]">Coffrets 365 Jours d'Amour</button></li>
              <li><button onClick={() => navigateTo('sur-mesure')} className="hover:text-white transition-colors">Atelier Sur-Mesure & Devis</button></li>
              <li><button onClick={() => navigateTo('pensee')} className="hover:text-white transition-colors">La Pensée du Jour (Oracle)</button></li>
              <li><button onClick={() => navigateTo('galerie')} className="hover:text-white transition-colors">Galerie & Feed Instagram</button></li>
              <li><button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">Journal d'Atelier (Blog)</button></li>
              <li><button onClick={() => navigateTo('suivi-commande')} className="hover:text-white transition-colors">Suivi de Commande en Ligne</button></li>
              <li><button onClick={() => navigateTo('atelier')} className="hover:text-white transition-colors">L'Atelier & Le Manifeste</button></li>
            </ul>
          </div>

          {/* Workshop Contact & Admin ERP Entry */}
          <div className="space-y-3">
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#E68314]">
              Atelier & Contact Direct
            </h4>
            <div className="space-y-2.5 text-xs text-[#B5ABA0]">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E68314] shrink-0 mt-0.5" />
                <span>Atelier WriticArt • Dakar, Sénégal</span>
              </p>
              <p className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/221772348521" className="hover:text-white transition-colors font-semibold">
                  +221 77 234 85 21
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E68314] shrink-0" />
                <a href="mailto:kaynubind@gmail.com" className="hover:text-white transition-colors">
                  kaynubind@gmail.com
                </a>
              </p>
              
              {/* ADMIN ERP ACCESS BUTTON */}
              <div className="pt-3">
                <button
                  onClick={() => navigateTo('erp')}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-[#E68314] hover:text-white text-[11px] font-['Cinzel'] uppercase font-bold tracking-wider flex items-center justify-center space-x-1.5 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" />
                  <span>Accès Mode ERP Administrateur</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C8277] gap-4">
          <p>© {new Date().getFullYear()} WriticArt Dakar. Tous droits réservés. Haute calligraphie et papeterie d'art.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo('atelier')} className="hover:underline">Manifeste de l'Artisanat</button>
            <span>•</span>
            <button onClick={() => navigateTo('erp')} className="hover:underline text-[#E68314]">
              Administration ERP
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
