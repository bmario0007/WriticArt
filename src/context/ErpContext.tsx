import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  ErpOrder, 
  InventoryItem, 
  ErpClient, 
  CatalogProduct, 
  OrderStatus,
  ArticlePost,
  MediaItem,
  SiteSettings
} from '../types';
import { 
  initialErpOrders, 
  initialInventory, 
  initialClients, 
  initialCatalogProducts,
  initialArticles,
  initialMedia,
  initialSiteSettings
} from '../data/erpData';
import { atelierAudio } from '../utils/soundEffects';

interface ErpContextType {
  isAdminMode: boolean;
  openAdminMode: () => void;
  closeAdminMode: () => void;
  
  // Orders
  orders: ErpOrder[];
  addOrder: (order: Omit<ErpOrder, 'id' | 'date'>) => ErpOrder;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  
  // Inventory
  inventory: InventoryItem[];
  updateInventoryStock: (itemId: string, newQty: number) => void;
  adjustInventoryStock: (itemId: string, delta: number) => void;
  
  // Clients CRM
  clients: ErpClient[];
  addClient: (client: Omit<ErpClient, 'id' | 'totalOrders' | 'totalSpentFCFA' | 'lastOrderDate'>) => void;
  
  // Catalog Products
  products: CatalogProduct[];
  addProduct: (product: Omit<CatalogProduct, 'id'>) => CatalogProduct;
  updateProduct: (id: string, partial: Partial<CatalogProduct>) => void;
  deleteProduct: (id: string) => void;
  updateProductPrice: (productId: string, newPriceFCFA: number) => void;
  toggleProductStock: (productId: string) => void;
  
  // Blog / Journal Articles (WordPress CMS)
  articles: ArticlePost[];
  addArticle: (article: Omit<ArticlePost, 'id' | 'slug' | 'date'>) => ArticlePost;
  updateArticle: (id: string, partial: Partial<ArticlePost>) => void;
  deleteArticle: (id: string) => void;

  // Media Library (WordPress Photos)
  mediaList: MediaItem[];
  addMedia: (media: Omit<MediaItem, 'id' | 'date'>) => MediaItem;
  deleteMedia: (id: string) => void;

  // Page Builder / Site Settings (WordPress Appearance)
  siteSettings: SiteSettings;
  updateSiteSettings: (partial: Partial<SiteSettings>) => void;

  resetAllData: () => void;
  totalRevenueFCFA: number;
  activeOrdersCount: number;
  pendingBATCount: number;
  lowStockItemsCount: number;
}

const ErpContext = createContext<ErpContextType | undefined>(undefined);

const ORDERS_KEY = 'writicart_erp_orders_v2';
const INVENTORY_KEY = 'writicart_erp_inventory_v2';
const CLIENTS_KEY = 'writicart_erp_clients_v2';
const PRODUCTS_KEY = 'writicart_erp_products_v2';
const ARTICLES_KEY = 'writicart_cms_articles_v1';
const MEDIA_KEY = 'writicart_cms_media_v1';
const SETTINGS_KEY = 'writicart_cms_settings_v1';

export const ErpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Orders
  const [orders, setOrders] = useState<ErpOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : initialErpOrders;
    } catch {
      return initialErpOrders;
    }
  });

  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_KEY);
      return saved ? JSON.parse(saved) : initialInventory;
    } catch {
      return initialInventory;
    }
  });

  // Clients
  const [clients, setClients] = useState<ErpClient[]>(() => {
    try {
      const saved = localStorage.getItem(CLIENTS_KEY);
      return saved ? JSON.parse(saved) : initialClients;
    } catch {
      return initialClients;
    }
  });

  // Products
  const [products, setProducts] = useState<CatalogProduct[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialCatalogProducts;
    } catch {
      return initialCatalogProducts;
    }
  });

  // Blog / Articles (WordPress)
  const [articles, setArticles] = useState<ArticlePost[]>(() => {
    try {
      const saved = localStorage.getItem(ARTICLES_KEY);
      return saved ? JSON.parse(saved) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  // Media Library (WordPress)
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(MEDIA_KEY);
      return saved ? JSON.parse(saved) : initialMedia;
    } catch {
      return initialMedia;
    }
  });

  // Site Settings (Layout & Appearance)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...initialSiteSettings, ...JSON.parse(saved) } : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  // LocalStorage sync
  useEffect(() => {
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory)); } catch {}
  }, [inventory]);

  useEffect(() => {
    try { localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients)); } catch {}
  }, [clients]);

  useEffect(() => {
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); } catch {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles)); } catch {}
  }, [articles]);

  useEffect(() => {
    try { localStorage.setItem(MEDIA_KEY, JSON.stringify(mediaList)); } catch {}
  }, [mediaList]);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteSettings)); } catch {}
  }, [siteSettings]);

  const openAdminMode = () => {
    atelierAudio.playGoldChime();
    setIsAdminMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAdminMode = () => {
    atelierAudio.playPaperSlide();
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Orders methods
  const addOrder = (orderData: Omit<ErpOrder, 'id' | 'date'>): ErpOrder => {
    atelierAudio.playWaxStamp();
    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const newId = 'CMD-WA-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: ErpOrder = {
      ...orderData,
      id: newId,
      date: today
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update clients
    setClients((prev) => {
      const existing = prev.find((c) => c.phone === orderData.clientPhone || c.name.toLowerCase() === orderData.clientName.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpentFCFA: c.totalSpentFCFA + orderData.totalFCFA,
                lastOrderDate: today
              }
            : c
        );
      } else {
        const newClient: ErpClient = {
          id: 'cli_' + Date.now(),
          name: orderData.clientName,
          phone: orderData.clientPhone,
          email: orderData.clientEmail || 'client@writicart.com',
          city: orderData.city,
          totalOrders: 1,
          totalSpentFCFA: orderData.totalFCFA,
          lastOrderDate: today,
          vipStatus: orderData.totalFCFA >= 50000
        };
        return [newClient, ...prev];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    atelierAudio.playPaperSlide();
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Inventory methods
  const updateInventoryStock = (itemId: string, newQty: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, currentStock: Math.max(0, newQty) } : item))
    );
  };

  const adjustInventoryStock = (itemId: string, delta: number) => {
    atelierAudio.playPaperSlide();
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, currentStock: Math.max(0, item.currentStock + delta) }
          : item
      )
    );
  };

  // Product methods
  const addProduct = (prodData: Omit<CatalogProduct, 'id'>): CatalogProduct => {
    atelierAudio.playWaxStamp();
    const newId = 'prod_' + Date.now();
    const newProd: CatalogProduct = { ...prodData, id: newId };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id: string, partial: Partial<CatalogProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...partial } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProductPrice = (productId: string, newPriceFCFA: number) => {
    atelierAudio.playGoldChime();
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, priceFCFA: Math.max(0, newPriceFCFA) } : p))
    );
  };

  const toggleProductStock = (productId: string) => {
    atelierAudio.playPaperSlide();
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Client CRM methods
  const addClient = (clientData: Omit<ErpClient, 'id' | 'totalOrders' | 'totalSpentFCFA' | 'lastOrderDate'>) => {
    atelierAudio.playWaxStamp();
    const newClient: ErpClient = {
      ...clientData,
      id: 'cli_' + Date.now(),
      totalOrders: 0,
      totalSpentFCFA: 0,
      lastOrderDate: 'Aucune commande'
    };
    setClients((prev) => [newClient, ...prev]);
  };

  // Articles / Blog (WordPress Posts)
  const addArticle = (artData: Omit<ArticlePost, 'id' | 'slug' | 'date'>): ArticlePost => {
    atelierAudio.playWaxStamp();
    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const slug = artData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newArticle: ArticlePost = {
      ...artData,
      id: 'post_' + Date.now(),
      slug,
      date: today
    };

    setArticles((prev) => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = (id: string, partial: Partial<ArticlePost>) => {
    atelierAudio.playPaperSlide();
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...partial } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Media Library (WordPress Photos)
  const addMedia = (mediaData: Omit<MediaItem, 'id' | 'date'>): MediaItem => {
    atelierAudio.playGoldChime();
    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const newMedia: MediaItem = {
      ...mediaData,
      id: 'med_' + Date.now(),
      date: today
    };
    setMediaList((prev) => [newMedia, ...prev]);
    return newMedia;
  };

  const deleteMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
  };

  // Site Settings / Page Builder
  const updateSiteSettings = (partial: Partial<SiteSettings>) => {
    atelierAudio.playGoldChime();
    setSiteSettings((prev) => ({ ...prev, ...partial }));
  };

  const resetAllData = () => {
    setOrders(initialErpOrders);
    setInventory(initialInventory);
    setClients(initialClients);
    setProducts(initialCatalogProducts);
    setArticles(initialArticles);
    setMediaList(initialMedia);
    setSiteSettings(initialSiteSettings);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(INVENTORY_KEY);
    localStorage.removeItem(CLIENTS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(ARTICLES_KEY);
    localStorage.removeItem(MEDIA_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  };

  // KPIs
  const totalRevenueFCFA = orders.reduce((acc, o) => acc + (o.status !== 'annule' ? o.totalFCFA : 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'livre' && o.status !== 'annule').length;
  const pendingBATCount = orders.filter((o) => o.status === 'bat_validation').length;
  const lowStockItemsCount = inventory.filter((item) => item.currentStock <= item.minThreshold).length;

  return (
    <ErpContext.Provider
      value={{
        isAdminMode,
        openAdminMode,
        closeAdminMode,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        inventory,
        updateInventoryStock,
        adjustInventoryStock,
        clients,
        addClient,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductPrice,
        toggleProductStock,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        mediaList,
        addMedia,
        deleteMedia,
        siteSettings,
        updateSiteSettings,
        resetAllData,
        totalRevenueFCFA,
        activeOrdersCount,
        pendingBATCount,
        lowStockItemsCount
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => {
  const context = useContext(ErpContext);
  if (!context) {
    throw new Error('useErp must be used within an ErpProvider');
  }
  return context;
};
