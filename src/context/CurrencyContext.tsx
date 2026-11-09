import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'FCFA' | 'EUR';

// Parité fixe officielle UEMOA / Zone CFA (Cahier des charges p.3)
export const EUR_TO_FCFA_RATE = 655.957;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convertToEUR: (amountFCFA: number) => number;
  formatPrice: (amountFCFA: number) => string;
  formatExactBoth: (amountFCFA: number) => { fcfa: string; eur: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'writicart_currency_v2';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode;
      return saved === 'EUR' ? 'EUR' : 'FCFA';
    } catch {
      return 'FCFA';
    }
  });

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
  };

  const convertToEUR = (amountFCFA: number): number => {
    return Math.round((amountFCFA / EUR_TO_FCFA_RATE) * 100) / 100;
  };

  const formatPrice = (amountFCFA: number): string => {
    if (currency === 'EUR') {
      const eur = convertToEUR(amountFCFA);
      return `${eur.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    }
    return `${Math.round(amountFCFA).toLocaleString('fr-FR')} FCFA`;
  };

  const formatExactBoth = (amountFCFA: number) => {
    const eur = convertToEUR(amountFCFA);
    return {
      fcfa: `${Math.round(amountFCFA).toLocaleString('fr-FR')} FCFA`,
      eur: `${eur.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
    };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertToEUR, formatPrice, formatExactBoth }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
