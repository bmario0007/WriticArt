import React, { useState } from 'react';
import { X, Sparkles, Check, PhoneCall, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CatalogProduct } from '../types';
import { useCart } from '../context/CartContext';
import { atelierAudio } from '../utils/soundEffects';

interface ProductQuickViewModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
  onCustomizeInStudio?: (product: CatalogProduct) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onCustomizeInStudio
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customVow, setCustomVow] = useState<string>('');

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      priceFCFA: product.priceFCFA,
      image: product.image,
      quantity,
      selectedOption: selectedOption || undefined,
      customMessage: customVow || undefined
    });
    onClose();
  };

  const handleWhatsApp = () => {
    atelierAudio.playWaxStamp();
    const text = `Bonjour l'Atelier WriticArt ! ✨%0A%0AJe souhaite commander le produit :%0A👉 *${product.name}* (Qté: ${quantity})%0A💰 Prix total : *${(product.priceFCFA * quantity).toLocaleString('fr-FR')} FCFA*%0A${selectedOption ? `Option : ${selectedOption}%0A` : ''}${customVow ? `Message personnalisé : « ${customVow} »%0A` : ''}%0APouvez-vous m'indiquer la disponibilité et le délai ? Merci !`;
    window.open(`https://wa.me/221772348521?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] text-[#1E1C1A] dark:text-[#FAF8F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#DED4C3] dark:border-[#2E2A26] relative my-8 transition-colors duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-[#2A2622] hover:bg-white text-black dark:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto h-full min-h-[300px] bg-[#EDE5D8] dark:bg-[#201D1A]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-[10px] font-['Cinzel'] font-bold tracking-wider uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest text-[#B86209] dark:text-[#E68314] font-bold block">
                {product.categoryLabel}
              </span>

              <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold leading-tight">
                {product.name}
              </h3>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold font-['Cinzel'] text-[#E68314]">
                  {product.priceFCFA.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="text-xs text-[#8C8074]">
                  (~{(product.priceFCFA / 655.957).toFixed(1)} €)
                </span>
              </div>

              <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="pt-2 space-y-1.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#4F473E] dark:text-[#B5ABA0]">
                    <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Options selection if coffret */}
              {product.category === 'writiclove' && (
                <div className="pt-2">
                  <span className="block text-[11px] font-['Cinzel'] uppercase tracking-wider text-[#8C8074] mb-1.5 font-bold">
                    Choisir la formule :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Coffret Homme (30k)', 'Coffret Femme (30k)', 'Le Duo (50k)'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-['Cinzel'] border transition-all ${
                          selectedOption === opt
                            ? 'border-[#E68314] bg-[#FFF8F0] dark:bg-[#E68314]/20 text-[#B86209] dark:text-[#E68314] font-bold'
                            : 'border-[#DED4C3] dark:border-[#38332E] text-[#6E645A] dark:text-[#A8A096]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom dedication optional input */}
              <div className="pt-2">
                <span className="block text-[11px] font-sans text-[#8C8074] mb-1">
                  Message ou mot personnalisé à insérer (optionnel) :
                </span>
                <input
                  type="text"
                  value={customVow}
                  onChange={(e) => setCustomVow(e.target.value)}
                  placeholder="Ex : Pour l'amour de ma vie, Fatou..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-[#E8DFD1] dark:border-[#2E2A26]">
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 border border-[#DED4C3] dark:border-[#38332E] rounded-xl px-3 py-2 bg-white dark:bg-[#121110]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase font-bold tracking-wider hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp direct</span>
                </button>

                {onCustomizeInStudio && (
                  <button
                    onClick={() => {
                      onClose();
                      onCustomizeInStudio(product);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
                    <span>Sur-Mesure</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
