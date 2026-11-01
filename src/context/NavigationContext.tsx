import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageRoute = 
  | 'home' 
  | 'boutique' 
  | 'product-detail' 
  | 'writiclove' 
  | 'sur-mesure' 
  | 'pensee' 
  | 'galerie' 
  | 'atelier' 
  | 'erp';

interface NavigationContextType {
  currentPage: PageRoute;
  currentProductId: string | null;
  navigateTo: (page: PageRoute, productId?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const parseHash = (): { page: PageRoute; productId: string | null } => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return { page: 'home', productId: null };

    if (hash.startsWith('produit/')) {
      const parts = hash.split('/');
      return { page: 'product-detail', productId: parts[1] || null };
    }

    if (hash === 'boutique' || hash === 'catalogue') return { page: 'boutique', productId: null };
    if (hash === 'writiclove' || hash === 'coffrets') return { page: 'writiclove', productId: null };
    if (hash === 'sur-mesure' || hash === 'studio') return { page: 'sur-mesure', productId: null };
    if (hash === 'pensee' || hash === 'oracle') return { page: 'pensee', productId: null };
    if (hash === 'galerie') return { page: 'galerie', productId: null };
    if (hash === 'atelier' || hash === 'manifeste' || hash === 'a-propos') return { page: 'atelier', productId: null };
    if (hash === 'erp' || hash === 'admin') return { page: 'erp', productId: null };

    return { page: 'home', productId: null };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initial.page);
  const [currentProductId, setCurrentProductId] = useState<string | null>(initial.productId);

  useEffect(() => {
    const handleHashChange = () => {
      const { page, productId } = parseHash();
      setCurrentPage(page);
      setCurrentProductId(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, productId?: string) => {
    let targetHash = '#/';
    if (page === 'boutique') targetHash = '#/boutique';
    else if (page === 'product-detail' && productId) targetHash = `#/produit/${productId}`;
    else if (page === 'writiclove') targetHash = '#/writiclove';
    else if (page === 'sur-mesure') targetHash = '#/sur-mesure';
    else if (page === 'pensee') targetHash = '#/pensee';
    else if (page === 'galerie') targetHash = '#/galerie';
    else if (page === 'atelier') targetHash = '#/atelier';
    else if (page === 'erp') targetHash = '#/erp';

    window.location.hash = targetHash;
    setCurrentPage(page);
    setCurrentProductId(productId || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, currentProductId, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
