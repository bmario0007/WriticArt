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
  | 'journal'
  | 'article'
  | 'erp';

interface NavigationContextType {
  currentPage: PageRoute;
  currentProductId: string | null;
  currentArticleId: string | null;
  navigateTo: (page: PageRoute, itemId?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const parseHash = (): { page: PageRoute; productId: string | null; articleId: string | null } => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return { page: 'home', productId: null, articleId: null };

    if (hash.startsWith('produit/')) {
      const parts = hash.split('/');
      return { page: 'product-detail', productId: parts[1] || null, articleId: null };
    }

    if (hash.startsWith('article/')) {
      const parts = hash.split('/');
      return { page: 'article', productId: null, articleId: parts[1] || null };
    }

    if (hash === 'journal' || hash === 'blog' || hash === 'articles') {
      return { page: 'journal', productId: null, articleId: null };
    }

    if (hash === 'boutique' || hash === 'catalogue') return { page: 'boutique', productId: null, articleId: null };
    if (hash === 'writiclove' || hash === 'coffrets') return { page: 'writiclove', productId: null, articleId: null };
    if (hash === 'sur-mesure' || hash === 'studio') return { page: 'sur-mesure', productId: null, articleId: null };
    if (hash === 'pensee' || hash === 'oracle') return { page: 'pensee', productId: null, articleId: null };
    if (hash === 'galerie') return { page: 'galerie', productId: null, articleId: null };
    if (hash === 'atelier' || hash === 'manifeste' || hash === 'a-propos') return { page: 'atelier', productId: null, articleId: null };
    if (hash === 'erp' || hash === 'admin') return { page: 'erp', productId: null, articleId: null };

    return { page: 'home', productId: null, articleId: null };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initial.page);
  const [currentProductId, setCurrentProductId] = useState<string | null>(initial.productId);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(initial.articleId);

  useEffect(() => {
    const handleHashChange = () => {
      const { page, productId, articleId } = parseHash();
      setCurrentPage(page);
      setCurrentProductId(productId);
      setCurrentArticleId(articleId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, itemId?: string) => {
    let targetHash = '#/';
    if (page === 'boutique') targetHash = '#/boutique';
    else if (page === 'product-detail' && itemId) targetHash = `#/produit/${itemId}`;
    else if (page === 'journal') targetHash = '#/journal';
    else if (page === 'article' && itemId) targetHash = `#/article/${itemId}`;
    else if (page === 'writiclove') targetHash = '#/writiclove';
    else if (page === 'sur-mesure') targetHash = '#/sur-mesure';
    else if (page === 'pensee') targetHash = '#/pensee';
    else if (page === 'galerie') targetHash = '#/galerie';
    else if (page === 'atelier') targetHash = '#/atelier';
    else if (page === 'erp') targetHash = '#/erp';

    window.location.hash = targetHash;
    setCurrentPage(page);
    if (page === 'product-detail') {
      setCurrentProductId(itemId || null);
      setCurrentArticleId(null);
    } else if (page === 'article') {
      setCurrentArticleId(itemId || null);
      setCurrentProductId(null);
    } else {
      setCurrentProductId(null);
      setCurrentArticleId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, currentProductId, currentArticleId, navigateTo }}>
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
