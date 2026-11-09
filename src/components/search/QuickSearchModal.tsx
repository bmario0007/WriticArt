import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, ShoppingBag, Sparkles } from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const { products, articles } = useErp();
  const { formatPrice } = useCurrency();
  const { tr } = useLanguage();
  const { navigateTo } = useNavigation();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('');
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          setQuery('');
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchingProducts = clean
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(clean) ||
          p.description.toLowerCase().includes(clean) ||
          p.categoryLabel.toLowerCase().includes(clean)
      )
    : products.slice(0, 3);

  const matchingArticles = clean
    ? articles.filter(
        (a) =>
          a.status === 'publie' &&
          (a.title.toLowerCase().includes(clean) ||
            a.excerpt.toLowerCase().includes(clean) ||
            a.category.toLowerCase().includes(clean))
      )
    : articles.filter((a) => a.status === 'publie').slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start" role="dialog" aria-modal="true" aria-label={tr('Recherche rapide', 'Quick search')}>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#161412] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl overflow-hidden z-10 transition-all text-[#181716] dark:text-[#FAF8F5]">
        <div className="relative border-b border-[#E8DFD1] dark:border-[#2E2A26] flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-[#8C8074] shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            aria-label={tr('Rechercher une création ou un article', 'Search products or articles')}
            placeholder={tr(
              'Rechercher un tableau acrostiche, WriticLove, une box, un article...',
              'Search acrostic paintings, WriticLove, gift box, or articles...'
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder-[#8C8074]"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              aria-label={tr('Effacer', 'Clear')}
              className="p-1 rounded-full text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#8C8074] bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/10">
              ESC
            </kbd>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Products Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-['Cinzel'] uppercase font-bold tracking-wider text-[#8C8074]">
              <span className="flex items-center space-x-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#E68314]" />
                <span>
                  {tr('Créations WriticArt', 'WriticArt Creations')} ({matchingProducts.length})
                </span>
              </span>
              {!clean && <span className="text-[10px] lowercase italic font-sans">{tr('suggestions', 'suggestions')}</span>}
            </div>

            {matchingProducts.length === 0 ? (
              <p className="text-xs text-[#8C8074] py-2">
                {tr('Aucun produit ne correspond à cette recherche.', 'No product matches this search.')}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      navigateTo('product-detail', p.id);
                    }}
                    className="p-3 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">
                          {p.categoryLabel}
                        </span>
                        <h4 className="font-['Cormorant_Garamond'] text-lg font-bold truncate group-hover:text-[#E68314] transition-colors">
                          {p.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="font-['Cinzel'] text-xs font-bold text-[#E68314]">
                        {formatPrice(p.priceFCFA)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C8074] group-hover:text-[#E68314] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Articles & Blog Section */}
          <div className="space-y-3 pt-2 border-t border-[#E8DFD1]/60 dark:border-[#2E2A26]">
            <div className="flex items-center justify-between text-[11px] font-['Cinzel'] uppercase font-bold tracking-wider text-[#8C8074]">
              <span className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#E68314]" />
                <span>
                  {tr('Journal d’Atelier', 'Workshop Journal')} ({matchingArticles.length})
                </span>
              </span>
            </div>

            {matchingArticles.length === 0 ? (
              <p className="text-xs text-[#8C8074] py-2">
                {tr('Aucun article ne correspond à cette recherche.', 'No article matches this search.')}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {matchingArticles.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onClose();
                      navigateTo('article', a.id);
                    }}
                    className="p-3 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <span className="text-[10px] text-[#E68314] uppercase font-['Cinzel'] font-bold block">
                        {a.category}
                      </span>
                      <h4 className="font-['Cormorant_Garamond'] text-base font-semibold truncate group-hover:text-[#E68314] transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-[11px] text-[#8C8074] truncate">{a.excerpt}</p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 text-xs text-[#8C8074] group-hover:text-[#E68314]">
                      <span className="font-['Cinzel'] text-[11px]">{tr('Lire', 'Read')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct Offer Links */}
          <div className="pt-2 border-t border-[#E8DFD1]/60 dark:border-[#2E2A26] flex flex-wrap items-center justify-between gap-2 text-xs text-[#8C8074]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
              <span>{tr('Accès direct :', 'Quick links:')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigateTo('tableaux');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                {tr('Tableaux Acrostiches', 'Acrostic Paintings')}
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('writiclove');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                WriticLove (365+1)
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('box');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                {tr('Box Février', 'Feb. Box')}
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('suivi-commande');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                {tr('Suivi Commande', 'Track Order')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
