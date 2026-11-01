import React, { useState } from 'react';
import { Volume2, VolumeX, PhoneCall, Heart, Sun, Moon, ShoppingBag, ShieldCheck, Menu, X } from 'lucide-react';
import { atelierAudio } from '../utils/soundEffects';
import logoLight from '../assets/brand/logo-light.jpg';
import logoDark from '../assets/brand/logo-dark.jpg';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(atelierAudio.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { cartCount, openCart } = useCart();
  const { currentPage, navigateTo } = useNavigation();

  const toggleSound = () => {
    atelierAudio.isMuted = !atelierAudio.isMuted;
    setIsMuted(atelierAudio.isMuted);
    if (!atelierAudio.isMuted) {
      atelierAudio.playGoldChime();
    }
  };

  const navLinks = [
    { id: 'boutique', label: 'Boutique' },
    { id: 'writiclove', label: 'Coffret 365 Jours', isHeart: true },
    { id: 'sur-mesure', label: 'Sur-Mesure' },
    { id: 'pensee', label: 'La Pensée du Jour' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'atelier', label: "L'Atelier" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#121110]/95 border-b border-[#E8DFD1]/70 dark:border-[#2A2622] transition-colors duration-300">
      
      {/* Top Announcement Bar (Rahiya style) */}
      <div className="bg-[#181716] dark:bg-[#0A0909] text-[#FAF8F5] text-[11px] py-1.5 px-4 font-sans tracking-wide border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-['Cinzel'] text-[#E68314] font-semibold">✦ ATELIER WRITICART DAKAR</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline italic text-white/80">« Transformer les mots en œuvres »</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/70">Coffrets 365 Jours d'Amour disponibles pour commande immédiate</span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/221772348521" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-[#25D366] transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#25D366]" />
              <span>+221 77 234 85 21</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-['Cinzel'] font-semibold text-[#4A453F] dark:text-[#D5CDBD]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id as any)}
                  className={`flex items-center space-x-1.5 transition-colors py-1 ${
                    isActive
                      ? 'text-[#E68314] border-b-2 border-[#E68314] font-bold'
                      : 'hover:text-[#B86209] dark:hover:text-[#E68314]'
                  }`}
                >
                  {link.isHeart && <Heart className="w-3 h-3 fill-[#E68314] text-[#E68314]" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Center Brand Logo */}
          <button onClick={() => navigateTo('home')} className="flex items-center space-x-2 group">
            <img
              src={isDark ? logoDark : logoLight}
              alt="WriticArt Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Right Controls: Sound, Theme, Admin ERP, Cart */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#70675E] dark:text-[#A8A096] transition-colors"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E68314]" />}
            </button>

            {/* Theme Toggle (Day / Night) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#70675E] dark:text-[#A8A096] transition-colors"
              title={isDark ? 'Passer en mode Jour' : 'Passer en mode Nuit'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F3D69B] hover:rotate-90 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#181716] hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* ADMIN ERP BUTTON (Accès à la page dédiée ERP) */}
            <button
              onClick={() => navigateTo('erp')}
              className={`hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-[11px] font-['Cinzel'] tracking-wider uppercase font-bold transition-all ${
                currentPage === 'erp'
                  ? 'bg-[#E68314] text-white border-[#E68314]'
                  : 'border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] bg-white/70 dark:bg-[#1C1A18] text-[#181716] dark:text-[#FAF8F5]'
              }`}
              title="Accéder au Mode ERP Administrateur"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" />
              <span>Espace ERP</span>
            </button>

            {/* Cart Drawer Trigger (Rahiya / Shopify style) */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all shadow-md group"
              title="Ouvrir le Panier"
            >
              <ShoppingBag className="w-4 h-4 text-[#E68314] group-hover:text-white transition-colors" />
              <span className="text-xs font-['Cinzel'] font-bold hidden sm:inline">
                Panier
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E68314] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#181716] dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] space-y-3 text-xs uppercase font-['Cinzel'] font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(link.id as any);
                }}
                className={`block w-full text-left py-2 ${
                  currentPage === link.id
                    ? 'text-[#E68314] font-bold'
                    : 'text-[#181716] dark:text-white hover:text-[#E68314]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#E8DFD1] dark:border-[#2E2A26]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('erp');
                }}
                className="w-full py-2.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#DED4C3] dark:border-[#38332E] text-xs font-['Cinzel'] font-bold flex items-center justify-center space-x-2 text-[#B86209] dark:text-[#E68314]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accéder au Mode ERP Administrateur</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
