import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, PhoneCall, Heart, FileText, Sun, Moon } from 'lucide-react';
import { atelierAudio } from '../utils/soundEffects';
import { InstagramIcon } from './InstagramIcon';
import logoLight from '../assets/brand/logo-light.jpg';
import logoDark from '../assets/brand/logo-dark.jpg';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenConfigurator: () => void;
  onOpenOracle: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConfigurator, onOpenOracle, cartCount = 0 }) => {
  const [isMuted, setIsMuted] = useState(atelierAudio.isMuted);
  const { toggleTheme, isDark } = useTheme();

  const toggleSound = () => {
    atelierAudio.isMuted = !atelierAudio.isMuted;
    setIsMuted(atelierAudio.isMuted);
    if (!atelierAudio.isMuted) {
      atelierAudio.playGoldChime();
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#121110]/95 border-b border-[#E8DFD1]/70 dark:border-[#2A2622] transition-colors duration-300">
      
      {/* Top micro contact banner */}
      <div className="bg-[#181716] dark:bg-[#0A0909] text-[#FAF8F5] text-[11px] py-1.5 px-4 font-sans tracking-wide border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-['Cinzel'] tracking-wider text-[#E68314] font-semibold">
              WriticArt • Dakar, Sénégal
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline italic text-white/80">
              « Transformer les mots en œuvres »
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/221772348521" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-[#25D366] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#25D366]" />
              <span className="font-semibold">+221 77 234 85 21</span>
            </a>
            <span className="text-white/40">|</span>
            <a 
              href="mailto:kaynubind@gmail.com"
              className="hover:text-[#E68314] transition-colors hidden md:inline"
            >
              kaynubind@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo - Automatically adapts to Light / Dark Mode */}
          <a href="#" className="flex items-center space-x-2 sm:space-x-3 group">
            <img
              src={isDark ? logoDark : logoLight}
              alt="WriticArt Logo"
              className="h-9 sm:h-12 w-auto object-contain rounded transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-widest font-['Cinzel'] font-medium text-[#4A453F] dark:text-[#D5CDBD]">
            <a 
              href="#writiclove" 
              className="flex items-center space-x-1.5 text-[#B86209] dark:text-[#E68314] hover:text-[#181716] dark:hover:text-white transition-colors font-bold"
            >
              <Heart className="w-3.5 h-3.5 fill-[#E68314] text-[#E68314]" />
              <span>Coffret Writic'Love</span>
            </a>
            <a 
              href="#oracle" 
              onClick={(e) => { e.preventDefault(); onOpenOracle(); }}
              className="flex items-center space-x-1.5 hover:text-[#B86209] dark:hover:text-[#E68314] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E68314]" />
              <span>365 Cartes</span>
            </a>
            <a 
              href="#studio" 
              onClick={(e) => { e.preventDefault(); onOpenConfigurator(); }}
              className="hover:text-[#B86209] dark:hover:text-[#E68314] transition-colors"
            >
              Studio Sur-Mesure
            </a>
            <a href="#galerie" className="hover:text-[#B86209] dark:hover:text-[#E68314] transition-colors">
              Tableaux & Cadres
            </a>
            <a href="#manifeste" className="hover:text-[#B86209] dark:hover:text-[#E68314] transition-colors">
              L'Atelier
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Day / Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Passer en mode jour" : "Passer en mode nuit (Atelier nocturne)"}
              className="p-1.5 sm:p-2 rounded-full border border-[#E2D8C7] dark:border-[#38332E] bg-white/70 dark:bg-[#1A1816] text-[#6D655E] dark:text-[#E68314] hover:border-[#E68314] transition-all flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E68314] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7A7167] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Audio tactile ambience toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Activer l'ambiance sonore tactile de l'atelier" : "Couper le son"}
              className={`p-1.5 sm:p-2 rounded-full border text-xs flex items-center space-x-1 transition-all ${
                !isMuted 
                  ? 'border-[#E68314] bg-[#E68314]/10 text-[#B86209] dark:text-[#E68314]' 
                  : 'border-[#E2D8C7] dark:border-[#38332E] text-[#9A9084] dark:text-[#8C8277] hover:text-[#4A453F]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E68314] animate-pulse" />}
              <span className="hidden sm:inline text-[11px] font-sans">
                {!isMuted ? 'Son On' : 'Son'}
              </span>
            </button>

            {/* Direct Instagram Link */}
            <a
              href="https://www.instagram.com/writicart"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-[#6D655E] dark:text-[#A69C91] hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-colors"
              title="Voir @writicart sur Instagram"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Customizer Button with count */}
            <button
              onClick={onOpenConfigurator}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-[#DED4C3] dark:border-[#38332E] bg-white dark:bg-[#1A1816] text-xs font-['Cinzel'] text-[#181716] dark:text-[#FAF8F5] hover:border-[#E68314] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#E68314]" />
              <span>Devis ({cartCount})</span>
            </button>

            {/* CTA WhatsApp Direct Order */}
            <a
              href="https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20des%20informations%20sur%20vos%20créations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#25D366] text-white text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-['Cinzel'] font-bold hover:bg-[#1EBE5D] transition-all shadow-md hover:shadow-lg"
            >
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">WhatsApp Direct</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
