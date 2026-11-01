import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, ShoppingBag, Sparkles } from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigation } from '../../context/NavigationContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const { products, articles } = useErp();
  const { formatPrice } = useCurrency();
  const { navigateTo } = useNavigation();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchingProducts = clean
    ? products.filter(p =>
        p.name.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        p.categoryLabel.toLowerCase().includes(clean)
      )
    : products.slice(0, 3); // show 3 suggestions when empty

  const matchingArticles = clean
    ? articles.filter(a =>
        a.status === 'publie' &&
        (a.title.toLowerCase().includes(clean) ||
         a.excerpt.toLowerCase().includes(clean) ||
         a.category.toLowerCase().includes(clean))
      )
    : articles.filter(a => a.status === 'publie').slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#161412] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl overflow-hidden z-10 transition-all text-[#181716] dark:text-[#FAF8F5]">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-[#E8DFD1] dark:border-[#2E2A26] flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-[#8C8074] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une création, un coffret 365 jours, un article..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder-[#8C8074]"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
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

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          
          {/* Products Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-['Cinzel'] uppercase font-bold tracking-wider text-[#8C8074]">
              <span className="flex items-center space-x-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#E68314]" />
                <span>Créations de l'Atelier ({matchingProducts.length})</span>
              </span>
              {!clean && <span className="text-[10px] lowercase italic font-sans">suggestions</span>}
            </div>

            {matchingProducts.length === 0 ? (
              <p className="text-xs text-[#8C8074] py-2">Aucun produit ne correspond à cette recherche.</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {matchingProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      navigateTo('product-detail', p.id);
                    }}
                    className="p-3 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">{p.categoryLabel}</span>
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
                <span>Journal d'Atelier ({matchingArticles.length})</span>
              </span>
            </div>

            {matchingArticles.length === 0 ? (
              <p className="text-xs text-[#8C8074] py-2">Aucun article ne correspond à cette recherche.</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {matchingArticles.map(a => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onClose();
                      navigateTo('article', a.id);
                    }}
                    className="p-3 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <span className="text-[10px] text-[#E68314] uppercase font-['Cinzel'] font-bold block">{a.category}</span>
                      <h4 className="font-['Cormorant_Garamond'] text-base font-semibold truncate group-hover:text-[#E68314] transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-[11px] text-[#8C8074] truncate">{a.excerpt}</p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 text-xs text-[#8C8074] group-hover:text-[#E68314]">
                      <span className="font-['Cinzel'] text-[11px]">Lire</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links Suggestions */}
          <div className="pt-2 border-t border-[#E8DFD1]/60 dark:border-[#2E2A26] flex items-center justify-between text-xs text-[#8C8074]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
              <span>Accès direct :</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  onClose();
                  navigateTo('writiclove');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                Coffrets 365 Jours
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('sur-mesure');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                Studio 3D Sur-Mesure
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('suivi-commande');
                }}
                className="hover:text-[#E68314] underline text-[11px]"
              >
                Suivi de Commande
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
