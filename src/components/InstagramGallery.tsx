import React, { useState } from 'react';
import { 
  Sparkles, 
  ZoomIn, 
  ArrowUpRight, 
  SlidersHorizontal,
  X,
  PhoneCall
} from 'lucide-react';
import { galleryItems } from '../data/galleryData';
import { instagramHighlightsData } from '../data/productsData';
import type { GalleryItem, EventType } from '../types';
import { atelierAudio } from '../utils/soundEffects';
import { InstagramIcon } from './InstagramIcon';
import feedInstagram from '../assets/brand/feed-instagram.png';

interface InstagramGalleryProps {
  onSelectArtPiece: (item: GalleryItem) => void;
  onOpenStory: (storyIndex: number) => void;
}

export const InstagramGallery: React.FC<InstagramGalleryProps> = ({
  onSelectArtPiece,
  onOpenStory
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | EventType>('all');
  const [inspectItem, setInspectItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter);

  return (
    <section id="galerie" className="py-24 bg-[#FAF8F5] dark:bg-[#0F0E0D] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Instagram verification style */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[#E8DFD1] dark:border-[#2E2A26]">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#B86209] font-['Cinzel'] font-bold mb-2">
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              <span>Galerie Officielle • Feed @writicart</span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
              Tableaux, Cadres & Instants d'Atelier
            </h2>
            <p className="font-sans text-sm text-[#70675E] dark:text-[#A8A096] font-light mt-1">
              Explorez les créations récentes partagées sur notre feed Instagram. Cliquez pour commander ou personnaliser.
            </p>
          </div>

          {/* Instagram Profile Pill */}
          <div className="flex items-center space-x-3">
            <a
              href="https://www.instagram.com/writicart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-5 py-3 rounded-full bg-white dark:bg-[#1A1816] border border-[#DED4C3] dark:border-[#2E2A26] shadow-sm hover:border-[#E1306C] hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <InstagramIcon className="w-4 h-4 text-[#DD2A7B]" />
                </div>
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#181716] dark:text-[#FAF8F5] group-hover:text-[#DD2A7B] transition-colors">
                  @writicart
                </span>
                <span className="block text-[10px] text-[#8C8074] dark:text-[#9E9488]">
                  Transformer les mots en œuvres
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8C8074] dark:text-[#9E9488] group-hover:text-[#DD2A7B] transition-colors" />
            </a>

            <a
              href="https://wa.me/221772348521"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold tracking-wider hover:bg-[#1EBE5D] shadow-md transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+221 77 234 85 21</span>
            </a>
          </div>
        </div>

        {/* OFFICIAL INSTAGRAM HIGHLIGHTS (Writic'Love, Tableaux, Cadres, Feedbacks) */}
        <div className="py-8">
          <p className="text-[11px] font-['Cinzel'] uppercase tracking-wider text-[#8C8074] dark:text-[#A09589] mb-4">
            Stories à la Une (@writicart Highlights) :
          </p>
          <div className="flex items-center space-x-6 overflow-x-auto pb-3 scrollbar-none">
            {instagramHighlightsData.map((hl, idx) => (
              <button
                key={hl.id}
                onClick={() => {
                  atelierAudio.playPaperSlide();
                  onOpenStory(idx % 4);
                }}
                className="flex flex-col items-center space-y-2 group shrink-0 focus:outline-none"
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#181716] via-[#E68314] to-[#C46A0B] group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <div className="w-full h-full rounded-full p-0.5 bg-[#181716] flex items-center justify-center">
                    <span className="text-2xl">{hl.icon}</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-semibold text-[#181716] dark:text-[#FAF8F5] group-hover:text-[#E68314] transition-colors">
                    {hl.name}
                  </span>
                  <span className="block text-[10px] text-[#8C8074] dark:text-[#9E9488]">
                    {hl.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Real Flyer Showcase Banner */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-xl bg-white dark:bg-[#1A1816] grid grid-cols-1 lg:grid-cols-12 items-center transition-colors">
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
            <span className="text-xs uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold block">
              ★ Édition Phare
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5]">
              365 Jours, 365 Cartes <br />
              <span className="italic font-serif text-[#C46A0B] dark:text-[#E68314]">Writic’Love Homme, Femme & Le Duo</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#A8A096] leading-relaxed">
              Le concept révolutionnaire qui nourrit votre relation au quotidien. Disponible dès maintenant pour commande immédiate à Dakar et envoi international.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#181716] dark:bg-[#2C2824] text-[#E68314] text-xs font-['Cinzel'] font-bold">
                Homme : 30 000 FCFA
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFF0F4] dark:bg-[#4A1525] text-[#B83256] dark:text-[#FF8DAA] text-xs font-['Cinzel'] font-bold border border-[#F5C2CE] dark:border-[#732238]">
                Femme : 30 000 FCFA
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#E68314] text-white text-xs font-['Cinzel'] font-bold shadow-md">
                Le Duo : 50 000 FCFA
              </span>
            </div>
            <div className="pt-4">
              <a
                href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20un%20coffret%20365%20Jours%20d'Amour"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Commander au +221 77 234 85 21</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[320px] bg-[#181716] p-4 flex items-center justify-center">
            <img
              src={feedInstagram}
              alt="Feed Instagram WriticArt"
              className="max-h-[380px] w-auto rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-[#8C8074] dark:text-[#A09589] shrink-0 mr-1" />
          {[
            { id: 'all', label: 'Toutes les Créations' },
            { id: 'writiclove', label: 'Coffrets 365 Jours' },
            { id: 'mariage', label: 'Mariages & Vœux' },
            { id: 'quotidien', label: 'Cartes Quotidiennes' },
            { id: 'entreprise', label: 'Entreprises & Cadeaux VIP' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                atelierAudio.playPaperSlide();
                setSelectedFilter(cat.id as 'all' | EventType);
              }}
              className={`px-4 py-2 rounded-full text-xs font-['Cinzel'] tracking-wider shrink-0 transition-all ${
                selectedFilter === cat.id
                  ? 'bg-[#181716] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#181716] shadow-md'
                  : 'bg-white/80 dark:bg-[#1A1816] border border-[#DED4C3] dark:border-[#2E2A26] text-[#696158] dark:text-[#A8A096] hover:border-[#E68314] hover:text-[#181716] dark:hover:text-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ART GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1A1816] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE4D8] dark:bg-[#25221F]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Badge Category */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 dark:bg-[#141312]/90 backdrop-blur-sm text-[10px] font-['Cinzel'] font-semibold tracking-wider text-[#181716] dark:text-[#FAF8F5] shadow-sm">
                    {item.categoryLabel}
                  </div>

                  {/* Hover Actions overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 p-4">
                    <button
                      onClick={() => {
                        atelierAudio.playPaperSlide();
                        setInspectItem(item);
                      }}
                      className="px-4 py-2.5 rounded-full bg-white/95 text-[#181716] text-xs font-['Cinzel'] font-semibold tracking-wider hover:bg-white flex items-center space-x-1.5 shadow-lg"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#E68314]" />
                      <span>Inspecter le Relief</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8C8074] dark:text-[#A09589]">
                    <span className="font-['Cinzel'] font-bold text-[#E68314]">
                      {item.instagramHandle}
                    </span>
                    <span>{item.creationTime}</span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-xl font-medium text-[#181716] dark:text-[#FAF8F5] group-hover:text-[#B86209] dark:group-hover:text-[#E68314] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-[#6B635B] dark:text-[#A8A096] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Material tags */}
                  <div className="pt-2 border-t border-[#F2ECE1] dark:border-[#2E2A26] space-y-1 text-[11px] text-[#7A7167] dark:text-[#A8A096]">
                    <p className="truncate">
                      <strong className="font-medium text-[#2E2A26] dark:text-[#EDE6DD]">Papier :</strong> {item.paperDetail}
                    </p>
                    <p className="truncate">
                      <strong className="font-medium text-[#2E2A26] dark:text-[#EDE6DD]">Encre :</strong> {item.inkDetail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer with Configure in this style button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    atelierAudio.playWaxStamp();
                    onSelectArtPiece(item);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#FFF8F0] dark:bg-[#E68314]/15 border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] hover:bg-[#181716] dark:hover:bg-[#FAF8F5] hover:text-[#FAF8F5] dark:hover:text-[#181716] hover:border-[#181716] dark:hover:border-[#FAF8F5] transition-all text-xs font-['Cinzel'] font-bold tracking-wider flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
                  <span>Commander dans ce Style</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* INSPECT DETAIL MODAL */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#181716] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#DED4C3] dark:border-[#2E2A26] relative">
            <button
              onClick={() => setInspectItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-[#2C2824] hover:bg-white dark:hover:bg-[#3E3934] text-black dark:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto h-full">
                <img
                  src={inspectItem.image}
                  alt={inspectItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-['Cinzel'] text-[#E68314] font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{inspectItem.categoryLabel}</span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#181716] dark:text-[#FAF8F5]">
                    {inspectItem.title}
                  </h3>
                  <p className="text-xs text-[#7A7167] dark:text-[#A8A096] mt-3 leading-relaxed">
                    {inspectItem.description}
                  </p>

                  <div className="mt-6 p-4 rounded-2xl bg-[#F4EDE2] dark:bg-[#121110] border border-[#E2D5C0] dark:border-[#2E2A26] space-y-2 text-xs">
                    <p>
                      <strong className="text-[#181716] dark:text-[#FAF8F5]">Texture Support :</strong> <span className="text-[#554E46] dark:text-[#C5BCB2]">{inspectItem.paperDetail}</span>
                    </p>
                    <p>
                      <strong className="text-[#181716] dark:text-[#FAF8F5]">Pigments :</strong> <span className="text-[#554E46] dark:text-[#C5BCB2]">{inspectItem.inkDetail}</span>
                    </p>
                    {inspectItem.featuredQuote && (
                      <p className="italic font-serif text-[#B86209] dark:text-[#E68314]">
                        « {inspectItem.featuredQuote} »
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const chosen = inspectItem;
                      setInspectItem(null);
                      onSelectArtPiece(chosen);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#181716] text-xs font-['Cinzel'] uppercase tracking-widest hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#E68314]" />
                    <span>Personnaliser cette œuvre</span>
                  </button>

                  <a
                    href={`https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20l'œuvre%20:%20${encodeURIComponent(inspectItem.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] uppercase tracking-widest hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-2 font-bold"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Commander via WhatsApp (+221 77 234 85 21)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
