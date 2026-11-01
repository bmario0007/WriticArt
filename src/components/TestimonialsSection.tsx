import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      names: "Amina & Cheikh T. Ba",
      location: "Dakar, Almadies",
      product: "Coffret 365 Jours d'Amour • Duo",
      rating: 5,
      date: "Octobre 2026",
      verified: true,
      quote: "Le coffret Duo a transformé notre rituel matinal. Tirer une carte chaque matin à deux est devenu notre bulle de paix avant le tumulte de la journée. Un an plus tard, nous relisons encore nos cartes préférées avec la même émotion."
    },
    {
      id: 2,
      names: "Fatou Kiné Diop",
      location: "Paris / Dakar",
      product: "Coffret Writic'Love Homme",
      rating: 5,
      date: "Septembre 2026",
      verified: true,
      quote: "Vivant en France, j'ai fait livrer le coffret chez mon fiancé à Dakar avec une dédicace secrète scellée à la cire. La qualité du papier pur coton, la dorure et l'odeur de la cire d'atelier... C'est du très haut luxe artisanal."
    },
    {
      id: 3,
      names: "David Leroy & Mariama",
      location: "Paris & Dakar (Gorée)",
      product: "Suite Nuptiale & Vœux Parchemin Or 24K",
      rating: 5,
      date: "Août 2026",
      verified: true,
      quote: "Pour notre mariage à l'Île de Gorée, nous voulions quelque chose d'inoubliable. Nos vœux calligraphiés à l'or pur sont désormais encadrés dans notre salon. Nos invités ont été subjugués par l'authenticité des faire-part."
    }
  ];

  return (
    <section className="py-16 border-t border-[#E8DFD1]/60 dark:border-[#2A2622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs font-['Cinzel'] tracking-wider font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#E68314]" />
            <span>Témoignages & Récits • Avis Vérifiés</span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
            Ce Que Disent les Couples
          </h2>

          <div className="flex items-center justify-center space-x-2 pt-1">
            <div className="flex items-center text-[#E68314]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E68314]" />
              ))}
            </div>
            <span className="text-xs font-['Cinzel'] font-bold text-[#181716] dark:text-white">
              4.9 / 5
            </span>
            <span className="text-xs text-[#8C8074]">
              • +500 couples conquis à Dakar et dans la diaspora
            </span>
          </div>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E68314] space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E68314]" />
                    ))}
                  </div>

                  {t.verified && (
                    <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Achat vérifié</span>
                    </span>
                  )}
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-[#4F473E] dark:text-[#C5BCB2] leading-relaxed font-light italic">
                  « {t.quote} »
                </p>
              </div>

              {/* Author & Product */}
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
