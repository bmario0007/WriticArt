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
