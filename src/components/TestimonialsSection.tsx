import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { tr } = useLanguage();

  const testimonials = [
    {
      id: 1,
      names: 'Amina & Cheikh T. Ba',
      location: 'Dakar, Almadies',
      product: tr('Pack couple WriticLove • 365 + 1 Cartes', 'WriticLove Couple Pack • 365 + 1 Cards'),
      rating: 5,
      quote: tr(
        'Le Pack couple a transformé notre rituel matinal. Tirer une carte chaque matin à deux — et méditer ensemble celles qui rappellent de placer ALLAH au cœur de notre foyer — nous rapproche chaque jour davantage.',
        'The Couple Pack transformed our morning routine. Drawing a daily card together—especially those reminding us to keep ALLAH at the center of our home—brings us closer every day.'
      )
    },
    {
      id: 2,
      names: 'Fatou Kiné Diop',
      location: 'Paris (France)',
      product: tr('Tableau Acrostiche — Poème Personnalisé', 'Acrostic Painting — Bespoke Poem'),
      rating: 5,
      quote: tr(
        'J’ai commandé un tableau acrostiche sur le prénom de ma mère pour son anniversaire. Livré directement en France sans frais supplémentaires, chaque vers correspondait à son histoire. L’émotion était indescriptible.',
        'I ordered a bespoke acrostic painting of my mother’s name for her birthday. Delivered smoothly within France at no extra shipping cost—every line captured her story.'
      )
    },
    {
      id: 3,
      names: 'Ousmane & Mariama',
      location: 'Dakar, Point E',
      product: tr('Tableau Citation Simple & Pack WriticLove', 'Simple Quote Painting & WriticLove Pack'),
      rating: 5,
      quote: tr(
        '« Les écrits restent » porte tellement bien son nom. Entre nos prénoms en acrostiche encadrés dans le salon et le coffret WriticLove, ce sont des souvenirs que l’on garde pour la vie.',
        '“Words that stay” fits this brand so well. Between our framed acrostic names and the WriticLove keepsake box, these are memories meant to endure for a lifetime.'
      )
    }
  ];

  return (
    <section className="py-16 border-t border-[#E8DFD1]/60 dark:border-[#2A2622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs font-['Cinzel'] tracking-wider font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#E68314]" />
            <span>{tr('Témoignages & Émotions', 'Testimonials & Stories')}</span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr('Ce Que Disent Nos Clients', 'What Our Clients Say')}
          </h2>

          <div className="flex items-center justify-center space-x-2 pt-1">
            <div className="flex items-center text-[#E68314]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E68314]" />
              ))}
            </div>
            <span className="text-xs font-['Cinzel'] font-bold text-[#181716] dark:text-white">4.9 / 5</span>
            <span className="text-xs text-[#8C8074]">
              • {tr('Sénégal, France & Diaspora', 'Senegal, France & Worldwide')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E68314] space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E68314]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{tr('Avis vérifié', 'Verified')}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4F473E] dark:text-[#C5BCB2] leading-relaxed font-light italic">
                  « {t.quote} »
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] dark:border-[#26221E] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Cinzel'] text-xs font-bold text-[#181716] dark:text-white">
                    {t.names}
                  </h4>
                  <span className="text-[10px] text-[#8C8074]">{t.location}</span>
                </div>
                <p className="text-[10px] text-[#B86209] dark:text-[#E68314] font-medium truncate">
                  ✦ {t.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
