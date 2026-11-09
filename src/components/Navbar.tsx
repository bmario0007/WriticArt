import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  PhoneCall,
  Heart,
  Sun,
  Moon,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
  Search,
  ChevronDown,
  Globe
} from 'lucide-react';
import { atelierAudio } from '../utils/soundEffects';
import logoLight from '../assets/brand/logo-light.jpg';
import logoDark from '../assets/brand/logo-dark.jpg';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigation, type PageRoute } from '../context/NavigationContext';
import { useErp } from '../context/ErpContext';
import { useCurrency, type CurrencyCode } from '../context/CurrencyContext';
import { useLanguage, type LanguageCode } from '../context/LanguageContext';
import { QuickSearchModal } from './search/QuickSearchModal';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(atelierAudio.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { toggleTheme, isDark } = useTheme();
  const { cartCount, openCart } = useCart();
  const { currentPage, navigateTo } = useNavigation();
  const { siteSettings } = useErp();
  const { currency, setCurrency } = useCurrency();
  const { lang, setLang, tr } = useLanguage();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSound = () => {
    atelierAudio.isMuted = !atelierAudio.isMuted;
    setIsMuted(atelierAudio.isMuted);
    if (!atelierAudio.isMuted) {
      atelierAudio.playGoldChime();
    }
  };

  // Liens principaux épurés façon Rahiya Official
  const primaryNavLinks: { id: PageRoute; label: string; isHeart?: boolean }[] = [
    { id: 'tableaux', label: tr('Tableaux', 'Paintings') },
    { id: 'writiclove', label: 'WriticLove', isHeart: true },
    { id: 'box', label: tr('Box Février', 'Feb. Box') },
    { id: 'boutique', label: tr('Boutique', 'Shop') },
    { id: 'journal', label: 'Journal' },
    { id: 'suivi-commande', label: tr('Suivi', 'Track Order') }
  ];

  const secondaryNavLinks: { id: PageRoute; label: string }[] = [
    { id: 'sur-mesure', label: tr('Studio Sur-Mesure 3D', '3D Custom Studio') },
    { id: 'pensee', label: tr('La Pensée du Jour', 'Daily Thought') },
    { id: 'galerie', label: tr('Galerie & Feed', 'Gallery') },
    { id: 'atelier', label: tr('L’Atelier & Manifeste', 'About WriticArt') }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/95 dark:bg-[#121110]/95 border-b border-[#E8DFD1]/70 dark:border-[#2A2622] transition-colors duration-300">
      {/* Top Announcement Bar (Plum #231B26 matching Brand Cover + Oud Bar Palace) */}
      <div className="bg-[#231B26] text-[#FAF8F5] text-[11px] py-1.5 px-4 font-sans tracking-wide border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 truncate pr-2">
            <span className="font-['Cinzel'] text-[#E68314] font-semibold shrink-0">
              ✦ WRITICART
            </span>
            <span className="hidden sm:inline text-white/40 shrink-0">•</span>
            <span className="truncate text-white/90">
              {lang === 'en'
                ? '“Words remain” • Custom Acrostic Paintings & WriticLove Pre-order (365 + 1 cards)'
                : siteSettings.announcementText ||
                  '« Les écrits restent » • Tableaux Acrostiches & Précommande WriticLove (365 + 1 cartes)'}
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`https://wa.me/${(siteSettings.announcementPhone || '+221772348521').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-[#25D366] transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#25D366]" aria-hidden="true" />
              <span>{siteSettings.announcementPhone || '+221 77 234 85 21'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Left Navigation Links (Desktop) */}
          <nav
            aria-label={tr('Navigation principale', 'Main navigation')}
            className="hidden lg:flex items-center space-x-5 text-[11px] uppercase tracking-widest font-['Cinzel'] font-semibold text-[#4A453F] dark:text-[#D5CDBD]"
          >
            {primaryNavLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center space-x-1 transition-colors py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#E68314] border-b-2 border-[#E68314] font-bold'
                      : 'hover:text-[#B86209] dark:hover:text-[#E68314]'
                  }`}
                >
                  {link.isHeart && (
                    <Heart className="w-3 h-3 fill-[#E68314] text-[#E68314]" aria-hidden="true" />
                  )}
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Compact Dropdown for Workshop extras */}
            <div
              className="relative"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                aria-expanded={moreMenuOpen}
                className={`flex items-center space-x-1 py-1 whitespace-nowrap transition-colors ${
                  secondaryNavLinks.some((s) => s.id === currentPage)
                    ? 'text-[#E68314] font-bold'
                    : 'hover:text-[#B86209] dark:hover:text-[#E68314]'
                }`}
              >
                <span>{tr('Atelier', 'Studio')}</span>
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>

              {moreMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-52 z-50">
                  <div className="bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] rounded-2xl shadow-xl py-2 overflow-hidden">
                    {secondaryNavLinks.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setMoreMenuOpen(false);
                          navigateTo(sub.id);
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-[11px] transition-colors ${
                          currentPage === sub.id
                            ? 'bg-[#FFF8F0] dark:bg-[#231B26] text-[#E68314] font-bold'
                            : 'hover:bg-[#FAF8F5] dark:hover:bg-white/5'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Center Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            aria-label={tr('Accueil WriticArt', 'WriticArt Home')}
            className="flex items-center space-x-2 group shrink-0"
          >
            <img
              src={isDark ? logoDark : logoLight}
              alt="WriticArt Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Right Controls: FR/EN, FCFA/EUR, Search, Sound, Theme, Admin ERP, Cart */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Bilingual FR | EN Selector (Visible everywhere on header per PDF p.3) */}
            <div
              role="group"
              aria-label={tr('Choix de la langue', 'Language selector')}
              className="flex items-center bg-[#EFE8DC]/80 dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] rounded-full p-0.5 text-[10px] font-['Cinzel'] font-bold"
            >
              {(['fr', 'en'] as LanguageCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  title={code === 'fr' ? 'Français' : 'English'}
                  className={`px-2 py-0.5 rounded-full uppercase transition-all ${
                    lang === code
                      ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-sm font-bold'
                      : 'text-[#70675E] dark:text-[#A8A096] hover:text-[#E68314]'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Currency Switcher (Strictly FCFA / EUR per PDF p.3) */}
            <div
              role="group"
              aria-label={tr('Choix de la monnaie', 'Currency selector')}
              className="hidden sm:flex items-center bg-[#EFE8DC]/80 dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] rounded-full p-0.5 text-[10px] font-['Cinzel'] font-bold"
            >
              {(['FCFA', 'EUR'] as CurrencyCode[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  aria-pressed={currency === curr}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    currency === curr
                      ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-sm font-bold'
                      : 'text-[#70675E] dark:text-[#A8A096] hover:text-[#E68314]'
                  }`}
                  title={
                    curr === 'EUR'
                      ? tr('Afficher en Euros (1 EUR = 655,957 FCFA)', 'Show in Euros')
                      : tr('Afficher en Francs CFA', 'Show in FCFA')
                  }
                >
                  {curr === 'EUR' ? '€ EUR' : 'FCFA'}
                </button>
              ))}
            </div>

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label={tr('Rechercher (Ctrl+K)', 'Search (Ctrl+K)')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#70675E] dark:text-[#A8A096] hover:text-[#E68314] transition-colors"
              title={tr('Rechercher (Ctrl+K)', 'Search (Ctrl+K)')}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? tr('Activer le son', 'Unmute audio') : tr('Couper le son', 'Mute audio')}
              className="hidden md:inline-flex p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#70675E] dark:text-[#A8A096] transition-colors"
              title={isMuted ? tr('Activer le son', 'Unmute sound') : tr('Couper le son', 'Mute sound')}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#E68314]" aria-hidden="true" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? tr('Passer en mode Jour', 'Switch to Light mode') : tr('Passer en mode Nuit', 'Switch to Dark mode')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#70675E] dark:text-[#A8A096] transition-colors"
              title={isDark ? tr('Passer en mode Jour', 'Light mode') : tr('Passer en mode Nuit', 'Dark mode')}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F3D69B] hover:rotate-90 transition-transform" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-[#181716] hover:-rotate-12 transition-transform" aria-hidden="true" />
              )}
            </button>

            {/* ADMIN ERP BUTTON */}
            <button
              onClick={() => navigateTo('erp')}
              className={`hidden md:inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border text-[10px] font-['Cinzel'] tracking-wider uppercase font-bold transition-all ${
                currentPage === 'erp'
                  ? 'bg-[#E68314] text-white border-[#E68314]'
                  : 'border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] bg-white/70 dark:bg-[#1C1A18] text-[#181716] dark:text-[#FAF8F5]'
              }`}
              title={tr('Espace Administrateur ERP', 'Admin ERP Workspace')}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" aria-hidden="true" />
              <span>ERP</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label={tr(`Ouvrir le panier (${cartCount})`, `Open cart (${cartCount})`)}
              className="relative flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all shadow-md group"
              title={tr('Ouvrir le panier', 'Open cart')}
            >
              <ShoppingBag
                className="w-4 h-4 text-[#E68314] group-hover:text-white transition-colors"
                aria-hidden="true"
              />
              <span className="text-[11px] font-['Cinzel'] font-bold hidden sm:inline">
                {tr('Panier', 'Cart')}
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
              aria-label={mobileMenuOpen ? tr('Fermer le menu', 'Close menu') : tr('Ouvrir le menu', 'Open menu')}
              aria-expanded={mobileMenuOpen}
              className="p-2 lg:hidden rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#181716] dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] space-y-3 text-xs uppercase font-['Cinzel'] font-semibold">
            {/* Mobile Language & Currency Switchers */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1]/60 dark:border-[#2E2A26] px-1 gap-2 flex-wrap">
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-[#E68314]" />
                <div className="flex items-center bg-[#EFE8DC]/80 dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] rounded-full p-0.5 text-[10px]">
                  {(['fr', 'en'] as LanguageCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`px-2.5 py-1 rounded-full uppercase ${
                        lang === code
                          ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] font-bold'
                          : 'text-[#70675E] dark:text-[#A8A096]'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-[#EFE8DC]/80 dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] rounded-full p-0.5 text-[10px]">
                {(['FCFA', 'EUR'] as CurrencyCode[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      currency === curr
                        ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-sm font-bold'
                        : 'text-[#70675E] dark:text-[#A8A096]'
                    }`}
                  >
                    {curr === 'EUR' ? '€ EUR' : 'FCFA'}
                  </button>
                ))}
              </div>
            </div>

            {[...primaryNavLinks, ...secondaryNavLinks].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(link.id);
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
                <span>{tr('Accéder au Mode ERP Administrateur', 'Open Admin ERP Mode')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
