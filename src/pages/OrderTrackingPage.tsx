import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, PhoneCall, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useCurrency } from '../context/CurrencyContext';
import type { ErpOrder, OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders } = useErp();
  const { formatPrice } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ErpOrder | null>(null);

  // If URL has hash param or initial load
  useEffect(() => {
    // Default to the most recent active order for instant demonstration
    if (!selectedOrder && orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders, selectedOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().toLowerCase();
    if (!clean) return;

    const found = orders.find(
      o => o.id.toLowerCase() === clean ||
           o.clientPhone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
           o.clientName.toLowerCase().includes(clean)
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      setSelectedOrder(null);
    }
  };

  // 4 Workshop stages calculation based on status
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
      title: "Commande Validée",
      desc: "Prise en compte de votre commande par l'atelier et enregistrement de vos souhaits."
    },
    {
      num: 2,
      title: "Bon à Tirer & Matières",
      desc: "Sélection des papiers pur coton frangés 350g et validation du texte manuscrit."
    },
    {
      num: 3,
      title: "Haute Calligraphie & Dorure",
      desc: "Tracé à la plume d'acier biseautée et application des feuilles d'or pur 24 carats."
    },
    {
      num: 4,
      title: "Scellé & Prêt à Livrer",
      desc: "Apposition du sceau de cire chaude et remise au coursier Dakar ou DHL Express."
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 text-[#B86209] dark:text-[#E68314] text-xs font-['Cinzel'] tracking-wider font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Suivi d'Atelier • Dakar, Sénégal</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-light text-[#181716] dark:text-[#FAF8F5]">
          Suivre Votre Commande
        </h1>

        <p className="text-xs sm:text-sm text-[#70675E] dark:text-[#A8A096] font-light leading-relaxed">
          Chaque création WriticArt est façonnée à la main. Suivez ici en temps réel l'avancement de vos coffrets d'amour, tableaux et œuvres sur-mesure.
        </p>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8074]" />
            <input
              type="text"
              placeholder="Numéro de commande (ex: CMD-WA-1024)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] text-xs focus:outline-none focus:border-[#E68314] shadow-sm text-[#181716] dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors shadow"
          >
            Rechercher
          </button>
        </form>

        {/* Quick sample chips for one-click testing */}
        <div className="pt-1 flex items-center justify-center flex-wrap gap-2 text-xs">
          <span className="text-[11px] text-[#8C8074]">Exemples récents :</span>
          {orders.slice(0, 4).map(o => (
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
          
          {/* Card Top: Order Summary Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F2ECE1] dark:border-[#26221E] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-['Cinzel'] text-xl font-bold text-[#181716] dark:text-white">
                  Commande {selectedOrder.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFF7EE] dark:bg-[#241C15] text-[#B86209] dark:text-[#E68314] border border-[#E68314]/30 text-[10px] font-['Cinzel'] font-bold uppercase">
                  {selectedOrder.status === 'livre' ? 'Livré' : 'En Préparation'}
                </span>
              </div>
              <p className="text-xs text-[#8C8074] mt-1">
                Passée le {selectedOrder.date} • Destination : <strong className="text-[#181716] dark:text-white font-medium">{selectedOrder.city}</strong>
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] text-[#8C8074] uppercase block font-['Cinzel'] font-semibold">Montant</span>
              <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#E68314]">
                {formatPrice(selectedOrder.totalFCFA)}
              </span>
            </div>
          </div>

          {/* 4-Step Interactive Visual Timeline */}
          <div className="space-y-6">
            <h3 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#8C8074]">
              Évolution du Façonnage d'Art
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
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-[#E68314] text-white animate-pulse'
                          : 'bg-black/10 dark:bg-white/10 text-[#8C8074]'
                      }`}>
                        {isCompleted ? '✓' : st.num}
                      </span>

                      {isCurrent && (
                        <span className="text-[9px] uppercase font-['Cinzel'] font-bold text-[#E68314] tracking-wider px-2 py-0.5 rounded-full bg-[#E68314]/10">
                          En cours
                        </span>
                      )}
                    </div>

                    <h4 className="font-['Cormorant_Garamond'] text-lg font-bold mb-1">
                      {st.title}
                    </h4>

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
              Articles Calligraphiés
            </h3>

            <div className="divide-y divide-[#F2ECE1] dark:divide-[#26221E]">
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-sm text-[#181716] dark:text-white">{it.title}</span>
                    <span className="text-[#8C8074] ml-2 font-mono">({it.quantity}x)</span>
                    {it.options && <p className="text-[11px] text-[#B86209] dark:text-[#E68314]">{it.options}</p>}
                  </div>
                  <span className="font-bold font-['Cinzel']">
                    {formatPrice(it.unitPriceFCFA * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Notes / WhatsApp Direct Assistance */}
          <div className="p-5 rounded-2xl bg-[#FFFBF5] dark:bg-[#141210] border border-[#E8DFD1] dark:border-[#2A2622] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] uppercase tracking-wider block">
                ✦ Besoin d'une modification ou d'une précision ?
              </span>
              <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
                Notre maître d'atelier est disponible sur WhatsApp pour vous accompagner.
              </p>
            </div>

            <a
              href={`https://wa.me/221772348521?text=Bonjour%20l'Atelier%20WriticArt%20!%20Je%20souhaite%20des%20nouvelles%20de%20ma%20commande%20*${selectedOrder.id}*`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contacter l'Atelier</span>
            </a>
          </div>

        </div>
      ) : (
        <div className="bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-[#E68314] mx-auto opacity-50" />
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-[#181716] dark:text-white">
            Aucune commande trouvée
          </h3>
          <p className="text-xs text-[#8C8074] max-w-sm mx-auto">
            Vérifiez l'orthographe de votre numéro de commande (ex: <code>CMD-WA-1024</code>) ou saisissez votre numéro de téléphone.
          </p>
        </div>
      )}

      {/* Workshop Reassurance */}
      <div className="pt-6 border-t border-[#E8DFD1]/60 dark:border-[#2A2622] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#70675E] dark:text-[#A8A096]">
        <div className="space-y-1">
          <Feather className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">Plume & Or Pur 24K</p>
          <p className="text-[11px]">Chaque lettre est tracée avec dévotion.</p>
        </div>

        <div className="space-y-1">
          <ShieldCheck className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">Emballage Cocon</p>
          <p className="text-[11px]">Protégé contre l'humidité et les chocs.</p>
        </div>

        <div className="space-y-1">
          <Clock className="w-4 h-4 text-[#E68314] mx-auto" />
          <p className="font-bold text-[#181716] dark:text-white">Livraison 24h Dakar</p>
          <p className="text-[11px]">Remise en main propre par coursier privé.</p>
        </div>
      </div>

    </div>
  );
};
