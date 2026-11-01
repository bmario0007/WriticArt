import type { ErpOrder, InventoryItem, ErpClient, CatalogProduct } from '../types';
import feedInstagram from '../assets/brand/feed-instagram.png';

// -------------------------------------------------------------
// SEED CATALOG PRODUCTS (For the Minimalist Rahiya Storefront)
// -------------------------------------------------------------
export const initialCatalogProducts: CatalogProduct[] = [
  {
    id: 'writiclove-duo',
    name: 'Le Duo d’Exception Writic’Love',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours',
    subtitle: 'Coffret Homme + Coffret Femme (Pack Complémentaire)',
    priceFCFA: 50000,
    badge: 'Offre Spéciale Duo',
    inStock: true,
    image: feedInstagram,
    description: 'L’expérience ultime pour le couple : les 2 coffrets complémentaires réunis dans un emballage cadeau de prestige scellé au sceau de cire WriticArt.',
    features: [
      '2 coffrets complets (730 cartes quotidiennes au total)',
      'Écrins de luxe noir mat et rose poudré avec dorure à chaud',
      'Économie immédiate de 10 000 FCFA sur le duo',
      'Scellé à la main avec cire d’atelier et ruban de soie',
      'Livraison express Dakar & expédition internationale'
    ]
  },
  {
    id: 'writiclove-homme',
    name: 'Coffret Writic’Love Homme',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours',
    subtitle: '365 Jours d’Amour — Prestige Noir & Or',
    priceFCFA: 30000,
    badge: 'Best-Seller',
    inStock: true,
    image: feedInstagram,
    description: '365 cartes quotidiennes pensées pour nourrir l’amour, inspirer l’attention et fortifier la complicité au sein du couple, jour après jour.',
    features: [
      '365 cartes imprimées sur papier d’art 350g',
      'Boîte rigide noir mat & dorure or fin',
      'Questions d’intimité, déclarations et résolutions',
      'Un rituel quotidien pour élever votre relation'
    ]
  },
  {
    id: 'writiclove-femme',
    name: 'Coffret Writic’Love Femme',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours',
    subtitle: '365 Jours d’Amour — Rose Poudré & Or',
    priceFCFA: 30000,
    badge: 'Coup de Cœur',
    inStock: true,
    image: feedInstagram,
    description: 'Une édition délicate aux teintes rose poudré et or fin, célébrant la douceur, la tendresse et la bienveillance réciproque.',
    features: [
      '365 pensées et attentions poétiques',
      'Écrin raffiné rose poudré avec gaufrage or',
      'Inspirations quotidiennes pour le cœur et l’esprit',
      'Ruban de satin et finition artisanale'
    ]
  },
  {
    id: 'tableau-toile',
    name: 'Tableau d’Art Calligraphié sur Toile',
    category: 'tableau',
    categoryLabel: 'Tableaux & Toiles',
    subtitle: 'Toile en Lin Pur 40x50cm & Feuilles d’Or 24K',
    priceFCFA: 35000,
    badge: 'Sur-Mesure',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    description: 'Une pièce unique exécutée entièrement à la main sur toile de lin tendue sur châssis en bois noble. Vos vœux, versets ou poèmes manuscrits à l’or 24 carats.',
    features: [
      'Châssis bois avec toile lin pur de maître',
      'Dorure à la feuille d’or libre 24K en relief',
      'Encre de Chine et pigments minéraux résistants au temps',
      'Validation préalable par Bon à Tirer (BAT)'
    ]
  },
  {
    id: 'cadre-poetique',
    name: 'Cadre Poétique Écrin Bois Doré',
    category: 'cadre',
    categoryLabel: 'Cadres Décoratifs',
    subtitle: 'Format 30x40cm sous Verre Minéral',
    priceFCFA: 20000,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
    description: 'Déclaration ou poème calligraphié sur papier coton frangé 350g, inséré dans un cadre mouluré au style atelier d’antan avec passe-partout ivoire.',
    features: [
      'Papier pur coton bords frangés à la main',
      'Cadre bois doré à la patine vénitienne',
      'Cachet de cire estampillé à chaud',
      'Attache murale et chevalet intégrés'
    ]
  },
  {
    id: 'kit-sceau-cire',
    name: 'Kit Sceau de Cire & Cire Dorée WriticArt',
    category: 'accessoire',
    categoryLabel: 'Accessoires & Cire',
    subtitle: 'Sceau en Laiton Massif Gravé + 3 Bâtons de Cire Souple',
    priceFCFA: 15000,
    badge: 'Nouveau',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
    description: 'Apportez le rituel du scellé à vos propres correspondances. Matrice de laiton gravée au monogramme WA et cire souple qui ne casse pas à l’envoi postal.',
    features: [
      'Matrice en laiton massif avec manche en palissandre',
      '3 bâtons de cire souple (Or WriticArt, Bordeaux impérial, Noir)',
      'Cuillère de fonte en cuivre et bougie végétale',
      'Pochon en lin naturel WriticArt'
    ]
  },
  {
    id: 'papeterie-nuptiale',
    name: 'Suite Nuptiale & Faire-Part Vénitien',
    category: 'mariage',
    categoryLabel: 'Événements & Mariages',
    subtitle: 'Pack de 25 Faire-part sur Papier Deckle Edge 350g',
    priceFCFA: 65000,
    badge: 'Prestige',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    description: 'L’élégance ultime pour annoncer votre union. Papier coton à bords déchirés à la main, calligraphie personnalisée et sceau de cire bordeaux avec ruban de soie sauvage.',
    features: [
      'Lot de 25 invitations nominatives complètes',
      'Enveloppes vélin coordonnées faites main',
      'Sceau de cire personnalisé au monogramme des mariés',
      'Rubans de soie ivoire effilochés à la main'
    ]
  }
];

// -------------------------------------------------------------
// SEED ERP ORDERS (Commandes réelles d'atelier à Dakar)
// -------------------------------------------------------------
export const initialErpOrders: ErpOrder[] = [
  {
    id: 'CMD-WA-1024',
    clientName: 'Mariama Diallo',
    clientPhone: '+221 77 452 19 88',
    clientEmail: 'mariama.diallo@orange.sn',
    city: 'Dakar (Almadies)',
    date: '1 Nov 2026',
    items: [
      { title: 'Le Duo d’Exception Writic’Love', quantity: 1, unitPriceFCFA: 50000, options: 'Pack Homme + Femme' }
    ],
    totalFCFA: 50000,
    status: 'pret_livraison',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    notes: 'Cadeau d’anniversaire de mariage. Livrer avant 17h.',
    customMessage: '« Pour notre 3ème année d’amour, chaque jour à tes côtés est une bénédiction. »'
  },
  {
    id: 'CMD-WA-1023',
    clientName: 'Ousmane Sow',
    clientPhone: '+221 76 890 22 11',
    clientEmail: 'osow@gmail.com',
    city: 'Dakar (Point E)',
    date: '1 Nov 2026',
    items: [
      { title: 'Tableau d’Art Calligraphié sur Toile', quantity: 1, unitPriceFCFA: 35000, options: 'Toile lin 40x50cm, Dorure 24K' }
    ],
    totalFCFA: 35000,
    status: 'en_calligraphie',
    paymentMethod: 'Orange Money',
    paymentStatus: 'acompte',
    notes: 'Acompte de 20 000 FCFA reçu via OM. Solde à la livraison.',
    customMessage: '« Que la paix et la grâce habitent cette demeure. »'
  },
  {
    id: 'CMD-WA-1022',
    clientName: 'Fatou Ndiaye',
    clientPhone: '+221 78 123 45 67',
    clientEmail: 'fatou.ndiaye@yahoo.fr',
    city: 'Dakar (Mermoz)',
    date: '31 Oct 2026',
    items: [
      { title: 'Coffret Writic’Love Homme', quantity: 1, unitPriceFCFA: 30000 }
    ],
    totalFCFA: 30000,
    status: 'livre',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    notes: 'Livraison effectuée avec succès par coursier.'
  },
  {
    id: 'CMD-WA-1021',
    clientName: 'Cheikh Tidiane Ba',
    clientPhone: '+221 77 654 32 10',
    clientEmail: 'cba.architect@gmail.com',
    city: 'Dakar (Plateau)',
    date: '31 Oct 2026',
    items: [
      { title: 'Cadre Poétique Écrin Bois Doré', quantity: 2, unitPriceFCFA: 20000, options: 'Sceau Or WA' }
    ],
    totalFCFA: 40000,
    status: 'bat_validation',
    paymentMethod: 'Virement',
    paymentStatus: 'en_attente',
    notes: 'BAT envoyé par WhatsApp pour validation du poème.'
  },
  {
    id: 'CMD-WA-1020',
    clientName: 'Amina Ba & David Leroy',
    clientPhone: '+33 6 45 89 12 30',
    clientEmail: 'amina.david.wedding@gmail.com',
    city: 'Paris (DHL International)',
    date: '30 Oct 2026',
    items: [
      { title: 'Suite Nuptiale & Faire-Part Vénitien', quantity: 2, unitPriceFCFA: 65000, options: '50 faire-part au total' }
    ],
    totalFCFA: 130000,
    status: 'en_calligraphie',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    notes: 'Expédition internationale via DHL Express le 5 Nov.'
  },
  {
    id: 'CMD-WA-1019',
    clientName: 'Moussa Kane',
    clientPhone: '+221 77 312 99 00',
    city: 'Saint-Louis',
    date: '29 Oct 2026',
    items: [
      { title: 'Coffret Writic’Love Femme', quantity: 1, unitPriceFCFA: 30000 }
    ],
    totalFCFA: 30000,
    status: 'livre',
    paymentMethod: 'Espèces',
    paymentStatus: 'paye',
    notes: 'Envoyé par colis express La Poste / GP.'
  }
];

// -------------------------------------------------------------
// SEED INVENTORY (Stock Atelier WriticArt)
// -------------------------------------------------------------
export const initialInventory: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Coffret Writic’Love Homme (Fini)',
    category: 'coffret',
    currentStock: 18,
    minThreshold: 5,
    unit: 'coffrets',
    unitCostFCFA: 12000,
    sellingPriceFCFA: 30000
  },
  {
    id: 'inv-2',
    name: 'Coffret Writic’Love Femme (Fini)',
    category: 'coffret',
    currentStock: 14,
    minThreshold: 5,
    unit: 'coffrets',
    unitCostFCFA: 12000,
    sellingPriceFCFA: 30000
  },
  {
    id: 'inv-3',
    name: 'Boîtes Prestige Duo (Écrins vides)',
    category: 'coffret',
    currentStock: 9,
    minThreshold: 6,
    unit: 'boîtes',
    unitCostFCFA: 4500
  },
  {
    id: 'inv-4',
    name: 'Papier Coton Frangé 350g (Deckle Edge)',
    category: 'support',
    currentStock: 240,
    minThreshold: 50,
    unit: 'feuilles',
    unitCostFCFA: 450
  },
  {
    id: 'inv-5',
    name: 'Parchemin Vénitien Doré',
    category: 'support',
    currentStock: 65,
    minThreshold: 20,
    unit: 'feuilles',
    unitCostFCFA: 800
  },
  {
    id: 'inv-6',
    name: 'Châssis Toile Lin Pur 40x50cm',
    category: 'support',
    currentStock: 11,
    minThreshold: 4,
    unit: 'toiles',
    unitCostFCFA: 6500,
    sellingPriceFCFA: 35000
  },
  {
    id: 'inv-7',
    name: 'Feuilles d’Or Pur 24 Carats (Carnet)',
    category: 'encre_dorure',
    currentStock: 35,
    minThreshold: 15,
    unit: 'feuilles',
    unitCostFCFA: 1200
  },
  {
    id: 'inv-8',
    name: 'Encre de Chine Sennelier 250ml',
    category: 'encre_dorure',
    currentStock: 4,
    minThreshold: 2,
    unit: 'flacons',
    unitCostFCFA: 9500
  },
  {
    id: 'inv-9',
    name: 'Bâtons de Cire Souple — Or WriticArt',
    category: 'cire',
    currentStock: 28,
    minThreshold: 10,
    unit: 'bâtons',
    unitCostFCFA: 600
  },
  {
    id: 'inv-10',
    name: 'Bâtons de Cire Souple — Bordeaux Royal',
    category: 'cire',
    currentStock: 4, // Alerte stock bas !
    minThreshold: 8,
    unit: 'bâtons',
    unitCostFCFA: 600
  },
  {
    id: 'inv-11',
    name: 'Matrices Sceau Laiton Gravé WA',
    category: 'accessoire',
    currentStock: 15,
    minThreshold: 5,
    unit: 'sceaux',
    unitCostFCFA: 3500,
    sellingPriceFCFA: 15000
  }
];

// -------------------------------------------------------------
// SEED CRM CLIENTS (Fichier Clients de l'Atelier)
// -------------------------------------------------------------
export const initialClients: ErpClient[] = [
  {
    id: 'cli-1',
    name: 'Mariama Diallo',
    phone: '+221 77 452 19 88',
    email: 'mariama.diallo@orange.sn',
    city: 'Dakar (Almadies)',
    totalOrders: 3,
    totalSpentFCFA: 125000,
    lastOrderDate: '1 Nov 2026',
    vipStatus: true,
    notes: 'Cliente fidèle. Adore les finitions dorées et le ruban bordeaux.'
  },
  {
    id: 'cli-2',
    name: 'Ousmane Sow',
    phone: '+221 76 890 22 11',
    email: 'osow@gmail.com',
    city: 'Dakar (Point E)',
    totalOrders: 1,
    totalSpentFCFA: 35000,
    lastOrderDate: '1 Nov 2026',
    vipStatus: false,
    notes: 'Commande tableau personnalisé pour sa nouvelle maison.'
  },
  {
    id: 'cli-3',
    name: 'Fatou Ndiaye',
    phone: '+221 78 123 45 67',
    email: 'fatou.ndiaye@yahoo.fr',
    city: 'Dakar (Mermoz)',
    totalOrders: 2,
    totalSpentFCFA: 60000,
    lastOrderDate: '31 Oct 2026',
    vipStatus: false,
    notes: 'A offert le coffret Homme pour l’anniversaire de son époux.'
  },
  {
    id: 'cli-4',
    name: 'Cheikh Tidiane Ba',
    phone: '+221 77 654 32 10',
    email: 'cba.architect@gmail.com',
    city: 'Dakar (Plateau)',
    totalOrders: 4,
    totalSpentFCFA: 180000,
    lastOrderDate: '31 Oct 2026',
    vipStatus: true,
    notes: 'Architecte d’intérieur. Commande régulièrement des cadres calligraphiés.'
  },
  {
    id: 'cli-5',
    name: 'Amina Ba & David Leroy',
    phone: '+33 6 45 89 12 30',
    email: 'amina.david.wedding@gmail.com',
    city: 'Paris (France)',
    totalOrders: 1,
    totalSpentFCFA: 130000,
    lastOrderDate: '30 Oct 2026',
    vipStatus: true,
    notes: 'Mariage prévu en Décembre à l’Île de Gorée. Commande de prestige.'
  }
];
