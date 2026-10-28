export interface WriticProduct {
  id: string;
  name: string;
  subtitle: string;
  priceFCFA: number;
  priceEUR: number;
  badge?: string;
  colorScheme: 'noir-or' | 'rose-or' | 'duo';
  description: string;
  features: string[];
  sampleCards: string[];
  image: string;
}

export const writicLoveProducts: WriticProduct[] = [
  {
    id: 'writiclove-homme',
    name: 'Writic’Love Homme',
    subtitle: '365 Jours d’Amour — Coffret Prestige Noir & Or',
    priceFCFA: 30000,
    priceEUR: 45,
    badge: 'Best-Seller',
    colorScheme: 'noir-or',
    description: '365 cartes quotidiennes pensées pour nourrir l’amour, inspirer l’attention et renforcer la complicité au sein du couple, jour après jour.',
    features: [
      '365 cartes imprimées sur papier d’art haute qualité',
      'Boîte coffret de luxe rigide noir mat & dorure or chaud',
      'Un rituel quotidien pour élever son couple',
      'Questions profondes, déclarations et résolutions',
      'Scellé avec le cachet d’authenticité WriticArt'
    ],
    sampleCards: [
      '« Aujourd’hui, je t’aime plus que jamais. »',
      '« Jour 010 — Je mesure mes paroles avant de les prononcer. »',
      '« Une attention vaut mille promesses inexprimées. »'
    ],
    image: '/brand/feed-instagram.png'
  },
  {
    id: 'writiclove-femme',
    name: 'Writic’Love Femme',
    subtitle: '365 Jours d’Amour — Coffret Rose Poudré & Or',
    priceFCFA: 30000,
    priceEUR: 45,
    badge: 'Coup de Cœur',
    colorScheme: 'rose-or',
    description: 'Une édition délicate aux teintes rose poudré et or fin, célébrant la douceur, la tendresse et la bienveillance réciproque.',
    features: [
      '365 pensées et attentions calligraphiées',
      'Écrin raffiné rose poudré avec gaufrage or',
      'Inspirations quotidiennes pour cultiver la sérénité du foyer',
      'Format carte de poche à conserver près de soi',
      'Ruban de satin et finition artisanale'
    ],
    sampleCards: [
      '« Jour 009 — Le respect, l’acceptation mutuelle et la confiance sont le socle de notre amour. »',
      '« Chaque jour à tes côtés est une bénédiction qui se réinvente. »',
      '« Jour 289 — Être en couple, c’est apprécier les moments partagés et aussi notre liberté intérieure. »'
    ],
    image: '/brand/feed-instagram.png'
  },
  {
    id: 'writiclove-duo',
    name: 'Le Duo d’Exception',
    subtitle: 'Coffret Homme + Coffret Femme (Pack Complémentaire)',
    priceFCFA: 50000,
    priceEUR: 75,
    badge: 'Offre Spéciale (-10 000 FCFA)',
    colorScheme: 'duo',
    description: 'L’expérience ultime pour le couple : les deux coffrets complémentaires pour partager chaque matin ou soir une attention croisée.',
    features: [
      'Les 2 coffrets complets (730 cartes d’amour au total)',
      'Économie immédiate de 10 000 FCFA par rapport à l’achat individuel',
      'Emballage cadeau VIP scellé à la cire et ruban de soie',
      'Livraison prioritaire sur Dakar & expéditions internationales',
      'Livret d’introduction au rituel d’amour WriticArt inclus'
    ],
    sampleCards: [
      '« Deux coffrets, deux regards, une seule et même promesse. »',
      '« Le rituel amoureux qui a transformé des centaines de relations. »'
    ],
    image: '/brand/feed-instagram.png'
  }
];

export const instagramHighlightsData = [
  {
    id: 'writic-love',
    name: "Writic'Love",
    subtitle: 'Coffrets 365 Jours',
    icon: '❤️'
  },
  {
    id: 'tableaux',
    name: 'Tableaux Réalisés',
    subtitle: 'Toiles d’Art Manuscrites',
    icon: '🎨'
  },
  {
    id: 'cadres',
    name: 'Cadres Déco',
    subtitle: 'Citations Encadrées',
    icon: '🖼️'
  },
  {
    id: 'feedbacks',
    name: 'Feedbacks',
    subtitle: 'Avis & Vidéos Clients',
    icon: '⭐'
  }
];
