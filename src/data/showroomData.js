export const showroomSections = [
  {
    id: 'hero',
    eyebrow: 'Pune Dessert Company',
    headline: 'A Premium Showroom Built On Ingredient Integrity',
    body: 'Great desserts deserve great ingredients. We use pure butter, real cocoa butter chocolate, and preservative-free recipes crafted in small batches.',
    ctaLabel: 'Enter Collection',
    ctaTarget: 'shop',
    motionPreset: 'hero',
    heroImage: '/hero-brownie-stack.png',
  },
  {
    id: 'craft',
    eyebrow: 'Craftsmanship Protocol',
    headline: 'Purity Over Shortcuts, Quality Over Convenience',
    body: 'Every batch is produced with controlled baking, pure ingredients, and no artificial fillers so taste stays clean and honest in every bite.',
    ctaLabel: 'View Signature Selection',
    ctaTarget: 'signature',
    motionPreset: 'timeline',
  },
  {
    id: 'signature',
    eyebrow: 'Signature Collection',
    headline: 'Most-Loved Offerings, Presented With Editorial Finish',
    body: 'From premium brownie boxes to tea-time cakes and spoon desserts, each product is priced with up to 25% showroom offers and free Pune delivery.',
    ctaLabel: 'Shop Full Menu',
    ctaTarget: 'shop',
    motionPreset: 'cards',
  },
];

export const brandPromises = [
  'Pure Amul or President Butter',
  'Van Houten Couverture Chocolate',
  'No Palm Oil Margarine',
  'No Preservatives or Emulsifiers',
  'Free Home Delivery Across Pune',
];

export const ingredientNarrative = [
  {
    title: 'Pure Butter Standard',
    detail: 'All brownies and cakes are made with 100% pure butter, never palm-oil margarine.',
    icon: '🧈',
  },
  {
    title: 'Real Cocoa Butter Chocolate',
    detail: 'Van Houten couverture is used instead of low-cost compound chocolate blends.',
    icon: '🍫',
  },
  {
    title: 'Fresh Batch Crafting',
    detail: 'Small-batch production keeps texture fresh and flavor expression consistent.',
    icon: '🧑‍🍳',
  },
  {
    title: 'Clean Label Promise',
    detail: 'No preservatives, stabilizers, emulsifiers, or artificial additives in our recipes.',
    icon: '✨',
  },
];

export const craftsmanshipTimeline = [
  {
    step: '01',
    title: 'Ingredient Curation',
    description:
      'We start with pure butter, quality cocoa, premium spreads, and fresh nuts selected for flavor, not shortcuts.',
  },
  {
    step: '02',
    title: 'Precision Mixing',
    description:
      'Batter is mixed in controlled windows so structure stays soft and fudgy, never heavy or flat.',
  },
  {
    step: '03',
    title: 'Small-Batch Baking',
    description:
      'Each tray is baked in micro-runs for even heat control and consistent bite quality across every box.',
  },
  {
    step: '04',
    title: 'Fresh Finish & Dispatch',
    description:
      'Final topping, packaging, and dispatch are timed for freshness with free delivery all over Pune.',
  },
];

export const assuranceNotes = [
  'Free home delivery all over Pune.',
  'Exact same premium bag and box packaging with every order.',
  'Ragi + jaggery brownie option available on request at no extra cost.',
];

export const heroMotionSpec = {
  breakpoint: 1024,
  pinDistanceVh: 140,
  beats: {
    reveal: { start: 0, end: 0.28 },
    cinematic: { start: 0.28, end: 0.72 },
    settle: { start: 0.72, end: 1 },
  },
  tilt: {
    peakX: 4.2,
    peakZ: 0.8,
  },
  spotlightTravel: 58,
  ribbon: {
    travelYPercent: 8,
  },
};
