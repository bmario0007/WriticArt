import React, { useState, useRef } from 'react';
import {
  Feather,
  Sparkles,
  Check,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Mail,
  ArrowDown,
  Palette
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useErp } from '../context/ErpContext';
import { useNavigation } from '../context/NavigationContext';
import { atelierAudio } from '../utils/soundEffects';
import {
  heroEditorialImg,
  tableauMinimalisteImg,
  tableauAcrosticheDorureImg
} from '../assets/images';
import { OrderDispatchBadges } from '../components/OrderDispatchBadges';
import type { ErpOrder, OrderDispatchInfo } from '../types';

const ACROSTIC_FR: Record<string, string> = {
  A: 'Âme lumineuse dont la douceur éclaire nos jours,',
  B: 'Beauté sincère qui inspire le respect et la joie,',
  C: 'Cœur généreux où chaque parole devient refuge,',
  D: 'Douceur infinie gravée dans le temps qui passe,',
  E: 'Étoile bienveillante guidant chacun de nos pas,',
  F: 'Flamme paisible qui réchauffe les souvenirs,',
  G: 'Grâce naturelle dans chaque geste et chaque mot,',
  H: 'Harmonie précieuse que rien ne saurait effacer,',
  I: 'Instant d’éternité suspendu au fil de la plume,',
  J: 'Joie véritable partagée avec sincérité,',
  K: 'Keepsake d’émotion offert pour traverser les années,',
  L: 'Lumière fidèle qui demeure au-delà des saisons,',
  M: 'Merveilleuse présence dont le nom mérite de rester,',
  N: 'Noblesse du cœur et tendresse inaltérable,',
  O: 'Offrande de mots choisis pour toucher l’âme,',
  P: 'Promesse écrite à l’encre d’un souvenir vrai,',
  Q: 'Quiétude profonde née d’une affection sincère,',
  R: 'Rayonnement discret qui embellit chaque instant,',
  S: 'Sérénité d’un lien tissé avec gratitude,',
  T: 'Tendresse éternelle gravée sur papier d’art,',
  U: 'Union précieuse des cœurs et des pensées,',
  V: 'Vérité d’un sentiment qui résiste au temps,',
  W: 'WriticArt grave ces lettres pour qu’elles demeurent,',
  X: 'Xéniale attention portée par un mot juste,',
  Y: 'Yeux brillants devant l’émotion d’un présent unique,',
  Z: 'Zénith d’une histoire écrite pour toujours.'
};

const ACROSTIC_EN: Record<string, string> = {
  A: 'A radiant soul whose kindness brightens our days,',
  B: 'Boundless grace felt in every thoughtful gesture,',
  C: 'Cherished presence woven into lasting memories,',
  D: 'Deep devotion written gently across time,',
  E: 'Eternal light guiding every step forward,',
  F: 'Faithful warmth that stays long after words are spoken,',
  G: 'Gentle strength admired by all who know you,',
  H: 'Heartfelt harmony that no distance can fade,',
  I: 'Infinite gratitude captured letter by letter,',
  J: 'Joyful spirit that turns moments into treasures,',
  K: 'Kindness remembered for generations to come,',
  L: 'Luminous bond inscribed with ink and emotion,',
  M: 'Meaningful presence whose name deserves to remain,',
  N: 'Noble heart filled with sincerity and peace,',
  O: 'Open warmth offered with true affection,',
  P: 'Poetic promise shaped so it will always endure,',
  Q: 'Quiet beauty blossoming in everyday moments,',
  R: 'Resilient affection shining softly through the years,',
  S: 'Sincere gratitude written cleanly from the heart,',
  T: 'Timeless tenderness framed as a living memory,',
  U: 'Unbreakable unity of hearts and intentions,',
  V: 'Vibrant grace remembered with every glance,',
  W: 'Words crafted by WriticArt so they forever stay,',
  X: 'eXtraordinary light carried within a single name,',
  Y: 'Yearning joy celebrated in enduring verse,',
  Z: 'Zenith of a story inscribed in timeless form.'
};

export const TABLEAU_THEMES = [
  { id: 'Anniversaire', fr: 'Anniversaire', en: 'Birthday / Anniversary' },
  { id: 'Amour / Couple', fr: 'Amour / Couple', en: 'Love / Couple' },
  { id: 'Naissance', fr: 'Naissance', en: 'Birth / Newborn' },
  { id: 'Motivation', fr: 'Motivation', en: 'Motivation' },
  { id: 'Baptême', fr: 'Baptême', en: 'Baptism / Naming Ceremony' },
  { id: 'Retraite', fr: 'Retraite', en: 'Retirement' },
  { id: 'Félicitations', fr: 'Félicitations', en: 'Congratulations' },
  {
    id: 'Amitié / Reconnaissance / Réussite',
    fr: 'Amitié / Reconnaissance / Réussite',
    en: 'Friendship / Gratitude / Achievement'
  },
  { id: 'Autres', fr: 'Autres (préciser)', en: 'Other (please specify)' }
];

export const TableauxPage: React.FC = () => {
  const { tr, lang } = useLanguage();
  const { formatPrice, currency } = useCurrency();
  const { submitOrderWithCloud, siteSettings } = useErp();
  const { navigateTo } = useNavigation();
  const formRef = useRef<HTMLElement>(null);

  // Interactive Acrostic Preview State
  const [previewWord, setPreviewWord] = useState('AMOUR');
  const [previewTheme, setPreviewTheme] = useState('Amour / Couple');

  // Formulaire 1 State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [questionType, setQuestionType] = useState('Passer une commande');
  const [tableauType, setTableauType] = useState<'citation' | 'standard' | 'personnalise'>('standard');
  const [tableauSize, setTableauSize] = useState('Format A3 (30 x 42 cm)');
  const [paymentMethod, setPaymentMethod] = useState<'Wave' | 'Orange Money' | 'Virement' | 'Carte Bancaire' | 'Espèces' | 'Autre'>('Wave');
  const [otherPayment, setOtherPayment] = useState('');
  const [deliveryType, setDeliveryType] = useState('Livraison incluse (France uniquement)');
  const [theme, setTheme] = useState('Amour / Couple');
  const [customTheme, setCustomTheme] = useState('');
  const [acrosticInput, setAcrosticInput] = useState('');

  const [submittedOrder, setSubmittedOrder] = useState<ErpOrder | null>(null);
  const [dispatchInfo, setDispatchInfo] = useState<OrderDispatchInfo | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formulas = [
    {
      id: 'citation' as const,
      title: tr('Citation simple', 'Simple Quote'),
      minFCFA: 5000,
      maxFCFA: 10000,
      image: tableauMinimalisteImg,
      desc: tr(
        'Une phrase inspirante ou un court acrostiche mis en page dans un univers visuel élégant.',
        'An inspiring quote or short acrostic staged within an elegant visual theme.'
      ),
      badge: tr('Essentiel', 'Essential')
    },
    {
      id: 'standard' as const,
      title: tr('Poème standard', 'Standard Poem'),
      minFCFA: 10000,
      maxFCFA: 15000,
      image: heroEditorialImg,
      desc: tr(
        'Acrostiche poétique équilibré autour d’un prénom, d’un mot ou d’une émotion qui mérite de rester.',
        'Balanced poetic acrostic built around a name, a word, or an emotion meant to last.'
      ),
      badge: tr('Le plus choisi', 'Most Popular')
    },
    {
      id: 'personnalise' as const,
      title: tr('Poème personnalisé', 'Bespoke Poem'),
      minFCFA: 15000,
      maxFCFA: 20000,
      image: tableauAcrosticheDorureImg,
      desc: tr(
        'Œuvre sur mesure écrite intégralement à partir de votre histoire, vos souvenirs et votre message.',
        'One-of-a-kind poem written entirely from your personal story, memories, and message.'
      ),
      badge: tr('Sur-Mesure', 'Bespoke')
    }
  ];

  const activeFormulaObj = formulas.find((f) => f.id === tableauType) || formulas[1];

  const cleanLetters = (previewWord || 'AMOUR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 10)
    .split('');

  const scrollToForm = (formulaId?: 'citation' | 'standard' | 'personnalise', chosenTheme?: string) => {
    if (formulaId) setTableauType(formulaId);
    if (chosenTheme) setTheme(chosenTheme);
    if (previewWord.trim()) {
      setAcrosticInput(
        tr(
          `Mot / Prénom pour l’acrostiche : « ${previewWord.toUpperCase()} »`,
          `Word / Name for acrostic: "${previewWord.toUpperCase()}"`
        )
      );
    }
    atelierAudio.playPaperSlide();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !clientName.trim() || !clientPhone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    try {
      const finalTheme = theme === 'Autres' ? (customTheme.trim() || 'Autres (à définir)') : theme;
      const formulaLabel = `${activeFormulaObj.title} (${tr('à partir de', 'starting from')} ${formatPrice(activeFormulaObj.minFCFA)})`;
      const paymentNotes = paymentMethod === 'Autre' && otherPayment.trim() ? `Moyen paiement : ${otherPayment.trim()}` : '';

      const { order, dispatch } = await submitOrderWithCloud({
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim() || undefined,
        city: address.trim(),
        items: [
          {
            title: `Tableau Personnalisé — ${activeFormulaObj.title}`,
            quantity: 1,
            unitPriceFCFA: activeFormulaObj.minFCFA,
            options: `${tableauSize} • ${finalTheme}`
          }
        ],
        totalFCFA: activeFormulaObj.minFCFA,
        currencyUsed: currency,
        offerType: 'tableau',
        questionType,
        deliveryType,
        theme: finalTheme,
        tableauFormula: formulaLabel,
        tableauSize,
        status: 'nouveau',
        paymentMethod,
        paymentStatus: 'en_attente',
        customMessage: acrosticInput.trim() || undefined,
        notes: [
          `Devise choisie : ${currency}`,
          `Question : ${questionType}`,
          `Livraison : ${deliveryType}`,
          paymentNotes
        ]
          .filter(Boolean)
          .join(' | ')
      });

      setSubmittedOrder(order);
      setDispatchInfo(dispatch);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildOrderSummaryText = (order: ErpOrder) => {
    const finalTheme = theme === 'Autres' ? (customTheme.trim() || 'Autres') : theme;
    return [
      `Commande Tableau Personnalisé WriticArt (${order.id})`,
      `Prénom / Nom : ${order.clientName}`,
      `Téléphone : ${order.clientPhone}`,
      `Email : ${order.clientEmail || '-'}`,
      `Adresse : ${order.city}`,
      `Type de question : ${questionType}`,
      `Formule : ${activeFormulaObj.title} (à partir de ${formatPrice(activeFormulaObj.minFCFA)})`,
      `Taille : ${tableauSize}`,
      `Thème : ${finalTheme}`,
      `Livraison : ${deliveryType}`,
      `Paiement : ${paymentMethod}${paymentMethod === 'Autre' && otherPayment ? ` (${otherPayment})` : ''}`,
      `Devise client : ${currency}`,
      acrosticInput ? `Précisions / Acrostiche : ${acrosticInput}` : ''
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. LUXURY DARK PLUM HERO (PDF Cover + Oud Bar Palace Palette) */}
      <section className="relative bg-[#231B26] text-[#FAF8F5] py-16 sm:py-24 border-b-2 border-[#C5A059]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,131,20,0.16),transparent_55%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#B5ABA0]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#E68314] transition-colors">
              {tr('Accueil', 'Home')}
            </button>
            <span>/</span>
            <span className="text-[#FAF8F5] font-semibold">
              {tr('Tableaux personnalisés', 'Custom Art Frames')}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#C5A059]/40 text-[#E68314] text-[11px] font-['Cinzel'] font-bold uppercase tracking-[0.2em]">
                <Feather className="w-3.5 h-3.5" />
                <span>WriticArt — « {tr('Les écrits restent', 'Words that stay')} »</span>
              </div>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl xl:text-6xl font-light leading-tight">
                {tr('Tableaux Poétiques Personnalisés', 'Bespoke Poetic Art Frames')}
                <span className="block italic text-[#E68314] font-serif mt-1">
                  {tr('L’art de l’acrostiche sur mesure', 'The timeless art of the acrostic')}
                </span>
              </h1>

              <blockquote className="pl-4 border-l-2 border-[#C5A059] italic font-['Cormorant_Garamond'] text-xl sm:text-2xl text-[#EADBC2]">
                « {tr(
                  'Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent.',
                  'Words carry a superpower. WriticArt gives them form so they forever stay.'
                )} »
              </blockquote>

              <p className="text-sm sm:text-base text-[#D3C7D6] font-light leading-relaxed max-w-2xl">
                {tr(
                  'Chaque tableau est une création personnalisée conçue pour raconter une histoire, transmettre un message ou immortaliser une pensée qui mérite de rester.',
                  'Each framed piece is a custom artwork crafted to tell a story, convey a heartfelt message, or immortalize a thought meant to stay forever.'
                )}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToForm()}
                  className="px-7 py-3.5 rounded-full bg-[#E68314] hover:bg-[#C46A0B] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center space-x-2"
                >
                  <span>{tr('Commander un tableau', 'Order a Custom Painting')}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl p-2 bg-gradient-to-br from-[#C5A059]/60 via-[#231B26] to-[#E68314]/35 shadow-2xl">
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-[#18121A]">
                  <img
                    src={tableauMinimalisteImg}
                    alt={tr('Tableau personnalisé encadré WriticArt sur travertin', 'Framed bespoke poetic artwork by WriticArt')}
                    fetchPriority="high"
                    decoding="sync"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONCEPT SECTION: L'ART DE L'ACROSTICHE + INTERACTIVE PREVIEWER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left explanation */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Le concept WriticArt', 'The WriticArt Concept')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
              {tr('Qu’est-ce que l’art de l’acrostiche ?', 'What is the art of the acrostic?')}
            </h2>
            <p className="text-sm sm:text-base text-[#5F5851] dark:text-[#B5ABA0] leading-relaxed">
              {tr(
                'Un mot, un prénom ou une expression devient le fil conducteur d’un texte : chaque lettre ouvre une ligne composée de mots soigneusement choisis. Le texte est ensuite mis en scène dans un univers visuel adapté au thème souhaité.',
                'A word, a first name, or a cherished expression becomes the golden thread of a text: each letter opens a line composed of carefully chosen words, then staged inside a visual universe tailored to your occasion.'
              )}
            </p>

            <div className="p-5 rounded-2xl bg-[#FFF8F0] dark:bg-[#1E1914] border border-[#E68314]/30 space-y-3">
              <label htmlFor="acrostic-word-input" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314]">
                {tr('Essayer en direct avec un prénom ou un mot :', 'Try it live with a name or word:')}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="acrostic-word-input"
                  type="text"
                  maxLength={12}
                  value={previewWord}
                  onChange={(e) => setPreviewWord(e.target.value)}
                  placeholder={tr('Ex: MARIAMA, AMOUR, MAMAN...', 'Ex: LOVE, SARAH, GRACE...')}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-[#121110] border border-[#DED4C3] dark:border-[#38332E] text-sm font-['Cinzel'] tracking-wider uppercase focus:outline-none focus:border-[#E68314]"
                />
                <select
                  aria-label={tr('Thème de l’aperçu', 'Preview Theme')}
                  value={previewTheme}
                  onChange={(e) => setPreviewTheme(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#121110] border border-[#DED4C3] dark:border-[#38332E] text-xs focus:outline-none focus:border-[#E68314]"
                >
                  {TABLEAU_THEMES.filter((t) => t.id !== 'Autres').map((t) => (
                    <option key={t.id} value={t.id}>
                      {lang === 'en' ? t.en : t.fr}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[11px] text-[#7E7469] dark:text-[#A8A096]">
                {tr(
                  'C’est bien plus qu’un tableau : c’est une émotion mise en mots, une histoire mise en image et un souvenir que l’on garde.',
                  'Far more than a frame: it is an emotion put into words, a story illustrated, and a memory kept forever.'
                )}
              </p>
            </div>
          </div>

          {/* Right Live Framed Acrostic Simulation */}
          <div className="lg:col-span-6">
            <div className="p-5 sm:p-8 rounded-3xl bg-[#231B26] border-4 border-[#C5A059]/60 shadow-2xl relative overflow-hidden">
              <div className="bg-[#FAF8F5] text-[#181716] rounded-2xl p-6 sm:p-8 border border-[#D8CBB8] shadow-inner space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-3">
                  <span className="text-[10px] font-['Cinzel'] uppercase tracking-[0.2em] text-[#B86209] font-bold">
                    {lang === 'en'
                      ? TABLEAU_THEMES.find((t) => t.id === previewTheme)?.en || previewTheme
                      : previewTheme}
                  </span>
                  <span className="text-[10px] font-['Cinzel'] uppercase tracking-widest text-[#8C8074]">
                    WriticArt
                  </span>
                </div>

                <div className="space-y-2 py-1">
                  {cleanLetters.map((letter, idx) => (
                    <p key={idx} className="font-['Cormorant_Garamond'] text-base sm:text-lg leading-snug text-[#231B26]">
                      <span className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-[#C46A0B] mr-[1px]">
                        {letter}
                      </span>
                      <span className="italic">
                        {(lang === 'en' ? ACROSTIC_EN[letter] : ACROSTIC_FR[letter])?.slice(1) ||
                          tr('omme une promesse qui demeure.', 'verlasting tribute written with grace.')}
                      </span>
                    </p>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <span className="text-[10px] italic text-[#8C8074]">
                    « {tr('Les écrits restent', 'Words remain')} »
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToForm('standard', previewTheme)}
                    className="text-[11px] font-['Cinzel'] font-bold text-[#B86209] hover:underline uppercase tracking-wider"
                  >
                    {tr('Commander ce motif →', 'Order this theme →')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POUR QUI, POUR QUELLES OCCASIONS (9 THÈMES) */}
      <section className="bg-white dark:bg-[#161413] py-14 border-y border-[#E8DFD1] dark:border-[#2A2622]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Pour qui, pour quelles occasions ?', 'For whom, for what occasions?')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              {tr('Thèmes proposés sur mesure', 'Custom Occasion Themes')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TABLEAU_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToForm(undefined, t.id)}
                className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] text-left transition-all group flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Palette className="w-4 h-4 text-[#E68314] shrink-0" />
                  <span className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#181716] dark:text-[#FAF8F5]">
                    {lang === 'en' ? t.en : t.fr}
                  </span>
                </div>
                <span className="text-[10px] font-['Cinzel'] uppercase text-[#B86209] dark:text-[#E68314] opacity-0 group-hover:opacity-100 transition-opacity">
                  {tr('Choisir', 'Select')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LES 3 FORMULES & TARIFS + RÈGLE LIVRAISON FRANCE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
            {tr('Offres & Tarifs', 'Formulas & Pricing')}
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr('Trois formules selon votre inspiration', 'Three Formulas Tailored to Your Vision')}
          </h2>
          <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
            {tr(
              'Le client choisit un thème et un type de création, puis passe commande via le formulaire. WriticArt vous contacte ensuite pour finaliser chaque détail.',
              'Choose your theme and artwork formula below, then submit the form. WriticArt will contact you directly to finalize your artwork.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formulas.map((f, idx) => {
            const isMiddle = idx === 1;
            return (
              <div
                key={f.id}
                className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all border ${
                  isMiddle
                    ? 'bg-[#231B26] text-[#FAF8F5] border-[#C5A059] shadow-2xl'
                    : 'bg-white dark:bg-[#181716] text-[#181716] dark:text-[#FAF8F5] border-[#E8DFD1] dark:border-[#2E2A26] shadow-md'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1D1620]">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-[#231B26]/90 text-[#E68314] border border-[#E68314]/40 text-[10px] font-['Cinzel'] font-bold uppercase tracking-widest backdrop-blur-sm">
                      {f.badge}
                    </span>
                  </div>

                  <div className="p-8 pb-4 space-y-4">
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold">
                      {f.title}
                    </h3>

                    <div className="py-4 border-y border-current/10 space-y-1">
                      <span className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#E68314] block">
                        {tr('À partir de', 'Starting from')}
                      </span>
                      <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold">
                        {formatPrice(f.minFCFA)}
                      </p>
                      <p className={`text-xs ${isMiddle ? 'text-[#D3C7D6]' : 'text-[#8C8074]'}`}>
                        {tr(
                          `jusqu’à ${formatPrice(f.maxFCFA)} selon le format`,
                          `up to ${formatPrice(f.maxFCFA)} depending on size`
                        )}
                      </p>
                    </div>

                    <p className={`text-xs leading-relaxed ${isMiddle ? 'text-[#D3C7D6]' : 'text-[#61584F] dark:text-[#B5ABA0]'}`}>
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToForm(f.id)}
                    className={`w-full py-3.5 rounded-full text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all ${
                      isMiddle
                        ? 'bg-[#E68314] text-white hover:bg-[#C46A0B]'
                        : 'bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] dark:hover:text-white'
                    }`}
                  >
                    {tr('Commander', 'Order')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RÈGLE OFFICIELLE LIVRAISON FRANCE UNIQUEMENT */}
        <div className="p-5 rounded-2xl bg-[#FFF8F0] dark:bg-[#1E1914] border border-[#E68314]/40 flex items-start space-x-3 max-w-3xl mx-auto">
          <MapPin className="w-5 h-5 text-[#E68314] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4A433B] dark:text-[#EADBC2]">
            <strong className="font-['Cinzel'] uppercase tracking-wider text-[#B86209] dark:text-[#E68314] block mb-0.5">
              {tr('Condition de livraison — Tableaux personnalisés', 'Delivery Policy — Custom Paintings')}
            </strong>
            <span>
              {tr(
                'Livraison : incluse dans le prix du tableau uniquement si la livraison se fait en France.',
                'Delivery: included in the painting price only when delivered within France.'
              )}
            </span>
          </div>
        </div>
      </section>

      {/* 5. FORMULAIRE 1 — COMMANDE D'UN TABLEAU PERSONNALISÉ */}
      <section ref={formRef} id="formulaire-tableau" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-[#E8DFD1] dark:border-[#2E2A26] pb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Formulaire 1', 'Order Form 1')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
              {tr('Commande d’un tableau personnalisé', 'Order a Custom Poetic Painting')}
            </h2>
            <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
              {tr(
                `Devise active enregistrée avec votre demande : ${currency}. Tous les prix sont automatiquement convertis.`,
                `Active currency saved with your order: ${currency}. Prices update automatically.`
              )}
            </p>
          </div>

          {submittedOrder ? (
            <div
              role="status"
              aria-live="polite"
              className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-5"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#181716] dark:text-white">
                    {tr('Votre demande a bien été enregistrée !', 'Your request has been recorded!')}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    {tr('Vous serez contacté(e) par la suite.', 'You will be contacted shortly.')}
                  </p>
                  <p className="text-xs text-[#5F5851] dark:text-[#C5BCB2] pt-1">
                    {tr(
                      `Référence : ${submittedOrder.id} • Monnaie enregistrée : ${submittedOrder.currencyUsed} • Estimation : à partir de ${formatPrice(submittedOrder.totalFCFA)}.`,
                      `Reference: ${submittedOrder.id} • Saved currency: ${submittedOrder.currencyUsed} • Estimate: starting from ${formatPrice(submittedOrder.totalFCFA)}.`
                    )}
                  </p>
                  <OrderDispatchBadges dispatch={dispatchInfo} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/221772348521?text=${encodeURIComponent(buildOrderSummaryText(submittedOrder))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{tr('Envoyer aussi via WhatsApp', 'Send via WhatsApp too')}</span>
                </a>

                <a
                  href={`mailto:${siteSettings.contactEmail || 'kaynubind@gmail.com'}?subject=${encodeURIComponent(`Commande Tableau WriticArt ${submittedOrder.id}`)}&body=${encodeURIComponent(buildOrderSummaryText(submittedOrder))}`}
                  className="flex-1 py-3 px-5 rounded-full bg-[#231B26] hover:bg-[#E68314] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
                >
                  <Mail className="w-4 h-4" />
                  <span>
                    {dispatchInfo?.emailSent
                      ? tr('Copie manuelle par Email', 'Manual Email Copy')
                      : tr('Envoyer par Email', 'Send by Email')}
                  </span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmittedOrder(null);
                  setDispatchInfo(undefined);
                }}
                className="text-xs text-[#B86209] dark:text-[#E68314] hover:underline font-medium"
              >
                {tr('← Passer une autre commande de tableau', '← Place another painting order')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Prénom / Nom & Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f1-name" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Prénom / Nom *', 'Full Name *')}
                  </label>
                  <input
                    id="f1-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={tr('Ex : Mariama Diallo', 'Ex: Mariama Diallo')}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>

                <div>
                  <label htmlFor="f1-phone" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Numéro de téléphone *', 'Phone Number *')}
                  </label>
                  <input
                    id="f1-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+221 77 ... / +33 6 ..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>
              </div>

              {/* Row 2: Email & Type de question */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f1-email" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    Email *
                  </label>
                  <input
                    id="f1-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>

                <div>
                  <label htmlFor="f1-question" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Type de question *', 'Inquiry Type *')}
                  </label>
                  <select
                    id="f1-question"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Passer une commande">
                      {tr('Passer une commande', 'Place an order')}
                    </option>
                    <option value="Demander un devis / conseil sur l'acrostiche">
                      {tr('Demander un devis / conseil sur l’acrostiche', 'Request advice / custom quote on acrostic')}
                    </option>
                    <option value="Question sur la livraison ou les formats">
                      {tr('Question sur la livraison ou les formats', 'Question about sizes or delivery')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Adresse de livraison avec précision France */}
              <div>
                <label htmlFor="f1-address" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                  {tr('Adresse de livraison *', 'Delivery Address *')}
                </label>
                <input
                  id="f1-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={tr('Adresse complète, ville et pays', 'Full street address, city & country')}
                  className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                />
                <p className="mt-1.5 text-[11px] font-medium text-[#B86209] dark:text-[#E68314] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {tr(
                      'Précision : la livraison est incluse dans le prix du tableau uniquement si le client est en France.',
                      'Note: delivery is included in the painting price only when shipping to France.'
                    )}
                  </span>
                </p>
              </div>

              {/* Row 4: Type de tableau & Taille du tableau */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f1-type" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Type de tableau *', 'Painting Formula *')}
                  </label>
                  <select
                    id="f1-type"
                    value={tableauType}
                    onChange={(e) => setTableauType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="citation">
                      {tr('Citation simple', 'Simple Quote')} — {tr('à partir de', 'from')} {formatPrice(5000)}
                    </option>
                    <option value="standard">
                      {tr('Poème standard', 'Standard Poem')} — {tr('à partir de', 'from')} {formatPrice(10000)}
                    </option>
                    <option value="personnalise">
                      {tr('Poème personnalisé', 'Bespoke Poem')} — {tr('à partir de', 'from')} {formatPrice(15000)}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="f1-size" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Taille du tableau *', 'Painting Size *')}
                  </label>
                  <select
                    id="f1-size"
                    value={tableauSize}
                    onChange={(e) => setTableauSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Format A4 (21 x 30 cm)">{tr('Format A4 (21 × 30 cm)', 'A4 Size (21 × 30 cm)')}</option>
                    <option value="Format A3 (30 x 42 cm)">{tr('Format A3 (30 × 42 cm)', 'A3 Size (30 × 42 cm)')}</option>
                    <option value="Format Prestige (40 x 50 cm)">{tr('Format Prestige (40 × 50 cm)', 'Prestige Size (40 × 50 cm)')}</option>
                    <option value="Format sur-mesure">{tr('Format sur-mesure (à convenir)', 'Custom size (to be discussed)')}</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Moyen de paiement & Type de livraison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f1-payment" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Moyen de paiement *', 'Payment Method *')}
                  </label>
                  <select
                    id="f1-payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Wave">Wave</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Carte Bancaire">{tr('Carte Bancaire / PayPal', 'Bank Card / PayPal')}</option>
                    <option value="Virement">{tr('Virement bancaire', 'Bank Transfer')}</option>
                    <option value="Espèces">{tr('Espèces à la livraison', 'Cash on delivery')}</option>
                    <option value="Autre">{tr('Autre (préciser)', 'Other (specify)')}</option>
                  </select>

                  {paymentMethod === 'Autre' && (
                    <input
                      type="text"
                      required
                      value={otherPayment}
                      onChange={(e) => setOtherPayment(e.target.value)}
                      placeholder={tr('Précisez votre moyen de paiement', 'Specify payment method')}
                      className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#E68314] dark:bg-[#121110] text-sm focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="f1-delivery" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Type de livraison *', 'Delivery Option *')}
                  </label>
                  <select
                    id="f1-delivery"
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Livraison incluse (France uniquement)">
                      {tr('Livraison incluse (France uniquement)', 'Included delivery (France only)')}
                    </option>
                    <option value="Coursier Dakar & Banlieue">
                      {tr('Livraison coursier — Dakar & Sénégal', 'Courier delivery — Dakar & Senegal')}
                    </option>
                    <option value="Expédition Internationale (hors France)">
                      {tr('Expédition Internationale (hors France)', 'International Shipping (outside France)')}
                    </option>
                    <option value="Retrait à l’atelier">
                      {tr('Retrait direct à l’atelier', 'Workshop pickup')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 6: Thème (avec Autres champ libre) */}
              <div>
                <label htmlFor="f1-theme" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                  {tr('Thème *', 'Theme *')}
                </label>
                <select
                  id="f1-theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                >
                  {TABLEAU_THEMES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {lang === 'en' ? t.en : t.fr}
                    </option>
                  ))}
                </select>

                {theme === 'Autres' && (
                  <input
                    type="text"
                    required
                    value={customTheme}
                    onChange={(e) => setCustomTheme(e.target.value)}
                    placeholder={tr('Précisez le thème souhaité...', 'Specify your desired theme...')}
                    className="mt-2.5 w-full px-4 py-2.5 rounded-xl border border-[#E68314] dark:bg-[#121110] text-sm focus:outline-none"
                  />
                )}
              </div>

              {/* Row 7: Mot / prénom / texte souhaité */}
              <div>
                <label htmlFor="f1-message" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                  {tr('Prénom, mot pour l’acrostiche ou message souhaité', 'First name, word for the acrostic, or custom instructions')}
                </label>
                <textarea
                  id="f1-message"
                  rows={3}
                  value={acrosticInput}
                  onChange={(e) => setAcrosticInput(e.target.value)}
                  placeholder={tr(
                    'Ex : Prénom MARIAMA, histoire à raconter, couleurs souhaitées...',
                    'Ex: Name MARIAMA, story notes, preferred colors...'
                  )}
                  className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                />
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-5 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-['Cinzel'] uppercase text-[#8C8074] block">
                    {tr('Estimation tarifaire', 'Estimated Price')} ({currency})
                  </span>
                  <span className="font-['Cinzel'] text-2xl font-bold text-[#E68314]">
                    {tr('À partir de', 'From')} {formatPrice(activeFormulaObj.minFCFA)}
                  </span>
                  <span className="text-xs text-[#8C8074] block">
                    ({tr('jusqu’à', 'up to')} {formatPrice(activeFormulaObj.maxFCFA)})
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-full bg-[#231B26] dark:bg-[#E68314] hover:bg-[#E68314] dark:hover:bg-[#C46A0B] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? tr('Enregistrement en cours...', 'Sending order...')
                      : tr('Valider ma commande', 'Submit Order')}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
