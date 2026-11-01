import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { atelierAudio } from '../../utils/soundEffects';

interface CartDrawerProps {
  onOpenQuoteSummary?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenQuoteSummary }) => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, totalFCFA, checkoutWhatsApp, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50000;
  const progressPercent = Math.min(100, Math.round((totalFCFA / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalFCFA);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#141312] text-[#1E1C1A] dark:text-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8DFD1] dark:border-[#2E2A26] transition-colors duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8DFD1] dark:border-[#2E2A26] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#B86209] dark:text-[#E68314]">
                Panier d’Atelier
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-[10px] font-bold">
                {cart.length}
              </span>
            </div>

            <button
              onClick={() => {
                atelierAudio.playPaperSlide();
                closeCart();
              }}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery tier ticker */}
          <div className="bg-[#FFF8F0] dark:bg-[#1C1814] px-6 py-3 border-b border-[#E8DFD1] dark:border-[#2E2A26] text-xs">
            {diffToFree === 0 ? (
              <p className="text-[#B86209] dark:text-[#E68314] font-medium flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Félicitations ! Livraison offerte à Dakar sur cette commande 🎉</span>
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[#6E645A] dark:text-[#A8A096]">
                  Plus que <strong className="text-[#B86209] dark:text-[#E68314] font-bold">{diffToFree.toLocaleString('fr-FR')} FCFA</strong> pour la livraison offerte à Dakar.
                </p>
                <div className="w-full bg-[#EAE2D5] dark:bg-[#2A2622] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#E68314] to-[#B86209] h-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#EFE7DA] dark:divide-[#24211D]">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE7DA] dark:bg-[#25221F] flex items-center justify-center mx-auto text-[#B86209]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold">Votre panier est vide</h4>
                  <p className="text-xs text-[#8C8074] dark:text-[#9E9488] max-w-xs mx-auto">
                    Découvrez nos coffrets « 365 Jours d'Amour », tableaux calligraphiés et cadres sur-mesure.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase tracking-wider hover:bg-[#E68314] transition-colors"
                >
                  Découvrir la Boutique
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E8DFD1] dark:border-[#2E2A26] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-['Cormorant_Garamond'] text-base font-semibold leading-tight truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9E9488] hover:text-red-600 transition-colors p-1"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedOption && (
                      <p className="text-[11px] text-[#B86209] dark:text-[#E68314] font-medium mt-0.5">
                        {item.selectedOption}
                      </p>
                    )}

                    {item.customMessage && (
                      <p className="text-[11px] text-[#7A7167] dark:text-[#9A9084] italic truncate mt-0.5">
                        « {item.customMessage} »
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center space-x-2 border border-[#DED4C3] dark:border-[#38332E] rounded-lg px-2 py-0.5 bg-white dark:bg-[#1C1A18]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-['Cinzel'] text-xs font-bold text-[#181716] dark:text-[#FAF8F5]">
                        {(item.priceFCFA * item.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8DFD1] dark:border-[#2E2A26] bg-white/70 dark:bg-[#121110] space-y-4">
              
              {/* Optional Quick Customer Details */}
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Votre nom (optionnel pour la commande)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                />
                <input
                  type="text"
                  placeholder="Votre quartier à Dakar / Ville (ex: Almadies, Mermoz)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                />
              </div>

              {/* Subtotal */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#7E7469] dark:text-[#A8A096]">
                    Sous-Total Estimé
                  </span>
                  <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                    {totalFCFA.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8C8074]">
                  <span>Livraison :</span>
                  <span>{diffToFree === 0 ? 'Offerte à Dakar' : 'À partir de 2 000 FCFA à Dakar'}</span>
                </div>
              </div>

              {/* Primary Action Button: WhatsApp Checkout */}
              <button
                onClick={() => checkoutWhatsApp({ name: customerName, address: customerAddress })}
                className="w-full py-4 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all text-xs font-['Cinzel'] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Commander sur WhatsApp (+221 77 234 85 21)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary action: Proforma quote if provided */}
              {onOpenQuoteSummary && (
                <button
                  onClick={() => {
                    closeCart();
                    onOpenQuoteSummary();
                  }}
                  className="w-full py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#181716] dark:hover:border-white text-xs font-['Cinzel'] tracking-wider uppercase transition-colors"
                >
                  Générer Devis Proforma PDF
                </button>
              )}

              <div className="flex items-center justify-between text-[10px] text-[#8C8074] pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" />
                  <span>Atelier officiel Dakar, Sénégal</span>
                </span>
                <button
                  onClick={clearCart}
                  className="underline hover:text-red-600 transition-colors"
                >
                  Vider le panier
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
