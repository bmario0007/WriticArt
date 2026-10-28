import React, { useState } from 'react';
import { Sparkles, RefreshCw, Feather, Share2, Check, ArrowRight, Heart } from 'lucide-react';
import { dailyThoughtsList } from '../data/quotesData';
import type { DailyThought } from '../types';
import { atelierAudio } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface DailyThoughtOracleProps {
  onUseThoughtInStudio: (thought: DailyThought) => void;
}

export const DailyThoughtOracle: React.FC<DailyThoughtOracleProps> = ({ onUseThoughtInStudio }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const currentThought = dailyThoughtsList[currentIndex];

  const handleNextThought = () => {
    setIsRevealed(false);
    atelierAudio.playPaperSlide();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dailyThoughtsList.length);
      setIsRevealed(true);
      atelierAudio.playGoldChime();
      setLiked(false);
    }, 350);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`« ${currentThought.quote} » — Pensée du jour par WriticArt (@writicart)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#C5A059', '#6E1A24', '#FAF8F5']
      });
      atelierAudio.playWaxStamp();
    } else {
      setLiked(false);
    }
  };

  return (
    <section id="oracle" className="py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] dark:from-[#121110] dark:via-[#161413] dark:to-[#121110] relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none text-[220px] font-['Great_Vibes'] whitespace-nowrap text-[#181716] dark:text-white">
        Une Carte Par Jour
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#8C6B2B] dark:text-[#E68314] font-['Cinzel'] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
            <span>L’Inspiration Quotidienne • @writicart</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
            La Carte & La Pensée du Jour
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B635B] dark:text-[#B5ABA0] max-w-lg mx-auto font-light">
            Chaque jour, une carte artisanale, un conseil bienveillant et une attention porteuse de sens pour inspirer votre esprit.
          </p>
        </div>

        {/* The Atmospheric Card Display */}
        <div className="relative mx-auto max-w-xl perspective-1000">
          
          <div
            className={`transition-all duration-500 transform-style-3d ${
              isRevealed ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-50 rotate-y-12'
            }`}
          >
            {/* Main Interactive Card */}
            <div className="bg-[#FAF8F5] dark:bg-[#1C1A18] rounded-3xl p-6 sm:p-12 border border-[#DFD3C0] dark:border-[#38332E] shadow-2xl paper-deckle-edge relative overflow-hidden text-left">
              
              {/* Subtle top stamp & date */}
              <div className="flex items-center justify-between pb-6 border-b border-[#ECE3D5] dark:border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#181716] dark:bg-[#E68314] flex items-center justify-center text-[#E68314] dark:text-[#181716]">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-['Cinzel'] text-xs font-semibold tracking-wider text-[#181716] dark:text-[#FAF8F5]">
                      WriticArt #{currentThought.dayNumber || (currentIndex + 1)}
                    </span>
                    <span className="text-[11px] text-[#8C827A] dark:text-[#9A9084]">{currentThought.date}</span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#EFE9DC] dark:bg-[#2A2420] text-[11px] font-['Cinzel'] text-[#7A5B20] dark:text-[#E68314] tracking-wide">
                  {currentThought.theme}
                </div>
              </div>

              {/* The Calligraphy Quote */}
              <div className="py-8 sm:py-10 text-center space-y-4">
                <span className="text-4xl text-[#E68314] font-serif leading-none block select-none">“</span>
                <p className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-normal text-[#1E1C1A] dark:text-[#FAF8F5] italic leading-relaxed px-2">
                  {currentThought.quote}
                </p>
                <span className="text-4xl text-[#E68314] font-serif leading-none block select-none">”</span>
              </div>

              {/* The Daily Advice / Gentle Attention */}
              <div className="p-4 rounded-2xl bg-[#F3ECE0]/70 dark:bg-[#25221F] border border-[#E5DAC8] dark:border-[#3A3530] mb-8">
                <p className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#7E5E21] dark:text-[#E68314] font-semibold mb-1 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>L’Attention du Jour</span>
                </p>
                <p className="text-sm font-sans text-[#4F4943] dark:text-[#D5CDBD] leading-relaxed">
                  {currentThought.advice}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#ECE3D5] dark:border-white/10">
                
                {/* Social interactions */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full border text-xs font-sans transition-all ${
                      liked 
                        ? 'border-[#E68314] bg-[#E68314]/10 text-[#E68314]' 
                        : 'border-[#DFD3C0] dark:border-[#38332E] text-[#6E665E] dark:text-[#9A9084] hover:border-[#E68314] hover:text-[#E68314]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-[#E68314]' : ''}`} />
                    <span>{liked ? 'Aimé (Scellé)' : 'Aimer'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-[#DFD3C0] dark:border-[#38332E] text-[#6E665E] dark:text-[#9A9084] hover:border-[#E68314] hover:text-[#E68314] text-xs font-sans transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Partager'}</span>
                  </button>
                </div>

                {/* Transfer to Studio CTA */}
                <button
                  onClick={() => {
                    atelierAudio.playWaxStamp();
                    onUseThoughtInStudio(currentThought);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#181716] dark:bg-[#E68314] text-[#FAF8F5] dark:text-[#181716] text-[11px] uppercase tracking-wider font-['Cinzel'] font-bold hover:bg-[#E68314] dark:hover:bg-white transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Commander cette carte</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>

          </div>

          {/* Shuffle button below */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNextThought}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#1C1A18] border border-[#D9CDBB] dark:border-[#38332E] text-xs font-['Cinzel'] text-[#5F564C] dark:text-[#D5CDBD] tracking-wider hover:border-[#E68314] hover:text-[#181716] dark:hover:text-white shadow-sm hover:shadow transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E68314]" />
              <span>Tirer une autre pensée</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
