import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from '../types';
import { atelierAudio } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: {
    productId: string;
    name: string;
    subtitle?: string;
    priceFCFA: number;
    image: string;
    selectedOption?: string;
    customMessage?: string;
    quantity?: number;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalFCFA: number;
  checkoutWhatsApp: (customerInfo?: {
    name?: string;
    address?: string;
    promoCode?: string;
    discountFCFA?: number;
    giftPackaging?: boolean;
    giftNote?: string;
    currencyCode?: string;
    formattedTotal?: string;
  }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'writicart_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage error
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart: CartContextType['addToCart'] = (item) => {
    atelierAudio.playGoldChime();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E68314', '#181716', '#FAF8F5']
    });

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.selectedOption === item.selectedOption
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + (item.quantity || 1)
        };
        return next;
      }

      const newLine: CartItem = {
        id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        productId: item.productId,
        name: item.name,
        subtitle: item.subtitle,
        priceFCFA: item.priceFCFA,
        quantity: item.quantity || 1,
        image: item.image,
        selectedOption: item.selectedOption,
        customMessage: item.customMessage
      };
      return [...prev, newLine];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    atelierAudio.playPaperSlide();
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFCFA = cart.reduce((acc, item) => acc + item.priceFCFA * item.quantity, 0);

  const checkoutWhatsApp = (customerInfo?: {
    name?: string;
    address?: string;
    promoCode?: string;
    discountFCFA?: number;
    giftPackaging?: boolean;
    giftNote?: string;
    currencyCode?: string;
    formattedTotal?: string;
  }) => {
    atelierAudio.playWaxStamp();
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#25D366', '#E68314', '#181716']
    });

    const finalFCFA = Math.max(0, totalFCFA - (customerInfo?.discountFCFA || 0));

    let message = `*Bonjour l'Atelier WriticArt !* ✨%0A`;
    message += `Je souhaite valider ma commande :%0A%0A`;

    cart.forEach((item, idx) => {
      message += `👉 *${idx + 1}. ${item.name}* (${item.quantity}x)%0A`;
      if (item.selectedOption) message += `   • Option : ${item.selectedOption}%0A`;
      if (item.customMessage) message += `   • Dédicace manuscrite : « ${item.customMessage} »%0A`;
      message += `   • Prix : ${(item.priceFCFA * item.quantity).toLocaleString('fr-FR')} FCFA%0A%0A`;
    });

    if (customerInfo?.giftPackaging) {
      message += `🎁 *Option Écrin Cadeau de Prestige :* Oui (Ruban de soie & cachet de cire)%0A`;
      if (customerInfo.giftNote) {
        message += `💌 *Mot doux accompagnateur :* « ${customerInfo.giftNote} »%0A`;
      }
      message += `%0A`;
    }

    if (customerInfo?.promoCode && customerInfo.discountFCFA) {
      message += `🏷️ *Code Promo appliqué :* ${customerInfo.promoCode} (-${customerInfo.discountFCFA.toLocaleString('fr-FR')} FCFA)%0A`;
    }

    message += `💰 *TOTAL FINAL : ${finalFCFA.toLocaleString('fr-FR')} FCFA*`;
    if (customerInfo?.formattedTotal && customerInfo.currencyCode !== 'FCFA') {
      message += ` (~${customerInfo.formattedTotal})`;
    }
    message += `%0A`;

    if (customerInfo?.name) message += `👤 *Client :* ${customerInfo.name}%0A`;
    if (customerInfo?.address) message += `📍 *Lieu de livraison :* ${customerInfo.address}%0A`;
    message += `%0APouvez-vous me confirmer la disponibilité et le délai de livraison à Dakar ? Merci !`;

    window.open(`https://wa.me/221772348521?text=${message}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        totalFCFA,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
