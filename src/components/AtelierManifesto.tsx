import React from 'react';
import { Feather, Sparkles, Heart, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AtelierManifesto: React.FC = () => {
  const { tr } = useLanguage();

  return (
    <section
      id="manifeste"
      className="py-20 bg-[#F5EFE6] dark:bg-[#121110] rounded-3xl relative overflow-hidden transition-colors duration-300 border border-[#E8DFD1] dark:border-[#2E2A26]"
    >
      {/* Decorative background watermark */}
      <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/4 pointer-events-none opacity-[0.04] dark:opacity-[0.03] text-[300px] font-['Great_Vibes'] text-[#181716] dark:text-[#FAF8F5] select-none">
        WriticArt
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#7E5E21] dark:text-[#E68314] font-['Cinzel'] font-semibold">
            <Sparkles className="w-4 h-4 text-[#C5A059] dark:text-[#E68314]" />
            <span>{tr('L’Engagement de la Maison • « Les écrits restent »', 'House Commitment • "Words that stay"')}</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr('Le Manifeste du Geste Artisanal', 'The Craftsmanship Manifesto')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6E645A] dark:text-[#A8A096] font-light leading-relaxed">
            {tr(
              '« Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent. » Chaque création — tableau en acrostiche, coffret WriticLove de 365 + 1 cartes ou Box sensorielle — donne corps à vos émotions.',
              '"Words carry a superpower. WriticArt gives them form so they forever stay." Each piece — bespoke acrostic painting, WriticLove 365 + 1 card box, or curated gift box — preserves lasting emotions.'
            )}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF8F5] dark:bg-[#1A1816] rounded-3xl p-8 border border-[#E2D5C0] dark:border-[#2E2A26] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] dark:bg-[#25221F] flex items-center justify-center text-[#7E5E21] dark:text-[#E68314]">
              <Feather className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
              {tr('1. L’Art de l’Acrostiche & Plume', '1. The Art of the Acrostic & Nib')}
            </h3>
            <p className="font-sans text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
              {tr(
                'Un prénom, un mot ou une expression devient le fil conducteur d’un poème unique où chaque lettre ouvre une ligne soigneusement composée selon votre thème.',
                'A name, word, or sentiment becomes the thread of a bespoke poem where each letter opens a thoughtfully crafted line tailored to your theme.'
              )}
            </p>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#1A1816] rounded-3xl p-8 border border-[#E2D5C0] dark:border-[#2E2A26] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] dark:bg-[#25221F] flex items-center justify-center text-[#7E5E21] dark:text-[#E68314]">
              <Award className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
              {tr('2. Supports Nobles & Finitions', '2. Fine Papers & Noble Finishes')}
            </h3>
            <p className="font-sans text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
              {tr(
                'Papiers 100 % coton pur et encadrements soignés conçus pour traverser les années sans jamais perdre leur éclat ni leur émotion.',
                '100% pure cotton papers and archival framing built to endure through generations without losing clarity or warmth.'
              )}
            </p>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#1A1816] rounded-3xl p-8 border border-[#E2D5C0] dark:border-[#2E2A26] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] dark:bg-[#25221F] flex items-center justify-center text-[#7E5E21] dark:text-[#E68314]">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
              {tr('3. Nourrir Votre Amour (365 + 1)', '3. Nurturing Love Daily (365 + 1)')}
            </h3>
            <p className="font-sans text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
              {tr(
                'Avec WriticLove, chaque jour apporte une attention sincère, améliore la communication et rappelle l’importance de placer ALLAH au cœur du mariage.',
                'Through WriticLove, every day offers a sincere gesture, strengthens communication, and reminds couples to place ALLAH at the heart of marriage.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
