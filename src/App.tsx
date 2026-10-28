import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WriticLoveCoffrets } from './components/WriticLoveCoffrets';
import { DailyThoughtOracle } from './components/DailyThoughtOracle';
import { StudioConfigurator } from './components/StudioConfigurator';
import { InstagramGallery } from './components/InstagramGallery';
import { AtelierStoryModal } from './components/AtelierStoryModal';
import { QuoteEngineModal } from './components/QuoteEngineModal';
import { AtelierManifesto } from './components/AtelierManifesto';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import type { QuoteConfiguration, DailyThought, GalleryItem } from './types';
import type { WriticProduct } from './data/productsData';

const AppContent: React.FC = () => {
  // Global bespoke order state
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

  // Scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks to customize vows with a coffret
  const handleConfigureCustomVows = (product: WriticProduct) => {
    setConfig((prev) => ({
      ...prev,
      eventType: 'writiclove',
      customTitle: product.name,
      customNames: 'Nos Noms',
      customMessage: product.sampleCards[0] || 'De petits mots pour de grands changements.',
      quantity: 1,
      waxColor: product.colorScheme === 'noir-or' ? 'noir' : product.colorScheme === 'rose-or' ? 'bordeaux' : 'or'
    }));
    scrollTo('studio');
  };

  // When user picks a Daily Thought to turn into a physical card
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
    scrollTo('studio');
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
    scrollTo('studio');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#121110] text-[#1E1C1A] dark:text-[#FAF8F5] transition-colors duration-300">
      
      {/* Navigation bar with Day/Night toggle */}
      <Navbar
        onOpenConfigurator={() => scrollTo('studio')}
        onOpenOracle={() => scrollTo('oracle')}
        cartCount={config.quantity}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero with Interactive 3D Card & Official Brand */}
        <Hero
          onStartConfigurator={() => scrollTo('studio')}
          onOpenOracle={() => scrollTo('oracle')}
        />

        {/* The Flagship 365 Jours d'Amour Coffrets */}
        <WriticLoveCoffrets
          onConfigureCustomVows={handleConfigureCustomVows}
        />

        {/* The Daily Thought Oracle ("Une carte par jour" @writicart identity) */}
        <DailyThoughtOracle
          onUseThoughtInStudio={handleUseThoughtInStudio}
        />

        {/* 3D Studio & Live Customizer in FCFA */}
        <StudioConfigurator
          config={config}
          onChangeConfig={setConfig}
          onOpenQuoteSummary={() => setIsQuoteModalOpen(true)}
        />

        {/* Instagram Feed Gallery & Highlights */}
        <InstagramGallery
          onSelectArtPiece={handleSelectArtPiece}
          onOpenStory={(idx) => setActiveStoryIndex(idx)}
        />

        {/* Atelier Craftsmanship & Manifesto */}
        <AtelierManifesto />

      </main>

      {/* Footer */}
      <Footer />

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <AtelierStoryModal
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onConfigureFromStory={() => scrollTo('studio')}
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
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
