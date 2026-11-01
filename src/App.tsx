import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AdminERP } from './components/erp/AdminERP';
import { AtelierStoryModal } from './components/AtelierStoryModal';
import { QuoteEngineModal } from './components/QuoteEngineModal';

// Dedicated Separate Pages (No continuous feed)
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WriticLovePage } from './pages/WriticLovePage';
import { StudioPage } from './pages/StudioPage';
import { OraclePage } from './pages/OraclePage';
import { GalleryPage } from './pages/GalleryPage';
import { AtelierPage } from './pages/AtelierPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { ErpProvider } from './context/ErpContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

import type { QuoteConfiguration, DailyThought, GalleryItem } from './types';

const AppContent: React.FC = () => {
  const { currentPage, currentProductId, currentArticleId, navigateTo } = useNavigation();

  // Bespoke quote state
  const [config, setConfig] = useState<QuoteConfiguration>({
    eventType: 'writiclove',
    paperType: 'deckle-edge',
    inkType: 'or-24k',
    calligraphyStyle: 'spencerian',
    waxColor: 'or',
    waxStamp: 'monogramme',
    hasSilkRibbon: true,
    hasGoldLeafFoil: true,
    hasHandmadeEnvelope: true,
    hasWaxSeal: true,
    quantity: 1,
    customTitle: 'Coffret Writic’Love Duo — 365 Jours d’Amour',
    customNames: 'Pour l’amour de ma vie',
    customMessage: 'Aujourd’hui, je t’aime plus que jamais. Que chaque jour scelle notre promesse.',
    rushOrder: false,
    deliveryOption: 'standard',
    currency: 'FCFA'
  });

  // Modal states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  // When user uses a Daily Thought in the Studio
  const handleUseThoughtInStudio = (thought: DailyThought) => {
    setConfig((prev) => ({
      ...prev,
      eventType: 'quotidien',
      paperType: thought.paperType,
      waxColor: thought.waxColor,
      customTitle: `Pensée Writic’Love • ${thought.date}`,
      customNames: 'Pour toi mon amour',
      customMessage: thought.quote,
      quantity: 1,
      hasWaxSeal: true,
      hasSilkRibbon: false,
      hasHandmadeEnvelope: true
    }));
    navigateTo('sur-mesure');
  };

  // When user clicks "Commander dans ce style" on a Gallery piece
  const handleSelectArtPiece = (item: GalleryItem) => {
    setConfig((prev) => {
      let paper: QuoteConfiguration['paperType'] = 'deckle-edge';
      let ink: QuoteConfiguration['inkType'] = 'or-24k';
      let wax: QuoteConfiguration['waxColor'] = 'or';

      if (item.category === 'entreprise') {
        paper = 'noir-nuit';
        ink = 'or-24k';
        wax = 'noir';
      } else if (item.category === 'quotidien') {
        paper = 'coton-350';
        ink = 'encre-chine';
        wax = 'bordeaux';
      } else if (item.category === 'sentiment') {
        paper = 'parchemin-or';
        ink = 'sepia';
        wax = 'emeraude';
      }

      return {
        ...prev,
        eventType: item.category,
        paperType: paper,
        inkType: ink,
        waxColor: wax,
        customTitle: item.title,
        customNames: 'Destinataires',
        customMessage: item.featuredQuote || item.description,
        quantity: item.category === 'mariage' ? 50 : item.category === 'entreprise' ? 50 : 1
      };
    });
    navigateTo('sur-mesure');
  };

  // If on ERP page, render full screen ERP Suite
  if (currentPage === 'erp') {
    return <AdminERP />;
  }

  // Otherwise render separate pages with shared Navbar & Footer
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#121110] text-[#1E1C1A] dark:text-[#FAF8F5] transition-colors duration-300">
      
      {/* Navigation bar with links to separate pages, cart drawer and dark mode */}
      <Navbar />

      {/* DEDICATED SEPARATE PAGES (No continuous feed) */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        
        {currentPage === 'boutique' && <ShopPage />}
        
        {currentPage === 'product-detail' && (
          <ProductDetailPage productId={currentProductId} />
        )}
        
        {currentPage === 'writiclove' && <WriticLovePage />}
        
        {currentPage === 'sur-mesure' && (
          <StudioPage
            config={config}
            onChangeConfig={setConfig}
            onOpenQuoteSummary={() => setIsQuoteModalOpen(true)}
          />
        )}
        
        {currentPage === 'pensee' && (
          <OraclePage onUseThoughtInStudio={handleUseThoughtInStudio} />
        )}
        
        {currentPage === 'galerie' && (
          <GalleryPage
            onSelectArtPiece={handleSelectArtPiece}
            onOpenStory={(idx) => setActiveStoryIndex(idx)}
          />
        )}

        {currentPage === 'journal' && <BlogPage />}

        {currentPage === 'article' && (
          <ArticleDetailPage articleId={currentArticleId} />
        )}
        
        {currentPage === 'atelier' && <AtelierPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onOpenQuoteSummary={() => setIsQuoteModalOpen(true)}
      />

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <AtelierStoryModal
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onConfigureFromStory={() => navigateTo('sur-mesure')}
        />
      )}

      {/* Proforma Quote / Invoice Modal */}
      {isQuoteModalOpen && (
        <QuoteEngineModal
          config={config}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErpProvider>
        <CartProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </CartProvider>
      </ErpProvider>
    </ThemeProvider>
  );
};

export default App;
