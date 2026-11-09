import React, { useState, useRef } from 'react';
import {
  Heart,
  Check,
  CheckCircle2,
  PhoneCall,
  Mail,
  Calendar,
  Sparkles,
  ArrowDown,
  Truck
} from 'lucide-react';
import { writicLoveProducts, type WriticProduct } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { useErp } from '../context/ErpContext';
import { InteractiveBoxDrawer } from '../components/writiclove/InteractiveBoxDrawer';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { atelierAudio } from '../utils/soundEffects';
import { writicloveDuoImg } from '../assets/images';
import type { ErpOrder } from '../types';

export const WriticLovePage: React.FC = () => {
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();
  const { formatPrice, currency } = useCurrency();
  const { tr, lang } = useLanguage();
  const { addOrder } = useErp();

  const formRef = useRef<HTMLElement>(null);

  // Formulaire 2 State (Précommande WriticLove)
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [questionType, setQuestionType] = useState('Précommande officielle');
  const [selectedProductId, setSelectedProductId] = useState<'writiclove-homme' | 'writiclove-femme' | 'writiclove-duo'>('writiclove-duo');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'Wave' | 'Orange Money' | 'Virement' | 'Carte Bancaire' | 'Espèces' | 'Autre'>('Wave');
  const [otherPayment, setOtherPayment] = useState('');
  const [deliveryType, setDeliveryType] = useState('Coursier Dakar & Banlieue');
  const [submittedOrder, setSubmittedOrder] = useState<ErpOrder | null>(null);

  const selectedProductObj =
    writicLoveProducts.find((p) => p.id === selectedProductId) || writicLoveProducts[2];
  const estimatedTotalFCFA = selectedProductObj.priceFCFA * Math.max(1, quantity);

  const handleAddToCart = (product: WriticProduct) => {
    addToCart({
      productId: product.id,
      name: lang === 'en' ? product.nameEn : product.name,
      subtitle: lang === 'en' ? product.subtitleEn : product.subtitle,
      priceFCFA: product.priceFCFA,
      image: product.image
    });
  };

  const handlePreorderJump = (productId: string) => {
    if (
      productId === 'writiclove-homme' ||
      productId === 'writiclove-femme' ||
      productId === 'writiclove-duo'
    ) {
      setSelectedProductId(productId);
    }
    atelierAudio.playPaperSlide();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitPreorder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !address.trim()) return;

    const prodLabel = lang === 'en' ? selectedProductObj.nameEn : selectedProductObj.name;
    const otherPayNote =
      paymentMethod === 'Autre' && otherPayment.trim()
        ? `Autre moyen de paiement : ${otherPayment.trim()}`
        : '';

    const created = addOrder({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      city: address.trim(),
      items: [
        {
          title: `Précommande WriticLove — ${prodLabel}`,
          quantity: Math.max(1, quantity),
          unitPriceFCFA: selectedProductObj.priceFCFA,
          options: '365 cartes + 1 carte bonus (Livraison non incluse)'
        }
      ],
      totalFCFA: estimatedTotalFCFA,
      currencyUsed: currency,
      offerType: 'writiclove',
      isPreorder: true,
      questionType,
      deliveryType,
      status: 'nouveau',
      paymentMethod,
      paymentStatus: 'en_attente',
      notes: [
        `Devise client : ${currency}`,
        `Sortie prévue : Fin Déc. 2026 / Début Janv. 2027`,
        `Livraison non incluse (${deliveryType})`,
        otherPayNote
      ]
        .filter(Boolean)
        .join(' | ')
    });

    setSubmittedOrder(created);
  };

  const buildOrderSummaryText = (order: ErpOrder) => {
    const prodLabel = lang === 'en' ? selectedProductObj.nameEn : selectedProductObj.name;
    return [
      `Précommande WriticLove (${order.id})`,
      `Prénom / Nom : ${order.clientName}`,
      `Téléphone : ${order.clientPhone}`,
      `Email : ${order.clientEmail || '-'}`,
      `Adresse (livraison non incluse) : ${order.city}`,
      `Type de question : ${questionType}`,
      `Produit souhaité : ${prodLabel}`,
      `Quantité souhaitée : ${quantity}`,
      `Total estimé : ${formatPrice(order.totalFCFA)} (Monnaie : ${currency})`,
      `Moyen de paiement : ${paymentMethod}${paymentMethod === 'Autre' && otherPayment ? ` (${otherPayment})` : ''}`,
      `Type de livraison : ${deliveryType}`
    ].join('\n');
  };

  const intentions = [
    tr('renouveler ses intentions ;', 'renew your daily intentions;'),
    tr('améliorer sa communication ;', 'improve your communication;'),
    tr('renforcer sa complicité ;', 'strengthen your bond and closeness;'),
    tr('prendre soin de son partenaire ;', 'care mindfully for your partner;'),
    tr(
      'transformer les petites attentions en habitudes durables.',
      'turn thoughtful small gestures into lasting habits.'
    )
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. LUXURY DARK PLUM HEADER */}
      <section className="relative bg-[#231B26] text-[#FAF8F5] py-16 sm:py-20 border-b-2 border-[#C5A059]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,131,20,0.14),transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#B5ABA0]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#E68314] transition-colors">
              {tr('Accueil', 'Home')}
            </button>
            <span>/</span>
            <span className="font-semibold text-[#FAF8F5]">
              {tr('Pack WriticLove • 365 + 1 Cartes', 'WriticLove Pack • 365 + 1 Cards')}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left space-y-5">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#C5A059]/40 text-[#E68314] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold">
                <Heart className="w-3.5 h-3.5 fill-[#E68314] text-[#E68314]" />
                <span>WriticLove — « {tr('Nourrir votre amour au quotidien', 'Nurturing your love daily')} »</span>
              </div>

              <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl xl:text-6xl font-light leading-tight">
                {tr('365 cartes + 1 carte bonus', '365 cards + 1 bonus card')} <br />
                <span className="italic font-serif text-[#E68314]">
                  {tr(
                    'Et si vous faisiez de l’amour une intention renouvelée chaque jour ?',
                    'What if love became a renewed intention every single day?'
                  )}
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#D3C7D6] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {tr(
                  'WriticLove est un coffret de 365 cartes (une par jour de l’année) plus une carte bonus, conçu pour accompagner la vie de couple à travers des conseils, des réflexions et de petites attentions quotidiennes.',
                  'WriticLove is a keepsake box of 365 cards (one for every day of the year) plus one bonus card, designed to guide married and committed couples through advice, reflections, and daily thoughtful gestures.'
                )}
              </p>

              {/* Release Date & Preorder Status Callout */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/10 border border-[#C5A059]/50 text-xs sm:text-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-[#F3D69B] font-semibold">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>
                    {tr(
                      'Sortie officielle : fin décembre 2026 / début janvier 2027',
                      'Official release: late December 2026 / early January 2027'
                    )}
                  </span>
                </div>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="text-white/85">
                  {tr('Précommande ouverte dès maintenant', 'Pre-orders open now')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl p-2 bg-gradient-to-br from-[#C5A059]/60 via-[#231B26] to-[#E68314]/35 shadow-2xl">
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-[#18121A]">
                  <img
                    src={writicloveDuoImg}
                    alt={tr('Pack couple coffrets WriticLove noir mat & rose poudré', 'WriticLove black & blush couple keepsake boxes')}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. THE 5 INTENTIONS & SPIRITUAL DIMENSION (ALLAH) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#181716] p-8 sm:p-10 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('L’esprit WriticLove', 'The Spirit of WriticLove')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              {tr('Chaque carte invite à cultiver son amour autrement :', 'Every card invites you to nurture your love differently:')}
            </h2>

            <ul className="space-y-2.5 pt-1">
              {intentions.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-[#4A433B] dark:text-[#D5CDBD]">
                  <Check className="w-4 h-4 text-[#E68314] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#231B26] text-[#FAF8F5] border border-[#C5A059]/60 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-[#E68314]">
              <Sparkles className="w-4 h-4" />
              <span className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest">
                {tr('Dimension spirituelle du mariage', 'Spiritual Essence of Marriage')}
              </span>
            </div>
            <p className="font-['Cormorant_Garamond'] text-xl sm:text-2xl italic leading-relaxed text-[#EADBC2]">
              « {tr(
                'Certaines cartes rappellent également l’importance de placer ALLAH au cœur du mariage.',
                'Selected cards also remind couples of the importance of placing ALLAH at the heart of marriage.'
              )} »
            </p>
            <p className="text-xs text-[#C5BCB2] leading-relaxed">
              {tr(
                'Parce que l’amour se construit aussi dans les gestes simples, les efforts sincères et les intentions que l’on renouvelle jour après jour.',
                'Because love is built in simple gestures, sincere efforts, and intentions renewed day after day.'
              )}
            </p>
          </div>
        </section>

        {/* Interactive Virtual Box Unveiling Widget */}
        <InteractiveBoxDrawer />

        {/* 3. COFFRETS PRICING CARDS */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Versions & Tarifs Précommande', 'Pre-order Editions & Pricing')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              {tr('Choisissez votre coffret WriticLove', 'Choose your WriticLove Box')}
            </h2>
            <p className="text-xs text-[#B86209] dark:text-[#E68314] font-medium flex items-center justify-center space-x-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>
                {tr(
                  'Important : la livraison n’est pas incluse dans le prix.',
                  'Important: delivery is not included in the price.'
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
            {writicLoveProducts.map((prod) => {
              const isDuo = prod.colorScheme === 'duo';
              const isFemme = prod.colorScheme === 'rose-or';
              const displayName = lang === 'en' ? prod.nameEn : prod.name;
              const displaySubtitle = lang === 'en' ? prod.subtitleEn : prod.subtitle;
              const displayDesc = lang === 'en' ? prod.descriptionEn : prod.description;
              const displayBadge = lang === 'en' ? prod.badgeEn : prod.badge;
              const displayFeatures = lang === 'en' ? prod.featuresEn : prod.features;
              const displaySamples = lang === 'en' ? prod.sampleCardsEn : prod.sampleCards;

              return (
                <div
                  key={prod.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                    isDuo
                      ? 'bg-[#231B26] text-[#FAF8F5] border-[#C5A059] shadow-2xl lg:scale-105 z-20'
                      : isFemme
                      ? 'bg-gradient-to-b from-[#FFF5F7] to-[#FAF8F5] dark:from-[#24171A] dark:to-[#1A1315] text-[#1E1C1A] dark:text-white border-[#F2D0D9] dark:border-[#4A2D34] shadow-lg hover:shadow-xl'
                      : 'bg-white dark:bg-[#1C1A18] text-[#1E1C1A] dark:text-white border-[#E8DFD1] dark:border-[#332E29] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {displayBadge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-['Cinzel'] font-bold tracking-widest uppercase shadow-md bg-gradient-to-r from-[#E68314] to-[#C46A0B] text-white whitespace-nowrap">
                      {displayBadge}
                    </div>
                  )}

                  <div>
                    <div className="mb-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE8DC] dark:bg-[#141210] border border-[#E8DFD1]/60 dark:border-white/10">
                      <img
                        src={prod.image}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center pb-6 border-b border-[#E8DFD1]/80 dark:border-white/10">
                      <span
                        className={`text-[10px] uppercase font-['Cinzel'] tracking-[0.25em] font-semibold block mb-1 ${
                          isDuo ? 'text-[#E68314]' : 'text-[#8C8074] dark:text-[#A69C91]'
                        }`}
                      >
                        WriticLove • 365 + 1 {tr('Cartes', 'Cards')}
                      </span>
                      <h3
                        className={`font-['Cormorant_Garamond'] text-3xl font-semibold mb-1 ${
                          isDuo ? 'text-white' : 'text-[#181716] dark:text-white'
                        }`}
                      >
                        {displayName}
                      </h3>
                      <p className={`text-xs ${isDuo ? 'text-white/75' : 'text-[#70675E] dark:text-[#B5ABA0]'}`}>
                        {displaySubtitle}
                      </p>

                      <div className="mt-5 flex items-baseline justify-center space-x-2">
                        <span
                          className={`text-3xl sm:text-4xl font-bold font-['Cinzel'] ${
                            isDuo ? 'text-[#E68314]' : 'text-[#181716] dark:text-[#E68314]'
                          }`}
                        >
                          {formatPrice(prod.priceFCFA)}
                        </span>
                        {currency !== 'FCFA' && (
                          <span className={`text-xs ${isDuo ? 'text-white/60' : 'text-[#8C8074]'}`}>
                            ({prod.priceFCFA.toLocaleString('fr-FR')} FCFA)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="py-6 space-y-3">
                      <p
                        className={`text-xs font-sans leading-relaxed ${
                          isDuo ? 'text-[#D9D3CE]' : 'text-[#61584F] dark:text-[#C5BCB2]'
                        }`}
                      >
                        {displayDesc}
                      </p>

                      <div className="space-y-2 pt-2">
                        {displayFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs">
                            <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                            <span className={isDuo ? 'text-white/85' : 'text-[#4A433B] dark:text-[#D5CDBD]'}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>

                      {displaySamples.length > 0 && (
                        <div
                          className={`mt-4 p-3.5 rounded-2xl border text-xs italic space-y-1 ${
                            isDuo
                              ? 'bg-white/5 border-white/10 text-white/90'
                              : 'bg-[#FFFBF5] dark:bg-[#121110] border-[#E8DFD1] dark:border-[#2E2A26] text-[#7A7167] dark:text-[#C5BCB2]'
                          }`}
                        >
                          <span className="not-italic text-[10px] font-['Cinzel'] uppercase font-bold tracking-wider text-[#E68314] block">
                            {tr('Exemple de carte :', 'Sample card:')}
                          </span>
                          <p>{displaySamples[0]}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-[#E8DFD1]/80 dark:border-white/10 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handlePreorderJump(prod.id)}
                      className={`w-full py-3.5 rounded-full text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 ${
                        isDuo
                          ? 'bg-[#E68314] text-white hover:bg-[#C46A0B]'
                          : 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] dark:hover:text-white'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{tr('Précommander', 'Pre-order')}</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="w-full py-2.5 rounded-full border border-[#DED4C3] dark:border-white/20 hover:border-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all"
                    >
                      {tr('Ajouter au panier rapide', 'Quick Add to Cart')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. FORMULAIRE 2 — PRÉCOMMANDE WRITICLOVE */}
        <section ref={formRef} id="formulaire-writiclove" className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl space-y-8">
            <div className="space-y-2 border-b border-[#E8DFD1] dark:border-[#2E2A26] pb-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
                {tr('Formulaire 2', 'Pre-order Form 2')}
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
                {tr('Précommande WriticLove', 'Pre-order WriticLove')}
              </h2>
              <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
                {tr(
                  `Sortie officielle : fin décembre 2026 / début janvier 2027 • Monnaie enregistrée : ${currency}.`,
                  `Official release: late December 2026 / early January 2027 • Saved currency: ${currency}.`
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
                      {tr('Votre précommande WriticLove est enregistrée !', 'Your WriticLove pre-order is saved!')}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      {tr('Vous serez contacté(e) par la suite.', 'You will be contacted shortly.')}
                    </p>
                    <p className="text-xs text-[#5F5851] dark:text-[#C5BCB2] pt-1">
                      {tr(
                        `Référence : ${submittedOrder.id} • Monnaie enregistrée : ${submittedOrder.currencyUsed} • Total : ${formatPrice(submittedOrder.totalFCFA)} (livraison non incluse).`,
                        `Reference: ${submittedOrder.id} • Saved currency: ${submittedOrder.currencyUsed} • Total: ${formatPrice(submittedOrder.totalFCFA)} (delivery not included).`
                      )}
                    </p>
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
                    <span>{tr('Confirmer sur WhatsApp', 'Confirm on WhatsApp')}</span>
                  </a>

                  <a
                    href={`mailto:kaynubind@gmail.com?subject=${encodeURIComponent(`Précommande WriticLove ${submittedOrder.id}`)}&body=${encodeURIComponent(buildOrderSummaryText(submittedOrder))}`}
                    className="flex-1 py-3 px-5 rounded-full bg-[#231B26] hover:bg-[#E68314] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{tr('Envoyer par Email', 'Send by Email')}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedOrder(null)}
                  className="text-xs text-[#B86209] dark:text-[#E68314] hover:underline font-medium"
                >
                  {tr('← Effectuer une autre précommande', '← Make another pre-order')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitPreorder} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f2-name" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Prénom / Nom *', 'Full Name *')}
                    </label>
                    <input
                      id="f2-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={tr('Ex : Fatou Ndiaye', 'Ex: Fatou Ndiaye')}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    />
                  </div>

                  <div>
                    <label htmlFor="f2-phone" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Numéro de téléphone *', 'Phone Number *')}
                    </label>
                    <input
                      id="f2-phone"
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
                    <label htmlFor="f2-email" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="f2-email"
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    />
                  </div>

                  <div>
                    <label htmlFor="f2-question" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Type de question *', 'Inquiry Type *')}
                    </label>
                    <select
                      id="f2-question"
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    >
                      <option value="Précommande officielle">
                        {tr('Précommande officielle WriticLove', 'Official WriticLove Pre-order')}
                      </option>
                      <option value="Question sur les éditions Homme / Femme / Couple">
                        {tr('Question sur les versions Homme / Femme / Couple', 'Question about Men / Women / Couple editions')}
                      </option>
                      <option value="Renseignement livraison">
                        {tr('Renseignement sur la livraison', 'Delivery inquiry')}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Adresse avec précision livraison non incluse */}
                <div>
                  <label htmlFor="f2-address" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                    {tr('Adresse de livraison *', 'Delivery Address *')}
                  </label>
                  <input
                    id="f2-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={tr('Quartier, ville et pays', 'District, city and country')}
                    className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                  />
                  <p className="mt-1.5 text-[11px] font-medium text-[#B86209] dark:text-[#E68314] flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {tr(
                        'Précision : la livraison n’est pas incluse dans le prix.',
                        'Note: delivery is not included in the price.'
                      )}
                    </span>
                  </p>
                </div>

                {/* Produit souhaité & Quantité */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="f2-product" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Produit souhaité *', 'Desired Product *')}
                    </label>
                    <select
                      id="f2-product"
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
                    >
                      <option value="writiclove-homme">
                        {tr('Version Homme', 'Men’s Edition')} — {formatPrice(30000)}
                      </option>
                      <option value="writiclove-femme">
                        {tr('Version Femme', 'Women’s Edition')} — {formatPrice(30000)}
                      </option>
                      <option value="writiclove-duo">
                        {tr('Pack couple', 'Couple Pack')} — {formatPrice(50000)}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f2-qty" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Quantité souhaitée *', 'Quantity *')}
                    </label>
                    <input
                      id="f2-qty"
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

                {/* Moyen de paiement avec option Autre champ libre & Type de livraison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f2-payment" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Moyen de paiement *', 'Payment Method *')}
                    </label>
                    <select
                      id="f2-payment"
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
                        placeholder={tr('Précisez votre moyen de paiement...', 'Specify your payment method...')}
                        className="mt-2 w-full px-4 py-2.5 rounded-xl border border-[#E68314] dark:bg-[#121110] text-sm focus:outline-none"
                      />
                    )}
                  </div>

                  <div>
                    <label htmlFor="f2-delivery" className="block text-xs font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                      {tr('Type de livraison *', 'Delivery Option *')}
                    </label>
                    <select
                      id="f2-delivery"
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
                        {tr('Expédition Internationale (DHL / GP)', 'International Shipping')}
                      </option>
                      <option value="Retrait à l’atelier (Dakar)">
                        {tr('Retrait à l’atelier (Dakar)', 'Workshop pickup (Dakar)')}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-5 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-['Cinzel'] uppercase text-[#8C8074] block">
                      {tr('Total précommande', 'Pre-order Total')} ({currency})
                    </span>
                    <span className="font-['Cinzel'] text-2xl font-bold text-[#E68314]">
                      {formatPrice(estimatedTotalFCFA)}
                    </span>
                    <span className="text-[11px] text-[#8C8074] block">
                      {tr('Hors frais de livraison', 'Excluding delivery fee')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full bg-[#231B26] dark:bg-[#E68314] hover:bg-[#E68314] dark:hover:bg-[#C46A0B] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{tr('Précommander WriticLove', 'Submit WriticLove Pre-order')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Verified Customer Testimonials */}
        <TestimonialsSection />
      </div>
    </div>
  );
};
