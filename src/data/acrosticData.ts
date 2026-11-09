export const TABLEAU_THEMES = [
  { id: 'Anniversaire', fr: 'Anniversaire', en: 'Birthday / Anniversary' },
  { id: 'Amour / Couple', fr: 'Amour / Couple', en: 'Love / Couple' },
  { id: 'Naissance', fr: 'Naissance', en: 'Birth / Newborn' },
  { id: 'Motivation', fr: 'Motivation', en: 'Motivation' },
  { id: 'Baptême', fr: 'Baptême', en: 'Baptism / Naming Ceremony' },
  { id: 'Retraite', fr: 'Retraite', en: 'Retirement' },
  { id: 'Félicitations', fr: 'Félicitations', en: 'Congratulations' },
  {
    id: 'Amitié / Reconnaissance / Réussite',
    fr: 'Amitié / Reconnaissance / Réussite',
    en: 'Friendship / Gratitude / Achievement'
  },
  { id: 'Autres', fr: 'Autres (préciser)', en: 'Other (please specify)' }
] as const;

const ACROSTIC_POOL_FR: Record<string, string[]> = {
  A: [
    'Affection sincère qui éclaire chacun de nos jours',
    'Alliance précieuse gravée au cœur de nos souvenirs',
    'Admirable présence qui transforme chaque instant en trésor'
  ],
  B: [
    'Beauté sincère qui inspire le respect et la joie',
    'Bienveillance rare offerte sans jamais compter',
    'Bonheur discret tissé au fil des années partagées'
  ],
  C: [
    'Cœur généreux où chaque parole devient refuge',
    'Clarté d’esprit et chaleur qui apaisent les cœurs',
    'Complicité vraie que le temps rend plus profonde'
  ],
  D: [
    'Douceur infinie gravée dans le temps qui passe',
    'Dévouement fidèle honoré avec gratitude',
    'Délicatesse d’un geste dont l’écho demeure'
  ],
  E: [
    'Espérance lumineuse guidant chacun de nos pas',
    'Essence d’une histoire écrite avec noblesse et foi',
    'Envol du cœur qui élève ceux qui t’entourent'
  ],
  F: [
    'Flamme paisible qui réchauffe les souvenirs',
    'Fidélité tranquille aux valeurs qui nous unissent',
    'Force sereine rayonnant dans chaque épreuve'
  ],
  G: [
    'Grâce naturelle dans chaque geste et chaque mot',
    'Gratitude immense gravée pour aujourd’hui et demain',
    'Générosité simple qui laisse une empreinte durable'
  ],
  H: [
    'Harmonie précieuse que rien ne saurait effacer',
    'Histoire singulière célébrée lettre après lettre',
    'Horizon lumineux ouvert devant tes rêves'
  ],
  I: [
    'Instant d’éternité suspendu au fil de la plume',
    'Inspiration vive qui donne souffle aux plus beaux élans',
    'Intégrité douce admirée de tous les siens'
  ],
  J: [
    'Joie véritable partagée avec sincérité',
    'Jardin secret fleuri de tendresse et de rires',
    'Jour d’honneur inscrit dans la mémoire du cœur'
  ],
  K: [
    'Keepsake d’émotion offert pour traverser les années',
    'Karma lumineux semant la paix autour de toi',
    'Keepsake poétique façonné pour rester à jamais'
  ],
  L: [
    'Lumière fidèle qui demeure au-delà des saisons',
    'Lien précieux forgé dans l’écoute et l’affection',
    'Légende intime couchée sur le papier d’art'
  ],
  M: [
    'Merveilleuse présence dont le nom mérite de rester',
    'Mémoire vivante de tant de moments bénis',
    'Main tendue avec noblesse, chaleur et constance'
  ],
  N: [
    'Noblesse du cœur et tendresse inaltérable',
    'Nuance de sagesse dans chaque conseil offert',
    'Naissance d’un souvenir pensé pour traverser le temps'
  ],
  O: [
    'Offrande de mots choisis pour toucher l’âme',
    'Or intérieur brillant dans chaque attention',
    'Ouverture du cœur qui rassemble et réconcilie'
  ],
  P: [
    'Promesse écrite à l’encre d’un souvenir vrai',
    'Présence rassurante qui fait grandir la confiance',
    'Paix profonde posée sur ce chapitre de vie'
  ],
  Q: [
    'Quiétude profonde née d’une affection sincère',
    'Quête constante du beau, du juste et du vrai',
    'Qualité d’âme reconnue dès le premier regard'
  ],
  R: [
    'Rayonnement discret qui embellit chaque instant',
    'Reconnaissance gravée pour tout ce que tu offres',
    'Refuge d’amour et de rires au cœur des jours'
  ],
  S: [
    'Sérénité d’un lien tissé avec gratitude',
    'Sagesse douce éclairant le chemin des siens',
    'Souvenir éternel scellé par les mots qui restent'
  ],
  T: [
    'Tendresse éternelle gravée sur papier d’art',
    'Trésor d’affection gardé près de nous toujours',
    'Transmission fidèle d’une belle lumière'
  ],
  U: [
    'Union précieuse des cœurs et des pensées',
    'Univers de paix bâti avec patience et amour',
    'Unicité d’une personne irremplaçable'
  ],
  V: [
    'Vérité d’un sentiment qui résiste au temps',
    'Vaillance calme et beauté d’âme rayonnante',
    'Vœu sincère de joie durable et d’accomplissement'
  ],
  W: [
    'WriticArt grave ces lettres pour qu’elles demeurent',
    'WriticArt célèbre ce prénom d’une plume fidèle',
    'WriticArt donne forme à l’émotion qui reste'
  ],
  X: [
    'Xéniale attention portée par un mot juste',
    'Xylophone de rires égayant la maison',
    'Xénie précieuse offerte en signe d’estime'
  ],
  Y: [
    'Yeux brillants devant l’émotion d’un présent unique',
    'Yeux tournés vers un avenir plein de promesses',
    'Ylang d’âme laissant un doux parfum de souvenir'
  ],
  Z: [
    'Zénith d’une histoire écrite pour toujours',
    'Zèle du cœur dans tout ce que tu entreprends',
    'Zéphyr de paix veillant sur chaque lendemain'
  ]
};

const ACROSTIC_POOL_EN: Record<string, string[]> = {
  A: [
    'Always radiant, bringing warmth to every room you grace',
    'Anchored in kindness that stands firm through the years',
    'Admired deeply for the quiet strength you share'
  ],
  B: [
    'Boundless grace felt in every thoughtful gesture',
    'Bright spirit turning ordinary days into treasures',
    'Blessing to all whose lives cross paths with yours'
  ],
  C: [
    'Cherished presence woven into lasting memories',
    'Constant warmth that makes every home feel safe',
    'Compassionate heart remembered with gratitude'
  ],
  D: [
    'Deep devotion written gently across time',
    'Dignity and calm shining through every season',
    'Dedicated soul honored in words meant to stay'
  ],
  E: [
    'Eternal light guiding every step forward',
    'Enduring bond shaped by care and sincerity',
    'Everyday joy carried in your gentle smile'
  ],
  F: [
    'Faithful warmth that stays long after words are spoken',
    'Fearless heart lifting up everyone around you',
    'Forever cherished within our fondest memories'
  ],
  G: [
    'Gentle strength admired by all who know you',
    'Generous soul giving love without measure',
    'Golden chapters still waiting to be written'
  ],
  H: [
    'Heartfelt harmony that no distance can fade',
    'Honest spirit grounding every shared dream',
    'Haven of peace built for those you hold dear'
  ],
  I: [
    'Infinite gratitude captured letter by letter',
    'Inspiring grace felt in every quiet deed',
    'Invaluable presence treasured every single day'
  ],
  J: [
    'Joyful spirit that turns moments into treasures',
    'Journey of purpose illuminated by hope',
    'Jewel of a heart shining softly and true'
  ],
  K: [
    'Kindness remembered for generations to come',
    'Keepsake of affection framed for all your tomorrows',
    'Keen wisdom shared gently when needed most'
  ],
  L: [
    'Luminous bond inscribed with ink and emotion',
    'Loving care felt even in silent moments',
    'Lasting legacy written in honor of your name'
  ],
  M: [
    'Meaningful presence whose name deserves to remain',
    'Memorable laughter echoing warmly in our hearts',
    'Mindful grace woven into all that you do'
  ],
  N: [
    'Noble heart filled with sincerity and peace',
    'Nurturing spirit guiding every step with care',
    'New horizons shining brightly ahead of you'
  ],
  O: [
    'Open warmth offered with true affection',
    'One-of-a-kind soul celebrated in timeless verse',
    'Optimism gentle enough to steady every storm'
  ],
  P: [
    'Poetic promise shaped so it will always endure',
    'Patient wisdom brightening every path',
    'Precious memory kept close for years ahead'
  ],
  Q: [
    'Quiet beauty blossoming in everyday moments',
    'Queenly poise and warmth felt at every glance',
    'Quenchless hope fueling each new dawn'
  ],
  R: [
    'Resilient affection shining softly through the years',
    'Radiant smile remembered wherever life leads',
    'Rooted in love that never fades away'
  ],
  S: [
    'Sincere gratitude written cleanly from the heart',
    'Serene strength inspiring all who walk beside you',
    'Sacred memories sealed in timeless words'
  ],
  T: [
    'Timeless tenderness framed as a living memory',
    'True devotion honored for every gift you bring',
    'Treasured bond growing richer every year'
  ],
  U: [
    'Unbreakable unity of hearts and intentions',
    'Uplifting voice offering peace and courage',
    'Unmatched warmth held closely in memory'
  ],
  V: [
    'Vibrant grace remembered with every glance',
    'Valued presence bringing harmony and pride',
    'Virtue and joy reflected in your story'
  ],
  W: [
    'Words crafted by WriticArt so they forever stay',
    'Warmth and truth shining through every line',
    'Wishes of peace inscribed upon art paper'
  ],
  X: [
    'Xenial warmth glowing inside every word',
    'X-factor of grace brightening every gathering',
    'Xenia of heartfelt words crafted just for you'
  ],
  Y: [
    'Yearning joy celebrated in enduring verse',
    'Youthful wonder alive in every memory',
    'Yours forever—a tribute shaped with love'
  ],
  Z: [
    'Zenith of a story inscribed in timeless form',
    'Zeal of the heart guiding every new beginning',
    'Zephyr of calm blessing every tomorrow'
  ]
};

export interface AcrosticLine {
  letter: string;
  rest: string;
}

export function buildAcrosticLines(rawWord: string, lang: 'fr' | 'en'): AcrosticLine[] {
  const letters = (rawWord || 'AMOUR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 12)
    .split('');

  const finalLetters = letters.length > 0 ? letters : ['A', 'M', 'O', 'U', 'R'];
  const pool = lang === 'en' ? ACROSTIC_POOL_EN : ACROSTIC_POOL_FR;
  const occurrenceCount: Record<string, number> = {};

  return finalLetters.map((letter, idx) => {
    const count = occurrenceCount[letter] || 0;
    occurrenceCount[letter] = count + 1;

    const options = pool[letter];
    const baseLine = options
      ? options[count % options.length]
      : lang === 'en'
      ? 'A lasting tribute written with grace'
      : 'Attachement fidèle écrit avec grâce';

    const suffix = baseLine.slice(1);
    const punctuation = idx === finalLetters.length - 1 ? '.' : ',';
    return {
      letter,
      rest: `${suffix}${punctuation}`
    };
  });
}
