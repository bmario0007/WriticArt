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
  Download, 
  Upload,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Palette,
  Trash2,
  Edit,
  Copy,
  Check,
  Lock,
  KeyRound,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import { useNavigation } from '../../context/NavigationContext';
import type { OrderStatus, ErpOrder, ArticlePost, CatalogProduct } from '../../types';
import { NewOrderModal } from './NewOrderModal';
import { PrintInvoiceModal } from './PrintInvoiceModal';
import { PostEditorModal } from './PostEditorModal';
import { MediaUploadModal } from './MediaUploadModal';
import { ProductEditorModal } from './ProductEditorModal';
import { LayoutCustomizer } from './LayoutCustomizer';
import { AdminPinLock } from './AdminPinLock';
import logoDark from '../../assets/brand/logo-dark.jpg';
import { atelierAudio } from '../../utils/soundEffects';

export const AdminERP: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { 
    closeAdminMode, 
    orders, 
    inventory, 
    clients, 
    products, 
    articles,
    mediaList,
    deleteArticle,
    deleteMedia,
    deleteProduct,
    updateOrderStatus, 
    adjustInventoryStock,
    toggleProductStock,
    totalRevenueFCFA,
    activeOrdersCount,
    pendingBATCount,
    lowStockItemsCount
  } = useErp();

  // Security Lock State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('writicart_admin_unlocked') === 'true';
  });
  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem('writicart_admin_pin') || '1234';
  });

  // Settings PIN Change Form
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeMessage, setPinChangeMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'media' | 'layout' | 'orders' | 'inventory' | 'clients' | 'catalog' | 'settings'>('dashboard');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [printOrder, setPrintOrder] = useState<ErpOrder | null>(null);
  const [editingPost, setEditingPost] = useState<ArticlePost | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMediaUploadOpen, setIsMediaUploadOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

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

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Offre', 'Client', 'Telephone', 'Email', 'Ville', 'Articles', 'Total_FCFA', 'Monnaie_Client', 'Theme', 'Parfum', 'Livraison', 'Statut', 'Paiement', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      o.offerType || 'boutique',
      `"${o.clientName}"`,
      `"${o.clientPhone}"`,
      `"${o.clientEmail || ''}"`,
      `"${o.city}"`,
      `"${o.items.map((i) => `${i.title} (${i.quantity})`).join(', ')}"`,
      o.totalFCFA,
      o.currencyUsed || 'FCFA',
      `"${o.theme || ''}"`,
      `"${o.parfumChoice || ''}"`,
      `"${o.deliveryType || ''}"`,
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

  const handleExportAllJSON = () => {
    const fullBackup = {
      version: '2.0',
      date: new Date().toISOString(),
      orders,
      inventory,
      clients,
      products,
      articles,
      mediaList,
      siteSettings: localStorage.getItem('writicart_cms_settings_v2')
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `writicart_sauvegarde_complete_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string);
        if (data.orders) localStorage.setItem('writicart_erp_orders_v3', JSON.stringify(data.orders));
        if (data.inventory) localStorage.setItem('writicart_erp_inventory_v2', JSON.stringify(data.inventory));
        if (data.clients) localStorage.setItem('writicart_erp_clients_v2', JSON.stringify(data.clients));
        if (data.products) localStorage.setItem('writicart_erp_products_v3', JSON.stringify(data.products));
        if (data.articles) localStorage.setItem('writicart_cms_articles_v1', JSON.stringify(data.articles));
        if (data.mediaList) localStorage.setItem('writicart_cms_media_v1', JSON.stringify(data.mediaList));
        if (data.siteSettings) localStorage.setItem('writicart_cms_settings_v2', data.siteSettings);
        alert('Sauvegarde restaurée avec succès ! La page va s’actualiser.');
        window.location.reload();
      } catch {
        alert('Erreur lors de la lecture du fichier de sauvegarde.');
      }
    };
    reader.readAsText(file);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPinInput !== adminPin) {
      setPinChangeMessage({ text: 'Le code PIN actuel est incorrect.', type: 'error' });
      return;
    }
    if (newPinInput.length < 4) {
      setPinChangeMessage({ text: 'Le nouveau code doit contenir au moins 4 chiffres.', type: 'error' });
      return;
    }
    localStorage.setItem('writicart_admin_pin', newPinInput);
    setAdminPin(newPinInput);
    setCurrentPinInput('');
    setNewPinInput('');
    setPinChangeMessage({ text: 'Code PIN mis à jour avec succès !', type: 'success' });
    setTimeout(() => setPinChangeMessage(null), 4000);
  };

  // If not unlocked, render the luxury PIN Lock Screen
  if (!isUnlocked) {
    return (
      <AdminPinLock
        correctPin={adminPin}
        onUnlock={() => {
          sessionStorage.setItem('writicart_admin_unlocked', 'true');
          setIsUnlocked(true);
        }}
      />
    );
  }

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
                WriticArt • WordPress CMS & Atelier ERP
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Mode Administrateur Actif
              </span>
            </div>
            <p className="text-[10px] text-[#A69C91] font-['Cinzel'] tracking-wider hidden sm:block">
              Gestion de Contenus, Articles, Médiathèque Photos, Commandes & Ventes • Dakar, Sénégal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sessionStorage.removeItem('writicart_admin_unlocked');
              setIsUnlocked(false);
            }}
            className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-red-600/80 text-white text-xs font-['Cinzel'] tracking-wider uppercase font-semibold transition-all flex items-center space-x-1.5 shadow"
            title="Verrouiller la session"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Verrouiller</span>
          </button>

          <button
            onClick={() => {
              closeAdminMode();
              navigateTo('home');
            }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#E68314] text-white text-xs font-['Cinzel'] tracking-wider uppercase font-semibold transition-all flex items-center space-x-1.5 shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la Boutique</span>
          </button>
        </div>
      </header>

      {/* Main ERP Navigation Tabs (WordPress Style) */}
      <nav className="bg-white/80 dark:bg-[#141312]/90 backdrop-blur-md border-b border-[#E8DFD1] dark:border-[#2E2A26] px-4 sm:px-8 sticky top-[65px] z-30">
        <div className="flex space-x-1 overflow-x-auto scrollbar-none py-2">
          {[
            { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
            { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
            { id: 'media', label: `Médiathèque (${mediaList.length})`, icon: ImageIcon },
            { id: 'layout', label: 'Mise en Page', icon: Palette },
            { id: 'catalog', label: `Catalogue (${products.length})`, icon: Tags },
            { id: 'orders', label: `Commandes (${orders.length})`, icon: Package },
            { id: 'inventory', label: `Stocks (${inventory.length})`, icon: Boxes, badge: lowStockItemsCount > 0 ? `${lowStockItemsCount} bas` : undefined },
            { id: 'clients', label: `Clients (${clients.length})`, icon: Users },
            { id: 'settings', label: 'Réglages', icon: Settings }
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
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-[11px] font-['Cinzel'] tracking-wider font-semibold whitespace-nowrap transition-all ${
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
                <p className="text-[11px] text-emerald-600 font-medium">+18% ce mois • Dakar & Monde</p>
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
                <p className="text-[11px] text-[#70675E] dark:text-[#A8A096]">{pendingBATCount} en validation BAT</p>
              </div>

              <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C8074]">
                  <span className="font-['Cinzel'] uppercase font-bold">Articles Publiés</span>
                  <div className="p-2 rounded-full bg-purple-500/15 text-purple-500">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#181716] dark:text-[#FAF8F5]">
                  {articles.length} <span className="text-sm font-normal">au Journal</span>
                </p>
                <p className="text-[11px] text-[#70675E] dark:text-[#A8A096]">{mediaList.length} photos dans la médiathèque</p>
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
                <p className="text-[11px] text-red-500">{lowStockItemsCount > 0 ? 'Bâtons de cire bordeaux à réapprovisionner' : 'Stocks équilibrés'}</p>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => {
                  setEditingPost(null);
                  setIsPostModalOpen(true);
                }}
                className="p-6 bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] shadow-sm text-left transition-all group"
              >
                <FileText className="w-6 h-6 text-[#E68314] mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">Rédiger un Article</h4>
                <p className="text-xs text-[#8C8074] mt-1">Publier des conseils d'amour, coulisses ou astuces calligraphiques sur le blog.</p>
              </button>

              <button
                onClick={() => setIsMediaUploadOpen(true)}
                className="p-6 bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] shadow-sm text-left transition-all group"
              >
                <ImageIcon className="w-6 h-6 text-[#E68314] mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">Ajouter des Photos</h4>
                <p className="text-xs text-[#8C8074] mt-1">Téléverser de nouveaux visuels pour les coffrets, toiles ou le feed Instagram.</p>
              </button>

              <button
                onClick={() => setActiveTab('layout')}
                className="p-6 bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314] shadow-sm text-left transition-all group"
              >
                <Palette className="w-6 h-6 text-[#E68314] mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-['Cormorant_Garamond'] text-xl font-bold">Modifier la Mise en Page</h4>
                <p className="text-xs text-[#8C8074] mt-1">Personnaliser en direct les textes du Hero, le bandeau et l'ordre des rubriques.</p>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ARTICLES & BLOG (WordPress Posts) */}
        {/* ======================================================== */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Gestion des Articles du Journal d'Atelier
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Rédigez, modifiez ou dépubliez des articles d'art, conseils de couple et récits d'artisanat.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPost(null);
                  setIsPostModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors flex items-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>+ Rédiger un Article</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] dark:bg-[#141312] border-b border-[#E8DFD1] dark:border-[#2E2A26] font-['Cinzel'] text-[#8C8074] uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-bold">Article & Couverture</th>
                      <th className="py-3 px-4 font-bold">Catégorie</th>
                      <th className="py-3 px-4 font-bold">Auteur & Date</th>
                      <th className="py-3 px-4 font-bold">État</th>
                      <th className="py-3 px-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DA] dark:divide-[#26221E]">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 flex items-center space-x-3">
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-16 h-12 rounded-xl object-cover shrink-0 border"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-sm text-[#181716] dark:text-[#FAF8F5] block truncate max-w-md">
                              {art.title}
                            </span>
                            <span className="text-[11px] text-[#8C8074] line-clamp-1">
                              {art.excerpt}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-[#B86209] dark:text-[#E68314]">
                          {art.category}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="block font-medium">{art.author}</span>
                          <span className="text-[10px] text-[#8C8074]">{art.date}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-['Cinzel'] font-bold ${
                            art.status === 'publie'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {art.status === 'publie' ? '✓ Publié' : '✎ Brouillon'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingPost(art);
                              setIsPostModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#E68314] hover:text-white transition-colors"
                            title="Modifier l'article"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer définitivement l'article "${art.title}" ?`)) {
                                deleteArticle(art.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-red-600 hover:text-white transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MEDIA LIBRARY (WordPress Photos) */}
        {/* ======================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Médiathèque Photos de l'Atelier
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Gérez les photos officielles, visuels des coffrets et dorures utilisables sur le site.
                </p>
              </div>

              <button
                onClick={() => setIsMediaUploadOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors flex items-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>+ Téléverser une Photo</span>
              </button>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaList.map((m) => (
                <div
                  key={m.id}
                  className="bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#ECE4D8] dark:bg-[#201D1A]">
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-['Cinzel'] uppercase">
                      {m.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-xs truncate" title={m.title}>{m.title}</h4>
                    <span className="text-[10px] text-[#8C8074] block">{m.date} {m.size ? `• ${m.size}` : ''}</span>

                    <div className="pt-2 flex items-center justify-between border-t border-[#F2ECE1] dark:border-[#26221E]">
                      <button
                        onClick={() => handleCopyLink(m.url)}
                        className="text-[11px] font-['Cinzel'] text-[#E68314] hover:underline flex items-center space-x-1"
                      >
                        {copiedUrl === m.url ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUrl === m.url ? 'Copié !' : 'Copier lien'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer cette photo de la médiathèque ?`)) {
                            deleteMedia(m.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Supprimer la photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LAYOUT BUILDER & CUSTOMIZER */}
        {/* ======================================================== */}
        {activeTab === 'layout' && (
          <LayoutCustomizer />
        )}

        {/* ======================================================== */}
        {/* TAB 5: CATALOG & PRODUCTS */}
        {/* ======================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Catalogue & Fiches Créations
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Ajoutez de nouvelles créations, modifiez les visuels, les fiches et les tarifs en FCFA.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors flex items-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>+ Ajouter une Création</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex space-x-3 items-center">
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-2xl object-cover shrink-0 border" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">{prod.categoryLabel}</span>
                        <h4 className="font-['Cormorant_Garamond'] text-lg font-bold truncate">{prod.name}</h4>
                        <span className="font-['Cinzel'] font-bold text-sm text-[#E68314]">
                          {prod.priceFCFA.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#6B6156] dark:text-[#A8A096] line-clamp-2">{prod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between">
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-['Cinzel'] font-bold ${
                        prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {prod.inStock ? '✓ En Ligne' : '✕ Masqué'}
                    </button>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsProductModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#E68314] hover:text-white transition-colors"
                        title="Modifier la fiche"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la création "${prod.name}" ?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-red-600 hover:text-white transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: ORDERS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
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
                      <th className="py-3 px-4 font-bold">Créations</th>
                      <th className="py-3 px-4 font-bold">Montant</th>
                      <th className="py-3 px-4 font-bold">Statut Actuel</th>
                      <th className="py-3 px-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DA] dark:divide-[#26221E]">
                    {filteredOrders.map((order) => (
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

                        <td className="py-3.5 px-4 max-w-xs space-y-1">
                          <div className="flex flex-wrap gap-1 mb-0.5">
                            {order.offerType && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-['Cinzel'] font-bold uppercase bg-[#231B26] text-[#F3D69B]">
                                {order.offerType === 'tableau'
                                  ? 'Tableau Acrostiche'
                                  : order.offerType === 'writiclove'
                                  ? 'Préco WriticLove'
                                  : order.offerType === 'box'
                                  ? 'Box Février'
                                  : order.offerType === 'atelier'
                                  ? 'Sur-Mesure'
                                  : 'Boutique'}
                              </span>
                            )}
                            {order.isPreorder && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#E68314]/20 text-[#B86209] dark:text-[#E68314]">
                                Précommande
                              </span>
                            )}
                          </div>
                          {order.items.map((it, i) => (
                            <div key={i} className="truncate">
                              <span className="font-medium">{it.title}</span>
                              <span className="text-[10px] text-[#8C8074]"> (x{it.quantity})</span>
                            </div>
                          ))}
                          {(order.theme || order.parfumChoice || order.deliveryType) && (
                            <p className="text-[10px] text-[#70675E] dark:text-[#A8A096] truncate">
                              {[
                                order.theme && `Thème: ${order.theme}`,
                                order.parfumChoice && `Parfum: ${order.parfumChoice}`,
                                order.deliveryType && `${order.deliveryType}`
                              ]
                                .filter(Boolean)
                                .join(' • ')}
                            </p>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-['Cinzel'] font-bold text-sm block">
                            {order.currencyUsed === 'EUR'
                              ? `${(Math.round((order.totalFCFA / 655.957) * 100) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                              : `${order.totalFCFA.toLocaleString('fr-FR')} FCFA`}
                          </span>
                          <span className="inline-flex items-center space-x-1 mt-0.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-['Cinzel'] font-bold ${
                                order.currencyUsed === 'EUR'
                                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                              title="Monnaie choisie par le client au moment de la commande"
                            >
                              {order.currencyUsed || 'FCFA'}
                            </span>
                            {order.currencyUsed === 'EUR' && (
                              <span className="text-[10px] text-[#8C8074]">
                                ({order.totalFCFA.toLocaleString('fr-FR')} FCFA)
                              </span>
                            )}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-['Cinzel'] font-bold border-none cursor-pointer ${statusLabels[order.status].color}`}
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
                            title="Message WhatsApp client"
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: INVENTORY */}
        {/* ======================================================== */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
                  Stocks Produits Finis & Matières d'Art
                </h3>
                <p className="text-xs text-[#8C8074]">
                  Suivi des coffrets confectionnés, parchemins, dorures 24K et bâtons de cire souple.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((item) => {
                const isCritical = item.currentStock <= item.minThreshold;
                return (
                  <div
                    key={item.id}
                    className={`bg-white dark:bg-[#181716] rounded-3xl p-6 border ${
                      isCritical ? 'border-red-400 ring-2 ring-red-400/20' : 'border-[#E8DFD1] dark:border-[#2E2A26]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-['Cinzel'] text-[#8C8074]">{item.category}</span>
                      {isCritical && <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">Stock Bas</span>}
                    </div>
                    <h4 className="font-bold text-base leading-snug">{item.name}</h4>
                    <div className="my-3 flex justify-between items-baseline py-2 border-y border-[#F2ECE1] dark:border-[#26221E]">
                      <span className="text-2xl font-bold font-['Cinzel']">{item.currentStock} {item.unit}</span>
                      <span className="text-xs text-[#8C8074]">Min : {item.minThreshold}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => adjustInventoryStock(item.id, -1)} className="flex-1 py-1.5 rounded-xl border text-xs font-mono font-bold">- 1</button>
                      <button onClick={() => adjustInventoryStock(item.id, +1)} className="flex-1 py-1.5 rounded-xl bg-[#181716] dark:bg-white text-white dark:text-black text-xs font-mono font-bold">+ 1</button>
                      <button onClick={() => adjustInventoryStock(item.id, +5)} className="px-3 py-1.5 rounded-xl bg-[#E68314]/20 text-[#E68314] text-xs font-mono font-bold">+ 5</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CLIENTS CRM */}
        {/* ======================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Fichier Clients de l'Atelier</h3>
              <p className="text-xs text-[#8C8074]">Historique d'achats et contacts directs WhatsApp.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((c) => (
                <div key={c.id} className="bg-white dark:bg-[#181716] p-6 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{c.name}</h4>
                    {c.vipStatus && <span className="px-2 py-0.5 rounded-full bg-[#E68314] text-white text-[9px] font-bold">VIP</span>}
                  </div>
                  <p className="text-xs text-[#70675E] dark:text-[#A8A096]">📍 {c.city} • 📞 {c.phone}</p>
                  <div className="pt-2 border-t border-[#F2ECE1] dark:border-[#26221E] flex justify-between items-center text-xs">
                    <span className="font-['Cinzel'] font-bold text-[#E68314]">{c.totalSpentFCFA.toLocaleString('fr-FR')} FCFA</span>
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(c.name)}%20!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center space-x-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: SETTINGS & EXPORT */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* 1. SECURITY & PIN CODE */}
            <div className="bg-white dark:bg-[#181716] p-8 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Sécurité & Code PIN d'Atelier</h3>
                  <p className="text-xs text-[#8C8074]">Protégez l'accès à l'ERP et au CMS WordPress.</p>
                </div>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                      Code PIN actuel
                    </label>
                    <input
                      type="password"
                      maxLength={8}
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Ex: 1234"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-sm font-mono tracking-widest focus:outline-none focus:border-[#E68314]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                      Nouveau code PIN
                    </label>
                    <input
                      type="password"
                      maxLength={8}
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Min. 4 chiffres"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-sm font-mono tracking-widest focus:outline-none focus:border-[#E68314]"
                      required
                    />
                  </div>
                </div>

                {pinChangeMessage && (
                  <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                    pinChangeMessage.type === 'success' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800'
                  }`}>
                    {pinChangeMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>{pinChangeMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] uppercase font-bold tracking-wider hover:bg-[#E68314] dark:hover:bg-[#E68314] dark:hover:text-white transition-colors"
                >
                  Mettre à jour le code PIN
                </button>
              </form>
            </div>

            {/* 2. FULL SITE BACKUP & RESTORE */}
            <div className="bg-white dark:bg-[#181716] p-8 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Sauvegarde & Restauration Complète</h3>
                  <p className="text-xs text-[#8C8074]">Exportez l'intégralité du site (articles, réglages, catalogue, commandes) en un fichier JSON.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleExportAllJSON}
                  className="py-3 px-4 rounded-2xl bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger Sauvegarde JSON</span>
                </button>

                <label className="py-3 px-4 rounded-2xl border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-[#181716] dark:text-[#FAF8F5] hover:text-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Restaurer Fichier JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* 3. EXCEL / CSV ORDERS EXPORT */}
            <div className="bg-white dark:bg-[#181716] p-8 rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-4">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Export Comptable Commandes</h3>
              <p className="text-xs text-[#8C8074]">Format tableur compatible Microsoft Excel, Google Sheets et Apple Numbers.</p>
              <button
                onClick={handleExportCSV}
                className="w-full py-3.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] uppercase font-bold tracking-wider hover:text-[#E68314] transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Fichier Excel / CSV</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* MODALS */}
      {isNewOrderModalOpen && <NewOrderModal onClose={() => setIsNewOrderModalOpen(false)} />}
      {printOrder && <PrintInvoiceModal order={printOrder} onClose={() => setPrintOrder(null)} />}
      {isPostModalOpen && <PostEditorModal post={editingPost} onClose={() => setIsPostModalOpen(false)} />}
      {isMediaUploadOpen && <MediaUploadModal onClose={() => setIsMediaUploadOpen(false)} />}
      {isProductModalOpen && <ProductEditorModal product={editingProduct} onClose={() => setIsProductModalOpen(false)} />}

    </div>
  );
};
