import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ErpOrder, InventoryItem, ErpClient, CatalogProduct, OrderStatus } from '../types';
import { initialErpOrders, initialInventory, initialClients, initialCatalogProducts } from '../data/erpData';
import { atelierAudio } from '../utils/soundEffects';

interface ErpContextType {
  isAdminMode: boolean;
  openAdminMode: () => void;
  closeAdminMode: () => void;
  orders: ErpOrder[];
  inventory: InventoryItem[];
  clients: ErpClient[];
  products: CatalogProduct[];
  addOrder: (order: Omit<ErpOrder, 'id' | 'date'>) => ErpOrder;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateInventoryStock: (itemId: string, newQty: number) => void;
  adjustInventoryStock: (itemId: string, delta: number) => void;
  updateProductPrice: (productId: string, newPriceFCFA: number) => void;
  toggleProductStock: (productId: string) => void;
  addClient: (client: Omit<ErpClient, 'id' | 'totalOrders' | 'totalSpentFCFA' | 'lastOrderDate'>) => void;
  deleteOrder: (orderId: string) => void;
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

export const ErpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [orders, setOrders] = useState<ErpOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : initialErpOrders;
    } catch {
      return initialErpOrders;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_KEY);
      return saved ? JSON.parse(saved) : initialInventory;
    } catch {
      return initialInventory;
    }
  });

  const [clients, setClients] = useState<ErpClient[]>(() => {
    try {
      const saved = localStorage.getItem(CLIENTS_KEY);
      return saved ? JSON.parse(saved) : initialClients;
    } catch {
      return initialClients;
    }
  });

  const [products, setProducts] = useState<CatalogProduct[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialCatalogProducts;
    } catch {
      return initialCatalogProducts;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // storage exception
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch {
      // storage exception
    }
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
    } catch {
      // storage exception
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch {
      // storage exception
    }
  }, [products]);

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

    // Also update or add client
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

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const resetAllData = () => {
    setOrders(initialErpOrders);
    setInventory(initialInventory);
    setClients(initialClients);
    setProducts(initialCatalogProducts);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(INVENTORY_KEY);
    localStorage.removeItem(CLIENTS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
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
        inventory,
        clients,
        products,
        addOrder,
        updateOrderStatus,
        updateInventoryStock,
        adjustInventoryStock,
        updateProductPrice,
        toggleProductStock,
        addClient,
        deleteOrder,
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
