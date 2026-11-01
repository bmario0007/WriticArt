import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, ShoppingBag, PhoneCall, Feather } from 'lucide-react';
import { atelierAudio } from '../../utils/soundEffects';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import confetti from 'canvas-confetti';

export const InteractiveBoxDrawer: React.FC = () => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const [activeEdition, setActiveEdition] = useState<'duo' | 'homme' | 'femme'>('duo');
  const [cardIndex, setCardIndex] = useState(0);

  const sampleRitualCards = {
    duo: [
      {
        id: 'c-duo-1',
        text: "Ce matin, je te promets d'écouter ton silence avec la même tendresse que tes rires. Dans le tumulte du monde, ton âme est mon sanctuaire.",
        tag: "Rituel Complice • Jour 14"
      },
      {
        id: 'c-duo-2',
        text: "Dis-moi un rêve secret que tu n'as encore confié à personne. Aujourd'hui, mon cœur est ouvert pour l'accueillir et le chérir.",
        tag: "Confidence & Intimité • Jour 78"
      },
      {
        id: 'c-duo-3',
        text: "Si notre amour était une toile de lin brut, chaque épreuve traversée ensemble y a déposé une dorure éternelle à l'or pur.",
        tag: "Gratitude & Force • Jour 182"
      },
      {
        id: 'c-duo-4',
        text: "Ce soir, oublions les téléphones et les obligations. Juste un regard, une étreinte et la certitude que nous sommes là l'un pour l'autre.",
        tag: "Présence Pure • Jour 245"
      }
    ],
    homme: [
      {
        id: 'c-h-1',
        text: "Tu portes tant de responsabilités avec noblesse. Sache que lorsque tu rentres ce soir, tu peux déposer ton armure : mon cœur est ton repos.",
        tag: "Force & Refuge • Pour Lui"
      },
      {
        id: 'c-h-2',
        text: "J'admire ta détermination, ta droiture et cette manière si douce que tu as de me rassurer d'un simple regard.",
        tag: "Admiration Sincère • Pour Lui"
      }
    ],
    femme: [
      {
        id: 'c-f-1',
        text: "Ta grâce et ta sagesse illuminent chaque recoin de notre maison. Merci d'être la muse et la reine qui élève ma vie.",
        tag: "Hommage Nuptial • Pour Elle"
      },
      {
        id: 'c-f-2',
        text: "Ne doute jamais de ta beauté ni de ta valeur. À mes yeux, chaque matin à tes côtés surpasse les palais les plus précieux.",
        tag: "Douceur Infinie • Pour Elle"
      }
    ]
  };

  const currentCards = sampleRitualCards[activeEdition];
  const currentCard = currentCards[cardIndex % currentCards.length];

  const handleOpenBox = () => {
    atelierAudio.playPaperSlide();
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E68314', '#FAF8F5', '#181716']
    });
  };

  const handleNextCard = () => {
    atelierAudio.playPaperSlide();
    setCardIndex(prev => prev + 1);
  };

  const handleOrderWithDedication = () => {
    atelierAudio.playWaxStamp();
    const productName = activeEdition === 'duo' 
      ? "Coffret Writic’Love Duo (365 Jours)" 
      : activeEdition === 'homme'
      ? "Coffret Writic’Love Homme"
      : "Coffret Writic’Love Femme";

    const price = activeEdition === 'duo' ? 50000 : 30000;

    addToCart({
      productId: `writiclove-${activeEdition}`,
      name: productName,
      subtitle: "365 Cartes Quotidiennes",
      priceFCFA: price,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      selectedOption: `Édition ${activeEdition.toUpperCase()}`,
      customMessage: currentCard.text
    });
  };

  return (
    <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1C1A18] via-[#141210] to-[#0D0C0B] text-[#FAF8F5] border border-[#E68314]/40 shadow-2xl space-y-8 relative overflow-hidden">
      
      {/* Background golden dust ambiance */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#E68314]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 relative z-10">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E68314]/20 border border-[#E68314]/40 text-[#E68314] text-[10px] font-['Cinzel'] font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Expérience Interactive</span>
        </span>

        <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-white leading-tight">
          Vivez le Rituel : Tirez une Carte de l'Écrin
        </h3>

        <p className="text-xs text-[#A89F94] leading-relaxed font-light">
          Découvrez la puissance d'une parole d'amour manuscrite. Choisissez l'édition et tirez votre première carte du jour.
        </p>

        {/* Edition Selector Pills */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {(['duo', 'homme', 'femme'] as const).map(ed => (
            <button
              key={ed}
              onClick={() => {
                setActiveEdition(ed);
                setCardIndex(0);
                if (!isOpen) setIsOpen(true);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all ${
                activeEdition === ed
                  ? 'bg-[#E68314] text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-[#C5BCB0] hover:border-[#E68314]'
              }`}
            >
              Édition {ed === 'duo' ? 'Duo (365j)' : ed === 'homme' ? 'Pour Lui' : 'Pour Elle'}
            </button>
          ))}
        </div>
      </div>

      {/* The Interactive Box and Drawn Card */}
      <div className="max-w-lg mx-auto relative z-10">
        {!isOpen ? (
          /* Unopened State: The Box Beckons */
          <div
            onClick={handleOpenBox}
            className="group cursor-pointer p-10 rounded-3xl bg-gradient-to-b from-[#25221F] to-[#181716] border-2 border-dashed border-[#E68314]/50 hover:border-[#E68314] text-center space-y-4 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E68314] to-[#B86209] text-white flex items-center justify-center mx-auto shadow-xl group-hover:rotate-6 transition-transform">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <div className="space-y-1">
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">
                L'Écrin Noir & Or WriticArt
              </h4>
              <p className="text-xs text-[#A89F94]">
                Cliquez pour ouvrir virtuellement l'écrin et tirer une carte du jour
              </p>
            </div>

            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#E68314] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest shadow-md group-hover:brightness-110"
            >
              ✦ Ouvrir le Coffret
            </button>
          </div>
        ) : (
          /* Opened State: Realistic Calligraphed Deckle-Edge Card */
          <div className="space-y-6 animate-fadeIn">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] text-[#181716] shadow-2xl border border-[#E8DFD1] space-y-6 transform transition-all duration-500 hover:rotate-[-0.5deg]">
              
              {/* Card Header with Stamp */}
              <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4">
                <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest font-bold text-[#B86209]">
                  {currentCard.tag}
                </span>

                <div className="w-8 h-8 rounded-full bg-[#181716] text-[#E68314] border border-[#E68314]/40 flex items-center justify-center text-[10px] font-['Cinzel'] font-bold shadow-sm">
                  W
                </div>
              </div>

              {/* Calligraphy Quote Body */}
              <div className="space-y-3 py-2 text-center">
                <Feather className="w-5 h-5 text-[#E68314] mx-auto opacity-70" />
                <p className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light italic leading-relaxed text-[#181716]">
                  « {currentCard.text} »
                </p>
              </div>

              {/* Card Footer with Wax seal preview */}
              <div className="pt-4 border-t border-[#E8DFD1] flex items-center justify-between text-[11px] text-[#8C8074]">
                <span className="italic font-light">Atelier de Haute Calligraphie • Dakar</span>
                <span className="font-['Cinzel'] font-bold text-[#E68314]">Sceau N° {cardIndex + 1}</span>
              </div>
            </div>

            {/* Actions: Pull another or Order with this dedication */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleNextCard}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Tirer une Autre Carte</span>
              </button>

              <button
                onClick={handleOrderWithDedication}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#E68314] to-[#C46A0B] hover:brightness-110 text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ajouter ce Coffret ({formatPrice(activeEdition === 'duo' ? 50000 : 30000)})</span>
              </button>
            </div>

            <div className="text-center">
              <a
                href={`https://wa.me/221772348521?text=${encodeURIComponent(`Bonjour WriticArt ! J'ai tiré la carte « ${currentCard.text} » sur votre site et je souhaite commander ce coffret 365 Jours.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#25D366] hover:underline font-medium"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Commander directement avec ce texte sur WhatsApp</span>
              </a>
            </div>

          </div>
        )}
      </div>

      {/* Subtle Bottom assurance */}
      <div className="text-center text-[11px] text-[#8C8074] relative z-10">
        <p>✦ 365 cartes imprimées sur papier pur coton avec dorure à chaud • Boîte rigide scellée à la cire</p>
      </div>

    </div>
  );
};
