import React from 'react';
import { Heart, Mail, PhoneCall, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181716] text-[#FAF8F5] pt-16 pb-12 border-t border-[#312E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/brand/logo-dark.jpg"
                alt="WriticArt Logo"
                className="h-12 w-auto object-contain rounded"
              />
            </div>
            <p className="font-sans text-xs text-[#A69C91] max-w-sm leading-relaxed">
              « Transformer les mots en œuvres ». Atelier de haute papeterie, créateur des coffrets « 365 Jours d'Amour », tableaux calligraphiés et cadres d'art sur-mesure.
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

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#E68314]">
              Collections & Œuvres
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li><a href="#writiclove" className="hover:text-white transition-colors">Coffret Writic'Love Homme (30 000 FCFA)</a></li>
              <li><a href="#writiclove" className="hover:text-white transition-colors">Coffret Writic'Love Femme (30 000 FCFA)</a></li>
              <li><a href="#writiclove" className="hover:text-white transition-colors font-semibold text-[#E68314]">Le Duo Complémentaire (50 000 FCFA)</a></li>
              <li><a href="#galerie" className="hover:text-white transition-colors">Tableaux Réalisés</a></li>
              <li><a href="#galerie" className="hover:text-white transition-colors">Cadres Décoratifs & Poésie</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">Configurateur Sur-Mesure</a></li>
            </ul>
          </div>

          {/* Workshop Contact */}
          <div className="space-y-3">
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#E68314]">
              Contact Direct
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
              <p className="pt-2 text-[11px] text-[#8C8277]">
                Expéditions rapides partout au Sénégal et à l'international.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C8277] gap-4">
          <p>© {new Date().getFullYear()} WriticArt — Transformer les mots en œuvres. Tous droits réservés.</p>
          <p className="flex items-center space-x-1">
            <span>Fait avec passion au Sénégal</span>
            <Heart className="w-3.5 h-3.5 text-[#E68314] fill-[#E68314]" />
          </p>
        </div>

      </div>
    </footer>
  );
};
