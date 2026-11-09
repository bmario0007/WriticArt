import React from 'react';
import { AtelierManifesto } from '../components/AtelierManifesto';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, PhoneCall, Mail, Clock } from 'lucide-react';
import feedInstagram from '../assets/brand/feed-instagram.png';

export const AtelierPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { tr } = useLanguage();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">
          {tr('Accueil', 'Home')}
        </button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">
          {tr('L’Atelier & Le Manifeste', 'Workshop & Manifesto')}
        </span>
      </nav>

      {/* Manifesto Component */}
      <AtelierManifesto />

      {/* Workshop Location & Concierge Box */}
      <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold block">
            {tr('WriticArt — « Les écrits restent »', 'WriticArt — "Words that stay"')}
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold">
            {tr('Rencontrer l’Atelier WriticArt', 'Meet the WriticArt Workshop')}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            {tr(
              '« Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent. » Pour vos tableaux personnalisés en acrostiche, coffrets WriticLove ou Box cadeaux, notre atelier de Dakar vous accompagne avec expédition en France et à l’international.',
              '"Words carry a superpower. WriticArt gives them form so they forever stay." From custom acrostic paintings to WriticLove boxes and February gift boxes, our Dakar workshop accompanies you with shipping to France and worldwide.'
            )}
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-[#554C43] dark:text-[#C5BCB2]">
            <p className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-[#E68314] shrink-0" />
              <span>
                {tr(
                  'Atelier WriticArt • Dakar, Sénégal & Expéditions France / International',
                  'WriticArt Workshop • Dakar, Senegal & France / Worldwide Shipping'
                )}
              </span>
            </p>
            <p className="flex items-center space-x-2.5">
              <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" />
              <a href="https://wa.me/221772348521" className="font-semibold hover:underline">
                {tr('WhatsApp Direct : +221 77 234 85 21', 'Direct WhatsApp: +221 77 234 85 21')}
              </a>
            </p>
            <p className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-[#E68314] shrink-0" />
              <a href="mailto:kaynubind@gmail.com" className="hover:underline">
                Email : kaynubind@gmail.com
              </a>
            </p>
            <p className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-[#E68314] shrink-0" />
              <span>{tr('Du Lundi au Samedi : 09h00 – 19h00 GMT', 'Monday to Saturday: 9:00 AM – 7:00 PM GMT')}</span>
            </p>
          </div>

          <div className="pt-4">
            <a
              href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20prendre%20contact%20avec%20l'Atelier."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{tr('Contacter l’Artisan sur WhatsApp', 'Contact the Workshop on WhatsApp')}</span>
            </a>
          </div>
        </div>

        <div className="h-full min-h-[300px] bg-[#231B26] rounded-2xl overflow-hidden p-6 flex items-center justify-center border border-[#C5A059]/30">
          <img
            src={feedInstagram}
            alt="Atelier WriticArt"
            className="max-h-[320px] w-auto rounded-xl object-contain shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
