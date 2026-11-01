import React from 'react';
import { ArrowRight, Heart, ShieldCheck, Feather, PhoneCall, ShoppingBag } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useErp } from '../context/ErpContext';
import feedInstagram from '../assets/brand/feed-instagram.png';

export const HomePage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { siteSettings, products } = useErp();

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION (Minimalist Rahiya Style - Configurable via WordPress Page Builder) */}
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20 border-b border-[#E8DFD1]/60 dark:border-[#2A2622]">
        
        {/* Ambient subtle glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#E68314]/15 via-[#FAF8F5]/0 to-[#C5A059]/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-[#E68314]/30 dark:border-[#E68314]/50 bg-[#FFF7EE] dark:bg-[#1E1914] text-xs text-[#B86209] dark:text-[#E68314] font-['Cinzel'] tracking-wider font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E68314] animate-ping" />
            <span>{siteSettings.heroSlogan || "Atelier de Haute Calligraphie • Dakar, Sénégal"}</span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl lg:text-7xl font-light text-[#181716] dark:text-[#FAF8F5] leading-[1.08] tracking-tight">
            {siteSettings.heroTitle || "L'Art du Verbe,"} <br />
            <span className="italic font-serif text-[#C46A0B] dark:text-[#E68314]">
              {siteSettings.heroHighlightText || "des Coffrets d'Amour aux Toiles Éternelles."}
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-lg text-[#5F5851] dark:text-[#B5ABA0] max-w-2xl mx-auto leading-relaxed font-light">
            {siteSettings.heroSubtitle || "Découvrez nos célèbres coffrets « 365 Jours d'Amour », nos tableaux calligraphiés à l'or pur 24 carats et notre papeterie sur-mesure scellée à la cire d'atelier."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={() => navigateTo('boutique')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#181716] text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-bold hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all shadow-md hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <ShoppingBag className="w-4 h-4 text-[#E68314]" />
              <span>{siteSettings.heroCtaText || "Visiter la Boutique"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('writiclove')}
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs uppercase tracking-[0.18em] font-['Cinzel'] font-bold text-[#181716] dark:text-[#FAF8F5] hover:text-[#E68314] transition-all flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4 text-[#E68314]" />
              <span>Découvrir Writic’Love (365 Jours)</span>
            </button>
          </div>

        </div>

      </section>

      {/* 2. THREE KEY PORTALS / DESTINATIONS (Configurable via Page Builder) */}
      {siteSettings.showDiscoveryPortals && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              Explorer par Univers
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              Trois Expériences Signées WriticArt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Writic'Love */}
            <div 
              onClick={() => navigateTo('writiclove')}
              className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-b from-[#181716] to-[#25221F] text-[#FAF8F5] border border-[#E68314]/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-[#E68314] text-white text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider">
                  Le Rituel Phare
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mt-4 mb-2">
                  Coffrets 365 Jours d'Amour
                </h3>
                <p className="text-xs text-[#C5BCB2] leading-relaxed">
                  365 cartes quotidiennes pour nourrir le couple, exprimer la gratitude et fortifier l'intimité chaque matin.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>Voir les Coffrets Homme, Femme & Duo</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Sur-Mesure */}
            <div 
              onClick={() => navigateTo('sur-mesure')}
              className="group cursor-pointer rounded-3xl p-8 bg-white dark:bg-[#181716] text-[#181716] dark:text-[#FAF8F5] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#25221F] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider">
                  Haute Papeterie
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mt-4 mb-2">
                  Atelier Sur-Mesure
                </h3>
                <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
                  Tableaux sur toile en lin pur, cadres poétiques et faire-part calligraphiés avec devis instantané en direct.
                </p>
              </div>

              <div className="pt-6 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>Configurer une Création</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: La Pensée du Jour */}
            <div 
              onClick={() => navigateTo('pensee')}
              className="group cursor-pointer rounded-3xl p-8 bg-white dark:bg-[#181716] text-[#181716] dark:text-[#FAF8F5] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider">
                  Inspiration Quotidienne
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-light mt-4 mb-2">
                  Une Carte Par Jour
                </h3>
                <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
                  Tirez votre pensée du jour pour méditer, partager avec votre partenaire ou faire calligraphier à la main.
                </p>
              </div>

              <div className="pt-6 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] group-hover:translate-x-1 transition-transform">
                <span>Tirer une Carte</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </section>
      )}

      {/* 3. FEATURED PRODUCTS PREVIEW (Configurable via Page Builder) */}
      {siteSettings.showFeaturedSection && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8DFD1] dark:border-[#2E2A26] gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block mb-1">
                Sélection Officielle
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
                Les Créations les Plus Demandées
              </h2>
            </div>

            <button
              onClick={() => navigateTo('boutique')}
              className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-[#B86209] dark:text-[#E68314] hover:underline flex items-center space-x-1"
            >
              <span>Toute la boutique</span>
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
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#181716]/90 dark:bg-[#FAF8F5]/90 text-white dark:text-[#181716] text-[10px] font-['Cinzel'] font-bold tracking-wider uppercase">
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
                    <span className="text-[10px] text-[#8C8074] uppercase block font-['Cinzel']">Prix</span>
                    <span className="text-xl font-bold font-['Cinzel'] text-[#181716] dark:text-[#FAF8F5]">
                      {prod.priceFCFA.toLocaleString('fr-FR')} FCFA
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
                    className="px-4 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    Ajouter
                  </button>
                </div>

              </div>
            ))}
          </div>

        </section>
      )}

      {/* 4. VALUE PROPOSITION REASSURANCE (Configurable via Page Builder) */}
      {siteSettings.showReassuranceBar && (
        <section className="bg-white dark:bg-[#161413] py-12 border-y border-[#E8DFD1] dark:border-[#2A2622]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <Feather className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">Fait Main à Dakar</h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">Calligraphie noble & dorure 24K</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">365 Jours d'Amour</h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">+500 couples conquis</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">Livraison Express</h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">24h Dakar & DHL International</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#25D366] shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">WhatsApp Direct</h4>
                <p className="text-xs text-[#7E756C] dark:text-[#9A9084]">{siteSettings.whatsappContact || "+221 77 234 85 21"}</p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 5. ATELIER HIGHLIGHT BANNER (Configurable via Page Builder) */}
      {siteSettings.showAtelierBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] bg-white dark:bg-[#181716] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
              <span className="text-xs uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold block">
                ★ L'Âme de WriticArt
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light">
                « Transformer les mots en œuvres »
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#A8A096] leading-relaxed">
                Dans un monde numérique éphémère, nous redonnons à la déclaration d'amour, au faire-part nuptial et au verset poétique la gravité de la plume d'acier, la sensualité du papier pur coton et le mystère du cachet de cire scellé à la flamme.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('atelier')}
                  className="px-6 py-3 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-all"
                >
                  Lire le Manifeste de l'Atelier →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 h-full min-h-[300px] bg-[#181716] p-4 flex items-center justify-center">
              <img
                src={feedInstagram}
                alt="Atelier WriticArt Dakar"
                className="max-h-[360px] w-auto rounded-2xl object-contain shadow-2xl"
              />
            </div>

          </div>
        </section>
      )}

    </div>
  );
};
