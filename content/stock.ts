/**
 * Stock photography used across the site.
 *
 * Source: Unsplash, used under the Unsplash License (free for commercial use,
 * no attribution required). Photographer credits, source URLs and licence
 * details are recorded in research/asset-manifest.md.
 *
 * Files live in public/images/stock/<key>.jpg. Widths/heights are the actual
 * processed dimensions (see research/asset-manifest.md for how each was
 * resized) so components can pass them straight to next/image.
 */

export type StockImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const stock = {
  "hero-produce": {
    src: "/images/stock/hero-produce.jpg",
    width: 2000,
    height: 1331,
    alt: "Root vegetables — napa cabbage, carrots, chillies and a whole parsnip — on a warm wooden kitchen counter in soft natural light",
  },
  "chip-herbs": {
    src: "/images/stock/chip-herbs.jpg",
    width: 600,
    height: 900,
    alt: "Fresh herb sprigs — parsley, rosemary, dill and thyme — in a small wooden bowl on grey linen",
  },
  "chip-ginger-turmeric": {
    src: "/images/stock/chip-ginger-turmeric.jpg",
    width: 600,
    height: 750,
    alt: "Fresh ginger root with a few sliced pieces on a plain light surface",
  },
  "chip-greens": {
    src: "/images/stock/chip-greens.jpg",
    width: 600,
    height: 751,
    alt: "Two large leafy green (collard) leaves with visible water droplets on a wooden board",
  },
  "chip-oats": {
    src: "/images/stock/chip-oats.jpg",
    width: 600,
    height: 407,
    alt: "A round bowl filled with raw rolled oats, shot from above on a plain cream background",
  },
  "chip-tea": {
    src: "/images/stock/chip-tea.jpg",
    width: 600,
    height: 402,
    alt: "A cup of amber herbal tea on a linen surface, surrounded by loose tea leaves, dried roots and bark",
  },
  "chip-lemon": {
    src: "/images/stock/chip-lemon.jpg",
    width: 600,
    height: 900,
    alt: "A glass of lemon water with ice, garnished with a lemon wheel, next to halved lemons on a wooden board",
  },
  "svc-digestive": {
    src: "/images/stock/svc-digestive.jpg",
    width: 1400,
    height: 934,
    alt: "A small bowl of yoghurt topped with granola and a blueberry, with a wooden spoon beside it",
  },
  "svc-metabolic": {
    src: "/images/stock/svc-metabolic.jpg",
    width: 1400,
    height: 933,
    alt: "A row of small wooden bowls filled with legumes and whole grains — green mung beans, lentils and rice",
  },
  "svc-hormonal": {
    src: "/images/stock/svc-hormonal.jpg",
    width: 1400,
    height: 933,
    alt: "A pale pink cup filled with raw pumpkin seeds, shot from above on a soft grey background",
  },
  "svc-allergies": {
    src: "/images/stock/svc-allergies.jpg",
    width: 1400,
    height: 911,
    alt: "Four simple ingredients — almonds, cacao powder, matcha and flour — in separate white bowls on a light surface",
  },
  "svc-chronic": {
    src: "/images/stock/svc-chronic.jpg",
    width: 1400,
    height: 933,
    alt: "Wholegrain bread, a small bowl of marinated olives and a hand pouring olive oil into a dish",
  },
  "svc-testing": {
    src: "/images/stock/svc-testing.jpg",
    width: 1400,
    height: 933,
    alt: "A closed leather notebook, a pen and a cup of coffee on a pale wooden desk, shot from above",
  },
  "about-desk": {
    src: "/images/stock/about-desk.jpg",
    width: 2000,
    height: 3000,
    alt: "An open notebook and wooden pen on a warm desk, with small potted plants and a lamp softly out of focus behind",
  },
  "cta-botanical": {
    src: "/images/stock/cta-botanical.jpg",
    width: 2000,
    height: 1393,
    alt: "A sprig of sage-green eucalyptus leaves against a soft, blurred cream and terracotta background",
  },
} as const;
