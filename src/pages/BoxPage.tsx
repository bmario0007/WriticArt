import React, { useState, useRef } from 'react';
import {
  Gift,
  Sparkles,
  Check,
  CheckCircle2,
  PhoneCall,
  Mail,
  Heart,
  Frame,
  Droplets,
  Calendar,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useErp } from '../context/ErpContext';
import { useNavigation } from '../context/NavigationContext';
import { TABLEAU_THEMES } from '../data/acrosticData';
import { atelierAudio } from '../utils/soundEffects';
import {
  boxFevrierImg,
  writicloveDuoImg,
  tableauMinimalisteImg
} from '../assets/images';
import { OrderDispatchBadges } from '../components/OrderDispatchBadges';
import type { ErpOrder, OrderDispatchInfo } from '../types';

export const BoxPage: React.FC = () => {
  const { tr, lang } = useLanguage();
  const { formatPrice, currency } = useCurrency();
  const { submitOrderWithCloud, siteSettings } = useErp();
  const { navigateTo } = useNavigation();
  const formRef = useRef<HTMLElement>(null);

  const perfumes = [
    {
      id: 'Oud Royal & Ambre',
      fr: 'Oud Royal & Ambre',
      en: 'Royal Oud & Amber',
      notesFr: 'Bois précieux, ambre chaud & musc profond',
      notesEn: 'Precious oud wood, warm amber & deep musk'
    },
    {
      id: 'Musc Blanc & Vanille',
      fr: 'Musc Blanc & Vanille',
      en: 'White Musk & Vanilla',
      notesFr: 'Douceur poudrée, vanille de Madagascar & jasmin blanc',
      notesEn: 'Powdery softness, Madagascar vanilla & white jasmine'
    },
    {
      id: 'Rose de Damas & Santal',
      fr: 'Rose de Damas & Santal',
      en: 'Damask Rose & Sandalwood',
      notesFr: 'Pétales veloutés, bois crémeux & safran délicat',
      notesEn: 'Velvet rose petals, creamy sandalwood & delicate saffron'
    },
    {
      id: 'Bois d’Ébène & Bergamote',
      fr: 'Bois d’Ébène & Bergamote',
      en: 'Ebony Wood & Bergamot',
      notesFr: 'Éclat frais d’agrumes sur fond boisé raffiné',
      notesEn: 'Crisp citrus sparkle on a refined woody base'
    }
  ];

  // Formulaire 3 State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [questionType, setQuestionType] = useState('Réservation / Commande Box Février');
  const [writicLoveEdition, setWriticLoveEdition] = useState<'homme' | 'femme' | 'couple'>('couple');
  const [tableauAmountFCFA, setTableauAmountFCFA] = useState<5000 | 10000>(5000);
  const [tableauTheme, setTableauTheme] = useState('Amour / Couple');
  const [customTheme, setCustomTheme] = useState('');
  const [parfumChoice, setParfumChoice] = useState('Oud Royal & Ambre');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'Wave' | 'Orange Money' | 'Virement' | 'Carte Bancaire' | 'Espèces' | 'Autre'>('Wave');
  const [otherPayment, setOtherPayment] = useState('');
  const [deliveryType, setDeliveryType] = useState('Coursier Dakar & Banlieue');
  const [submittedOrder, setSubmittedOrder] = useState<ErpOrder | null>(null);
  const [dispatchInfo, setDispatchInfo] = useState<OrderDispatchInfo | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editionPriceFCFA = writicLoveEdition === 'couple' ? 50000 : 30000;
  const editionLabel =
    writicLoveEdition === 'couple'
      ? tr('Pack couple (50.000 FCFA)', 'Couple Pack')
      : writicLoveEdition === 'homme'
      ? tr('Version Homme (30.000 FCFA)', 'Men’s Edition')
      : tr('Version Femme (30.000 FCFA)', 'Women’s Edition');

  const unitTotalFCFA = editionPriceFCFA + tableauAmountFCFA;
  const totalFCFA = unitTotalFCFA * Math.max(1, quantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !clientName.trim() || !clientPhone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    try {
      const finalTheme =
        tableauTheme === 'Autres' ? customTheme.trim() || 'Autres (à définir)' : tableauTheme;
      const otherPayNote =
        paymentMethod === 'Autre' && otherPayment.trim()
          ? `Autre paiement : ${otherPayment.trim()}`
          : '';

      const { order, dispatch } = await submitOrderWithCloud({
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim() || undefined,
        city: address.trim(),
        items: [
          {
            title: `Box WriticArt Février — ${editionLabel} + Tableau ${tableauAmountFCFA.toLocaleString('fr-FR')} FCFA + Parfum`,
            quantity: Math.max(1, quantity),
            unitPriceFCFA: unitTotalFCFA,
            options: `Thème : ${finalTheme} • Parfum : ${parfumChoice}`
          }
        ],
        totalFCFA,
        currencyUsed: currency,
        offerType: 'box',
        isPreorder: true,
        questionType,
        deliveryType,
        theme: finalTheme,
        tableauFormula: `Tableau inclus box : ${tableauAmountFCFA.toLocaleString('fr-FR')} FCFA`,
        parfumChoice,
        status: 'nouveau',
        paymentMethod,
        paymentStatus: 'en_attente',
        notes: [
          `Lancement Février`,
          `Devise client : ${currency}`,
          `Parfum : ${parfumChoice}`,
          `Thème : ${finalTheme}`,
          `Livraison : ${deliveryType}`,
          otherPayNote
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

  const buildSummaryText = (order: ErpOrder) => {
    const finalTheme =
      tableauTheme === 'Autres' ? customTheme.trim() || 'Autres' : tableauTheme;
    return [
      `Commande Box WriticArt Février (${order.id})`,
      `Prénom / Nom : ${order.clientName}`,
      `Téléphone : ${order.clientPhone}`,
      `Email : ${order.clientEmail || '-'}`,
      `Adresse : ${order.city}`,
      `Coffret WriticLove : ${editionLabel}`,
      `Tableau inclus : ${formatPrice(tableauAmountFCFA)} (${finalTheme})`,
      `Parfum choisi : ${parfumChoice}`,
      `Quantité : ${quantity}`,
      `Total estimé : ${formatPrice(order.totalFCFA)} (${currency})`,
      `Paiement : ${paymentMethod}${paymentMethod === 'Autre' && otherPayment ? ` (${otherPayment})` : ''}`,
      `Livraison : ${deliveryType}`
    ].join('\n');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. OUD BAR PALACE INSPIRED DARK LUXURY HERO */}
      <section className="relative bg-[#231B26] text-[#FAF8F5] py-16 sm:py-24 border-b-2 border-[#C5A059]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.16),transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#B5ABA0]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#E68314] transition-colors">
              {tr('Accueil', 'Home')}
            </button>
            <span>/</span>
            <span className="font-semibold text-[#FAF8F5]">
              {tr('Box WriticArt (Lancement Février)', 'WriticArt Gift Box (February Launch)')}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#C5A059]/50 text-[#E68314] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{tr('À venir • Lancement en Février', 'Coming Soon • February Launch')}</span>
              </div>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl xl:text-6xl font-light leading-tight">
                {tr('La Box Cadeau WriticArt', 'The WriticArt Gift Box')}
                <span className="block italic font-serif text-[#E68314] mt-1">
                  {tr('Un moment complet à offrir ou à partager', 'A complete sensory keepsake to gift or share')}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#D3C7D6] font-light leading-relaxed max-w-2xl">
                {tr(
                  'En février, WriticArt lancera des box cadeaux réunissant l’émotion des mots, la beauté de l’art calligraphié et l’élégance d’un parfum signature.',
                  'In February, WriticArt launches signature gift boxes uniting heartfelt daily words, bespoke art framing, and fine fragrance.'
                )}
              </p>

              <button
                type="button"
                onClick={() => {
                  atelierAudio.playPaperSlide();
                  formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-7 py-3.5 rounded-full bg-[#E68314] hover:bg-[#C46A0B] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-lg inline-flex items-center space-x-2"
              >
                <span>{tr('Commander / Réserver une Box', 'Order / Reserve a Box')}</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl p-2 bg-gradient-to-br from-[#C5A059]/70 via-[#231B26] to-[#E68314]/40 shadow-2xl">
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-[#18121A]">
                  <img
                    src={boxFevrierImg}
                    alt={tr('Box WriticArt Février — Écrin prune, coffret, tableau et parfum signature', 'WriticArt February Gift Box with keepsake box, framed poem, and amber perfume')}
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

      {/* 2. COMPOSITION DES BOX (3 PILIERS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
            {tr('Composition de chaque Box', 'Inside Every Box')}
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr('Trois trésors réunis dans un écrin', 'Three signature creations in one box')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pilier 1 */}
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-md flex flex-col">
            <div className="aspect-[16/10] overflow-hidden bg-[#EFE8DC] dark:bg-[#141210]">
              <img
                src={writicloveDuoImg}
                alt={tr('Le coffret WriticLove', 'The WriticLove Box')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#231B26] text-[#E68314] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold">
                {tr('1. Le coffret WriticLove', '1. The WriticLove Box')}
              </h3>
              <p className="text-xs sm:text-sm text-[#61584F] dark:text-[#B5ABA0] leading-relaxed">
                {tr(
                  '365 cartes (une par jour de l’année) + 1 carte bonus en Version Homme, Version Femme ou Pack couple.',
                  '365 cards (one per day of the year) + 1 bonus card in Men’s, Women’s, or Couple edition.'
                )}
              </p>
            </div>
          </div>

          {/* Pilier 2 */}
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-md flex flex-col">
            <div className="aspect-[16/10] overflow-hidden bg-[#EFE8DC] dark:bg-[#141210]">
              <img
                src={tableauMinimalisteImg}
                alt={tr('Un tableau personnalisé WriticArt', 'Custom WriticArt Painting')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#231B26] text-[#E68314] flex items-center justify-center">
                <Frame className="w-5 h-5" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold">
                {tr('2. Un tableau personnalisé', '2. A Custom Poetic Painting')}
              </h3>
              <p className="text-xs sm:text-sm text-[#61584F] dark:text-[#B5ABA0] leading-relaxed">
                {tr(
                  `Tableau à ${formatPrice(5000)} ou ${formatPrice(10000)} au choix, réalisé selon le thème souhaité (Amour, Anniversaire, Félicitations...).`,
                  `Choice of ${formatPrice(5000)} or ${formatPrice(10000)} artwork crafted in your chosen occasion theme.`
                )}
              </p>
            </div>
          </div>

          {/* Pilier 3 */}
          <div className="rounded-3xl overflow-hidden bg-[#231B26] text-[#FAF8F5] border border-[#C5A059] shadow-xl flex flex-col">
            <div className="aspect-[16/10] overflow-hidden bg-[#18121A]">
              <img
                src={boxFevrierImg}
                alt={tr('Parfum signature et Box WriticArt', 'Signature perfume inside WriticArt Gift Box')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E68314]/20 border border-[#C5A059]/40 text-[#E68314] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold">
                {tr('3. Un parfum signature', '3. A Signature Fragrance')}
              </h3>
              <p className="text-xs sm:text-sm text-[#D3C7D6] leading-relaxed">
                {tr(
                  'Senteurs orientales et boisées raffinées (Oud Royal, Musc Blanc, Rose de Damas...) pour sublimer l’expérience sensorielle.',
                  'Refined oriental and woody fragrances (Royal Oud, White Musk, Damask Rose...) to elevate the sensory unboxing.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMULAIRE 3 — COMMANDE DES BOX (À PARTIR DE FÉVRIER) */}
      <section ref={formRef} id="formulaire-box" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-[#E8DFD1] dark:border-[#2E2A26] pb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Formulaire 3 • À partir de février', 'Order Form 3 • Starting February')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
              {tr('Commande des Box WriticArt', 'Order a WriticArt Gift Box')}
            </h2>
            <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
              {tr(
                `Composez votre box (WriticLove + Tableau + Parfum). Monnaie enregistrée : ${currency}.`,
                `Customize your box (WriticLove + Painting + Perfume). Saved currency: ${currency}.`
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
                    {tr('Votre commande Box Février est enregistrée !', 'Your February Box order has been recorded!')}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    {tr('Vous serez contacté(e) par la suite.', 'You will be contacted shortly.')}
                  </p>
                  <p className="text-xs text-[#5F5851] dark:text-[#C5BCB2] pt-1">
                    {tr(
                      `Référence : ${submittedOrder.id} • Monnaie : ${submittedOrder.currencyUsed} • Parfum : ${parfumChoice} • Total : ${formatPrice(submittedOrder.totalFCFA)}.`,
                      `Reference: ${submittedOrder.id} • Currency: ${submittedOrder.currencyUsed} • Perfume: ${parfumChoice} • Total: ${formatPrice(submittedOrder.totalFCFA)}.`
                    )}
                  </p>
                  <OrderDispatchBadges dispatch={dispatchInfo} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/221772348521?text=${encodeURIComponent(buildSummaryText(submittedOrder))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{tr('Confirmer sur WhatsApp', 'Confirm via WhatsApp')}</span>
                </a>

                <a
                  href={`mailto:${siteSettings.contactEmail || 'kaynubind@gmail.com'}?subject=${encodeURIComponent(`Commande Box WriticArt ${submittedOrder.id}`)}&body=${encodeURIComponent(buildSummaryText(submittedOrder))}`}
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
                {tr('← Commander une autre box', '← Order another box')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Coordonnées */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f3-name" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Prénom / Nom *', 'Full Name *')}
                  </label>
                  <input
                    id="f3-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={tr('Ex : Amina Ba', 'Ex: Amina Ba')}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>

                <div>
                  <label htmlFor="f3-phone" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Numéro de téléphone *', 'Phone Number *')}
                  </label>
                  <input
                    id="f3-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+221 77 ... / +33 6 ..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f3-email" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    Email *
                  </label>
                  <input
                    id="f3-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                </div>

                <div>
                  <label htmlFor="f3-question" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Type de question *', 'Inquiry Type *')}
                  </label>
                  <select
                    id="f3-question"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Réservation / Commande Box Février">
                      {tr('Commander / Réserver une Box (Février)', 'Order / Reserve a Box (February)')}
                    </option>
                    <option value="Renseignement sur les parfums ou coffrets">
                      {tr('Renseignement sur les parfums ou coffrets', 'Question on fragrances or boxes')}
                    </option>
                    <option value="Question sur la livraison">
                      {tr('Question sur la livraison', 'Delivery question')}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="f3-address" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                  {tr('Adresse de livraison *', 'Delivery Address *')}
                </label>
                <input
                  id="f3-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={tr('Adresse complète, ville et pays', 'Full address, city & country')}
                  className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                />
                <p className="mt-1 text-[11px] text-[#8C8074]">
                  {tr(
                    'Précision : la livraison n’est pas incluse dans le prix.',
                    'Note: delivery is not included in the price.'
                  )}
                </p>
              </div>

              {/* Produit WriticLove + Quantité */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="f3-edition" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Coffret WriticLove inclus *', 'WriticLove Edition Included *')}
                  </label>
                  <select
                    id="f3-edition"
                    value={writicLoveEdition}
                    onChange={(e) => setWriticLoveEdition(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="homme">
                      {tr('Version Homme', 'Men’s Edition')} ({formatPrice(30000)})
                    </option>
                    <option value="femme">
                      {tr('Version Femme', 'Women’s Edition')} ({formatPrice(30000)})
                    </option>
                    <option value="couple">
                      {tr('Pack couple', 'Couple Pack')} ({formatPrice(50000)})
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="f3-qty" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Quantité souhaitée *', 'Quantity *')}
                  </label>
                  <input
                    id="f3-qty"
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm font-mono focus:outline-none focus:border-[#E68314]"
                  />
                </div>
              </div>

              {/* CHAMPS SPÉCIFIQUES FORMULAIRE 3 (Montant tableau + Thème tableau + Parfum) */}
              <div className="p-5 rounded-2xl bg-[#FFF8F0] dark:bg-[#1E1914] border border-[#E68314]/30 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-['Cinzel'] font-bold uppercase text-[#B86209] dark:text-[#E68314]">
                  <Sparkles className="w-4 h-4" />
                  <span>{tr('Personnalisation du Tableau & du Parfum', 'Painting & Fragrance Selection')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f3-tableau-amount" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Montant du tableau inclus *', 'Included Painting Tier *')}
                    </label>
                    <select
                      id="f3-tableau-amount"
                      value={tableauAmountFCFA}
                      onChange={(e) => setTableauAmountFCFA(Number(e.target.value) as 5000 | 10000)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] bg-white dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    >
                      <option value={5000}>
                        {formatPrice(5000)} — {tr('Citation simple', 'Simple Quote')}
                      </option>
                      <option value={10000}>
                        {formatPrice(10000)} — {tr('Poème standard', 'Standard Poem')}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f3-theme" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Thème du tableau *', 'Painting Theme *')}
                    </label>
                    <select
                      id="f3-theme"
                      value={tableauTheme}
                      onChange={(e) => setTableauTheme(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] bg-white dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    >
                      {TABLEAU_THEMES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {lang === 'en' ? t.en : t.fr}
                        </option>
                      ))}
                    </select>

                    {tableauTheme === 'Autres' && (
                      <input
                        type="text"
                        required
                        value={customTheme}
                        onChange={(e) => setCustomTheme(e.target.value)}
                        placeholder={tr('Précisez votre thème...', 'Specify theme...')}
                        className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#E68314] bg-white dark:bg-[#121110] text-sm focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* Parfum Selector */}
                <div>
                  <label htmlFor="f3-parfum" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Choix du parfum *', 'Perfume Choice *')}
                  </label>
                  <select
                    id="f3-parfum"
                    value={parfumChoice}
                    onChange={(e) => setParfumChoice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] bg-white dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    {perfumes.map((pf) => (
                      <option key={pf.id} value={pf.id}>
                        {lang === 'en' ? `${pf.en} — ${pf.notesEn}` : `${pf.fr} — ${pf.notesFr}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Moyen de paiement (avec Autre champ libre) & Livraison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f3-payment" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Moyen de paiement *', 'Payment Method *')}
                  </label>
                  <select
                    id="f3-payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Wave">Wave</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Carte Bancaire">{tr('Carte Bancaire / PayPal', 'Bank Card / PayPal')}</option>
                    <option value="Virement">{tr('Virement bancaire', 'Bank Transfer')}</option>
                    <option value="Espèces">{tr('Espèces', 'Cash')}</option>
                    <option value="Autre">{tr('Autre (préciser)', 'Other (specify)')}</option>
                  </select>

                  {paymentMethod === 'Autre' && (
                    <input
                      type="text"
                      required
                      value={otherPayment}
                      onChange={(e) => setOtherPayment(e.target.value)}
                      placeholder={tr('Précisez votre moyen de paiement...', 'Specify payment method...')}
                      className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#E68314] dark:bg-[#121110] text-sm focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="f3-delivery" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Type de livraison *', 'Delivery Option *')}
                  </label>
                  <select
                    id="f3-delivery"
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  >
                    <option value="Coursier Dakar & Banlieue">
                      {tr('Coursier Dakar & Banlieue', 'Courier — Dakar & Suburbs')}
                    </option>
                    <option value="Expédition France / Europe">
                      {tr('Expédition France / Europe', 'Shipping — France / Europe')}
                    </option>
                    <option value="Expédition Internationale">
                      {tr('Expédition Internationale', 'International Shipping')}
                    </option>
                    <option value="Retrait à l’atelier (Dakar)">
                      {tr('Retrait à l’atelier (Dakar)', 'Workshop pickup (Dakar)')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-5 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-['Cinzel'] uppercase text-[#8C8074] block">
                    {tr('Total estimé de la Box', 'Estimated Box Total')} ({currency})
                  </span>
                  <span className="font-['Cinzel'] text-2xl font-bold text-[#E68314]">
                    {formatPrice(totalFCFA)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-full bg-[#231B26] dark:bg-[#E68314] hover:bg-[#E68314] dark:hover:bg-[#C46A0B] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <Gift className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? tr('Enregistrement en cours...', 'Sending Box order...')
                      : tr('Valider ma commande Box', 'Submit Box Order')}
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
