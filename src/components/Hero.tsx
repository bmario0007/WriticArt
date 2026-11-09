import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Heart, PhoneCall, Feather, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { initialCatalogProducts } from '../data/erpData';

interface HeroProps {
  onStartConfigurator: () => void;
  onOpenOracle: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { addToCart } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.04);
    setRotateY(x * 0.04);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleOrderDuo = () => {
    const duo = initialCatalogProducts.find((p) => p.id === 'writiclove-duo') || initialCatalogProducts[0];
    addToCart({
      productId: duo.id,
      name: duo.name,
      subtitle: duo.subtitle,
      priceFCFA: duo.priceFCFA,
      image: duo.image
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-20">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#E68314]/15 via-[#FAF8F5]/0 to-[#C5A059]/10 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-14">
          
          {/* Left Column: Minimalist Typography & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Slogan */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#E68314]/30 dark:border-[#E68314]/50 bg-[#FFF7EE] dark:bg-[#1E1914] text-xs text-[#B86209] dark:text-[#E68314] font-['Cinzel'] tracking-wider shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E68314] animate-ping" />
              <span>WriticArt — « Les écrits restent » • Dakar</span>
            </div>

            {/* Main Title (Rahiya refined serif) */}
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] dark:text-[#FAF8F5] leading-[1.12] tracking-tight">
              L'Art du Verbe, <br />
              <span className="italic font-serif text-[#C46A0B] dark:text-[#E68314]">
                des Coffrets d'Amour aux Toiles Éternelles.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#5F5851] dark:text-[#B5ABA0] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Des célèbres coffrets <strong className="font-semibold text-[#181716] dark:text-white">« 365 Jours d'Amour »</strong> aux <strong className="font-semibold text-[#181716] dark:text-white">tableaux personnalisés</strong> et <strong className="font-semibold text-[#181716] dark:text-white">cadres d’art</strong>. Nous donnons à vos sentiments le prestige de la haute calligraphie et du papier noble.
            </p>

            {/* Actions (Rahiya Minimalist CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#boutique"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#181716] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all duration-300 shadow-md flex items-center justify-center space-x-2 group"
              >
                <ShoppingBag className="w-4 h-4 text-[#E68314]" />
                <span>Explorer la Boutique</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20une%20création"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-[0.18em] font-['Cinzel'] font-bold hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Floating Interactive Coffret Experience */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[360px] sm:max-w-[400px] cursor-grab active:cursor-grabbing perspective-1000 py-4"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Backing aesthetic shadow card */}
              <div 
                className="absolute -top-3 -left-3 w-full h-[440px] rounded-3xl bg-[#181716] border border-[#E68314]/30 -rotate-2 transition-transform duration-500 shadow-xl pointer-events-none opacity-90 flex items-center justify-center"
              >
                <span className="font-['Cinzel'] text-xs text-[#E68314] tracking-widest uppercase">
                  Coffret Writic’Love Homme & Femme
                </span>
              </div>

              {/* Foreground Card */}
              <div
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative rounded-3xl bg-[#FAF8F5] dark:bg-[#1C1A18] border border-[#E0D4C0] dark:border-[#38332E] shadow-2xl p-7 sm:p-8 paper-deckle-edge transform-style-3d group"
              >
                {/* Wax Stamp Seal Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#E68314] via-[#C46A0B] to-[#7A3E04] shadow-lg flex items-center justify-center border-2 border-white dark:border-[#2A2622] z-20">
                  <span className="font-['Cinzel'] text-xs text-white font-bold tracking-widest">
                    WA
                  </span>
                </div>

                {/* Card Header */}
                <div className="pt-3 pb-3 border-b border-[#E8DFD1] dark:border-white/10 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#9E948B] dark:text-[#A69C91] font-['Cinzel']">
                    Writic’Love • 365 Jours d'Amour
                  </p>
                  <h3 className="font-['Great_Vibes'] text-3xl sm:text-4xl text-[#C46A0B] dark:text-[#E68314] mt-1 mb-0.5">
                    Jour 010 — 10 Janvier
                  </h3>
                  <p className="text-[11px] font-['Cinzel'] text-[#8C827A] dark:text-[#9A9084] tracking-widest">
                    DE PETITS MOTS POUR DE GRANDS CHANGEMENTS
                  </p>
                </div>

                {/* Calligraphic Body */}
                <div className="py-5 text-center space-y-2">
                  <p className="font-['Pinyon_Script'] text-2xl text-[#2C2723] dark:text-[#FAF8F5] leading-relaxed">
                    « Je mesure mes paroles avant de les prononcer. »
                  </p>
                  <p className="font-['Cormorant_Garamond'] text-xs text-[#6A635B] dark:text-[#B5ABA0] italic">
                    « Aujourd'hui, je t'aime plus que jamais. »
                  </p>
                </div>

                {/* Direct Add to Cart Action */}
                <div className="pt-3 border-t border-[#E8DFD1]/80 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C827A] block font-['Cinzel'] uppercase">Le Duo Complémentaire</span>
                    <span className="font-['Cinzel'] text-sm font-bold text-[#C46A0B] dark:text-[#E68314]">50 000 FCFA</span>
                  </div>

                  <button
                    onClick={handleOrderDuo}
                    className="px-4 py-2 rounded-xl bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all shadow"
                  >
                    Ajouter au Panier
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Minimalist Value Proposition Banners (Rahiya Style) */}
        <div className="pt-6 border-t border-[#E8DFD1]/80 dark:border-[#2E2A26] grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider text-[#181716] dark:text-[#FAF8F5]">Fait Main à Dakar</h4>
              <p className="text-[11px] text-[#7E756C] dark:text-[#9A9084]">Calligraphie noble & dorure 24K</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider text-[#181716] dark:text-[#FAF8F5]">365 Jours d'Amour</h4>
              <p className="text-[11px] text-[#7E756C] dark:text-[#9A9084]">+500 couples conquis</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider text-[#181716] dark:text-[#FAF8F5]">Livraison Express</h4>
              <p className="text-[11px] text-[#7E756C] dark:text-[#9A9084]">24h à Dakar & Monde (DHL)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 flex items-center justify-center text-[#25D366] shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider text-[#181716] dark:text-[#FAF8F5]">Service Client Dédié</h4>
              <p className="text-[11px] text-[#7E756C] dark:text-[#9A9084]">+221 77 234 85 21</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
