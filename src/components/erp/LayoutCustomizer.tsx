import React, { useState } from 'react';
import { Save, Eye, CheckCircle2, RotateCcw } from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import { initialSiteSettings } from '../../data/erpData';

export const LayoutCustomizer: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useErp();

  const [formData, setFormData] = useState({ ...siteSettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Rétablir la mise en page officielle WriticArt par défaut ?')) {
      setFormData({ ...initialSiteSettings });
      updateSiteSettings(initialSiteSettings);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest text-[#B86209] dark:text-[#E68314] font-bold block">
            WordPress Customizer • Éditeur de Mise en Page
          </span>
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
            Personnalisation de la Page d’Accueil & Textes
          </h3>
          <p className="text-xs text-[#8C8074]">
            Modifiez en direct les textes du Hero, le bandeau supérieur et l’agencement des sections.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Modifications publiées en ligne !</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] hover:bg-black/5 text-xs font-['Cinzel'] text-[#8C8074]"
            title="Rétablir les valeurs d'origine"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            <span>Défaut</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Controls Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Announcement Bar */}
          <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
            <h4 className="font-['Cinzel'] text-xs uppercase font-bold text-[#E68314] flex items-center space-x-2">
              <span>1. Bandeau d’Annonce Supérieur (Ticker)</span>
            </h4>

            <div>
              <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                Message d’annonce en haut du site :
              </label>
              <textarea
                rows={2}
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                Numéro WhatsApp affiché dans le bandeau :
              </label>
              <input
                type="text"
                value={formData.announcementPhone}
                onChange={(e) => setFormData({ ...formData, announcementPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          {/* Section 2: Hero Section Texts */}
          <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
            <h4 className="font-['Cinzel'] text-xs uppercase font-bold text-[#E68314] flex items-center space-x-2">
              <span>2. Textes Principaux du Hero (En-tête d’accueil)</span>
            </h4>

            <div>
              <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                Badge / Slogan au-dessus du titre :
              </label>
              <input
                type="text"
                value={formData.heroSlogan}
                onChange={(e) => setFormData({ ...formData, heroSlogan: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                  Titre Ligne 1 :
                </label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm font-semibold focus:outline-none focus:border-[#E68314]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                  Titre Ligne 2 (en italique doré) :
                </label>
                <input
                  type="text"
                  value={formData.heroHighlightText}
                  onChange={(e) => setFormData({ ...formData, heroHighlightText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm font-serif italic text-[#C46A0B] dark:text-[#E68314] focus:outline-none focus:border-[#E68314]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                Texte explicatif du Hero :
              </label>
              <textarea
                rows={3}
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs leading-relaxed focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans text-[#70675E] dark:text-[#A8A096] mb-1">
                Libellé du bouton principal (CTA) :
              </label>
              <input
                type="text"
                value={formData.heroCtaText}
                onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          {/* Section 3: Layout Section Visibility Toggles */}
          <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
            <h4 className="font-['Cinzel'] text-xs uppercase font-bold text-[#E68314]">
              3. Gestion de l’Affichage des Sections (Page Builder)
            </h4>

            <div className="space-y-3">
              {[
                {
                  key: 'showDiscoveryPortals',
                  label: 'Afficher les 3 Offres Officiels (Tableaux, WriticLove 365+1, Box Février)',
                  desc: 'Présente les 3 univers principaux du cahier des charges sous le Hero.'
                },
                {
                  key: 'showFeaturedSection',
                  label: 'Afficher la Sélection des Créations Vedettes',
                  desc: 'Met en avant la boutique avec bouton d’achat rapide et conversion FCFA / EUR.'
                },
                {
                  key: 'showReassuranceBar',
                  label: 'Afficher la Barre de Réassurance (4 Piliers)',
                  desc: 'Acrostiches sur mesure, 365+1 Cartes, Livraison France/Dakar, WhatsApp direct.'
                },
                {
                  key: 'showAtelierBanner',
                  label: 'Afficher la Bannière « Les mots ont un super pouvoir »',
                  desc: 'Présente la citation signature avec accès à la page Tableaux & Manifeste.'
                }
              ].map((sec) => (
                <label
                  key={sec.key}
                  className="flex items-start space-x-3 p-3 rounded-2xl border border-[#ECE3D5] dark:border-[#2E2A26] cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <input
                    type="checkbox"
                    checked={(formData as any)[sec.key]}
                    onChange={(e) => setFormData({ ...formData, [sec.key]: e.target.checked })}
                    className="rounded text-[#E68314] mt-0.5"
                  />
                  <div className="text-xs">
                    <span className="font-bold block text-[#181716] dark:text-[#FAF8F5]">{sec.label}</span>
                    <span className="text-[#8C8074] text-[11px]">{sec.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-all flex items-center justify-center space-x-2 shadow-xl"
            >
              <Save className="w-4 h-4 text-[#E68314]" />
              <span>Publier les Modifications sur le Site Public</span>
            </button>
          </div>
        </div>

        {/* Right 5 cols: Live Simulation Preview */}
        <div className="lg:col-span-5 sticky top-32 space-y-4">
          <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE3D5] dark:border-[#26221E]">
              <span className="text-xs font-['Cinzel'] uppercase font-bold text-[#8C8074] flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-[#E68314]" />
                <span>Aperçu en Direct du Hero</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">● Synchronisé</span>
            </div>

            {/* Micro Ticker */}
            <div className="p-2 rounded-lg bg-[#231B26] text-white text-[9px] truncate border-b border-[#C5A059]/40">
              {formData.announcementText}
            </div>

            {/* Micro Hero Box */}
            <div className="p-5 rounded-2xl bg-[#231B26] text-white border border-[#C5A059]/40 space-y-3 text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-['Cinzel'] font-bold text-[#E68314] border border-[#C5A059]/40">
                {formData.heroSlogan}
              </span>

              <h4 className="font-['Cormorant_Garamond'] text-xl font-bold leading-tight">
                {formData.heroTitle} <br />
                <span className="italic font-serif text-[#E68314]">{formData.heroHighlightText}</span>
              </h4>

              <p className="text-[10px] text-[#D3C7D6] leading-relaxed line-clamp-3">
                {formData.heroSubtitle}
              </p>

              <div className="pt-2">
                <span className="inline-block px-4 py-2 rounded-full bg-[#E68314] text-white text-[9px] font-['Cinzel'] font-bold uppercase tracking-wider">
                  {formData.heroCtaText}
                </span>
              </div>
            </div>

            {/* Sections checklist summary */}
            <div className="space-y-1.5 pt-2 text-xs">
              <span className="text-[10px] font-['Cinzel'] uppercase font-bold text-[#8C8074] block">
                Sections actives sur la page d’accueil :
              </span>
              <p className="text-[11px] text-[#6E645A] dark:text-[#A8A096]">
                • Les 3 Offres Officiels : <strong>{formData.showDiscoveryPortals ? 'Activé' : 'Désactivé'}</strong>
              </p>
              <p className="text-[11px] text-[#6E645A] dark:text-[#A8A096]">
                • Créations vedettes : <strong>{formData.showFeaturedSection ? 'Activé' : 'Désactivé'}</strong>
              </p>
              <p className="text-[11px] text-[#6E645A] dark:text-[#A8A096]">
                • Barre 4 Piliers : <strong>{formData.showReassuranceBar ? 'Activé' : 'Désactivé'}</strong>
              </p>
              <p className="text-[11px] text-[#6E645A] dark:text-[#A8A096]">
                • Bannière Citation : <strong>{formData.showAtelierBanner ? 'Activé' : 'Désactivé'}</strong>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
