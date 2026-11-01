import React from 'react';
import { Heart, Check, PhoneCall } from 'lucide-react';
import { writicLoveProducts } from '../data/productsData';
import type { WriticProduct } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { atelierAudio } from '../utils/soundEffects';

export const WriticLovePage: React.FC = () => {
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();

  const handleAddToCart = (product: WriticProduct) => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      priceFCFA: product.priceFCFA,
      image: product.image
    });
  };

  const handleWhatsApp = (product: WriticProduct) => {
    atelierAudio.playWaxStamp();
    const text = `Bonjour l'Atelier WriticArt ! ✨%0A%0AJe souhaite commander le coffret :%0A👉 *${product.name}* (${product.subtitle})%0A💰 Prix : *${product.priceFCFA.toLocaleString('fr-FR')} FCFA*%0A%0APouvez-vous me confirmer les modalités de livraison à Dakar ? Merci !`;
    window.open(`https://wa.me/221772348521?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">Accueil</button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">Coffrets 365 Jours d'Amour</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E68314]/10 border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold">
          <Heart className="w-3.5 h-3.5 fill-[#E68314] text-[#E68314]" />
          <span>La Collection Phare • 365 Jours d'Amour</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-light text-[#181716] dark:text-[#FAF8F5] leading-tight">
          365 Jours, 365 Cartes <br />
          <span className="italic font-serif text-[#C46A0B] dark:text-[#E68314]">
            Pour nourrir l’amour et renforcer les liens.
          </span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#61584F] dark:text-[#B5ABA0] font-light max-w-2xl mx-auto leading-relaxed">
          « De petits mots pour de grands changements ». Découvrez le rituel quotidien conçu par WriticArt pour cultiver la complicité, le respect et la tendresse au sein du couple, jour après jour.
        </p>
      </div>

      {/* 3 Coffrets Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {writicLoveProducts.map((prod) => {
          const isDuo = prod.colorScheme === 'duo';
          const isFemme = prod.colorScheme === 'rose-or';

          return (
            <div
              key={prod.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                isDuo
                  ? 'bg-gradient-to-b from-[#181716] to-[#25221F] text-[#FAF8F5] border-[#E68314] shadow-2xl scale-105 z-20'
                  : isFemme
                  ? 'bg-gradient-to-b from-[#FFF5F7] to-[#FAF8F5] dark:from-[#24171A] dark:to-[#1A1315] text-[#1E1C1A] dark:text-white border-[#F2D0D9] dark:border-[#4A2D34] shadow-lg hover:shadow-xl'
                  : 'bg-white dark:bg-[#1C1A18] text-[#1E1C1A] dark:text-white border-[#E8DFD1] dark:border-[#332E29] shadow-lg hover:shadow-xl'
              }`}
            >
              {prod.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-['Cinzel'] font-bold tracking-widest uppercase shadow-md bg-gradient-to-r from-[#E68314] to-[#C46A0B] text-white">
                  {prod.badge}
                </div>
              )}

              <div>
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

                  <div className="mt-5 flex items-baseline justify-center space-x-2">
                    <span className={`text-3xl sm:text-4xl font-bold font-['Cinzel'] ${
                      isDuo ? 'text-[#E68314]' : 'text-[#181716] dark:text-[#E68314]'
                    }`}>
                      {prod.priceFCFA.toLocaleString('fr-FR')} FCFA
                    </span>
                    <span className={`text-xs ${isDuo ? 'text-white/60' : 'text-[#8C8074]'}`}>
                      (~{prod.priceEUR} €)
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="py-6 space-y-3">
                  <p className={`text-xs font-sans leading-relaxed ${isDuo ? 'text-[#D9D3CE]' : 'text-[#61584F] dark:text-[#C5BCB2]'}`}>
                    {prod.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                        <span className={isDuo ? 'text-white/85' : 'text-[#4A433B] dark:text-[#D5CDBD]'}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Sample */}
                  {prod.sampleCards.length > 0 && (
                    <div className={`mt-4 p-3.5 rounded-2xl border text-xs italic space-y-1 ${
                      isDuo 
                        ? 'bg-white/5 border-white/10 text-white/90' 
                        : 'bg-[#FFFBF5] dark:bg-[#121110] border-[#E8DFD1] dark:border-[#2E2A26] text-[#7A7167] dark:text-[#C5BCB2]'
                    }`}>
                      <span className="not-italic text-[10px] font-['Cinzel'] uppercase font-bold tracking-wider text-[#E68314] block">
                        Exemple de carte manuscrite :
                      </span>
                      <p>{prod.sampleCards[0]}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-white/10 border-[#E8DFD1]/80 dark:border-white/10 space-y-2.5">
                <button
                  onClick={() => handleAddToCart(prod)}
                  className={`w-full py-3.5 rounded-full text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 ${
                    isDuo
                      ? 'bg-[#E68314] text-white hover:bg-[#C46A0B]'
                      : 'bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Ajouter au Panier</span>
                </button>

                <button
                  onClick={() => handleWhatsApp(prod)}
                  className="w-full py-3 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Commander sur WhatsApp</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* The Daily Ritual Explanations */}
      <div className="bg-white dark:bg-[#161413] p-8 sm:p-12 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
            Mode d'Emploi
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold">
            Le Rituel Quotidien Writic'Love
          </h2>
          <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
            Une méthode simple et puissante pour élever votre relation au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] mx-auto text-lg font-bold font-['Cinzel']">
              1
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">Le Tirage du Matin</h4>
            <p className="text-xs text-[#6B6156] dark:text-[#A8A096]">
              Chaque jour, tirez une carte sans regarder. Laissez le message résonner avec votre journée.
            </p>
          </div>

          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] mx-auto text-lg font-bold font-['Cinzel']">
              2
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">L'Attention Partagée</h4>
            <p className="text-xs text-[#6B6156] dark:text-[#A8A096]">
              Partagez la pensée avec votre partenaire, en tête-à-tête ou par un message doux au travail.
            </p>
          </div>

          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] mx-auto text-lg font-bold font-['Cinzel']">
              3
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">La Boîte à Souvenirs</h4>
            <p className="text-xs text-[#6B6156] dark:text-[#A8A096]">
              Conservez les 365 cartes : à la fin de l'année, elles forment la chronique vivante de votre amour.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
