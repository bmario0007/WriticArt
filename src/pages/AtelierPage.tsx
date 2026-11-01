import React from 'react';
import { AtelierManifesto } from '../components/AtelierManifesto';
import { useNavigation } from '../context/NavigationContext';
import { MapPin, PhoneCall, Mail, Clock } from 'lucide-react';
import feedInstagram from '../assets/brand/feed-instagram.png';

export const AtelierPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">Accueil</button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">L'Atelier & Le Manifeste</span>
      </div>

      {/* Manifesto Component */}
      <AtelierManifesto />

      {/* Workshop Location & Concierge Box */}
      <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-4">
          <span className="text-xs uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold block">
            Dakar, Sénégal
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold">
            Rencontrer l'Atelier WriticArt
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            Pour vos projets de mariage, d'inauguration d'entreprise ou de cadeaux d'exception, nous vous accueillons sur rendez-vous ou par échange direct WhatsApp pour préparer vos maquettes et échantillons.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-[#554C43] dark:text-[#C5BCB2]">
            <p className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-[#E68314] shrink-0" />
              <span>Atelier WriticArt • Dakar, Sénégal</span>
            </p>
            <p className="flex items-center space-x-2.5">
              <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" />
              <a href="https://wa.me/221772348521" className="font-semibold hover:underline">
                WhatsApp Direct : +221 77 234 85 21
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
              <span>Du Lundi au Samedi : 09h00 – 19h00 GMT</span>
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
              <span>Contacter l'Artisan sur WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="h-full min-h-[300px] bg-[#121110] rounded-2xl overflow-hidden p-6 flex items-center justify-center">
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
