import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import type { CatalogProduct } from '../types';
import { useErp } from '../context/ErpContext';
import { useCart } from '../context/CartContext';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { atelierAudio } from '../utils/soundEffects';

interface ShopCatalogProps {
  onCustomizeInStudio: (product: CatalogProduct) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ onCustomizeInStudio }) => {
  const { products } = useErp();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Créations' },
    { id: 'writiclove', label: 'Coffrets 365 Jours' },
    { id: 'tableau', label: 'Tableaux & Toiles' },
    { id: 'cadre', label: 'Cadres Décoratifs' },
    { id: 'accessoire', label: 'Accessoires & Sceaux' },
    { id: 'mariage', label: 'Mariages & Prestige' }
  ];

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (product: CatalogProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      priceFCFA: product.priceFCFA,
      image: product.image
    });
  };

  return (
    <section id="boutique" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Rahiya Minimalist Style) */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
            Boutique & Collection Permanente
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
            Les Créations de l'Atelier
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#70675E] dark:text-[#A8A096] font-light leading-relaxed">
            Coffrets « 365 Jours d'Amour », toiles de lin calligraphiées à l'or 24 carats et cadres poétiques façonnés à la main à Dakar.
          </p>
        </div>

        {/* Category Filters (Rahiya minimalist pills) */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-6 scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                atelierAudio.playPaperSlide();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-['Cinzel'] tracking-wider shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-md font-semibold'
                  : 'bg-white/80 dark:bg-[#1C1A18] border border-[#DED4C3] dark:border-[#2E2A26] text-[#696158] dark:text-[#A8A096] hover:border-[#E68314]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Minimalist Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setQuickViewProduct(prod)}
              className="group cursor-pointer bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC] dark:bg-[#201D1A]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Badge */}
                  {prod.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#181716]/90 dark:bg-[#FAF8F5]/90 text-white dark:text-[#181716] text-[10px] font-['Cinzel'] font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
                      {prod.badge}
                    </span>
                  )}

                  {/* Quick-add overlay on desktop */}
                  <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex space-x-2">
                    <button
                      onClick={(e) => handleQuickAdd(prod, e)}
                      className="flex-1 py-2.5 rounded-xl bg-white/95 dark:bg-[#181716]/95 text-[#181716] dark:text-white text-xs font-['Cinzel'] font-bold tracking-wider hover:bg-[#E68314] hover:text-white transition-all flex items-center justify-center space-x-1.5 shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ajouter au Panier</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(prod);
                      }}
                      className="p-2.5 rounded-xl bg-white/95 dark:bg-[#181716]/95 text-[#181716] dark:text-white hover:bg-[#E68314] hover:text-white transition-all shadow-lg"
                      title="Aperçu rapide"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8C8074] dark:text-[#9A9084]">
                    <span className="font-['Cinzel'] uppercase tracking-wider">
                      {prod.categoryLabel}
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>En stock</span>
                    </span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-medium text-[#181716] dark:text-[#FAF8F5] group-hover:text-[#B86209] dark:group-hover:text-[#E68314] transition-colors leading-snug">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#6B6156] dark:text-[#A8A096] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Price and Mobile Add */}
              <div className="p-6 pt-0 border-t border-[#F2ECE1] dark:border-[#26221E] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8074] block uppercase font-['Cinzel']">Prix</span>
                  <span className="text-xl font-bold font-['Cinzel'] text-[#181716] dark:text-[#FAF8F5]">
                    {prod.priceFCFA.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                <button
                  onClick={(e) => handleQuickAdd(prod, e)}
                  className="sm:hidden p-3 rounded-full bg-[#181716] text-white hover:bg-[#E68314] transition-colors shadow-md"
                  title="Ajouter au Panier"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>

                <div className="hidden sm:block text-xs text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold group-hover:translate-x-1 transition-transform">
                  Découvrir →
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onCustomizeInStudio={onCustomizeInStudio}
        />
      )}
    </section>
  );
};
