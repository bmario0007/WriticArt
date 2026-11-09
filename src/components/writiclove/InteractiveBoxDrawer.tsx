import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, ShoppingBag, PhoneCall, Feather } from 'lucide-react';
import { atelierAudio } from '../../utils/soundEffects';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

export const InteractiveBoxDrawer: React.FC = () => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { tr } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [activeEdition, setActiveEdition] = useState<'duo' | 'homme' | 'femme'>('duo');
  const [cardIndex, setCardIndex] = useState(0);

  const sampleRitualCards = {
    duo: [
      {
        id: 'c-duo-1',
        text: tr(
          'Aujourd’hui, je renouvelle mon intention envers toi : écouter avec douceur et parler avec respect.',
          'Today I renew my intention toward you: listening with gentleness and speaking with respect.'
        ),
        tag: tr('Intention Renouvelée • Carte 14 / 365', 'Renewed Intention • Card 14 / 365')
      },
      {
        id: 'c-duo-2',
        text: tr(
          'Placer ALLAH au cœur de notre mariage, c’est bâtir notre foyer sur une paix que rien n’ébranle.',
          'Placing ALLAH at the heart of our marriage builds our home on unshakeable peace.'
        ),
        tag: tr('Spiritualité & Mariage • Carte Bonus', 'Faith & Marriage • Bonus Card')
      },
      {
        id: 'c-duo-3',
        text: tr(
          'Transformer les petites attentions en habitudes durables : merci pour ta présence lumineuse dans ma vie.',
          'Turning thoughtful gestures into lasting habits: thank you for your quiet light in my life.'
        ),
        tag: tr('Petite Attention • Carte 182 / 365', 'Thoughtful Gesture • Card 182 / 365')
      }
    ],
    homme: [
      {
        id: 'c-h-1',
        text: tr(
          'Prendre soin de toi commence par reconnaître chacun de tes efforts silencieux pour notre foyer.',
          'Caring for you begins by honoring every quiet effort you make for our home.'
        ),
        tag: tr('Version Homme • 365 + 1 Cartes', 'Men’s Edition • 365 + 1 Cards')
      },
      {
        id: 'c-h-2',
        text: tr(
          'Que notre communication demeure un pont de bienveillance, guidé par la sagesse et le rappel d’ALLAH.',
          'May our communication stay a bridge of kindness, guided by wisdom and remembrance of ALLAH.'
        ),
        tag: tr('Communication • Version Homme', 'Communication • Men’s Edition')
      }
    ],
    femme: [
      {
        id: 'c-f-1',
        text: tr(
          'Ta douceur et ta patience sont une bénédiction quotidienne. Chaque attention sincère renforce notre complicité.',
          'Your gentleness and patience are a daily blessing. Every sincere gesture deepens our bond.'
        ),
        tag: tr('Version Femme • 365 + 1 Cartes', 'Women’s Edition • 365 + 1 Cards')
      },
      {
        id: 'c-f-2',
        text: tr(
          'Faisons de chaque matin l’occasion de renouveler nos invocations et notre tendresse mutuelle.',
          'Let every morning be an invitation to renew our prayers and mutual tenderness.'
        ),
        tag: tr('Sérénité • Version Femme', 'Serenity • Women’s Edition')
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
      colors: ['#E68314', '#231B26', '#FAF8F5']
    });
  };

  const handleNextCard = () => {
    atelierAudio.playPaperSlide();
    setCardIndex((prev) => prev + 1);
  };

  const handleOrderWithDedication = () => {
    atelierAudio.playWaxStamp();
    const productName =
      activeEdition === 'duo'
        ? tr('Pack couple WriticLove (365 + 1 Cartes)', 'WriticLove Couple Pack (365 + 1 Cards)')
        : activeEdition === 'homme'
        ? tr('WriticLove — Version Homme', 'WriticLove — Men’s Edition')
        : tr('WriticLove — Version Femme', 'WriticLove — Women’s Edition');

    const price = activeEdition === 'duo' ? 50000 : 30000;

    addToCart({
      productId: `writiclove-${activeEdition}`,
      name: productName,
      subtitle: tr('365 Cartes + 1 Carte Bonus • Précommande', '365 Cards + 1 Bonus Card • Pre-order'),
      priceFCFA: price,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      selectedOption: activeEdition === 'duo' ? 'Pack couple' : activeEdition === 'homme' ? 'Version Homme' : 'Version Femme',
      customMessage: currentCard.text
    });
  };

  return (
    <div className="rounded-3xl p-8 sm:p-12 bg-[#231B26] text-[#FAF8F5] border border-[#C5A059]/50 shadow-2xl space-y-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#E68314]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto space-y-3 relative z-10">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E68314]/20 border border-[#E68314]/40 text-[#E68314] text-[10px] font-['Cinzel'] font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tr('Aperçu Interactif • 365 + 1 Cartes', 'Interactive Preview • 365 + 1 Cards')}</span>
        </span>

        <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-white leading-tight">
          {tr('Tirez une carte WriticLove', 'Draw a WriticLove Card')}
        </h3>

        <p className="text-xs text-[#D3C7D6] leading-relaxed font-light">
          {tr(
            'Découvrez l’expérience d’une carte tirée chaque jour pour nourrir votre amour et votre foyer.',
            'Experience drawing a daily card crafted to nurture your bond and home.'
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {(['duo', 'homme', 'femme'] as const).map((ed) => (
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
                  : 'bg-white/5 border border-white/10 text-[#D3C7D6] hover:border-[#E68314]'
              }`}
            >
              {ed === 'duo'
                ? tr('Pack Couple', 'Couple Pack')
                : ed === 'homme'
                ? tr('Version Homme', 'Men’s Edition')
                : tr('Version Femme', 'Women’s Edition')}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {!isOpen ? (
          <div
            onClick={handleOpenBox}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenBox(); }}
            className="group cursor-pointer p-10 rounded-3xl bg-gradient-to-b from-[#2E2432] to-[#1D1620] border-2 border-dashed border-[#C5A059]/50 hover:border-[#E68314] text-center space-y-4 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E68314] to-[#B86209] text-white flex items-center justify-center mx-auto shadow-xl group-hover:rotate-6 transition-transform">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <div className="space-y-1">
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-light text-white">
                {tr('Coffret WriticLove (365 + 1 Cartes)', 'WriticLove Box (365 + 1 Cards)')}
              </h4>
              <p className="text-xs text-[#D3C7D6]">
                {tr('Cliquez pour ouvrir virtuellement et tirer une carte', 'Click to open and draw a daily card')}
              </p>
            </div>

            <span className="inline-block px-6 py-2.5 rounded-full bg-[#E68314] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest shadow-md">
              ✦ {tr('Ouvrir le Coffret', 'Open the Box')}
            </span>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] text-[#181716] shadow-2xl border border-[#E8DFD1] space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4">
                <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest font-bold text-[#B86209]">
                  {currentCard.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#231B26] text-[#E68314] border border-[#E68314]/40 flex items-center justify-center text-[10px] font-['Cinzel'] font-bold shadow-sm">
                  W
                </div>
              </div>

              <div className="space-y-3 py-2 text-center">
                <Feather className="w-5 h-5 text-[#E68314] mx-auto opacity-70" />
                <p className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light italic leading-relaxed text-[#181716]">
                  « {currentCard.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD1] flex items-center justify-between text-[11px] text-[#8C8074]">
                <span className="italic font-light">WriticArt — « {tr('Les écrits restent', 'Words that stay')} »</span>
                <span className="font-['Cinzel'] font-bold text-[#E68314]">365 + 1</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleNextCard}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{tr('Tirer une autre carte', 'Draw another card')}</span>
              </button>

              <button
                onClick={handleOrderWithDedication}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#E68314] to-[#C46A0B] hover:brightness-110 text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {tr('Précommander', 'Pre-order')} ({formatPrice(activeEdition === 'duo' ? 50000 : 30000)})
                </span>
              </button>
            </div>

            <div className="text-center">
              <a
                href={`https://wa.me/221772348521?text=${encodeURIComponent(
                  `Bonjour WriticArt ! J'ai découvert WriticLove (« ${currentCard.text} ») et je souhaite précommander ce coffret.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#25D366] hover:underline font-medium"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{tr('Précommander sur WhatsApp', 'Pre-order on WhatsApp')}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
