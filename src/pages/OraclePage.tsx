import React from 'react';
import { DailyThoughtOracle } from '../components/DailyThoughtOracle';
import type { DailyThought } from '../types';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

interface OraclePageProps {
  onUseThoughtInStudio: (thought: DailyThought) => void;
}

export const OraclePage: React.FC<OraclePageProps> = ({ onUseThoughtInStudio }) => {
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
          {tr('La Pensée du Jour', 'Thought of the Day')}
        </span>
      </nav>

      <DailyThoughtOracle onUseThoughtInStudio={onUseThoughtInStudio} />
    </div>
  );
};
