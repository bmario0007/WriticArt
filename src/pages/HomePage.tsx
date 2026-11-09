import React from 'react';
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Feather,
  PhoneCall,
  Frame,
  Gift
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useErp } from '../context/ErpContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  heroEditorialImg,
  tableauMinimalisteImg,
  tableauAcrosticheDorureImg,
  writicloveDuoImg,
  boxFevrierImg
} from '../assets/images';

export const HomePage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { siteSettings, products } = useErp();
  const { formatPrice } = useCurrency();
  const { tr, lang } = useLanguage();

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION (Split Oud Bar Palace Plum/Gold + Rahiya Editorial Showcase) */}
      <section className="relative overflow-hidden bg-[#231B26] text-[#FAF8F5] pt-12 pb-14 md:pt-16 md:pb-20 border-b-2 border-[#C5A059]/70">
        {/* Subtle warm gold ambient glow */}
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#E68314]/20 via-[#231B26]/0 to-[#C5A059]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-white/5 text-xs text-[#E68314] font-['Cinzel'] tracking-wider font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E68314] animate-ping" />
              <span>
                {lang === 'en'
                  ? 'WriticArt — “Words that stay”'
                  : siteSettings.heroSlogan || 'WriticArt — « Les écrits restent »'}
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl xl:text-6xl font-light leading-[1.08] tracking-tight">
              {lang === 'en'
                ? 'Words hold a superpower.'
                : siteSettings.heroTitle || 'Les mots ont un super pouvoir.'}{' '}
              <br />
              <span className="italic font-serif text-[#E68314]">
                {lang === 'en'
                  ? 'WriticArt gives them form so they stay.'
                  : siteSettings.heroHighlightText || 'WriticArt leur donne une forme pour qu’ils restent.'}
              </span>
            </h1>

            {/* Thin signature gold divider bar */}
            <div className="w-28 h-[2px] bg-gradient-to-r from-[#C5A059] via-[#E68314] to-transparent mx-auto lg:mx-0" />

            <p className="font-sans text-sm sm:text-base text-[#D9CEDC] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              {lang === 'en'
                ? 'Poetic custom acrostic paintings from ' + formatPrice(5000) + ', WriticLove 365 + 1 daily couple cards box, and February gift boxes.'
                : siteSettings.heroSubtitle ||
                  'Marque créative d’œuvres poétiques sur mesure : tableaux personnalisés en acrostiche dès 5.000 FCFA, coffrets WriticLove de 365 + 1 cartes et Box WriticArt de Février.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('tableaux')}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#E68314] hover:bg-[#C46A0B] text-white text-xs uppercase tracking-[0.18em] font-['Cinzel'] font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <Frame className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  {lang === 'en'
                    ? 'Order a Custom Painting'
                    : siteSettings.heroCtaText || 'Découvrir les Tableaux'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => navigateTo('writiclove')}
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#C5A059]/60 bg-white/5 hover:bg-white/10 hover:border-[#E68314] text-xs uppercase tracking-[0.16em] font-['Cinzel'] font-bold text-[#FAF8F5] transition-all flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4 text-[#E68314] fill-[#E68314] shrink-0" aria-hidden="true" />
                <span>{tr('Précommander WriticLove (365+1)', 'Pre-order WriticLove (365+1)')}</span>
              </button>
            </div>
          </div>

          {/* Right Luxury Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-2 bg-gradient-to-br from-[#C5A059]/60 via-[#231B26] to-[#E68314]/40 shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-[20px] overflow-hidden bg-[#18121A]">
                <img
                  src={heroEditorialImg}
                  alt={tr(
                    'Tableau acrostiche calligraphié à la feuille d’or 24 carats, coffret, sceau de cire et parfum WriticArt',
                    'Bespoke 24k gold-leaf acrostic framed poem, keepsake box, wax seal, and perfume bottle by WriticArt'
                  )}
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161018]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-['Cinzel']">
                  <span className="px-3 py-1 rounded-full bg-[#231B26]/90 border border-[#C5A059]/50 text-[#F3D69B] backdrop-blur-sm">
                    ✦ {tr('Acrostiches Or 24K • Dès ', '24K Gold Acrostics • From ')}
                    {formatPrice(5000)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#E68314] text-white font-bold shadow">
                    {tr('Création Sur-Mesure', 'Bespoke Craft')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LES TROIS OFFRES OFFICIELLES DE LA MARQUE */}
      {siteSettings.showDiscoveryPortals && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {tr('Les Offres WriticArt', 'WriticArt Collections')}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              {tr('Trois Créations Pensées pour Rester', 'Three Signature Creations Meant to Last')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offre 1: Tableaux personnalisés (Acrostiche) */}
            <div
              onClick={() => navigateTo('tableaux')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('tableaux'); }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-[#181716] text-[#181716] dark:text-[#FAF8F5] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl hover:border-[#E68314]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC] dark:bg-[#201D1A]">
                  <img
                    src={tableauMinimalisteImg}
                    alt={tr('Tableau personnalisé en acrostiche WriticArt', 'Custom WriticArt acrostic painting')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#231B26]/90 text-[#F3D69B] border border-[#C5A059]/40 text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {tr('L’Art de l’Acrostiche', 'The Art of Acrostic')}
                  </span>
                </div>

                <div className="p-7 pb-5">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mb-2">
                    {tr('Tableaux personnalisés', 'Custom Poetic Paintings')}
                  </h3>
                  <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
                    {tr(
                      `Un prénom ou un mot mis en poème lettre par lettre, selon 9 thèmes. À partir de ${formatPrice(5000)} (livraison incluse en France).`,
                      `A name or word turned into bespoke verse letter by letter across 9 themes. Starting from ${formatPrice(5000)} (shipping included in France).`
                    )}
                  </p>
                </div>
              </div>

              <div className="px-7 py-5 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>{tr('Commander un tableau', 'Order a Painting')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Offre 2: Pack WriticLove (365 + 1 cartes) */}
            <div
              onClick={() => navigateTo('writiclove')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('writiclove'); }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#231B26] text-[#FAF8F5] border border-[#C5A059] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A131C]">
                  <img
                    src={writicloveDuoImg}
                    alt="Pack Couple WriticLove 365+1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E68314] text-white text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider shadow-md">
                    {tr('Précommande • Sortie Fin Déc. 2026', 'Pre-order • Late Dec. 2026')}
                  </span>
                </div>

                <div className="p-7 pb-5">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mb-2">
                    WriticLove (365 + 1 {tr('Cartes', 'Cards')})
                  </h3>
                  <p className="text-xs text-[#D3C7D6] leading-relaxed">
                    {tr(
                      `« Nourrir votre amour au quotidien ». Coffret de 365 cartes + 1 carte bonus rappelant notamment d’inclure ALLAH au cœur du mariage. Dès ${formatPrice(30000)}.`,
                      `“Nurturing your love daily”. 365 cards + 1 bonus card including reminders to place ALLAH at the heart of marriage. From ${formatPrice(30000)}.`
                    )}
                  </p>
                </div>
              </div>

              <div className="px-7 py-5 border-t border-white/10 flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>{tr('Précommander WriticLove', 'Pre-order WriticLove')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Offre 3: Box WriticArt (Lancement Février) */}
            <div
              onClick={() => navigateTo('box')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('box'); }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-[#181716] text-[#181716] dark:text-[#FAF8F5] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl hover:border-[#E68314]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#231B26]">
                  <img
                    src={boxFevrierImg}
                    alt={tr('Box Cadeau WriticArt de Février avec parfum signature', 'WriticArt February Gift Box with signature perfume')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#231B26]/95 text-[#F3D69B] border border-[#C5A059]/50 text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
                    {tr('À Venir • Lancement Février', 'Coming Soon • February')}
                  </span>
                </div>

                <div className="p-7 pb-5">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mb-2 flex items-center space-x-2">
                    <span>{tr('Les Box WriticArt', 'WriticArt Gift Boxes')}</span>
                    <Gift className="w-5 h-5 text-[#E68314]" aria-hidden="true" />
                  </h3>
                  <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
                    {tr(
                      'Un moment complet à offrir ou partager : coffret WriticLove + tableau personnalisé (5k ou 10k) + parfum signature.',
                      'A complete sensory gift experience: WriticLove box + bespoke painting + signature perfume.'
                    )}
                  </p>
                </div>
              </div>

              <div className="px-7 py-5 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>{tr('Composer une Box Février', 'Customize a Feb. Box')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED PRODUCTS PREVIEW (Rahiya Storefront Grid) */}
      {siteSettings.showFeaturedSection && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8DFD1] dark:border-[#2E2A26] gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block mb-1">
                {tr('Sélection Officielle', 'Official Selection')}
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
                {tr('Créations & Coffrets Phares', 'Featured Editions & Artworks')}
              </h2>
            </div>

            <button
              onClick={() => navigateTo('boutique')}
              className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-[#B86209] dark:text-[#E68314] hover:underline flex items-center space-x-1"
            >
              <span>{tr('Toute la boutique', 'View all shop')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigateTo('product-detail', prod.id)}
                className="group cursor-pointer bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC] dark:bg-[#201D1A]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {prod.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#231B26]/90 dark:bg-[#FAF8F5]/90 text-white dark:text-[#181716] text-[10px] font-['Cinzel'] font-bold tracking-wider uppercase">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] uppercase font-['Cinzel'] tracking-wider text-[#8C8074]">
                      {prod.categoryLabel}
                    </span>
                    <h4 className="font-['Cormorant_Garamond'] text-2xl font-medium leading-snug group-hover:text-[#E68314] transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#6B6156] dark:text-[#A8A096] line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#F2ECE1] dark:border-[#26221E] mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C8074] uppercase block font-['Cinzel']">
                      {prod.category === 'tableau' ? tr('À partir de', 'From') : tr('Prix', 'Price')}
                    </span>
                    <span className="text-xl font-bold font-['Cinzel'] text-[#181716] dark:text-[#FAF8F5]">
                      {formatPrice(prod.priceFCFA)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        productId: prod.id,
                        name: prod.name,
                        subtitle: prod.subtitle,
                        priceFCFA: prod.priceFCFA,
                        image: prod.image
                      });
                    }}
                    className="px-4 py-2.5 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] hover:text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    {tr('Ajouter', 'Add')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. VALUE PROPOSITION REASSURANCE */}
      {siteSettings.showReassuranceBar && (
        <section className="bg-white dark:bg-[#161413] py-12 border-y border-[#E8DFD1] dark:border-[#2A2622]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#231B26] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <Feather className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
                  {tr('L’Art de l’Acrostiche', 'Acrostic Craft')}
                </h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">
                  {tr('Tableaux dès ', 'Paintings from ')}
                  {formatPrice(5000)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#231B26] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
                  WriticLove 365+1
                </h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">
                  {tr('Sortie Fin Déc. 2026', 'Releasing Dec. 2026')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#231B26] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
                  {tr('Livraison France', 'France Delivery')}
                </h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">
                  {tr('Incluse pour tableaux en France', 'Included for paintings in France')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#231B26] border border-[#E68314]/30 flex items-center justify-center text-[#25D366] shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
                  {tr('Suivi Personnalisé', 'Direct Follow-up')}
                </h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">
                  {siteSettings.whatsappContact || '+221 77 234 85 21'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. ATELIER HIGHLIGHT BANNER */}
      {siteSettings.showAtelierBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] bg-white dark:bg-[#181716] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
              <span className="text-xs uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold block">
                ★ WriticArt — « {tr('Les écrits restent', 'Words that stay')} »
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light">
                «{' '}
                {tr(
                  'Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent.',
                  'Words hold a superpower. WriticArt gives them form so they remain.'
                )}{' '}
                »
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#A8A096] leading-relaxed">
                {tr(
                  'WriticArt est une marque créative qui transforme les mots en œuvres d’art personnalisées. À travers nos tableaux poétiques en acrostiche et le coffret WriticLove, chaque création est pensée pour transmettre une émotion qui traverse le temps.',
                  'WriticArt is a creative brand transforming meaningful words into bespoke works of art. Through custom acrostic paintings and our WriticLove daily box, each piece carries an emotion built to endure.'
                )}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo('atelier')}
                  className="px-6 py-3 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] hover:text-white transition-all"
                >
                  {tr('Lire le Manifeste →', 'Read Manifesto →')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 h-full min-h-[320px] bg-[#231B26] flex items-center justify-center overflow-hidden">
              <img
                src={tableauAcrosticheDorureImg}
                alt={tr(
                  'Enluminure et acrostiche à la feuille d’or 24 carats sur papier coton WriticArt',
                  '24k gold-leaf illumination and cotton rag calligraphy by WriticArt'
                )}
                className="w-full h-full max-h-[420px] object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 6. CLIENT TESTIMONIALS */}
      <TestimonialsSection />
    </div>
  );
};
