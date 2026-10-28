import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Eye, 
  FileText,
  PhoneCall
} from 'lucide-react';
import type { 
  QuoteConfiguration, 
  EventType, 
  PaperType, 
  InkType, 
  CalligraphyStyle, 
  WaxColor, 
  WaxStamp 
} from '../types';
import { atelierAudio } from '../utils/soundEffects';

interface StudioConfiguratorProps {
  config: QuoteConfiguration;
  onChangeConfig: (newConfig: QuoteConfiguration) => void;
  onOpenQuoteSummary: () => void;
}

export const StudioConfigurator: React.FC<StudioConfiguratorProps> = ({
  config,
  onChangeConfig,
  onOpenQuoteSummary
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'envelope'>('card');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const update = (partial: Partial<QuoteConfiguration>) => {
    onChangeConfig({ ...config, ...partial });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -y * 0.05, y: x * 0.05 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Dynamic pricing calculation in FCFA (and EUR)
  const getBasePrice = () => {
    // Base unit price in FCFA
    let unitFCFA = 3000;
    if (config.eventType === 'tableau') unitFCFA = 35000;
    else if (config.eventType === 'cadre') unitFCFA = 20000;
    else if (config.eventType === 'writiclove') unitFCFA = 30000;

    if (config.paperType === 'deckle-edge') unitFCFA += 1500;
    if (config.paperType === 'parchemin-or') unitFCFA += 2000;
    if (config.paperType === 'noir-nuit') unitFCFA += 1800;

    if (config.inkType === 'or-24k') unitFCFA += 2500;
    if (config.inkType === 'blanc-nacré') unitFCFA += 1500;

    if (config.hasWaxSeal) unitFCFA += 1200;
    if (config.hasSilkRibbon) unitFCFA += 1000;
    if (config.hasGoldLeafFoil) unitFCFA += 1800;
    if (config.hasHandmadeEnvelope) unitFCFA += 1500;

    const totalFCFA = unitFCFA * config.quantity;
    const rushMultiplier = config.rushOrder ? 1.25 : 1.0;
    const finalFCFA = totalFCFA * rushMultiplier;
    const finalEUR = (finalFCFA / 655.957).toFixed(2);

    return {
      unitPriceFCFA: unitFCFA.toLocaleString('fr-FR'),
      totalPriceFCFA: Math.round(finalFCFA).toLocaleString('fr-FR'),
      totalEUR: finalEUR
    };
  };

  const pricing = getBasePrice();

  // Color mapping for wax seals
  const waxColorMap = {
    bordeaux: {
      bg: 'from-[#801C28] via-[#65151F] to-[#430D14]',
      border: 'border-[#9E2A38]',
      text: 'text-[#F3D69B]',
      shadow: 'rgba(101, 21, 31, 0.4)'
    },
    emeraude: {
      bg: 'from-[#1B4332] via-[#143427] to-[#0B1E16]',
      border: 'border-[#2D6A4F]',
      text: 'text-[#D8F3DC]',
      shadow: 'rgba(20, 52, 39, 0.4)'
    },
    or: {
      bg: 'from-[#E68314] via-[#C46A0B] to-[#783F04]',
      border: 'border-[#EED697]',
      text: 'text-[#FFF7DC]',
      shadow: 'rgba(230, 131, 20, 0.4)'
    },
    noir: {
      bg: 'from-[#2B2927] via-[#1C1B1A] to-[#121110]',
      border: 'border-[#4A4744]',
      text: 'text-[#D9D3CE]',
      shadow: 'rgba(28, 27, 26, 0.4)'
    }
  };

  const currentWax = waxColorMap[config.waxColor];

  // Paper styling
  const getPaperClasses = () => {
    switch (config.paperType) {
      case 'deckle-edge':
        return 'bg-[#FAF7F2] text-[#1E1C1A] border-[#DED4C3] shadow-[0_20px_45px_rgba(78,59,39,0.12)]';
      case 'parchemin-or':
        return 'bg-gradient-to-br from-[#F5EEDC] via-[#EFE6CF] to-[#E3D6B5] text-[#292218] border-[#CFBE9B] shadow-2xl';
      case 'noir-nuit':
        return 'bg-[#181716] text-[#FAF8F5] border-[#383431] shadow-2xl';
      case 'coton-350':
      default:
        return 'bg-[#FFFFFF] text-[#1E1C1A] border-[#E8DFD1] shadow-xl';
    }
  };

  // Ink calligraphy styling
  const getInkStyle = () => {
    switch (config.inkType) {
      case 'or-24k':
        return 'gold-foil-shimmer font-semibold';
      case 'sepia':
        return 'text-[#61452D]';
      case 'blanc-nacré':
        return 'text-[#FBF9F5] drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]';
      case 'encre-chine':
      default:
        return config.paperType === 'noir-nuit' ? 'text-[#FAF8F5]' : 'text-[#181716]';
    }
  };

  const getFontFamily = () => {
    switch (config.calligraphyStyle) {
      case 'spencerian':
        return "font-['Great_Vibes']";
      case 'editorial':
        return "font-['Cormorant_Garamond'] italic";
      case 'brush-moderne':
        return "font-['Alex_Brush']";
      case 'gothique-poetique':
      default:
        return "font-['Cinzel']";
    }
  };

  return (
    <section id="studio" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#B86209] font-['Cinzel'] font-semibold">
            <Sparkles className="w-4 h-4 text-[#E68314]" />
            <span>Configurateur d'Atelier • Sur-Mesure WriticArt</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#181716]">
            Configurez Votre Création Unique
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B635B] font-light">
            Tableau d'art, cadre poétique, coffret personnalisé ou papeterie nuptiale : composez votre support, vos pigments et vos vœux avec devis instantané en FCFA.
          </p>
        </div>

        {/* Studio Grid: Controls & 3D Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: 3D Interactive Canvas & Live Preview (Sticky ONLY on desktop lg:) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-6">
            
            {/* Canvas controls header */}
            <div className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-[#E8DFD1] shadow-sm">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    atelierAudio.playPaperSlide();
                    setViewMode('card');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-['Cinzel'] tracking-wider transition-all ${
                    viewMode === 'card'
                      ? 'bg-[#181716] text-white shadow-sm'
                      : 'text-[#70675E] hover:text-[#181716]'
                  }`}
                >
                  Vue Carte / Toile
                </button>
                <button
                  onClick={() => {
                    atelierAudio.playWaxStamp();
                    setViewMode('envelope');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-['Cinzel'] tracking-wider transition-all ${
                    viewMode === 'envelope'
                      ? 'bg-[#181716] text-white shadow-sm'
                      : 'text-[#70675E] hover:text-[#181716]'
                  }`}
                >
                  Vue Enveloppe & Sceau
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#8A7F75] font-sans">
                <Eye className="w-3.5 h-3.5 text-[#E68314]" />
                <span className="hidden sm:inline">Rendu 3D en direct</span>
              </div>
            </div>

            {/* 3D Stage */}
            <div
              className="relative min-h-[380px] sm:min-h-[520px] rounded-3xl bg-gradient-to-b from-[#F2ECE1] to-[#E7DEC5]/40 p-4 sm:p-12 flex items-center justify-center perspective-1000 overflow-hidden border border-[#DED2BF]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* Background table grain simulation */}
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#181716_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* VIEW MODE: ENVELOPE */}
              {viewMode === 'envelope' ? (
                <div
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-[#EBE4D5] border border-[#D5C7B2] shadow-2xl p-6 flex flex-col justify-between items-center transform-style-3d paper-deckle-edge"
                >
                  {/* Flap triangle */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#DFD5C2] [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-[#C8BBA4] shadow-md z-10" />

                  {/* Envelope Address Area */}
                  <div className="relative z-20 text-center mt-auto mb-auto w-full px-4">
                    <p className="text-[10px] uppercase font-['Cinzel'] tracking-[0.25em] text-[#8C8074] mb-2">
                      À l'attention de
                    </p>
                    <p className={`text-2xl sm:text-3xl ${getFontFamily()} ${getInkStyle()} truncate`}>
                      {config.customNames || 'Madame, Monsieur'}
                    </p>
                    <p className="text-xs font-['Cormorant_Garamond'] italic text-[#7E7469] mt-1">
                      {config.customTitle || 'Création Personnalisée WriticArt'}
                    </p>
                  </div>

                  {/* 3D Wax Seal */}
                  {config.hasWaxSeal && (
                    <div 
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-gradient-to-br ${currentWax.bg} border-2 ${currentWax.border} shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}
                      style={{ boxShadow: `0 12px 25px ${currentWax.shadow}` }}
                    >
                      <div className="w-12 h-12 rounded-full border border-dashed border-white/30 flex items-center justify-center">
                        <span className={`font-['Cinzel'] text-sm font-bold tracking-widest ${currentWax.text}`}>
                          {config.waxStamp === 'monogramme' ? 'WA' : config.waxStamp === 'coeur' ? '♥' : '⚜'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Silk ribbon simulation */}
                  {config.hasSilkRibbon && (
                    <div className="absolute inset-y-0 w-8 bg-[#EFE9DC]/90 left-12 border-x border-[#DDD2BE] shadow-sm z-0 pointer-events-none" />
                  )}

                  <div className="w-full flex justify-between items-center text-[10px] text-[#8C8074] font-['Cinzel'] tracking-wider z-20">
                    <span>Atelier WriticArt Dakar</span>
                    <span>Scellé à la cire</span>
                  </div>
                </div>
              ) : (
                /* VIEW MODE: CARD */
                <div
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out'
                  }}
                  className={`relative w-full max-w-[440px] rounded-2xl sm:rounded-3xl p-5 sm:p-10 border transition-all duration-300 transform-style-3d paper-deckle-edge ${getPaperClasses()}`}
                >
                  
                  {/* Gold leaf foil border if enabled */}
                  {config.hasGoldLeafFoil && (
                    <div className="absolute inset-2.5 rounded-2xl border border-[#E68314]/40 pointer-events-none" />
                  )}

                  {/* Silk Ribbon across the top */}
                  {config.hasSilkRibbon && (
                    <div className="absolute top-0 right-8 sm:right-12 w-5 sm:w-6 h-12 sm:h-16 bg-gradient-to-b from-[#EFE5D5] to-[#D5C4A9] shadow-md rounded-b-md z-20 border-x border-[#BFAFA0] pointer-events-none" />
                  )}

                  {/* Header Monogram / Brand */}
                  <div className="text-center pb-3 sm:pb-4 border-b border-black/10">
                    <span className="text-[9px] sm:text-[10px] uppercase font-['Cinzel'] tracking-[0.25em] opacity-60 block">
                      WriticArt • Transformer les mots en œuvres
                    </span>
                    <h3 className={`text-2xl sm:text-4xl mt-2 mb-1 ${getFontFamily()} ${getInkStyle()}`}>
                      {config.customTitle || 'Titre de Votre Création'}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-['Cinzel'] tracking-widest opacity-70">
                      {config.customNames || 'Noms des Destinataires'}
                    </p>
                  </div>

                  {/* Handwritten Message Body */}
                  <div className="py-5 sm:py-8 text-center min-h-[110px] sm:min-h-[140px] flex items-center justify-center">
                    <p className={`text-base sm:text-2xl ${getFontFamily()} ${getInkStyle()} leading-relaxed px-1 sm:px-2`}>
                      « {config.customMessage || 'Votre texte manuscrit ou déclaration apparaîtra ici avec les pigments choisis.'} »
                    </p>
                  </div>

                  {/* Card Footer with Wax Stamp */}
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-['Cinzel'] tracking-wider opacity-60 block">
                        Finition d'Art
                      </span>
                      <span className="text-xs font-sans font-medium">
                        {config.paperType === 'deckle-edge' && 'Papier Coton Frangé 350g'}
                        {config.paperType === 'parchemin-or' && 'Parchemin Vénitien Doré'}
                        {config.paperType === 'noir-nuit' && 'Papier Noir Minéral'}
                        {config.paperType === 'coton-350' && 'Vélin Blanc 350g'}
                      </span>
                    </div>

                    {/* Wax Stamp Seal icon */}
                    {config.hasWaxSeal && (
                      <div 
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentWax.bg} border ${currentWax.border} shadow-md flex items-center justify-center`}
                      >
                        <span className={`font-['Cinzel'] text-xs font-bold ${currentWax.text}`}>
                          {config.waxStamp === 'monogramme' ? 'WA' : config.waxStamp === 'coeur' ? '♥' : '⚜'}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Price Preview Card in FCFA */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFD1] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#8A8075] uppercase font-['Cinzel'] tracking-wider">
                  Estimation Chiffrée ({config.quantity} {config.quantity > 1 ? 'exemplaires' : 'pièce'})
                </p>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-['Cormorant_Garamond'] font-bold text-[#181716]">
                    {pricing.totalPriceFCFA} FCFA
                  </span>
                  <span className="text-xs text-[#8A8075]">
                    (~{pricing.totalEUR} €)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    atelierAudio.playWaxStamp();
                    onOpenQuoteSummary();
                  }}
                  className="px-5 py-3 rounded-full bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-widest font-['Cinzel'] hover:bg-[#E68314] transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E68314]" />
                  <span>Voir le Devis</span>
                </button>

                <a
                  href={`https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20commander%20une%20création%20sur-mesure%20:%20${encodeURIComponent(config.customTitle)}%20-%20Total%20estimé%20:%20${pricing.totalPriceFCFA}%20FCFA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all shadow-md"
                  title="Commander directement sur WhatsApp"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: Customization Parameters */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Event & Product Category */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm space-y-3">
              <label className="block text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
                1. Type d'Œuvre WriticArt
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'writiclove', label: 'Coffret 365 Jours', icon: '❤️' },
                  { id: 'tableau', label: 'Tableau d’Art sur Toile', icon: '🎨' },
                  { id: 'cadre', label: 'Cadre Poétique Déco', icon: '🖼️' },
                  { id: 'mariage', label: 'Mariage & Galas', icon: '💍' },
                ].map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => {
                      atelierAudio.playPaperSlide();
                      update({ eventType: ev.id as EventType });
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      config.eventType === ev.id
                        ? 'border-[#E68314] bg-[#FFF8F0] ring-1 ring-[#E68314]'
                        : 'border-[#ECE4D8] hover:border-[#D5C7B2]'
                    }`}
                  >
                    <span className="text-lg block mb-1">{ev.icon}</span>
                    <span className="block text-xs font-medium text-[#292623]">{ev.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Selection */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm space-y-3">
              <label className="block text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
                2. Papier d'Art & Support
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'deckle-edge', title: 'Coton Bord Frangé', desc: 'Bords effilochés à la main 350g' },
                  { id: 'parchemin-or', title: 'Parchemin Vénitien', desc: 'Nuance dorée patinée à la flamme' },
                  { id: 'noir-nuit', title: 'Noir Nuit Minéral', desc: 'Papier d’ébène velouté pour or' },
                  { id: 'coton-350', title: 'Vélin Blanc Crème', desc: 'Grain pur classique intemporel' },
                ].map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => {
                      atelierAudio.playPaperSlide();
                      update({ paperType: paper.id as PaperType });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      config.paperType === paper.id
                        ? 'border-[#E68314] bg-[#FFF8F0] ring-1 ring-[#E68314]'
                        : 'border-[#ECE4D8] hover:border-[#D5C7B2]'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-[#181716] font-['Cinzel']">
                      {paper.title}
                    </span>
                    <span className="block text-[11px] text-[#7E7469] mt-0.5">
                      {paper.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ink & Calligraphy Style */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm space-y-4">
              <label className="block text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
                3. Plume & Pigments Minéraux
              </label>

              {/* Ink choice */}
              <div>
                <span className="text-[11px] font-sans text-[#70675E] block mb-2">Pigment de l'encre :</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'or-24k', label: 'Dorure Or 24K en relief' },
                    { id: 'encre-chine', label: 'Encre de Chine Noire' },
                    { id: 'sepia', label: 'Sépia Vénitien Noyer' },
                    { id: 'blanc-nacré', label: 'Encre Blanche Opaque' },
                  ].map((ink) => (
                    <button
                      key={ink.id}
                      onClick={() => {
                        atelierAudio.playPenStroke();
                        update({ inkType: ink.id as InkType });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        config.inkType === ink.id
                          ? 'border-[#E68314] bg-[#FFF8F0] text-[#B86209] ring-1 ring-[#E68314]'
                          : 'border-[#ECE4D8] text-[#554E46]'
                      }`}
                    >
                      {ink.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calligraphy font style */}
              <div>
                <span className="text-[11px] font-sans text-[#70675E] block mb-2">Style Calligraphique :</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'spencerian', label: 'Spencerian Romantique', font: "font-['Great_Vibes'] text-base" },
                    { id: 'editorial', label: 'Éditorial Sérif', font: "font-['Cormorant_Garamond'] italic text-sm" },
                    { id: 'brush-moderne', label: 'Brush Artistique', font: "font-['Alex_Brush'] text-base" },
                    { id: 'gothique-poetique', label: 'Lapidaire Majuscule', font: "font-['Cinzel'] text-xs" },
                  ].map((sty) => (
                    <button
                      key={sty.id}
                      onClick={() => {
                        atelierAudio.playPenStroke();
                        update({ calligraphyStyle: sty.id as CalligraphyStyle });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        config.calligraphyStyle === sty.id
                          ? 'border-[#E68314] bg-[#FFF8F0] text-[#B86209] ring-1 ring-[#E68314]'
                          : 'border-[#ECE4D8] text-[#554E46]'
                      }`}
                    >
                      <span className={`block ${sty.font}`}>{sty.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sceau de Cire & Finitions */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
                  4. Sceau de Cire & Finitions
                </label>
                <input
                  type="checkbox"
                  checked={config.hasWaxSeal}
                  onChange={(e) => update({ hasWaxSeal: e.target.checked })}
                  className="rounded text-[#E68314] focus:ring-[#E68314]"
                />
              </div>

              {config.hasWaxSeal && (
                <div className="space-y-3 pt-2 border-t border-[#ECE4D8]">
                  <span className="text-[11px] font-sans text-[#70675E] block">Nuance de la cire :</span>
                  <div className="flex items-center space-x-3">
                    {[
                      { id: 'or', label: 'Or WriticArt', colorClass: 'bg-[#E68314]' },
                      { id: 'bordeaux', label: 'Bordeaux', colorClass: 'bg-[#6E1A24]' },
                      { id: 'emeraude', label: 'Émeraude', colorClass: 'bg-[#1B4332]' },
                      { id: 'noir', label: 'Noir Mat', colorClass: 'bg-[#181716]' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() => {
                          atelierAudio.playWaxStamp();
                          update({ waxColor: w.id as WaxColor });
                        }}
                        className={`w-9 h-9 rounded-full ${w.colorClass} border-2 transition-all flex items-center justify-center ${
                          config.waxColor === w.id
                            ? 'border-[#181716] scale-110 shadow-md ring-2 ring-[#E68314]/50'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={w.label}
                      >
                        {config.waxColor === w.id && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>

                  {/* Stamp engraving pattern */}
                  <div className="pt-2">
                    <span className="text-[11px] font-sans text-[#70675E] block mb-1.5">Motif gravé :</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'monogramme', label: 'Logo WA' },
                        { id: 'coeur', label: 'Cœur Sacré' },
                        { id: 'fleur-de-lys', label: 'Fleur de Lys' },
                        { id: 'olivier', label: 'Olivier' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => {
                            atelierAudio.playWaxStamp();
                            update({ waxStamp: st.id as WaxStamp });
                          }}
                          className={`p-2 rounded-xl border text-[11px] text-center font-['Cinzel'] transition-all ${
                            config.waxStamp === st.id
                              ? 'border-[#E68314] bg-[#FFF8F0] text-[#B86209] font-bold'
                              : 'border-[#ECE4D8] text-[#554E46]'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Content Inputs */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm space-y-4">
              <label className="block text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
                5. Votre Texte & Noms Personnalisés
              </label>

              <div>
                <span className="text-[11px] font-sans text-[#70675E] block mb-1">Titre ou Occasion :</span>
                <input
                  type="text"
                  value={config.customTitle}
                  onChange={(e) => update({ customTitle: e.target.value })}
                  placeholder="Ex : Tableau Anniversaire de Mariage"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm focus:outline-none focus:border-[#E68314] font-sans"
                />
              </div>

              <div>
                <span className="text-[11px] font-sans text-[#70675E] block mb-1">Destinataires / Noms :</span>
                <input
                  type="text"
                  value={config.customNames}
                  onChange={(e) => update({ customNames: e.target.value })}
                  placeholder="Ex : Mariama & Ousmane"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm focus:outline-none focus:border-[#E68314] font-sans"
                />
              </div>

              <div>
                <span className="text-[11px] font-sans text-[#70675E] block mb-1">Message ou Vœux manuscrits :</span>
                <textarea
                  rows={3}
                  value={config.customMessage}
                  onChange={(e) => update({ customMessage: e.target.value })}
                  placeholder="Ex : Que chaque jour passé à tes côtés soit une œuvre d'amour éternelle."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm focus:outline-none focus:border-[#E68314] font-sans"
                />
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-sans text-[#70675E]">Quantité souhaitée :</span>
                  <span className="text-xs font-semibold font-['Cinzel'] text-[#181716]">{config.quantity} {config.quantity > 1 ? 'pièces' : 'pièce unique'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={config.quantity}
                  onChange={(e) => update({ quantity: parseInt(e.target.value) || 1 })}
                  className="w-full accent-[#E68314]"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
