# Stock Photo Asset Manifest

All photos sourced from [Unsplash](https://unsplash.com) and used under the **Unsplash License**, which permits free commercial and non-commercial use, no permission or attribution required. Photographer credits and source URLs are kept below (and optionally in the site footer) as a courtesy, not a legal requirement.

Selection brief: warm, calm, natural-light editorial food/botanical photography on the site's cream (`#FEF9EF`) / terracotta (`#99582A`) / sage (`#EBEEDD`) palette. No identifiable people (hands only at most), no medical-scare imagery, no text/brand logos/packaging.

| Shot ID | File | Size (w×h) | Alt text / description | Photographer | Unsplash URL | Licence |
|---|---|---|---|---|---|---|
| `hero-produce` | `hero-produce.jpg` | 2000×1331 | Root vegetables — napa cabbage, carrots, chillies and a whole parsnip — on a warm wooden kitchen counter in soft natural light | THLT LCX | https://unsplash.com/photos/sliced-vegetables-on-brown-wooden-chopping-board-xoWNIXzULMs | Unsplash License |
| `chip-herbs` | `chip-herbs.jpg` | 600×900 | Fresh herb sprigs — parsley, rosemary, dill and thyme — in a small wooden bowl on grey linen | Anita Schnitzer | https://unsplash.com/photos/a-wooden-bowl-filled-with-herbs-on-top-of-a-table-eZ0-0K1Bu4o | Unsplash License |
| `chip-ginger-turmeric` | `chip-ginger-turmeric.jpg` | 600×750 | Fresh ginger root with a few sliced pieces on a plain light surface | NoonBrew | https://unsplash.com/photos/a-ginger-root-and-a-piece-of-ginger-on-a-white-surface-ziCb4_EKmak | Unsplash License |
| `chip-greens` | `chip-greens.jpg` | 600×751 | Two large leafy green (collard) leaves with visible water droplets on a wooden board | Sombrero Craft | https://unsplash.com/photos/a-couple-of-leafy-greens-sitting-on-top-of-a-wooden-table-6zXtMSPZR20 | Unsplash License |
| `chip-oats` | `chip-oats.jpg` | 600×407 | A round bowl filled with raw rolled oats, shot from above on a plain cream background | Jocelyn Morales | https://unsplash.com/photos/brown-and-white-ceramic-bowl-GuJ8KO4LywI | Unsplash License |
| `chip-tea` | `chip-tea.jpg` | 600×402 | A cup of amber herbal tea on a linen surface, surrounded by loose tea leaves, dried roots and bark | Drew Jemmett | https://unsplash.com/photos/white-and-brown-ceramic-mug-qEcWgrTG578 | Unsplash License |
| `chip-lemon` | `chip-lemon.jpg` | 600×900 | A glass of lemon water with ice, garnished with a lemon wheel, next to halved lemons on a wooden board | Laura Chouette | https://unsplash.com/photos/clear-drinking-glass-with-lemon-juice-TecD-1MTMiE | Unsplash License |
| `svc-digestive` | `svc-digestive.jpg` | 1400×934 | A small bowl of yoghurt topped with granola and a blueberry, with a wooden spoon beside it | nilufar nattaq | https://unsplash.com/photos/a-bowl-of-cereal-with-a-spoon-on-the-side-vFiyixJ8t6w | Unsplash License |
| `svc-metabolic` | `svc-metabolic.jpg` | 1400×933 | A row of small wooden bowls filled with legumes and whole grains — green mung beans, lentils and rice | yasara hansani | https://unsplash.com/photos/a-group-of-bowls-with-food-in-it-3aONsy-jVQk | Unsplash License |
| `svc-hormonal` | `svc-hormonal.jpg` | 1400×933 | A pale pink cup filled with raw pumpkin seeds, shot from above on a soft grey background | engin akyurt | https://unsplash.com/photos/brown-wooden-heart-shaped-decor-19sSfIBN34Y | Unsplash License |
| `svc-allergies` | `svc-allergies.jpg` | 1400×911 | Four simple ingredients — almonds, cacao powder, matcha and flour — in separate white bowls on a light surface | Alejandra Ezquerro | https://unsplash.com/photos/brown-and-white-round-food-on-white-ceramic-bowls-g4h-VIkyD7Q | Unsplash License |
| `svc-chronic` | `svc-chronic.jpg` | 1400×933 | Wholegrain bread, a small bowl of marinated olives and a hand pouring olive oil into a dish | Louis Hansel | https://unsplash.com/photos/green-grapes-on-white-ceramic-bowl-fJxJDKAQU9c | Unsplash License |
| `svc-testing` | `svc-testing.jpg` | 1400×933 | A closed leather notebook, a pen and a cup of coffee on a pale wooden desk, shot from above | Elena Leya | https://unsplash.com/photos/a-cup-of-coffee-next-to-a-notebook-and-pen-56J8143b7PU | Unsplash License |
| `about-desk` | `about-desk.jpg` | 2000×3000 | An open notebook and wooden pen on a warm desk, with small potted plants and a lamp softly out of focus behind | Max Saeling | https://unsplash.com/photos/pen-on-book-_CGxNOLM1gQ | Unsplash License |
| `cta-botanical` | `cta-botanical.jpg` | 2000×1393 | A sprig of sage-green eucalyptus leaves against a soft, blurred cream and terracotta background | Pascal Debrunner | https://unsplash.com/photos/a-sprig-of-eucalyptus-leaves-against-a-soft-blurred-background--KYfVX_t_FM | Unsplash License |

## Processing

Each photo was downloaded at full resolution via Unsplash's `/download?force=true` endpoint, then processed with `sharp` (`.rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true })`), which strips all EXIF data:

- `hero-produce`, `about-desk`, `cta-botanical`: resized to 2000px wide
- `svc-*` (six service images): resized to 1400px wide
- `chip-*` (six chip images): resized to 600px wide

## Notes / what I'd swap with more time

- **`svc-chronic`**: the only pick with a visible hand (pouring olive oil) and a decorative (non-text) motif printed on a small ceramic dish lid. It matches the brief well otherwise (bread, olives, olive oil, muted grey-green tones) but the background is a cooler grey rather than warm cream — worth a second pass if a warmer Mediterranean-toned alternative turns up.
- **`hero-produce`**: strong candidate but the vegetables are in soft focus with the background (jars, a mortar) sharp — an alternative with the produce itself in sharp focus and a clean patch of negative space for the hero overlay text would be worth testing directly against this one in the actual layout.
- **`svc-digestive`**: very white/bright rather than warm cream — still within the palette family but slightly cooler than the rest of the set; a version on a linen or wood surface would blend better with the terracotta/sage cards around it.
- **`chip-ginger-turmeric`**: only shows ginger, no turmeric root (turmeric root is much rarer as a free, non-Plus Unsplash photo in this style) — acceptable since the brief allows either.
