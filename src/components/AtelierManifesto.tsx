import React from 'react';
import { Feather, Sparkles, Heart, Award } from 'lucide-react';

export const AtelierManifesto: React.FC = () => {
  return (
    <section id="manifeste" className="py-24 bg-[#F5EFE6] relative overflow-hidden">
      
      {/* Decorative background watermark */}
      <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/4 pointer-events-none opacity-[0.04] text-[350px] font-['Great_Vibes'] text-[#181716] select-none">
        Art
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#7E5E21] font-['Cinzel'] font-semibold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>L'Engagement de l'Atelier</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716]">
            Le Manifeste du Geste Artisanal
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed">
            Dans un monde où les mots s'envolent sur des écrans froids, WriticArt redonne au langage son poids d'or, son toucher physique et sa grâce intemporelle.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E2D5C0] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] flex items-center justify-center text-[#7E5E21]">
              <Feather className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716]">
              1. La Plume & L'Encre Noble
            </h3>
            <p className="font-sans text-xs text-[#6B6156] leading-relaxed">
              Chaque lettre est tracée manuellement au porte-plume et à la plume d'acier flexible. Nous préparons nos encres à partir de pigments naturels et de dorure à la feuille d'or 24 carats.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E2D5C0] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] flex items-center justify-center text-[#7E5E21]">
              <Award className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716]">
              2. Papiers de Maîtres Moulin
            </h3>
            <p className="font-sans text-xs text-[#6B6156] leading-relaxed">
              Nous sélectionnons exclusivement des papiers 100% coton pur, sans acide et fabriqués sur forme ronde. Leurs bords sont frangés et déchirés délicatement à la main.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E2D5C0] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE7DA] flex items-center justify-center text-[#7E5E21]">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716]">
              3. Le Rituel du Sceau de Cire
            </h3>
            <p className="font-sans text-xs text-[#6B6156] leading-relaxed">
              Coulée à la flamme et estampillée d'une matrice de laiton, notre cire souple garantit que votre missive ou faire-part traverse le temps sans jamais s'effriter.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
