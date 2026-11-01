import React, { useState } from 'react';
import { ArrowLeft, Check, PhoneCall, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useCurrency } from '../context/CurrencyContext';
import { atelierAudio } from '../utils/soundEffects';

interface ProductDetailPageProps {
  productId: string | null;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { products } = useErp();
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();
  const { formatPrice, currency } = useCurrency();

  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      priceFCFA: product.priceFCFA,
      image: product.image,
      quantity,
      selectedOption: selectedOption || undefined,
      customMessage: customMessage || undefined
    });
  };

  const handleOrderWhatsApp = () => {
    atelierAudio.playWaxStamp();
    const text = `Bonjour l'Atelier WriticArt ! ✨%0A%0AJe souhaite commander :%0A👉 *${product.name}* (Quantité : ${quantity})%0A💰 Montant estimé : *${(product.priceFCFA * quantity).toLocaleString('fr-FR')} FCFA*%0A${selectedOption ? `Option : ${selectedOption}%0A` : ''}${customMessage ? `Message personnalisé : « ${customMessage} »%0A` : ''}%0APouvez-vous me confirmer les modalités de livraison à Dakar ? Merci !`;
    window.open(`https://wa.me/221772348521?text=${text}`, '_blank');
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-[#8C8074]">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigateTo('home')} className="hover:underline">Accueil</button>
          <span>/</span>
          <button onClick={() => navigateTo('boutique')} className="hover:underline">Boutique</button>
          <span>/</span>
          <span className="font-semibold text-[#181716] dark:text-[#FAF8F5] truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={() => navigateTo('boutique')}
          className="flex items-center space-x-1.5 hover:text-[#E68314] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à la Boutique</span>
        </button>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Product Image */}
        <div className="lg:col-span-7 bg-[#EFE8DC] dark:bg-[#1A1816] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-xl relative aspect-square sm:aspect-[4/3] flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#181716]/90 dark:bg-[#FAF8F5]/90 text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold tracking-wider uppercase backdrop-blur-sm shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right: Buy Box & Customization */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2 border-b border-[#E8DFD1] dark:border-[#2E2A26] pb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold block">
              {product.categoryLabel}
            </span>
            <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold leading-tight text-[#181716] dark:text-[#FAF8F5]">
              {product.name}
            </h1>
            <p className="text-xs text-[#8C8074]">
              {product.subtitle}
            </p>

            <div className="pt-2 flex items-baseline space-x-3">
              <span className="font-['Cinzel'] text-3xl font-bold text-[#E68314]">
                {formatPrice(product.priceFCFA)}
              </span>
              {currency !== 'FCFA' && (
                <span className="text-xs text-[#8C8074]">
                  ({product.priceFCFA.toLocaleString('fr-FR')} FCFA)
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5F574E] dark:text-[#A8A096] leading-relaxed">
            {product.description}
          </p>

          {/* Options for Writic'Love */}
          {product.category === 'writiclove' && (
            <div className="space-y-2">
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074]">
                Choisir la formule :
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Homme', label: 'Homme (30k)' },
                  { id: 'Femme', label: 'Femme (30k)' },
                  { id: 'Duo', label: 'Duo (50k)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.label)}
                    className={`py-2 px-3 rounded-xl text-xs font-['Cinzel'] border text-center transition-all ${
                      selectedOption === opt.label
                        ? 'border-[#E68314] bg-[#FFF8F0] dark:bg-[#E68314]/20 text-[#B86209] dark:text-[#E68314] font-bold shadow-sm'
                        : 'border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom dedication optional input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096]">
              Dédicace ou mot personnalisé à sceller (optionnel) :
            </label>
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Ex : Que chaque jour scelle notre promesse d'amour éternel..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
            />
          </div>

          {/* Quantity and Primary Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 border border-[#DED4C3] dark:border-[#38332E] rounded-full px-4 py-2 bg-white dark:bg-[#1C1A18]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold font-mono px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au Panier</span>
              </button>
            </div>

            {/* Direct WhatsApp Order */}
            <button
              onClick={handleOrderWhatsApp}
              className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Commander directement via WhatsApp (+221 77 234 85 21)</span>
            </button>
          </div>

          {/* Features check */}
          <div className="pt-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] space-y-2">
            <h4 className="font-['Cinzel'] text-xs uppercase font-bold text-[#181716] dark:text-[#FAF8F5]">
              Spécifications de l'Œuvre :
            </h4>
            <div className="space-y-1.5">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-[#554E46] dark:text-[#C5BCB2]">
                  <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Related Creations */}
      <div className="pt-12 border-t border-[#E8DFD1] dark:border-[#2E2A26] space-y-6">
        <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
          Créations Complémentaires
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigateTo('product-detail', rel.id)}
              className="cursor-pointer bg-white dark:bg-[#181716] p-4 rounded-2xl border border-[#E8DFD1] dark:border-[#2E2A26] hover:shadow-lg transition-all flex space-x-4 items-center group"
            >
              <img
                src={rel.image}
                alt={rel.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">{rel.categoryLabel}</span>
                <h4 className="font-['Cormorant_Garamond'] text-lg font-bold truncate group-hover:text-[#E68314] transition-colors">
                  {rel.name}
                </h4>
                <span className="font-['Cinzel'] font-bold text-xs text-[#E68314]">
                  {rel.priceFCFA.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
