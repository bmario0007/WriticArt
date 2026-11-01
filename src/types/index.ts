export type EventType = 'mariage' | 'entreprise' | 'sentiment' | 'quotidien' | 'writiclove' | 'tableau' | 'cadre';

export type PaperType = 'coton-350' | 'deckle-edge' | 'parchemin-or' | 'noir-nuit';

export type InkType = 'or-24k' | 'encre-chine' | 'sepia' | 'blanc-nacré';

export type CalligraphyStyle = 'spencerian' | 'editorial' | 'brush-moderne' | 'gothique-poetique';

export type WaxColor = 'bordeaux' | 'emeraude' | 'or' | 'noir';

export type WaxStamp = 'fleur-de-lys' | 'olivier' | 'coeur' | 'monogramme';

export interface GalleryItem {
  id: string;
  title: string;
  category: EventType;
  categoryLabel: string;
  image: string;
  likes: number;
  commentsCount: number;
  description: string;
  paperDetail: string;
  inkDetail: string;
  creationTime: string;
  instagramHandle: string;
  featuredQuote?: string;
  priceFCFA?: number;
  priceEstimate?: number;
  tags: string[];
}

export interface DailyThought {
  id: string;
  dayNumber: number;
  date: string;
  theme: string;
  quote: string;
  author: string;
  advice: string;
  target: 'homme' | 'femme' | 'couple';
  waxColor: WaxColor;
  paperType: PaperType;
}

export interface QuoteConfiguration {
  eventType: EventType;
  paperType: PaperType;
  inkType: InkType;
  calligraphyStyle: CalligraphyStyle;
  waxColor: WaxColor;
  waxStamp: WaxStamp;
  hasSilkRibbon: boolean;
  hasGoldLeafFoil: boolean;
  hasHandmadeEnvelope: boolean;
  hasWaxSeal: boolean;
  quantity: number;
  customTitle: string;
  customMessage: string;
  customNames: string;
  rushOrder: boolean;
  deliveryOption: 'standard' | 'express' | 'retrait-dakar';
  currency: 'FCFA' | 'EUR';
}

// -------------------------------------------------------------
// CART & E-COMMERCE TYPES (Rahiya minimalist shop)
// -------------------------------------------------------------
export interface CartItem {
  id: string; // unique item line id
  productId: string;
  name: string;
  subtitle?: string;
  priceFCFA: number;
  quantity: number;
  image: string;
  selectedOption?: string;
  customMessage?: string;
}

// -------------------------------------------------------------
// ERP TYPES (Admin Atelier Management)
// -------------------------------------------------------------
export type OrderStatus = 
  | 'nouveau' 
  | 'bat_validation' 
  | 'en_calligraphie' 
  | 'pret_livraison' 
  | 'livre' 
  | 'annule';

export interface OrderItemLine {
  title: string;
  quantity: number;
  unitPriceFCFA: number;
  options?: string;
}

export interface ErpOrder {
  id: string; // Ex: CMD-WA-1024
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  city: string; // Ex: "Dakar (Almadies)", "Mermoz", "Paris"
  date: string;
  items: OrderItemLine[];
  totalFCFA: number;
  status: OrderStatus;
  paymentMethod: 'Wave' | 'Orange Money' | 'Espèces' | 'Virement';
  paymentStatus: 'paye' | 'acompte' | 'en_attente';
  notes?: string;
  customMessage?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'coffret' | 'support' | 'encre_dorure' | 'cire' | 'accessoire';
  currentStock: number;
  minThreshold: number;
  unit: string;
  unitCostFCFA: number;
  sellingPriceFCFA?: number;
}

export interface ErpClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  totalSpentFCFA: number;
  lastOrderDate: string;
  vipStatus: boolean;
  notes?: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: 'writiclove' | 'tableau' | 'cadre' | 'accessoire' | 'mariage';
  categoryLabel: string;
  subtitle: string;
  priceFCFA: number;
  badge?: string;
  inStock: boolean;
  image: string;
  description: string;
  features: string[];
}
