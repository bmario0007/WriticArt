import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Gift,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import { useErp } from '../../context/ErpContext';
import { atelierAudio } from '../../utils/soundEffects';
import { WavePaymentModal } from './WavePaymentModal';

interface CartDrawerProps {
  onOpenQuoteSummary?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenQuoteSummary }) => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, totalFCFA, checkoutWhatsApp, clearCart } =
    useCart();
  const { formatPrice, currency } = useCurrency();
  const { tr } = useLanguage();
  const { addOrder } = useErp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isWaveModalOpen, setIsWaveModalOpen] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState<string | null>(null);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountFCFA: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Gift packaging state
  const [hasGiftPackaging, setHasGiftPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'AMOUR2026') {
      const discount = Math.round(totalFCFA * 0.1);
      setAppliedPromo({ code: clean, discountFCFA: discount });
      setPromoError('');
      atelierAudio.playGoldChime();
    } else if (clean === 'BIENVENUE') {
      const discount = Math.min(5000, totalFCFA);
      setAppliedPromo({ code: clean, discountFCFA: discount });
      setPromoError('');
      atelierAudio.playGoldChime();
    } else if (clean === 'DAKAR') {
      const discount = Math.min(2000, totalFCFA);
      setAppliedPromo({ code: clean, discountFCFA: discount });
      setPromoError('');
      atelierAudio.playGoldChime();
    } else {
      setPromoError(
        tr('Code promo invalide. Essayez AMOUR2026 ou BIENVENUE', 'Invalid promo code. Try AMOUR2026 or BIENVENUE')
      );
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const finalFCFA = Math.max(0, totalFCFA - (appliedPromo?.discountFCFA || 0));

  const handleRegisterErpOrder = () => {
    const created = addOrder({
      clientName: customerName.trim() || tr('Client Panier', 'Cart Client'),
      clientPhone: customerPhone.trim() || '+221 77 000 00 00',
      city: customerAddress.trim() || tr('À préciser', 'To be specified'),
      items: cart.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        unitPriceFCFA: item.priceFCFA,
        options: item.selectedOption
      })),
      totalFCFA: finalFCFA,
      currencyUsed: currency,
      offerType: 'boutique',
      status: 'nouveau',
      paymentMethod: 'Wave',
      paymentStatus: 'en_attente',
      customMessage: giftNote || undefined,
      notes: `Commande Panier (${currency})${appliedPromo ? ` • Promo ${appliedPromo.code}` : ''}`
    });
    setSavedOrderId(created.id);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label={tr('Panier WriticArt', 'WriticArt Cart')}>
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
                {tr('Panier WriticArt', 'WriticArt Cart')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-[10px] font-bold">
                {cart.length}
              </span>
            </div>

            <button
              onClick={() => {
                atelierAudio.playPaperSlide();
                closeCart();
              }}
              aria-label={tr('Fermer le panier', 'Close cart')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* France & Shipping policy banner */}
          <div className="bg-[#FFF8F0] dark:bg-[#1C1814] px-6 py-3 border-b border-[#E8DFD1] dark:border-[#2E2A26] text-[11px] text-[#6E645A] dark:text-[#A8A096]">
            <span>
              ✦{' '}
              {tr(
                'Livraison incluse pour les tableaux uniquement si la livraison se fait en France. Non incluse pour WriticLove.',
                'Delivery included on paintings only when shipped to France. Delivery not included for WriticLove.'
              )}
            </span>
          </div>

          {/* Cart items list or confirmation */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#EFE7DA] dark:divide-[#24211D]">
            {savedOrderId ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  {tr('Commande enregistrée !', 'Order Saved!')}
                </h4>
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  {tr('Vous serez contacté(e) par la suite.', 'You will be contacted shortly.')}
                </p>
                <p className="text-[11px] text-[#70675E] dark:text-[#A8A096]">
                  {tr('Référence', 'Reference')}: <strong>{savedOrderId}</strong> ({currency})
                </p>
                <button
                  onClick={() => {
                    setSavedOrderId(null);
                    closeCart();
                  }}
                  className="px-5 py-2 rounded-full bg-[#231B26] text-white text-xs font-['Cinzel'] font-bold uppercase"
                >
                  {tr('Continuer la visite', 'Continue browsing')}
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE7DA] dark:bg-[#25221F] flex items-center justify-center mx-auto text-[#B86209]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-['Cormorant_Garamond'] text-xl font-semibold">
                    {tr('Votre panier est vide', 'Your cart is empty')}
                  </h4>
                  <p className="text-xs text-[#8C8074] dark:text-[#9E9488] max-w-xs mx-auto">
                    {tr(
                      'Découvrez nos tableaux personnalisés en acrostiche et nos coffrets WriticLove (365 + 1 cartes).',
                      'Discover custom acrostic paintings and WriticLove keepsake boxes (365 + 1 cards).'
                    )}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase tracking-wider hover:bg-[#E68314] hover:text-white transition-colors"
                >
                  {tr('Découvrir WriticArt', 'Explore WriticArt')}
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
                        aria-label={tr(`Retirer ${item.name}`, `Remove ${item.name}`)}
                        className="text-[#9E9488] hover:text-red-600 transition-colors p-1"
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
                      <div className="flex items-center space-x-2 border border-[#DED4C3] dark:border-[#38332E] rounded-lg px-2 py-0.5 bg-white dark:bg-[#1C1A18]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={tr('Moins', 'Decrease')}
                          className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={tr('Plus', 'Increase')}
                          className="text-[#8C8074] hover:text-[#181716] dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-['Cinzel'] text-xs font-bold text-[#181716] dark:text-[#FAF8F5]">
                        {formatPrice(item.priceFCFA * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8DFD1] dark:border-[#2E2A26] bg-white/70 dark:bg-[#121110] space-y-4 max-h-[58vh] overflow-y-auto">
              {/* Gift Packaging Checkbox */}
              <div className="p-3 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 space-y-2">
                <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasGiftPackaging}
                    onChange={(e) => setHasGiftPackaging(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E68314] accent-[#E68314] cursor-pointer"
                  />
                  <div className="flex items-center space-x-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#E68314]" />
                    <span className="font-['Cinzel'] font-bold text-[#181716] dark:text-[#FAF8F5]">
                      {tr('Écrin Cadeau & Mot Doux', 'Gift Wrapping & Personal Note')}
                    </span>
                  </div>
                </label>

                {hasGiftPackaging && (
                  <div className="pt-1 space-y-1">
                    <input
                      type="text"
                      placeholder={tr('Mot d’accompagnement ou dédicace...', 'Personal dedication or note...')}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#161412] text-xs focus:outline-none focus:border-[#E68314]"
                    />
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                    <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        {appliedPromo.code} (-{formatPrice(appliedPromo.discountFCFA)})
                      </span>
                    </div>
                    <button onClick={handleRemovePromo} className="text-emerald-600 hover:text-red-500 font-bold text-xs">
                      {tr('Retirer', 'Remove')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]" aria-hidden="true" />
                      <input
                        type="text"
                        aria-label={tr('Code promo', 'Promo code')}
                        placeholder={tr('Code promo (ex: AMOUR2026)', 'Promo code (e.g. AMOUR2026)')}
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError('');
                        }}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#E68314]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] hover:text-white text-xs font-['Cinzel'] font-bold uppercase transition-colors"
                    >
                      {tr('Appliquer', 'Apply')}
                    </button>
                  </form>
                )}

                {promoError && <p className="text-[10px] text-red-500">{promoError}</p>}
              </div>

              {/* Customer Details */}
              <div className="space-y-2 text-xs pt-1">
                <input
                  type="text"
                  placeholder={tr('Prénom / Nom', 'Full Name')}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    placeholder={tr('Téléphone', 'Phone')}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                  />
                  <input
                    type="text"
                    placeholder={tr('Adresse / Pays', 'Address / Country')}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                  />
                </div>
              </div>

              {/* Subtotal */}
              <div className="space-y-1 pt-2 border-t border-[#E8DFD1]/80 dark:border-[#2E2A26]">
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#181716] dark:text-white font-bold">
                    {tr('Total', 'Total')} ({currency}) :
                  </span>
                  <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#E68314]">
                    {formatPrice(finalFCFA)}
                  </span>
                </div>
              </div>

              {/* Primary Action: Record in ERP / Site */}
              <button
                type="button"
                onClick={handleRegisterErpOrder}
                className="w-full py-3.5 rounded-full bg-[#231B26] dark:bg-[#E68314] hover:bg-[#E68314] text-white transition-all text-xs font-['Cinzel'] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{tr('Valider ma commande', 'Submit Order')}</span>
              </button>

              {/* WhatsApp Checkout */}
              <button
                onClick={() =>
                  checkoutWhatsApp({
                    name: customerName,
                    address: customerAddress,
                    promoCode: appliedPromo?.code,
                    discountFCFA: appliedPromo?.discountFCFA,
                    giftPackaging: hasGiftPackaging,
                    giftNote: giftNote,
                    currencyCode: currency,
                    formattedTotal: formatPrice(finalFCFA)
                  })
                }
                className="w-full py-3 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all text-xs font-['Cinzel'] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{tr('Commander via WhatsApp', 'Order on WhatsApp')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Wave / Orange Money Modal */}
              <button
                type="button"
                onClick={() => setIsWaveModalOpen(true)}
                className="w-full py-2.5 rounded-full bg-white dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] hover:border-[#1CA0F2] text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-[#181716] dark:text-[#FAF8F5] hover:text-[#1CA0F2] transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>🌊 {tr('Payer par Wave / Orange Money', 'Pay via Wave / Orange Money')}</span>
              </button>

              {onOpenQuoteSummary && (
                <button
                  onClick={() => {
                    closeCart();
                    onOpenQuoteSummary();
                  }}
                  className="w-full py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#181716] dark:hover:border-white text-xs font-['Cinzel'] tracking-wider uppercase transition-colors"
                >
                  {tr('Générer Devis Proforma PDF', 'Generate Proforma Quote PDF')}
                </button>
              )}

              <div className="flex items-center justify-between text-[10px] text-[#8C8074] pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" />
                  <span>WriticArt — « {tr('Les écrits restent', 'Words remain')} »</span>
                </span>
                <button onClick={clearCart} className="underline hover:text-red-600 transition-colors">
                  {tr('Vider le panier', 'Clear cart')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <WavePaymentModal
        isOpen={isWaveModalOpen}
        onClose={() => setIsWaveModalOpen(false)}
        totalFCFA={finalFCFA}
        customerName={customerName}
      />
    </div>
  );
};
