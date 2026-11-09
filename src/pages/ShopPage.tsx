import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { atelierAudio } from '../utils/soundEffects';
import type { CatalogProduct } from '../types';

export const ShopPage: React.FC = () => {
  const { products } = useErp();
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();
  const { formatPrice } = useCurrency();
  const { tr } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = [
    { id: 'all', label: tr('Toutes les Créations', 'All Creations') },
    { id: 'writiclove', label: tr('Pack WriticLove (365+1)', 'WriticLove (365+1)') },
    { id: 'tableau', label: tr('Tableaux Acrostiches', 'Acrostic Paintings') },
    { id: 'cadre', label: tr('Cadres Décoratifs', 'Decorative Frames') },
    { id: 'accessoire', label: tr('Accessoires & Cire', 'Wax & Seals') },
    { id: 'mariage', label: tr('Mariages & Prestige', 'Weddings & Prestige') }
  ];

  let filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  if (sortOption === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.priceFCFA - b.priceFCFA);
  } else if (sortOption === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.priceFCFA - a.priceFCFA);
  }

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
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">
          {tr('Accueil', 'Home')}
        </button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">
          {tr('Boutique', 'Shop')}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
          {tr('Catalogue & Créations WriticArt', 'WriticArt Official Catalog')}
        </span>
        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] dark:text-[#FAF8F5]">
          {tr('Boutique Officielle WriticArt', 'WriticArt Official Shop')}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#70675E] dark:text-[#A8A096] font-light leading-relaxed">
          {tr(
            'Explorez nos tableaux personnalisés en acrostiche dès 5.000 FCFA, nos coffrets WriticLove (365 + 1 cartes) en précommande et nos accessoires d’atelier.',
            'Explore bespoke acrostic paintings from 5,000 FCFA, WriticLove keepsake boxes (365 + 1 cards) open for pre-order, and workshop wax seals.'
          )}
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD1] dark:border-[#2E2A26]">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                atelierAudio.playPaperSlide();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-['Cinzel'] tracking-wider shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-md font-semibold'
                  : 'bg-white/80 dark:bg-[#1C1A18] border border-[#DED4C3] dark:border-[#38332E] text-[#696158] dark:text-[#A8A096] hover:border-[#E68314]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]" aria-hidden="true" />
            <input
              type="text"
              aria-label={tr('Rechercher un produit', 'Search product')}
              placeholder={tr('Rechercher...', 'Search...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
            />
          </div>

          <select
            aria-label={tr('Trier par prix', 'Sort by price')}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs font-['Cinzel'] focus:outline-none focus:border-[#E68314]"
          >
            <option value="default">{tr('Tri par défaut', 'Default Sort')}</option>
            <option value="price-asc">{tr('Prix : Croissant', 'Price: Low to High')}</option>
            <option value="price-desc">{tr('Prix : Décroissant', 'Price: High to Low')}</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#8C8074]">
            {tr('Aucun article ne correspond à votre recherche.', 'No product matches your search.')}
          </div>
        ) : (
          filtered.map((prod) => (
            <div
              key={prod.id}
              onClick={() => navigateTo('product-detail', prod.id)}
              className="group cursor-pointer bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC] dark:bg-[#201D1A]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {prod.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#231B26]/90 dark:bg-[#FAF8F5]/90 text-white dark:text-[#181716] text-[10px] font-['Cinzel'] font-bold tracking-wider uppercase">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8C8074]">
                    <span className="font-['Cinzel'] uppercase">{prod.categoryLabel}</span>
                    <span className="text-emerald-600 font-medium">
                      ✓ {tr('Disponible', 'Available')}
                    </span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium leading-snug group-hover:text-[#B86209] dark:group-hover:text-[#E68314] transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#6B6156] dark:text-[#A8A096] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F2ECE1] dark:border-[#26221E] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8074] uppercase block font-['Cinzel']">
                    {prod.category === 'tableau' ? tr('À partir de', 'Starting from') : tr('Prix', 'Price')}
                  </span>
                  <span className="text-xl font-bold font-['Cinzel'] text-[#181716] dark:text-[#FAF8F5]">
                    {formatPrice(prod.priceFCFA)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleQuickAdd(prod, e)}
                    className="px-4 py-2 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] hover:text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    {tr('Ajouter', 'Add')}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('product-detail', prod.id);
                    }}
                    aria-label={tr(`Voir ${prod.name}`, `View ${prod.name}`)}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#8C8074] hover:text-[#181716] dark:hover:text-white transition-colors"
                    title={tr('Voir le détail', 'View details')}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
