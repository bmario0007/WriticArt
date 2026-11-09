import type { GalleryItem } from '../types';
import {
  heroEditorialImg,
  tableauMinimalisteImg,
  tableauAcrosticheDorureImg,
  writicloveDuoImg,
  writicloveFemmeImg,
  boxFevrierImg,
  kitSceauCireImg
} from '../assets/images';

export const galleryItems: GalleryItem[] = [
  {
    id: 'art-1',
    title: 'Tableau Acrostiche — Enluminure Or 24K & Velours Prune',
    category: 'tableau',
    categoryLabel: 'Tableaux Acrostiches',
    image: tableauAcrosticheDorureImg,
    likes: 2890,
    commentsCount: 145,
    description:
      'Tableau poétique en acrostiche tracé à la main sur papier pur coton frangé 350g, illuminé de lettrines à la feuille d’or 24 carats.',
    paperDetail: 'Papier artisanal à bords frangés (Deckle edge) 350g/m²',
    inkDetail: 'Feuille d’or 24 carats & encre de Chine noire',
    creationTime: 'Il y a 2 jours',
    instagramHandle: '@writicart',
    featuredQuote: 'Les mots ont un super pouvoir, WriticArt leur donne une forme',
    priceFCFA: 15000,
    tags: ['#AcrosticheSurMesure', '#DorureOr24K', '#TableauxWriticArt', '#LesEcritsRestent']
  },
  {
    id: 'art-2',
    title: 'Pack Couple WriticLove (365 + 1 Cartes)',
    category: 'writiclove',
    categoryLabel: 'Coffrets WriticLove',
    image: writicloveDuoImg,
    likes: 2410,
    commentsCount: 118,
    description:
      'Les deux coffrets rigides noir mat & rose poudré dorés à chaud : 365 cartes quotidiennes + 1 carte bonus rappelant notamment d’inclure ALLAH au cœur du mariage.',
    paperDetail: 'Écrins rigides lin & cartes ivoire bordées or 350g',
    inkDetail: 'Marquage à chaud doré & typographie d’atelier',
    creationTime: 'Il y a 4 jours',
    instagramHandle: '@writicart',
    featuredQuote: 'Et si vous faisiez de l’amour une intention renouvelée chaque jour ?',
    priceFCFA: 50000,
    tags: ['#WriticLove', '#365JoursDAmour', '#Precommande2026', '#CoupleSerein']
  },
  {
    id: 'art-3',
    title: 'Cadre Minimaliste — Citation & Lettrine Dorée',
    category: 'tableau',
    categoryLabel: 'Tableaux Acrostiches',
    image: tableauMinimalisteImg,
    likes: 1540,
    commentsCount: 63,
    description:
      'Format épuré idéal pour un anniversaire, une naissance ou une gratitude discrète. Livraison incluse dans le tarif uniquement en France.',
    paperDetail: 'Papier coton crème bords frangés sous cadre bois noir & laiton',
    inkDetail: 'Pigment doré métallisé & encre sépia profonde',
    creationTime: 'Il y a 1 semaine',
    instagramHandle: '@writicart',
    featuredQuote: 'Une émotion mise en mots pour qu’elle demeure',
    priceFCFA: 5000,
    tags: ['#TableauMinimaliste', '#Acrostiche', '#CadeauFrance', '#WriticArt']
  },
  {
    id: 'art-4',
    title: 'Box Cadeau WriticArt Février — Écrin, Tableau & Parfum Oud',
    category: 'quotidien',
    categoryLabel: 'Box Février • Lancement',
    image: boxFevrierImg,
    likes: 2130,
    commentsCount: 112,
    description:
      'L’expérience sensorielle complète : coffret WriticLove + tableau personnalisé (5k ou 10k) + parfum signature dans un écrin prune & or.',
    paperDetail: 'Coffret magnétique prune & velours doublé satin',
    inkDetail: 'Parfum signature Ambre & Oud + cadre poétique assorti',
    creationTime: 'Il y a 10 jours',
    instagramHandle: '@writicart',
    featuredQuote: 'Un moment complet à offrir ou à partager',
    priceFCFA: 35000,
    tags: ['#BoxWriticArt', '#ParfumSignature', '#CadeauLuxe', '#FevrierWriticArt']
  },
  {
    id: 'art-5',
    title: 'Coffret WriticLove — Édition Femme Rose Poudré',
    category: 'writiclove',
    categoryLabel: 'Coffrets WriticLove',
    image: writicloveFemmeImg,
    likes: 1780,
    commentsCount: 94,
    description:
      'Coffret rose poudré orné de motifs botaniques dorés : 365 attentions quotidiennes + 1 carte bonus pour cultiver la douceur et l’écoute au foyer.',
    paperDetail: 'Coffret lin rose poudré & cartes ivoire bordure dorée',
    inkDetail: 'Dorure botanique chaude & ruban satin champagne',
    creationTime: 'Il y a 2 semaines',
    instagramHandle: '@writicart',
    featuredQuote: 'Transformer les petites attentions en habitudes durables',
    priceFCFA: 30000,
    tags: ['#WriticLoveFemme', '#365Cartes', '#MariageApaise', '#Precommande']
  },
  {
    id: 'art-6',
    title: 'Lettres Scellées à la Cire Dorée & Sceau Laiton WA',
    category: 'mariage',
    categoryLabel: 'Vœux & Finitions Atelier',
    image: kitSceauCireImg,
    likes: 1920,
    commentsCount: 88,
    description:
      'Enveloppes artisanales sur papier coton scellées à la cire souple or et bordeaux pour accompagner vos tableaux de mariage, baptême ou fiançailles.',
    paperDetail: 'Enveloppe coton pur 350g bords déchirés à la main',
    inkDetail: 'Cire souple or & bordeaux pressée au sceau laiton',
    creationTime: 'Il y a 3 semaines',
    instagramHandle: '@writicart',
    featuredQuote: 'Chaque pli scellé porte la mémoire d’un engagement',
    priceFCFA: 15000,
    tags: ['#SceauDeCire', '#VoeuxDeMariage', '#AtelierDakar', '#PapeterieDeLuxe']
  }
];

export const instagramStories = [
  {
    id: 'story-1',
    title: 'Tableaux',
    author: 'writicart',
    avatar: heroEditorialImg,
    image: heroEditorialImg,
    caption: 'Nouvelle série de tableaux acrostiches sur papier coton avec lettrines à la feuille d’or 24 carats. À partir de 5.000 FCFA (livraison France incluse).',
    time: 'Il y a 3h'
  },
  {
    id: 'story-2',
    title: 'WriticLove',
    author: 'writicart',
    avatar: writicloveDuoImg,
    image: writicloveDuoImg,
    caption: 'Les précommandes pour le Pack Couple WriticLove (365 + 1 cartes) sont ouvertes pour la sortie fin décembre 2026 / début janvier 2027.',
    time: 'Il y a 6h'
  },
  {
    id: 'story-3',
    title: 'Dorure Or',
    author: 'writicart',
    avatar: tableauAcrosticheDorureImg,
    image: tableauAcrosticheDorureImg,
    caption: 'Coulisses de l’atelier : pose manuelle des feuilles d’or sur chaque initiale d’acrostiche avant encadrement.',
    time: 'Hier'
  },
  {
    id: 'story-4',
    title: 'Box Février',
    author: 'writicart',
    avatar: boxFevrierImg,
    image: boxFevrierImg,
    caption: 'Aperçu de notre future Box Cadeau de Février : coffret WriticLove + tableau personnalisé + parfum signature dans un écrin prune & or.',
    time: 'Il y a 2j'
  }
];
