import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import logoDark from '../assets/brand/logo-dark.jpg';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { tr } = useLanguage();
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <footer className="bg-[#231B26] text-[#FAF8F5] pt-16 pb-12 border-t-2 border-[#C5A059]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col with Official Logo & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logoDark}
                alt="WriticArt Logo"
                className="h-12 w-auto object-contain rounded cursor-pointer"
                onClick={() => navigateTo('home')}
              />
              <div>
                <span className="font-['Cinzel'] text-sm font-bold tracking-widest uppercase text-[#E68314] block">
                  WriticArt
                </span>
                <span className="italic font-['Cormorant_Garamond'] text-base text-[#EADBC2]">
                  {tr('Les écrits restent', 'Words that stay')}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#C7BCCB] max-w-md leading-relaxed">
              «{' '}
              {tr(
                'Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent.',
                'Words hold a superpower. WriticArt gives them form so they remain.'
              )}{' '}
              » —{' '}
              {tr(
                'Tableaux personnalisés en acrostiche, Pack WriticLove (365 + 1 cartes) et Box cadeaux.',
                'Bespoke acrostic paintings, WriticLove keepsake boxes (365 + 1 cards), and gift boxes.'
              )}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/writicart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @writicart"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                title="@writicart Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/221772348521"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp +221 77 234 85 21"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Direct +221 77 234 85 21"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href="mailto:kaynubind@gmail.com"
                aria-label="Email kaynubind@gmail.com"
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
              {tr('Rubriques & Offres', 'Pages & Collections')}
            </h4>
            <ul className="space-y-2 text-xs text-[#C7BCCB]">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  {tr('Page d’Accueil', 'Home')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tableaux')} className="hover:text-white transition-colors font-semibold text-[#F3D69B]">
                  {tr('Tableaux personnalisés (Acrostiches)', 'Custom Acrostic Paintings')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('writiclove')} className="hover:text-white transition-colors font-semibold text-[#E68314]">
                  {tr('Pack WriticLove (365 + 1 cartes)', 'WriticLove Pack (365 + 1 cards)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('box')} className="hover:text-white transition-colors">
                  {tr('Box WriticArt (Février)', 'WriticArt Gift Box (Feb.)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('boutique')} className="hover:text-white transition-colors">
                  {tr('La Boutique en Ligne', 'Online Shop')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sur-mesure')} className="hover:text-white transition-colors">
                  {tr('Studio Sur-Mesure 3D', '3D Custom Studio')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">
                  {tr('Journal d’Atelier', 'Workshop Journal')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('suivi-commande')} className="hover:text-white transition-colors">
                  {tr('Suivi de Commande', 'Order Tracking')}
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop Contact & Admin ERP Entry */}
          <div className="space-y-3">
            <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#E68314]">
              {tr('Contact & Atelier', 'Contact & Workshop')}
            </h4>
            <div className="space-y-2.5 text-xs text-[#C7BCCB]">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E68314] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{tr('Atelier WriticArt • Dakar & France', 'WriticArt Workshop • Dakar & France')}</span>
              </p>
              <p className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
                <a href="https://wa.me/221772348521" className="hover:text-white transition-colors font-semibold">
                  +221 77 234 85 21
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E68314] shrink-0" aria-hidden="true" />
                <a href="mailto:kaynubind@gmail.com" className="hover:text-white transition-colors">
                  kaynubind@gmail.com
                </a>
              </p>

              {/* ADMIN ERP ACCESS BUTTON */}
              <div className="pt-3">
                <button
                  onClick={() => navigateTo('erp')}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-[#E68314] hover:text-white text-[11px] font-['Cinzel'] uppercase font-bold tracking-wider flex items-center justify-center space-x-1.5 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" aria-hidden="true" />
                  <span>{tr('Mode ERP Administrateur', 'Admin ERP Portal')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A69C91] gap-4">
          <p>
            © {currentYear} WriticArt — « {tr('Les écrits restent', 'Words that stay')} ».{' '}
            {tr('Tous droits réservés.', 'All rights reserved.')}
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo('atelier')} className="hover:underline">
              {tr('Manifeste de la marque', 'Brand Manifesto')}
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('erp')} className="hover:underline text-[#E68314]">
              {tr('Administration ERP', 'Admin ERP')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
