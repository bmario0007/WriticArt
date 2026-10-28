import React, { useState } from 'react';
import { ArrowRight, Eye, ShieldCheck, Heart, Award, PhoneCall } from 'lucide-react';

interface HeroProps {
  onStartConfigurator: () => void;
  onOpenOracle: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#E68314]/20 via-[#FAF8F5]/0 to-[#C5A059]/15 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Call To Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Official Slogan Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#E68314]/30 bg-[#FFF7EE] text-xs text-[#B86209] font-['Cinzel'] tracking-wider shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E68314] animate-ping" />
              <span>Transformer les mots en œuvres • Atelier WriticArt</span>
            </div>

            {/* Main Title */}
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] leading-[1.12] tracking-tight">
              L'Art du Verbe, <br />
              <span className="italic font-serif text-[#C46A0B]">des Coffrets d'Amour aux Toiles Éternelles.</span>
            </h1>

            {/* Subtitle with @writicart identity */}
            <p className="font-sans text-base sm:text-lg text-[#5F5851] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Des célèbres coffrets <strong className="font-semibold text-[#181716]">« 365 Jours d'Amour »</strong> aux <strong className="font-semibold text-[#181716]">tableaux personnalisés</strong> et <strong className="font-semibold text-[#181716]">cadres d’art</strong>. Nous donnons à vos sentiments le prestige de la haute calligraphie et du papier noble.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#writiclove"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold hover:bg-[#E68314] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center space-x-3 group"
              >
                <Heart className="w-4 h-4 text-[#E68314] group-hover:scale-110 transition-transform" />
                <span>Découvrir Writic’Love (365 Jours)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20une%20création"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-[0.18em] font-['Cinzel'] font-bold hover:bg-[#1EBE5D] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-8 border-t border-[#E8DFD1]/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-[#B86209] mb-1">
                  <Heart className="w-4 h-4" />
                  <span className="font-['Cinzel'] text-xs font-bold tracking-wider">365 Cartes</span>
                </div>
                <p className="text-[12px] text-[#7E756C]">Un rituel amoureux unique</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-[#B86209] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-['Cinzel'] text-xs font-bold tracking-wider">Tableaux & Cadres</span>
                </div>
                <p className="text-[12px] text-[#7E756C]">Calligraphie sur-mesure</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-[#B86209] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="font-['Cinzel'] text-xs font-bold tracking-wider">Dakar & Export</span>
                </div>
                <p className="text-[12px] text-[#7E756C]">Livraison locale & internationale</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Card / Box Floating Experience */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[380px] sm:max-w-[420px] cursor-grab active:cursor-grabbing perspective-1000 py-6"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Floating ambient cards behind */}
              <div 
                className="absolute -top-4 -left-4 w-full h-[470px] rounded-3xl bg-[#181716] border border-[#E68314]/30 -rotate-3 transition-transform duration-500 shadow-xl pointer-events-none opacity-90 flex items-center justify-center"
              >
                <span className="font-['Cinzel'] text-xs text-[#E68314] tracking-widest uppercase">
                  Coffret Writic’Love Homme
                </span>
              </div>

              {/* Foreground interactive 3D Card */}
              <div
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative rounded-3xl bg-[#FAF8F5] border border-[#E0D4C0] shadow-2xl p-8 sm:p-9 paper-deckle-edge transform-style-3d group"
              >
                
                {/* Official Wax / Badge Stamp */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#E68314] via-[#C46A0B] to-[#7A3E04] shadow-xl flex items-center justify-center border-2 border-white z-20">
                  <span className="font-['Cinzel'] text-xs text-white font-bold tracking-widest drop-shadow">
                    WA
                  </span>
                </div>

                {/* Card Header */}
                <div className="pt-4 pb-4 border-b border-[#E8DFD1] text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#9E948B] font-['Cinzel']">
                    Writic’Love • 365 Jours d'Amour
                  </p>
                  <h3 className="font-['Great_Vibes'] text-3xl sm:text-4xl text-[#C46A0B] mt-2 mb-1">
                    Jour 010 — 10 Janvier
                  </h3>
                  <p className="text-xs font-['Cinzel'] text-[#8C827A] tracking-widest">
                    DE PETITS MOTS POUR DE GRANDS CHANGEMENTS
                  </p>
                </div>

                {/* Calligraphic Body */}
                <div className="py-6 text-center space-y-3">
                  <p className="font-['Pinyon_Script'] text-2xl text-[#2C2723] leading-relaxed">
                    « Je mesure mes paroles avant de les prononcer. »
                  </p>
                  <p className="font-['Cormorant_Garamond'] text-sm text-[#6A635B] italic">
                    « Aujourd'hui, je t'aime plus que jamais. »
                  </p>
                </div>

                {/* Price and Coffret pill */}
                <div className="pt-4 border-t border-[#E8DFD1]/80 flex items-center justify-between text-[11px] text-[#8C827A] font-sans">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E68314]" />
                    <span>30 000 FCFA l'unité</span>
                  </span>
                  <span className="font-['Cinzel'] text-[#C46A0B] font-bold">Duo : 50 000 FCFA</span>
                </div>

                {/* Interactive hint */}
                <div className="mt-4 pt-3 text-center">
                  <span className="inline-flex items-center space-x-1.5 text-[10px] text-[#A69C91] tracking-wider uppercase font-['Cinzel']">
                    <Eye className="w-3 h-3 text-[#E68314]" />
                    <span>Explorez le coffret 3D</span>
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
