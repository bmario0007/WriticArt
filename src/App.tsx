import React, { Suspense, lazy, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';

// Lazy-loaded pages & modals (isolates ERP + Cloud tools + secondary routes from initial bundle)
const AdminERP = lazy(() =>
  import('./components/erp/AdminERP').then((m) => ({ default: m.AdminERP }))
);
const AtelierStoryModal = lazy(() =>
  import('./components/AtelierStoryModal').then((m) => ({ default: m.AtelierStoryModal }))
);
const QuoteEngineModal = lazy(() =>
  import('./components/QuoteEngineModal').then((m) => ({ default: m.QuoteEngineModal }))
);
const TableauxPage = lazy(() =>
  import('./pages/TableauxPage').then((m) => ({ default: m.TableauxPage }))
);
const BoxPage = lazy(() =>
  import('./pages/BoxPage').then((m) => ({ default: m.BoxPage }))
);
const ShopPage = lazy(() =>
  import('./pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const WriticLovePage = lazy(() =>
  import('./pages/WriticLovePage').then((m) => ({ default: m.WriticLovePage }))
);
const StudioPage = lazy(() =>
  import('./pages/StudioPage').then((m) => ({ default: m.StudioPage }))
);
const OraclePage = lazy(() =>
  import('./pages/OraclePage').then((m) => ({ default: m.OraclePage }))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);
const AtelierPage = lazy(() =>
  import('./pages/AtelierPage').then((m) => ({ default: m.AtelierPage }))
);
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const ArticleDetailPage = lazy(() =>
  import('./pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const OrderTrackingPage = lazy(() =>
  import('./pages/OrderTrackingPage').then((m) => ({ default: m.OrderTrackingPage }))
);

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ErpProvider } from './context/ErpContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CurrencyProvider } from './context/CurrencyContext';

import type { QuoteConfiguration, DailyThought, GalleryItem } from './types';

const PageLoader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => (
  <div
    className={`flex flex-col items-center justify-center space-y-3 ${
      fullScreen ? 'min-h-screen bg-[#121110] text-[#FAF8F5]' : 'min-h-[55vh] py-20'
    }`}
  >
    <div className="w-10 h-10 rounded-full border-2 border-[#C5A059]/30 border-t-[#E68314] animate-spin" />
    <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.25em] text-[#B86209] dark:text-[#E68314]">
      WriticArt
    </span>
  </div>
);

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
    customTitle: 'Coffret WriticLove — 365 + 1 Cartes',
    customNames: 'Pour l’amour de ma vie',
    customMessage: 'Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent.',
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
      customTitle: `Pensée WriticLove • ${thought.date}`,
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
    return (
      <Suspense fallback={<PageLoader fullScreen />}>
        <AdminERP />
      </Suspense>
    );
  }

  // Otherwise render separate pages with shared Navbar & Footer
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#121110] text-[#1E1C1A] dark:text-[#FAF8F5] transition-colors duration-300">
      
      {/* Navigation bar with FR/EN + FCFA/EUR selectors, separate pages & cart drawer */}
      <Navbar />

      {/* DEDICATED SEPARATE PAGES (No continuous feed) */}
      <main className="flex-1" id="main-content">
        {currentPage === 'home' ? (
          <HomePage />
        ) : (
          <Suspense fallback={<PageLoader />}>
            {currentPage === 'tableaux' && <TableauxPage />}
            {currentPage === 'writiclove' && <WriticLovePage />}
            {currentPage === 'box' && <BoxPage />}
            {currentPage === 'boutique' && <ShopPage />}
            {currentPage === 'product-detail' && (
              <ProductDetailPage productId={currentProductId} />
            )}
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
            {currentPage === 'suivi-commande' && <OrderTrackingPage />}
            {currentPage === 'atelier' && <AtelierPage />}
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onOpenQuoteSummary={() => setIsQuoteModalOpen(true)}
      />

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <Suspense fallback={null}>
          <AtelierStoryModal
            initialIndex={activeStoryIndex}
            onClose={() => setActiveStoryIndex(null)}
            onConfigureFromStory={() => navigateTo('sur-mesure')}
          />
        </Suspense>
      )}

      {/* Proforma Quote / Invoice Modal */}
      {isQuoteModalOpen && (
        <Suspense fallback={null}>
          <QuoteEngineModal
            config={config}
            onClose={() => setIsQuoteModalOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErpProvider>
          <CurrencyProvider>
            <CartProvider>
              <NavigationProvider>
                <AppContent />
              </NavigationProvider>
            </CartProvider>
          </CurrencyProvider>
        </ErpProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
