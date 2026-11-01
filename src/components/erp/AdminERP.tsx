import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  Users, 
  Tags, 
  Settings, 
  ArrowLeft, 
  Plus, 
  Search, 
  Printer, 
  PhoneCall, 
  AlertCircle, 
  Download, 
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import type { OrderStatus, ErpOrder } from '../../types';
import { NewOrderModal } from './NewOrderModal';
import { PrintInvoiceModal } from './PrintInvoiceModal';
import logoDark from '../../assets/brand/logo-dark.jpg';
import { atelierAudio } from '../../utils/soundEffects';

export const AdminERP: React.FC = () => {
  const { 
    closeAdminMode, 
    orders, 
    inventory, 
    clients, 
    products, 
    updateOrderStatus, 
    adjustInventoryStock,
    updateProductPrice,
    toggleProductStock,
    resetAllData,
    totalRevenueFCFA,
    activeOrdersCount,
    pendingBATCount,
    lowStockItemsCount
  } = useErp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'inventory' | 'clients' | 'catalog' | 'settings'>('dashboard');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [printOrder, setPrintOrder] = useState<ErpOrder | null>(null);

  // Status mapping
  const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
    nouveau: { label: 'Nouvelle Commande', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
    bat_validation: { label: 'Validation BAT', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    en_calligraphie: { label: 'En Calligraphie', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
    pret_livraison: { label: 'Prêt à Livrer', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
    livre: { label: 'Livré & Clôturé', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
    annule: { label: 'Annulé', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' }
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchQuery = 
      o.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.clientPhone.includes(searchQuery);
    return matchStatus && matchQuery;
  });

  const handleWhatsAppNotify = (order: ErpOrder) => {
    atelierAudio.playWaxStamp();
    let msg = `Bonjour ${order.clientName} ! ✨%0A%0AC'est l'Atelier WriticArt Dakar concernant votre commande *${order.id}*.%0A`;
    if (order.status === 'bat_validation') {
      msg += `Votre maquette de Bon à Tirer (BAT) est prête pour vérification. Merci de nous confirmer si la mise en page vous convient !`;
    } else if (order.status === 'en_calligraphie') {
      msg += `Nos calligraphes ont commencé l'exécution de votre création manuscrite à l'encre et dorure d'art.`;
    } else if (order.status === 'pret_livraison') {
      msg += `🎉 Bonne nouvelle ! Votre création est prête, emballée et prête pour expédition / livraison à ${order.city}. Notre coursier prendra contact avec vous.`;
    } else if (order.status === 'livre') {
      msg += `Votre commande a été livrée. Nous espérons qu'elle vous apporte autant de joie que nous en avons eu à la façonner !`;
    } else {
      msg += `Nous avons bien enregistré votre commande d'un montant de ${order.totalFCFA.toLocaleString('fr-FR')} FCFA.`;
    }
    window.open(`https://wa.me/${order.clientPhone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Client', 'Telephone', 'Ville', 'Articles', 'Total_FCFA', 'Statut', 'Paiement', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.clientName}"`,
      `"${o.clientPhone}"`,
      `"${o.city}"`,
      `"${o.items.map((i) => `${i.title} (${i.quantity})`).join(', ')}"`,
      o.totalFCFA,
      o.status,
      o.paymentMethod,
      o.date
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `writicart_export_commandes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] dark:bg-[#0D0C0B] text-[#1E1C1A] dark:text-[#FAF8F5] font-sans transition-colors duration-300">
      
      {/* Top ERP Bar */}
      <header className="bg-[#181716] text-[#FAF8F5] border-b border-[#312E2A] sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={logoDark}
            alt="WriticArt Logo"
            className="h-10 w-auto object-contain rounded"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-['Cormorant_Garamond'] text-lg sm:text-xl font-bold tracking-wide">
                WriticArt • Atelier ERP Management
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Mode Administrateur Actif
              </span>
            </div>
            <p className="text-[10px] text-[#A69C91] font-['Cinzel'] tracking-wider hidden sm:block">
              Gestion des Ventes, Stocks d'Art & Suivi WhatsApp Clients • Dakar, Sénégal
            </p>
          </div>
        </div>

        <button
          onClick={closeAdminMode}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#E68314] text-white text-xs font-['Cinzel'] tracking-wider uppercase font-semibold transition-all flex items-center space-x-1.5 shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la Boutique</span>
        </button>
      </header>

      {/* Main ERP Navigation Tabs */}
      <nav className="bg-white/80 dark:bg-[#141312]/90 backdrop-blur-md border-b border-[#E8DFD1] dark:border-[#2E2A26] px-4 sm:px-8 sticky top-[65px] z-30">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none py-2.5">
          {[
            { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
            { id: 'orders', label: `Commandes (${orders.length})`, icon: Package },
            { id: 'inventory', label: `Stocks & Matières (${inventory.length})`, icon: Boxes, badge: lowStockItemsCount > 0 ? `${lowStockItemsCount} bas` : undefined },
            { id: 'clients', label: `Fichier Clients (${clients.length})`, icon: Users },
            { id: 'catalog', label: `Catalogue & Tarifs (${products.length})`, icon: Tags },
            { id: 'settings', label: 'Export & Paramètres', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  atelierAudio.playPaperSlide();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-['Cinzel'] tracking-wider font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] shadow-sm'
                    : 'text-[#70675E] dark:text-[#A8A096] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Body Content by Tab */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ======================================================== */}
        {/* TAB 1: DASHBOARD */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C8074]">
                  <span className="font-['Cinzel'] uppercase font-bold">Chiffre d'Affaires</span>
                  <div className="p-2 rounded-full bg-[#E68314]/15 text-[#E68314]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                  {totalRevenueFCFA.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span>
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">
                  +18% ce mois • Dakar & International
                </p>
              </div>

              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C8074]">
                  <span className="font-['Cinzel'] uppercase font-bold">Commandes Actives</span>
                  <div className="p-2 rounded-full bg-blue-500/15 text-blue-500">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                  {activeOrdersCount} <span className="text-sm font-normal">en atelier</span>
                </p>
                <p className="text-[11px] text-[#70675E] dark:text-[#A8A096]">
                  {pendingBATCount} en attente de Bon à Tirer
                </p>
              </div>

              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C8074]">
                  <span className="font-['Cinzel'] uppercase font-bold">Fichier Clients</span>
                  <div className="p-2 rounded-full bg-purple-500/15 text-purple-500">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                  {clients.length} <span className="text-sm font-normal">enregistrés</span>
                </p>
                <p className="text-[11px] text-[#70675E] dark:text-[#A8A096]">
                  {clients.filter((c) => c.vipStatus).length} clients VIP fidélisés
                </p>
              </div>

              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C8074]">
                  <span className="font-['Cinzel'] uppercase font-bold">Alerte Stocks</span>
                  <div className={`p-2 rounded-full ${lowStockItemsCount > 0 ? 'bg-red-500/15 text-red-500 animate-pulse' : 'bg-emerald-500/15 text-emerald-500'}`}>
                    <Boxes className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                  {lowStockItemsCount} <span className="text-sm font-normal">articles bas</span>
                </p>
                <p className="text-[11px] text-red-500">
                  {lowStockItemsCount > 0 ? 'Réapprovisionnement cire & or requis' : 'Stocks équilibrés'}
                </p>
              </div>

            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Orders Overview */}
              <div className="lg:col-span-2 bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                    Commandes Récentes à l'Atelier
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold hover:underline"
                  >
                    Voir toutes ({orders.length}) →
                  </button>
                </div>

                <div className="divide-y divide-[#EFE7DA] dark:divide-[#26221E]">
                  {orders.slice(0, 4).map((o) => (
                    <div key={o.id} className="py-3.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-[#181716] dark:text-[#FAF8F5]">{o.clientName}</span>
                          <span className="font-mono text-[10px] text-[#8C8074]">{o.id}</span>
                        </div>
                        <p className="text-[#6E645A] dark:text-[#A8A096] text-[11px] mt-0.5">
                          {o.items.map((i) => `${i.title} (${i.quantity}x)`).join(', ')} • {o.city}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-['Cinzel'] font-bold ${statusLabels[o.status].color}`}>
                          {statusLabels[o.status].label}
                        </span>
                        <span className="font-['Cinzel'] font-bold text-sm">
                          {o.totalFCFA.toLocaleString('fr-FR')} FCFA
                        </span>
                        <button
                          onClick={() => handleWhatsAppNotify(o)}
                          className="p-1.5 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
                          title="Message WhatsApp client"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier Fast Shortcuts */}
              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Actions Rapides
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsNewOrderModalOpen(true)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase font-bold tracking-wider hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-all flex items-center justify-center space-x-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Créer une Commande Manuelle</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="w-full py-3 px-4 rounded-2xl border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] tracking-wider uppercase font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Boxes className="w-4 h-4 text-[#E68314]" />
                    <span>Ajuster les Stocks d'Or & Cire</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="w-full py-3 px-4 rounded-2xl border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] tracking-wider uppercase font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-[#E68314]" />
                    <span>Exporter les Ventes (Excel / CSV)</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 space-y-1.5 text-xs text-[#554C43] dark:text-[#C5BCB2]">
                  <strong className="font-['Cinzel'] text-[#B86209] dark:text-[#E68314] block">
                    Contact Hotline Atelier :
                  </strong>
                  <p>WhatsApp : +221 77 234 85 21</p>
                  <p>Email : kaynubind@gmail.com</p>
                  <p className="text-[10px] text-[#8C8074]">Dakar, Sénégal • « Transformer les mots en œuvres »</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div className="flex-1 max-w-md relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8074]" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, téléphone, numéro CMD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs font-['Cinzel'] focus:outline-none focus:border-[#E68314]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="nouveau">Nouvelles</option>
                  <option value="bat_validation">Validation BAT</option>
                  <option value="en_calligraphie">En Calligraphie</option>
                  <option value="pret_livraison">Prêt à livrer</option>
                  <option value="livre">Livrées</option>
                </select>

                <button
                  onClick={() => setIsNewOrderModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors flex items-center space-x-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nouvelle Commande</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] dark:bg-[#141312] border-b border-[#E8DFD1] dark:border-[#2E2A26] font-['Cinzel'] text-[#8C8074] uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-bold">Réf. & Date</th>
                      <th className="py-3 px-4 font-bold">Client & Contact</th>
                      <th className="py-3 px-4 font-bold">Créations commandées</th>
                      <th className="py-3 px-4 font-bold">Montant</th>
                      <th className="py-3 px-4 font-bold">Statut Actuel</th>
                      <th className="py-3 px-4 text-right font-bold">Actions Atelier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DA] dark:divide-[#26221E]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8C8074]">
                          Aucune commande trouvée.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-sm block">{order.id}</span>
                            <span className="text-[10px] text-[#8C8074]">{order.date}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold block text-sm">{order.clientName}</span>
                            <span className="text-[11px] text-[#70675E] dark:text-[#A8A096]">{order.clientPhone}</span>
                            <span className="text-[10px] text-[#8C8074] block">{order.city}</span>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            {order.items.map((it, i) => (
                              <div key={i} className="truncate">
                                <span className="font-medium">{it.title}</span>
                                <span className="text-[10px] text-[#8C8074]"> (x{it.quantity})</span>
                              </div>
                            ))}
                            {order.customMessage && (
                              <p className="text-[10px] text-[#B86209] dark:text-[#E68314] italic truncate mt-0.5">
                                « {order.customMessage} »
                              </p>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-['Cinzel'] font-bold text-sm">
                            {order.totalFCFA.toLocaleString('fr-FR')} FCFA
                            <span className="block text-[10px] font-normal text-[#8C8074]">
                              {order.paymentMethod}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-['Cinzel'] font-bold border-none focus:ring-1 focus:ring-[#E68314] cursor-pointer ${statusLabels[order.status].color}`}
                            >
                              <option value="nouveau">Nouvelle</option>
                              <option value="bat_validation">Validation BAT</option>
                              <option value="en_calligraphie">En Calligraphie</option>
                              <option value="pret_livraison">Prêt à Livrer</option>
                              <option value="livre">Livré</option>
                              <option value="annule">Annulé</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleWhatsAppNotify(order)}
                              className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
                              title="Envoyer statut sur WhatsApp"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setPrintOrder(order)}
                              className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#E68314] hover:text-white transition-colors"
                              title="Imprimer Bon de commande / Facture"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: INVENTORY & ATELIER MATERIALS */}
        {/* ======================================================== */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Stocks Produits Finis & Matières d'Art
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Suivi des coffrets confectionnés, parchemins, dorures 24K et bâtons de cire souple.
                </p>
              </div>

              {lowStockItemsCount > 0 && (
                <div className="px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{lowStockItemsCount} matière(s) sous le seuil critique d'atelier.</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((item) => {
                const isCritical = item.currentStock <= item.minThreshold;
                return (
                  <div
                    key={item.id}
                    className={`bg-white dark:bg-[#181716] rounded-3xl p-6 border transition-all ${
                      isCritical
                        ? 'border-red-400 dark:border-red-800 ring-2 ring-red-400/20 shadow-md'
                        : 'border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-['Cinzel'] tracking-wider text-[#8C8074]">
                        {item.category.replace('_', ' ')}
                      </span>
                      {isCritical ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold uppercase">
                          Alerte Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[9px] font-bold uppercase">
                          Optimal
                        </span>
                      )}
                    </div>

                    <h4 className="font-['Cormorant_Garamond'] text-lg font-bold leading-snug">
                      {item.name}
                    </h4>

                    <div className="my-4 flex items-baseline justify-between border-y border-[#F2ECE1] dark:border-[#26221E] py-3">
                      <div>
                        <span className="text-2xl font-bold font-['Cinzel']">
                          {item.currentStock}
                        </span>
                        <span className="text-xs text-[#8C8074] ml-1">
                          {item.unit}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C8074]">
                        Seuil min : {item.minThreshold}
                      </span>
                    </div>

                    {/* Stock adjustments buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => adjustInventoryStock(item.id, -1)}
                        className="flex-1 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] hover:bg-black/5 text-xs font-bold font-mono transition-colors"
                        title="Diminuer stock"
                      >
                        - 1
                      </button>
                      <button
                        onClick={() => adjustInventoryStock(item.id, +1)}
                        className="flex-1 py-2 rounded-xl bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-bold font-mono hover:bg-[#E68314] transition-colors"
                        title="Ajouter stock"
                      >
                        + 1
                      </button>
                      <button
                        onClick={() => adjustInventoryStock(item.id, +5)}
                        className="px-3 py-2 rounded-xl bg-[#E68314]/15 text-[#E68314] text-xs font-bold font-mono hover:bg-[#E68314] hover:text-white transition-colors"
                        title="Ajout rapide lot"
                      >
                        + 5
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CRM CLIENTS */}
        {/* ======================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Fichier Clients de l'Atelier WriticArt
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Historique des achats, préférences calligraphiques et fidélité.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">
                        {client.name}
                      </h4>
                      {client.vipStatus && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E68314] text-white text-[9px] font-['Cinzel'] font-bold uppercase tracking-wider shadow">
                          Client VIP
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
                      📍 {client.city}
                    </p>
                    <p className="text-xs text-[#70675E] dark:text-[#A8A096]">
                      📞 {client.phone}
                    </p>

                    {client.notes && (
                      <p className="text-[11px] p-2.5 rounded-xl bg-[#FFFBF5] dark:bg-[#1E1B18] border border-[#E8DFD1] dark:border-[#2E2A26] italic text-[#6B6156] dark:text-[#A8A096]">
                        « {client.notes} »
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#8C8074] block">Dépenses Cumulées</span>
                      <span className="font-['Cinzel'] font-bold text-[#E68314]">
                        {client.totalSpentFCFA.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(client.name)}%20!%20L'Atelier%20WriticArt%20vous%20salue.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold hover:bg-[#1EBE5D] transition-colors flex items-center space-x-1 shadow"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CATALOG & PRICING */}
        {/* ======================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                Catalogue & Tarification en FCFA
              </h3>
              <p className="text-xs text-[#8C8074]">
                Ajustez directement les prix de vente en ligne et la disponibilité des œuvres.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4"
                >
                  <div className="flex space-x-3 items-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0 border"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">{prod.categoryLabel}</span>
                      <h4 className="font-['Cormorant_Garamond'] text-lg font-bold truncate">{prod.name}</h4>
                    </div>
                  </div>

                  {/* Price input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-['Cinzel'] text-[#8C8074] uppercase block font-bold">
                      Prix de vente (FCFA) :
                    </label>
                    <input
                      type="number"
                      value={prod.priceFCFA}
                      onChange={(e) => updateProductPrice(prod.id, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] font-['Cinzel'] font-bold text-base focus:outline-none focus:border-[#E68314]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-['Cinzel'] font-bold transition-colors ${
                        prod.inStock
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {prod.inStock ? '✓ En Ligne' : '✕ Masqué'}
                    </button>
                    <span className="text-xs text-[#8C8074]">
                      ~{(prod.priceFCFA / 655.957).toFixed(1)} €
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: SETTINGS & EXPORTS */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="bg-white dark:bg-[#181716] p-8 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                Sauvegarde & Export Comptable
              </h3>
              <p className="text-xs text-[#8C8074] leading-relaxed">
                Toutes les données de l'ERP WriticArt (commandes, stocks, clients, prix) sont automatiquement sauvegardées en temps réel dans votre navigateur (`localStorage`).
              </p>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-3.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase font-bold tracking-wider hover:bg-[#E68314] transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger le Fichier Excel / CSV des Commandes</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Voulez-vous réinitialiser les données aux valeurs par défaut de démonstration ?')) {
                      resetAllData();
                      alert('Données réinitialisées avec succès.');
                    }
                  }}
                  className="w-full py-3 rounded-full border border-red-300 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 text-xs font-['Cinzel'] uppercase font-bold tracking-wider transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Réinitialiser les données démo</span>
                </button>
              </div>
            </div>

            <div className="bg-[#FFF8F0] dark:bg-[#1C1814] p-6 rounded-3xl border border-[#E68314]/30 text-xs text-[#554C43] dark:text-[#C5BCB2] space-y-2">
              <h4 className="font-['Cinzel'] text-[#B86209] dark:text-[#E68314] font-bold">
                Identifiants & Paramètres de l'Atelier :
              </h4>
              <p>• <strong>Devise :</strong> Franc CFA (FCFA) avec conversion internationale indicative en Euros (€)</p>
              <p>• <strong>WhatsApp Commercial :</strong> +221 77 234 85 21</p>
              <p>• <strong>Email Officiel :</strong> kaynubind@gmail.com</p>
              <p>• <strong>Localisation :</strong> Dakar, Sénégal</p>
            </div>

          </div>
        )}

      </main>

      {/* New Order Modal */}
      {isNewOrderModalOpen && (
        <NewOrderModal onClose={() => setIsNewOrderModalOpen(false)} />
      )}

      {/* Print Invoice Modal */}
      {printOrder && (
        <PrintInvoiceModal
          order={printOrder}
          onClose={() => setPrintOrder(null)}
        />
      )}

    </div>
  );
};
