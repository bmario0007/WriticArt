import React, { useState } from 'react';
import { Search, Package, Clock, PhoneCall, ShieldCheck, Feather, Sparkles, Cloud } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { trackOrderRemote } from '../services/backendService';
import type { ErpOrder, OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, cloudConfig } = useErp();
  const { formatPrice } = useCurrency();
  const { tr } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ErpOrder | null>(() => orders[0] ?? null);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawQuery = searchQuery.trim();
    const clean = rawQuery.toLowerCase();
    if (!clean) return;

    const digits = clean.replace(/[^0-9]/g, '');
    const foundLocal = orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        (digits.length >= 6 &&
          o.clientPhone.replace(/[^0-9]/g, '').includes(digits)) ||
        (clean.length >= 3 && o.clientName.toLowerCase().includes(clean))
    );

    if (cloudConfig.appsScriptUrl && clean.startsWith('cmd-')) {
      setIsSearchingRemote(true);
      const remote = await trackOrderRemote(rawQuery);
      setIsSearchingRemote(false);
      if (remote.ok && remote.order) {
        setSelectedOrder({ ...remote.order, syncStatus: 'synced' });
        return;
      }
    }

    setSelectedOrder(foundLocal || null);
  };

  const getStepStatus = (orderStatus: OrderStatus, stepNumber: number): 'completed' | 'current' | 'upcoming' => {
    const statusOrder: Record<OrderStatus, number> = {
      nouveau: 1,
      bat_validation: 2,
      en_calligraphie: 3,
      pret_livraison: 4,
      livre: 5,
      annule: 0
    };
    const currentLevel = statusOrder[orderStatus] || 1;
    if (currentLevel > stepNumber) return 'completed';
    if (currentLevel === stepNumber) return 'current';
    return 'upcoming';
  };

  const steps = [
    {
      num: 1,
      title: tr('Commande Validée', 'Order Confirmed'),
      desc: tr(
        'Enregistrement de votre commande / précommande et prise de contact WriticArt.',
        'Order or pre-order recorded and assigned to WriticArt team.'
      )
    },
    {
      num: 2,
      title: tr('Validation Maquette & Thème', 'Composition & Theme Check'),
      desc: tr(
        'Validation de l’acrostiche, du texte ou de l’édition WriticLove choisie.',
        'Finalizing your acrostic poem, theme, or WriticLove edition.'
      )
    },
    {
      num: 3,
      title: tr('Réalisation Artisanale', 'Artisan Craftsmanship'),
      desc: tr(
        'Mise en scène visuelle du tableau ou préparation soignée de votre coffret.',
        'Visual artwork staging or careful preparation of your gift box.'
      )
    },
    {
      num: 4,
      title: tr('Prêt pour Expédition / Remise', 'Ready for Delivery'),
      desc: tr(
        'Remise en main propre ou expédition France / International selon l’option choisie.',
        'Hand delivery or France / International shipping as selected.'
      )
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs font-['Cinzel'] tracking-wider font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WriticArt — « {tr('Les écrits restent', 'Words that stay')} »</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
          {tr('Suivre Votre Commande', 'Track Your Order')}
        </h1>

        <p className="text-xs sm:text-sm text-[#70675E] dark:text-[#A8A096] font-light leading-relaxed">
          {tr(
            'Suivez ici en temps réel l’avancement de votre tableau personnalisé, votre précommande WriticLove ou votre Box WriticArt.',
            'Track the live progress of your bespoke acrostic painting, WriticLove pre-order, or gift box.'
          )}
        </p>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8074]" aria-hidden="true" />
            <input
              type="text"
              aria-label={tr('Numéro de commande ou nom', 'Order ID or Name')}
              placeholder={tr('Numéro de commande (ex: CMD-WA-1024)...', 'Order number (e.g. CMD-WA-1024)...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] text-xs focus:outline-none focus:border-[#E68314] shadow-sm text-[#181716] dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSearchingRemote}
            className="px-6 py-3 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] hover:text-white transition-colors shadow disabled:opacity-60"
          >
            {isSearchingRemote ? tr('Recherche...', 'Searching...') : tr('Rechercher', 'Search')}
          </button>
        </form>
        {cloudConfig.appsScriptUrl && (
          <p className="inline-flex items-center space-x-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
            <Cloud className="w-3.5 h-3.5" />
            <span>{tr('Suivi connecté en temps réel avec Google Sheets', 'Connected live to Google Sheets backend')}</span>
          </p>
        )}

        <div className="pt-1 flex items-center justify-center flex-wrap gap-2 text-xs">
          <span className="text-[11px] text-[#8C8074]">{tr('Exemples récents :', 'Recent samples:')}</span>
          {orders.slice(0, 4).map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSelectedOrder(o);
                setSearchQuery(o.id);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-[#1E1C1A] border border-[#DED4C3] dark:border-[#38332E] text-[11px] font-mono hover:border-[#E68314] text-[#181716] dark:text-white transition-colors"
            >
              {o.id}
            </button>
          ))}
        </div>
      </div>

      {/* Order Tracking Card Result */}
      {selectedOrder ? (
        <div className="bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-xl overflow-hidden space-y-8 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F2ECE1] dark:border-[#26221E] gap-4">
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-['Cinzel'] text-xl font-bold text-[#181716] dark:text-white">
                  {tr('Commande', 'Order')} {selectedOrder.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFF7EE] dark:bg-[#241C15] text-[#B86209] dark:text-[#E68314] border border-[#E68314]/30 text-[10px] font-['Cinzel'] font-bold uppercase">
                  {selectedOrder.status === 'livre'
                    ? tr('Livré', 'Delivered')
                    : selectedOrder.isPreorder
                    ? tr('Précommande Enregistrée', 'Pre-order Confirmed')
                    : tr('En Préparation', 'In Progress')}
                </span>
                {selectedOrder.currencyUsed && (
                  <span className="px-2 py-0.5 rounded bg-[#231B26] text-[#F3D69B] text-[10px] font-['Cinzel'] font-bold">
                    {selectedOrder.currencyUsed}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8C8074] mt-1">
                {tr('Date :', 'Date:')} {selectedOrder.date} • {tr('Destination :', 'Destination:')}{' '}
                <strong className="text-[#181716] dark:text-white font-medium">{selectedOrder.city}</strong>
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] text-[#8C8074] uppercase block font-['Cinzel'] font-semibold">
                {tr('Montant', 'Amount')}
              </span>
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#E68314]">
                {formatPrice(selectedOrder.totalFCFA)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#8C8074]">
              {tr('Étapes de suivi WriticArt', 'Order Progress Stages')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {steps.map((st) => {
                const stepState = getStepStatus(selectedOrder.status, st.num);
                const isCompleted = stepState === 'completed';
                const isCurrent = stepState === 'current';

                return (
                  <div
                    key={st.num}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#FFF8F0] dark:bg-[#201D1A] border-[#E68314] shadow-md ring-2 ring-[#E68314]/20'
                        : isCompleted
                        ? 'bg-[#F9F6F0] dark:bg-[#1B1917] border-emerald-400/40 text-[#181716] dark:text-white'
                        : 'bg-white/40 dark:bg-white/5 border-dashed border-[#DED4C3] dark:border-[#38332E] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-[#E68314] text-white animate-pulse'
                            : 'bg-black/10 dark:bg-white/10 text-[#8C8074]'
                        }`}
                      >
                        {isCompleted ? '✓' : st.num}
                      </span>

                      {isCurrent && (
                        <span className="text-[9px] uppercase font-['Cinzel'] font-bold text-[#E68314] tracking-wider px-2 py-0.5 rounded-full bg-[#E68314]/10">
                          {tr('En cours', 'Current')}
                        </span>
                      )}
                    </div>

                    <h4 className="font-['Cormorant_Garamond'] text-lg font-bold mb-1">{st.title}</h4>
                    <p className="text-xs text-[#70675E] dark:text-[#A8A096] leading-relaxed font-light">
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Item Details */}
          <div className="pt-6 border-t border-[#F2ECE1] dark:border-[#26221E] space-y-4">
            <h3 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#8C8074]">
              {tr('Détails de la commande', 'Order Items')}
            </h3>

            <div className="divide-y divide-[#F2ECE1] dark:divide-[#26221E]">
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-sm text-[#181716] dark:text-white">{it.title}</span>
                    <span className="text-[#8C8074] ml-2 font-mono">({it.quantity}x)</span>
                    {it.options && (
                      <p className="text-[11px] text-[#B86209] dark:text-[#E68314]">{it.options}</p>
                    )}
                  </div>
                  <span className="font-bold font-['Cinzel']">
                    {formatPrice(it.unitPriceFCFA * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFBF5] dark:bg-[#141210] border border-[#E8DFD1] dark:border-[#2A2622] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] uppercase tracking-wider block">
                ✦ {tr('Besoin d’une information ?', 'Need assistance?')}
              </span>
              <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
                {tr(
                  'Écrivez-nous directement sur WhatsApp au +221 77 234 85 21.',
                  'Message us directly on WhatsApp at +221 77 234 85 21.'
                )}
              </p>
            </div>

            <a
              href={`https://wa.me/221772348521?text=Bonjour%20WriticArt%20!%20Je%20souhaite%20des%20nouvelles%20de%20ma%20commande%20*${selectedOrder.id}*`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{tr('Contacter WriticArt', 'Contact WriticArt')}</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-[#E68314] mx-auto opacity-50" />
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-[#181716] dark:text-white">
            {tr('Aucune commande trouvée', 'No order found')}
          </h3>
          <p className="text-xs text-[#8C8074] max-w-sm mx-auto">
            {tr(
              'Vérifiez votre numéro de commande (ex : CMD-WA-1024) ou saisissez votre numéro de téléphone.',
              'Check your order number (e.g. CMD-WA-1024) or enter your phone number.'
            )}
          </p>
        </div>
      )}

      {/* Reassurance */}
      <div className="pt-6 border-t border-[#E8DFD1]/60 dark:border-[#2A2622] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#70675E] dark:text-[#A8A096]">
        <div className="space-y-1">
          <Feather className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">{tr('L’Art de l’Acrostiche', 'Acrostic Art')}</p>
          <p className="text-[11px]">{tr('Chaque tableau raconte une histoire.', 'Every frame tells a story.')}</p>
        </div>

        <div className="space-y-1">
          <ShieldCheck className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">{tr('Livraison France', 'France Delivery')}</p>
          <p className="text-[11px]">{tr('Incluse pour tableaux expédiés en France.', 'Included on paintings shipped to France.')}</p>
        </div>

        <div className="space-y-1">
          <Clock className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">{tr('Suivi Personnalisé', 'Direct Follow-up')}</p>
          <p className="text-[11px]">{tr('Vous êtes contacté(e) pour finalisation.', 'You are contacted to finalize every detail.')}</p>
        </div>
      </div>
    </div>
  );
};
