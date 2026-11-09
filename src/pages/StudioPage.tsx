import React from 'react';
import { StudioConfigurator } from '../components/StudioConfigurator';
import type { QuoteConfiguration } from '../types';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

interface StudioPageProps {
  config: QuoteConfiguration;
  onChangeConfig: (newConfig: QuoteConfiguration) => void;
  onOpenQuoteSummary: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  config,
  onChangeConfig,
  onOpenQuoteSummary
}) => {
  const { navigateTo } = useNavigation();
  const { tr } = useLanguage();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">
          {tr('Accueil', 'Home')}
        </button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">
          {tr('Atelier Sur-Mesure', 'Bespoke Workshop')}
        </span>
      </nav>

      <StudioConfigurator
        config={config}
        onChangeConfig={onChangeConfig}
        onOpenQuoteSummary={onOpenQuoteSummary}
      />
    </div>
  );
};
