import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Check, 
  ArrowRight, 
  PhoneCall, 
  Star, 
  ShieldCheck 
} from 'lucide-react';
import { writicLoveProducts } from '../data/productsData';
import type { WriticProduct } from '../data/productsData';
import { atelierAudio } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface WriticLoveCoffretsProps {
  onConfigureCustomVows: (product: WriticProduct) => void;
}

export const WriticLoveCoffrets: React.FC<WriticLoveCoffretsProps> = ({
  onConfigureCustomVows
}) => {
  const handleOrderWhatsApp = (product: WriticProduct) => {
    atelierAudio.playGoldChime();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E68314', '#181716', '#FAF8F5']
    });

    const text = `Bonjour WriticArt ! ✨%0A%0AJe souhaite commander le coffret :%0A👉 *${product.name}* (${product.subtitle})%0A💰 Prix : *${product.priceFCFA.toLocaleString('fr-FR')} FCFA*%0A%0APouvez-vous m'indiquer les modalités de livraison à Dakar / expédition ? Merci !`;
    window.open(`https://wa.me/221772348521?text=${text}`, '_blank');
  };

  return (
    <section id="writiclove" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative overflow-hidden transition-colors duration-300">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#E68314]/10 via-[#FAF8F5]/0 to-[#C5A059]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E68314]/10 border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#E68314] text-[#E68314]" />
            <span>La Collection Phare • 365 Jours d'Amour</span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#181716] dark:text-[#FAF8F5] leading-tight">
            365 Jours, 365 Cartes <br />
            <span className="italic font-serif text-[#C46A0B] dark:text-[#E68314]">
              Pour nourrir l’amour et renforcer les liens.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#61584F] dark:text-[#B5ABA0] font-light max-w-2xl mx-auto leading-relaxed">
            « De petits mots pour de grands changements ». Découvrez le rituel quotidien conçu par WriticArt pour cultiver la complicité, le respect et la tendresse au sein du couple, jour après jour.
          </p>

          <div className="flex items-center justify-center space-x-6 pt-2 text-xs text-[#7A7167] dark:text-[#9A9084]">
            <span className="flex items-center space-x-1.5">
              <Star className="w-4 h-4 fill-[#E68314] text-[#E68314]" />
              <strong className="text-[#181716] dark:text-white">+500 couples conquis</strong>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Livraison rapide Sénégal & Monde</span>
            </span>
          </div>
        </div>

        {/* 3 Coffrets Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {writicLoveProducts.map((prod) => {
            const isDuo = prod.colorScheme === 'duo';
            const isFemme = prod.colorScheme === 'rose-or';

            return (
              <div
                key={prod.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 border ${
                  isDuo
                    ? 'bg-gradient-to-b from-[#181716] to-[#25221F] text-[#FAF8F5] border-[#E68314] shadow-2xl scale-105 z-20'
                    : isFemme
                    ? 'bg-gradient-to-b from-[#FFF5F7] to-[#FAF8F5] dark:from-[#24171A] dark:to-[#1A1315] text-[#1E1C1A] dark:text-white border-[#F2D0D9] dark:border-[#4A2D34] shadow-lg hover:shadow-xl'
                    : 'bg-white dark:bg-[#1C1A18] text-[#1E1C1A] dark:text-white border-[#E8DFD1] dark:border-[#332E29] shadow-lg hover:shadow-xl'
                }`}
              >
                
                {/* Badge if exists */}
                {prod.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-['Cinzel'] font-bold tracking-widest uppercase shadow-md bg-gradient-to-r from-[#E68314] to-[#C46A0B] text-white">
                    {prod.badge}
                  </div>
                )}

                <div>
                  {/* Top Header */}
                  <div className="text-center pb-6 border-b border-white/10 border-[#E8DFD1]/80 dark:border-white/10">
                    <span className={`text-[10px] uppercase font-['Cinzel'] tracking-[0.25em] font-semibold block mb-1 ${
                      isDuo ? 'text-[#E68314]' : 'text-[#8C8074] dark:text-[#A69C91]'
                    }`}>
                      Coffret Luxe WriticArt
                    </span>
                    <h3 className={`font-['Cormorant_Garamond'] text-3xl font-semibold mb-1 ${
                      isDuo ? 'text-white' : 'text-[#181716] dark:text-white'
                    }`}>
                      {prod.name}
                    </h3>
                    <p className={`text-xs ${isDuo ? 'text-white/70' : 'text-[#70675E] dark:text-[#B5ABA0]'}`}>
                      {prod.subtitle}
                    </p>

                    {/* Price Tag in FCFA with international equivalent */}
                    <div className="mt-5 flex items-baseline justify-center space-x-2">
                      <span className={`text-3xl sm:text-4xl font-bold font-['Cinzel'] ${
                        isDuo ? 'text-[#E68314]' : 'text-[#181716] dark:text-[#E68314]'
                      }`}>
                        {prod.priceFCFA.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className={`text-xs ${isDuo ? 'text-white/50' : 'text-[#8C8074] dark:text-[#9A9084]'}`}>
                        (~{prod.priceEUR} €)
                      </span>
                    </div>
                  </div>

                  {/* Sample Card Excerpt */}
                  <div className={`mt-6 p-4 rounded-2xl border text-center ${
                    isDuo
                      ? 'bg-white/5 border-white/10 text-white/90'
                      : isFemme
                      ? 'bg-[#FFF0F4] dark:bg-[#2C1A20] border-[#FAD4E0] dark:border-[#4D2934] text-[#7A3E50] dark:text-[#F3BAC9]'
                      : 'bg-[#F9F5EC] dark:bg-[#25221F] border-[#ECE2D0] dark:border-[#3A3530] text-[#554C42] dark:text-[#D5CDBD]'
                  }`}>
                    <span className="text-[10px] uppercase font-['Cinzel'] tracking-wider block opacity-75 mb-1">
                      Exemple d’attention du coffret :
                    </span>
                    <p className="font-['Cormorant_Garamond'] italic text-base">
                      {prod.sampleCards[0]}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isDuo ? 'text-[#E68314]' : 'text-emerald-600 dark:text-[#E68314]'
                        }`} />
                        <span className={isDuo ? 'text-white/85' : 'text-[#554E46] dark:text-[#D5CDBD]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Order Actions */}
                <div className="mt-8 pt-6 border-t border-white/10 border-[#E8DFD1]/80 dark:border-white/10 space-y-3">
                  <button
                    onClick={() => handleOrderWhatsApp(prod)}
                    className={`w-full py-4 rounded-full font-['Cinzel'] text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2.5 transition-all shadow-lg hover:shadow-xl ${
                      isDuo
                        ? 'bg-[#25D366] text-white hover:bg-[#1EBE5D]'
                        : 'bg-[#181716] dark:bg-[#24211E] text-[#FAF8F5] hover:bg-[#E68314]'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Commander sur WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onConfigureCustomVows(prod)}
                    className={`w-full py-2.5 text-center text-xs font-['Cinzel'] tracking-wider transition-colors ${
                      isDuo ? 'text-white/60 hover:text-white' : 'text-[#7A7167] dark:text-[#9A9084] hover:text-[#181716] dark:hover:text-white'
                    }`}
                  >
                    Personnaliser avec un mot dédié →
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Real Client Feedback / Quote Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#181716] via-[#2A231C] to-[#181716] text-white p-8 sm:p-12 shadow-2xl border border-[#E68314]/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center space-x-2 text-[#E68314] text-xs font-['Cinzel'] uppercase tracking-widest font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>L'impact Writic'Love au quotidien</span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light text-white">
                « Ce coffret a transformé nos matinées. Tirer une carte chaque jour nous rappelle pourquoi nous nous sommes choisis. »
              </h3>
              <p className="text-xs text-white/70 font-sans">
                Témoignage client vérifié • Dakar, Sénégal
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <a
                href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20le%20Duo%20365%20Jours%20d'Amour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E68314] text-white font-['Cinzel'] text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#181716] transition-all flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Commander le Duo (50 000 FCFA)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
