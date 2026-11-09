import type { ErpOrder, InventoryItem, ErpClient, CatalogProduct, ArticlePost, MediaItem, SiteSettings } from '../types';
import {
  heroEditorialImg,
  tableauMinimalisteImg,
  tableauAcrosticheDorureImg,
  writicloveDuoImg,
  writicloveHommeImg,
  writicloveFemmeImg,
  boxFevrierImg,
  kitSceauCireImg,
  feedInstagramImg
} from '../assets/images';

// -------------------------------------------------------------
// SEED CATALOG PRODUCTS (For the Minimalist Rahiya Storefront)
// -------------------------------------------------------------
export const initialCatalogProducts: CatalogProduct[] = [
  {
    id: 'writiclove-duo',
    name: 'Pack Couple WriticLove (365 + 1 Cartes)',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours • Précommande',
    subtitle: 'Version Homme + Version Femme (Sortie Fin Déc. 2026 / Début Janv. 2027)',
    priceFCFA: 50000,
    badge: 'Précommande • -10k FCFA',
    inStock: true,
    image: writicloveDuoImg,
    description: 'Et si vous faisiez de l’amour une intention renouvelée chaque jour ? Pack complet des deux coffrets (Homme & Femme) avec 365 cartes quotidiennes + 1 carte bonus. Inclut des cartes rappelant l’importance de placer ALLAH au cœur du mariage. (Livraison non incluse).',
    features: [
      '2 coffrets complets : Version Homme + Version Femme (365 cartes + 1 carte bonus chacun)',
      'Certaines cartes rappellent l’importance de placer ALLAH au cœur du mariage',
      'Écrins de luxe noir mat & or / rose poudré avec finition dorure',
      'Sortie officielle : fin décembre 2026 / début janvier 2027',
      'Précommande ouverte — Économie de 10.000 FCFA (Livraison non incluse)'
    ]
  },
  {
    id: 'writiclove-homme',
    name: 'WriticLove — Version Homme',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours • Précommande',
    subtitle: '365 Cartes + 1 Carte Bonus • Sortie Fin Déc. 2026',
    priceFCFA: 30000,
    badge: 'Précommande',
    inStock: true,
    image: writicloveHommeImg,
    description: 'Coffret de 365 cartes (une par jour de l’année) plus une carte bonus pour renouveler ses intentions, améliorer sa communication et placer ALLAH au cœur du mariage. (Livraison non incluse dans le prix).',
    features: [
      '365 cartes quotidiennes + 1 carte bonus sur papier noble',
      'Renouveler ses intentions & renforcer la complicité du couple',
      'Certaines cartes rappellent l’importance de placer ALLAH au cœur du mariage',
      'Sortie officielle : fin décembre 2026 / début janvier 2027'
    ]
  },
  {
    id: 'writiclove-femme',
    name: 'WriticLove — Version Femme',
    category: 'writiclove',
    categoryLabel: 'Coffrets 365 Jours • Précommande',
    subtitle: '365 Cartes + 1 Carte Bonus • Sortie Fin Déc. 2026',
    priceFCFA: 30000,
    badge: 'Précommande',
    inStock: true,
    image: writicloveFemmeImg,
    description: 'Coffret de 365 cartes (une par jour de l’année) plus une carte bonus conçu pour accompagner la vie de couple à travers de petites attentions sincères et inspirantes. (Livraison non incluse).',
    features: [
      '365 cartes quotidiennes + 1 carte bonus',
      'Améliorer la communication et transformer les attentions en habitudes durables',
      'Dimensions spirituelles : placer ALLAH au cœur du mariage',
      'Sortie officielle : fin décembre 2026 / début janvier 2027'
    ]
  },
  {
    id: 'tableau-citation-simple',
    name: 'Tableau Acrostiche — Citation Simple',
    category: 'tableau',
    categoryLabel: 'Tableaux Personnalisés',
    subtitle: 'À partir de 5.000 FCFA jusqu’à 10.000 FCFA • Livraison incluse en France',
    priceFCFA: 5000,
    badge: 'À partir de 5.000 FCFA',
    inStock: true,
    image: tableauMinimalisteImg,
    description: 'Un mot, un prénom ou une expression mis en valeur sous forme d’acrostiche poétique ou de citation courte dans un univers visuel adapté au thème de votre choix (Anniversaire, Amour, Naissance...). Livraison incluse uniquement en France.',
    features: [
      'Concept exclusif : l’art de l’acrostiche (chaque lettre ouvre une ligne poétique)',
      'Tarif : à partir de 5.000 FCFA jusqu’à 10.000 FCFA selon le format',
      '9 thèmes au choix : Anniversaire, Amour, Naissance, Motivation, Baptême, Retraite...',
      'Livraison incluse dans le prix uniquement si la livraison se fait en France'
    ]
  },
  {
    id: 'tableau-poeme-standard',
    name: 'Tableau Acrostiche — Poème Standard',
    category: 'tableau',
    categoryLabel: 'Tableaux Personnalisés',
    subtitle: 'À partir de 10.000 FCFA jusqu’à 15.000 FCFA • Livraison incluse en France',
    priceFCFA: 10000,
    badge: 'À partir de 10.000 FCFA',
    inStock: true,
    image: heroEditorialImg,
    description: 'Composition poétique équilibrée basée sur l’acrostiche d’un prénom ou d’une expression forte, calligraphiée et mise en scène avec soin. Une histoire mise en image et un souvenir éternel.',
    features: [
      'Tarif : à partir de 10.000 FCFA jusqu’à 15.000 FCFA',
      'Acrostiche poétique complet personnalisé au thème choisi',
      'Encadrement soigné et papier d’art haute tenue',
      'Livraison incluse dans le prix uniquement si la livraison se fait en France'
    ]
  },
  {
    id: 'tableau-poeme-personnalise',
    name: 'Tableau Acrostiche — Poème Personnalisé',
    category: 'tableau',
    categoryLabel: 'Tableaux Personnalisés',
    subtitle: 'À partir de 15.000 FCFA jusqu’à 20.000 FCFA • Livraison incluse en France',
    priceFCFA: 15000,
    badge: 'À partir de 15.000 FCFA',
    inStock: true,
    image: tableauAcrosticheDorureImg,
    description: 'Création d’exception entièrement écrite sur mesure à partir de votre histoire, vos prénoms et vos souvenirs les plus précieux, sublimée en tableau d’art. Livraison incluse uniquement si en France.',
    features: [
      'Tarif : à partir de 15.000 FCFA jusqu’à 20.000 FCFA',
      'Texte 100% unique rédigé selon votre récit personnel et le thème souhaité',
      'Finitions luxe, formats divers disponibles et dorures d’atelier',
      'Livraison incluse dans le prix uniquement si la livraison se fait en France'
    ]
  },
  {
    id: 'kit-sceau-cire',
    name: 'Kit Sceau de Cire & Cire Dorée WriticArt',
    category: 'accessoire',
    categoryLabel: 'Accessoires & Cire',
    subtitle: 'Sceau en Laiton Massif Gravé + 3 Bâtons de Cire Souple',
    priceFCFA: 15000,
    badge: 'Atelier',
    inStock: true,
    image: kitSceauCireImg,
    description: 'Apportez le rituel du scellé à vos propres correspondances. Matrice de laiton gravée au monogramme WA et cire souple qui ne casse pas à l’envoi postal.',
    features: [
      'Matrice en laiton massif avec manche en palissandre',
      '3 bâtons de cire souple (Or WriticArt, Bordeaux impérial, Noir)',
      'Cuillère de fonte en cuivre et bougie végétale',
      'Pochon en lin naturel WriticArt'
    ]
  }
];

// -------------------------------------------------------------
// SEED ERP ORDERS (Commandes réelles d'atelier — FCFA & EUR)
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
      { title: 'Pack Couple WriticLove (365 + 1 Cartes)', quantity: 1, unitPriceFCFA: 50000, options: 'Précommande • Pack Homme + Femme' }
    ],
    totalFCFA: 50000,
    currencyUsed: 'FCFA',
    offerType: 'writiclove',
    isPreorder: true,
    questionType: 'Précommande officielle',
    deliveryType: 'Coursier Dakar & Banlieue',
    status: 'pret_livraison',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    notes: 'Précommande WriticLove — Livraison non incluse. Cadeau anniversaire de mariage.',
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
      { title: 'Tableau Acrostiche — Poème Personnalisé', quantity: 1, unitPriceFCFA: 15000, options: 'Thème : Amour / Couple • Format A3' }
    ],
    totalFCFA: 15000,
    currencyUsed: 'FCFA',
    offerType: 'tableau',
    questionType: 'Passer une commande ferme',
    deliveryType: 'Coursier Dakar & Banlieue',
    theme: 'Amour / Couple',
    tableauFormula: 'Poème personnalisé (à partir de 15.000 FCFA)',
    tableauSize: 'Format A3 (30 x 42 cm)',
    status: 'en_calligraphie',
    paymentMethod: 'Orange Money',
    paymentStatus: 'acompte',
    notes: 'Acrostiche sur le prénom MARIAMA.',
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
      { title: 'WriticLove — Version Homme (365 + 1 Cartes)', quantity: 1, unitPriceFCFA: 30000 }
    ],
    totalFCFA: 30000,
    currencyUsed: 'FCFA',
    offerType: 'writiclove',
    isPreorder: true,
    questionType: 'Précommande officielle',
    deliveryType: 'Retrait à l’atelier (Dakar)',
    status: 'livre',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    notes: 'Sortie fin décembre 2026 / début janvier 2027.'
  },
  {
    id: 'CMD-WA-1021',
    clientName: 'Claire & Cheikh Tidiane Ba',
    clientPhone: '+33 6 45 89 12 30',
    clientEmail: 'cba.architect@gmail.com',
    city: 'Paris 16ème (France)',
    date: '31 Oct 2026',
    items: [
      { title: 'Tableau Acrostiche — Poème Standard', quantity: 1, unitPriceFCFA: 10000, options: 'Thème : Anniversaire • Livraison incluse (France)' }
    ],
    totalFCFA: 10000,
    currencyUsed: 'EUR',
    offerType: 'tableau',
    questionType: 'Passer une commande ferme',
    deliveryType: 'Livraison incluse (France uniquement)',
    theme: 'Anniversaire',
    tableauFormula: 'Poème standard (à partir de 10.000 FCFA)',
    tableauSize: 'Format A4 (21 x 30 cm)',
    status: 'bat_validation',
    paymentMethod: 'Carte Bancaire',
    paymentStatus: 'paye',
    notes: 'Client a payé en EUR (15,24 €) • Livraison France incluse dans le prix du tableau.'
  },
  {
    id: 'CMD-WA-1020',
    clientName: 'Amina Ba & David Leroy',
    clientPhone: '+33 6 12 34 56 78',
    clientEmail: 'amina.david.wedding@gmail.com',
    city: 'Lyon (France)',
    date: '30 Oct 2026',
    items: [
      { title: 'Box WriticArt Février — Pack Couple + Tableau 10.000 FCFA + Parfum', quantity: 1, unitPriceFCFA: 60000, options: 'Parfum : Oud Royal & Ambre • Thème : Amour / Couple' }
    ],
    totalFCFA: 60000,
    currencyUsed: 'EUR',
    offerType: 'box',
    isPreorder: true,
    questionType: 'Réservation Box Février',
    deliveryType: 'Expédition France / Europe',
    theme: 'Amour / Couple',
    tableauFormula: 'Tableau inclus 10.000 FCFA',
    parfumChoice: 'Oud Royal & Ambre',
    status: 'en_calligraphie',
    paymentMethod: 'Virement',
    paymentStatus: 'paye',
    notes: 'Client a réglé en EUR (91,47 €) • Réservation Box de Février.'
  },
  {
    id: 'CMD-WA-1019',
    clientName: 'Moussa Kane',
    clientPhone: '+221 77 312 99 00',
    city: 'Saint-Louis',
    date: '29 Oct 2026',
    items: [
      { title: 'WriticLove — Version Femme (365 + 1 Cartes)', quantity: 1, unitPriceFCFA: 30000 }
    ],
    totalFCFA: 30000,
    currencyUsed: 'FCFA',
    offerType: 'writiclove',
    isPreorder: true,
    questionType: 'Précommande officielle',
    deliveryType: 'Expédition Régionale / GP',
    status: 'livre',
    paymentMethod: 'Espèces',
    paymentStatus: 'paye',
    notes: 'Envoyé par colis express.'
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

// -------------------------------------------------------------
// SEED ARTICLES & POSTS (Journal d'Atelier / Blog WordPress)
// -------------------------------------------------------------
export const initialArticles: ArticlePost[] = [
  {
    id: 'art-1',
    title: 'Comment le rituel "365 Jours d\'Amour" réinvente la complicité de couple',
    slug: 'rituel-365-jours-amour-complicite-couple',
    excerpt: 'Dans la routine moderne, comment une simple carte tirée chaque matin peut transformer la communication et nourrir l\'amour durable.',
    content: `Dans un monde où les notifications numériques s'accumulent sans saveur, la parole amoureuse a souvent perdu de sa solennité. Le rituel « 365 Jours d'Amour » créé par WriticArt est né d'un constat simple : l'amour ne s'entretient pas seulement lors des grandes dates anniversaires, mais dans la délicatesse des micro-attentions quotidiennes.

### Le pouvoir d'un mot manuscrit chaque matin
Chaque coffret Writic'Love renferme 365 cartes imprimées sur papier noble. Tirer une carte au réveil devient une respiration. Qu'il s'agisse d'un rappel bienveillant, d'un vœu partagé ou d'une question invitant à l'intimité, le mot crée un pont immédiat entre les deux partenaires.

### Des retours bouleversants de couples à Dakar et à l'international
Depuis le lancement des éditions Homme, Femme et Duo, plus de 500 couples nous ont partagé comment ce rituel a désamorcé des incompréhensions et ravivé la tendresse des premiers jours. C'est la preuve que les mots, lorsqu'ils sont incarnés dans la matière, possèdent un pouvoir guérisseur inaltérable.`,
    category: 'Couple & Amour',
    author: 'Maître Calligraphe WriticArt',
    date: '31 Octobre 2026',
    readTime: '4 min',
    coverImage: writicloveDuoImg,
    status: 'publie',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Les secrets de la dorure à la feuille d\'or 24 carats sur toile de lin',
    slug: 'secrets-dorure-feuille-or-24k-toile-lin',
    excerpt: 'Immersion dans les techniques vénitiennes de pose de feuille d\'or libre à la mixtion végétale dans notre atelier de Dakar.',
    content: `La dorure à la feuille n'est pas une simple peinture métallique : c'est un dialogue avec la lumière. Dans notre atelier à Dakar, nous travaillons exclusivement avec de l'or pur 24 carats battu au dixième de micron.

### La préparation du support
Avant même que la première feuille ne se pose, la toile de lin brut est apprêtée d'un gesso à la colle de peau, poncée délicatement pour obtenir un grain satiné parfait. C'est sur cette surface veloutée que la mixtion à dorer est posée au pinceau en poil de martre.

### L'instant magique de la pose
Poser une feuille d'or exige d'arrêter de respirer. Au moindre souffle, la feuille vole. Elle est saisie au couteau à dorer et déposée avec la palette d'écureuil. Une fois appliquée, la brunissure à la pierre d'agate vient sceller l'or et lui donner cet éclat miroir qui traversera les générations sans jamais ternir.`,
    category: 'Savoir-Faire',
    author: 'Atelier WriticArt Dakar',
    date: '24 Octobre 2026',
    readTime: '5 min',
    coverImage: tableauAcrosticheDorureImg,
    status: 'publie',
    featured: false
  },
  {
    id: 'art-3',
    title: 'Guide d\'élégance : Rédiger ses vœux de mariage pour la calligraphie',
    slug: 'guide-rediger-voeux-mariage-calligraphie',
    excerpt: 'Conseils pratiques et poétiques pour coucher sur papier pur coton des promesses d\'amour qui résonneront pour l\'éternité.',
    content: `Rédiger ses vœux de mariage est l'un des exercices les plus émouvants d'une vie. Lorsque ces vœux sont destinés à être calligraphiés sur parchemin frangé et scellés à la cire, chaque terme compte.

### 1. Parlez avec le cœur, fuyez les formules toutes faites
La calligraphie donne du poids aux mots simples. Évitez les discours trop convenus : parlez de ce qui vous a fait tomber amoureux, des fous rires partagés, et de ce que vous promettez d'apporter dans les jours de tempête comme dans les jours de fête.

### 2. Pensez au rythme de lecture
Une belle calligraphie respire. Découpez votre texte en strophes ou en phrases courtes. Nos plumes d'acier créent des pleins et des déliés qui suivent la cadence de votre souffle lors de la cérémonie.

### 3. La conservation du parchemin
Une fois scellés du sceau de cire aux armoiries des mariés, vos vœux ne sont pas rangés dans un tiroir : ils deviennent une œuvre d'art sous cadre à contempler chaque jour dans votre foyer.`,
    category: 'Mariage & Cérémonie',
    author: 'Conseillère Nuptiale WriticArt',
    date: '18 Octobre 2026',
    readTime: '6 min',
    coverImage: kitSceauCireImg,
    status: 'publie',
    featured: false
  }
];

// -------------------------------------------------------------
// SEED MEDIA LIBRARY (Médiathèque Photos WordPress)
// -------------------------------------------------------------
export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Pack Couple WriticLove 365+1 (Studio Duo)',
    url: writicloveDuoImg,
    category: 'coffret',
    date: '1 Nov 2026',
    size: '91 KB',
    type: 'image'
  },
  {
    id: 'med-2',
    title: 'Tableau Acrostiche & Enluminure Or 24K',
    url: tableauAcrosticheDorureImg,
    category: 'tableau',
    date: '28 Oct 2026',
    size: '113 KB',
    type: 'image'
  },
  {
    id: 'med-3',
    title: 'Box WriticArt Février — Écrin Prune & Parfum Signature',
    url: boxFevrierImg,
    category: 'coffret',
    date: '25 Oct 2026',
    size: '140 KB',
    type: 'image'
  },
  {
    id: 'med-4',
    title: 'Cadre Minimaliste Citation & Initiale Dorée',
    url: tableauMinimalisteImg,
    category: 'tableau',
    date: '22 Oct 2026',
    size: '103 KB',
    type: 'image'
  },
  {
    id: 'med-5',
    title: 'Matrice Sceau de Cire en Laiton & Cire Dorée WriticArt',
    url: kitSceauCireImg,
    category: 'atelier',
    date: '20 Oct 2026',
    size: '106 KB',
    type: 'image'
  },
  {
    id: 'med-6',
    title: 'Vitrine Atelier WriticArt (Hero Editorial)',
    url: heroEditorialImg,
    category: 'atelier',
    date: '18 Oct 2026',
    size: '120 KB',
    type: 'image'
  },
  {
    id: 'med-7',
    title: 'Feed Officiel Instagram @writicart (WebP optimisé)',
    url: feedInstagramImg,
    category: 'coffret',
    date: '15 Oct 2026',
    size: '77 KB',
    type: 'image'
  }
];

// -------------------------------------------------------------
// SEED SITE SETTINGS (Mise en page & Page Builder)
// -------------------------------------------------------------
export const initialSiteSettings: SiteSettings = {
  announcementText: "✦ WRITICART — « Les écrits restent » • Tableaux Acrostiches & Précommande WriticLove (365 + 1 cartes)",
  announcementPhone: "+221 77 234 85 21",
  heroSlogan: "WriticArt — « Les écrits restent »",
  heroTitle: "Les mots ont un super pouvoir.",
  heroHighlightText: "WriticArt leur donne une forme pour qu’ils restent.",
  heroSubtitle: "Marque créative d'œuvres poétiques sur mesure : tableaux personnalisés en acrostiche dès 5.000 FCFA, coffrets WriticLove de 365 + 1 cartes et Box WriticArt de Février.",
  heroCtaText: "Découvrir les Tableaux",
  showReassuranceBar: true,
  showDiscoveryPortals: true,
  showFeaturedSection: true,
  showAtelierBanner: true,
  siteTitle: "WriticArt — « Les écrits restent » • Tableaux Acrostiches & WriticLove",
  contactEmail: "kaynubind@gmail.com",
  whatsappContact: "+221 77 234 85 21",
  workshopAddress: "Dakar, Sénégal & Expéditions France / International"
};

