import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'FCFA' | 'EUR' | 'USD';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountFCFA: number) => string;
  rateToFCFA: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'writicart_currency_v1';

// Exact parity rates
const RATES: Record<CurrencyCode, number> = {
  FCFA: 1,
  EUR: 1 / 655.957,
  USD: 1 / 600
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode;
      return (saved && RATES[saved]) ? saved : 'FCFA';
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

  const formatPrice = (amountFCFA: number): string => {
    if (currency === 'FCFA') {
      return `${Math.round(amountFCFA).toLocaleString('fr-FR')} FCFA`;
    }
    if (currency === 'EUR') {
      const eur = amountFCFA * RATES.EUR;
      return `${eur.toLocaleString('fr-FR', { minimumFractionDigits: eur % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })} €`;
    }
    if (currency === 'USD') {
      const usd = amountFCFA * RATES.USD;
      return `$${usd.toLocaleString('en-US', { minimumFractionDigits: usd % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
    }
    return `${amountFCFA.toLocaleString('fr-FR')} FCFA`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rateToFCFA: RATES[currency] }}>
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
