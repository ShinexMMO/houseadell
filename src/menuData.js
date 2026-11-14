// Transcribed and visually verified against the supplied five-page "Menu 6.pdf".
// Prices are in EUR. Vegetarian/organic labels reproduce the original menu.
// Do not infer allergen information from the ingredient descriptions.

export const cafeInfo = {
  name: 'House Adell',
  street: 'Marktplatz 16',
  postalCode: '36199',
  city: 'Rotenburg an der Fulda',
  telephone: '06623 9156506',
  telephoneHref: 'tel:+4966239156506',
  instagram: 'https://www.instagram.com/adell.house/?hl=de',
  facebook: 'https://www.facebook.com/house.adell/',
  hours: [
    { days: 'Montag', time: '09:00–17:00 Uhr' },
    { days: 'Dienstag', time: 'Ruhetag' },
    { days: 'Mittwoch bis Sonntag', time: '09:00–17:00 Uhr' },
  ],
  hoursNote: 'An Feiertagen können die Öffnungszeiten abweichen.',
};

export const menuCategories = [
  {
    id: 'breakfast',
    label: 'Frühstück',
    description: 'Morgendliche Klassiker. Täglich bis 12 Uhr genießen.',
    items: [
      {
        name: 'Breakfast Adell!',
        description: 'Geräucherte Putenbrust, Putensalami, Pastrami, regionale Wurst vom Lindenhof Kraus, kleine Käseauswahl, spiced Beerenmarmelade, homemade Kräuterquark & aufgeschlagener Basilikum-Feta-Frischkäse, Butter und Brotkorb.',
        price: 16,
      },
      {
        name: 'So Cheesy!',
        description: 'Pfefferkäse, französischer Brie, österreichischer Bergkäse, Grana Padona, Chaumes, Caprese, homemade Tomatenpesto, spiced Beerenmarmelade, Strawberry Chia Jam, Butter und Brotkorb.',
        price: 16,
        vegetarian: true,
      },
    ],
    extras: [
      { name: 'Bio-Spiegelei', price: 2 },
      { name: 'Bio-Rührei', price: 2 },
      { name: '½ Avocado', price: 3.5 },
      { name: 'Masala-Rührtofu', price: 4.5 },
      { name: 'Crispy Puten-Bacon', price: 4 },
      { name: 'Räucherlachs', price: 5 },
    ],
  },
  {
    id: 'sweet',
    label: 'Süßes & Porridge',
    description: 'Für die Süßen. Porridge, Waffeln und kleine Glücklichmacher.',
    items: [
      {
        name: 'Rustikale Hafergeschichte',
        description: 'Haferflockenmix, Vanille-Brombeerkompott, Kokosflocken, Banane und Heidelbeer-Joghurt.',
        price: 11,
        vegetarian: true,
      },
      {
        name: 'Petan’s Porridge',
        description: 'Haferflockenmix, Ghee, Apfel, Zimt, Apfelkompott, geröstete Nüsse, Ahornsirup und Kokosblütenzucker.',
        price: 11.5,
        vegetarian: true,
      },
      {
        name: 'Sweet like Laurita',
        description: 'Buttercroissant, spiced Beerenmarmelade und Strawberry Chia Jam, Butter und Kokosnuss-Joghurt mit frischen Heidelbeeren.',
        price: 9.5,
        vegetarian: true,
      },
      {
        name: 'Der Nussknacker',
        description: 'Luftige Waffeln, toasted Marshmallows, geröstete Haselnüsse, creamy Chocolate und Amaretti.',
        price: 10.5,
        vegetarian: true,
        note: 'Kids favorite',
      },
      {
        name: 'Der Waffelkönig KayKay',
        description: 'Luftige Waffeln, Zimt-Tonka-Ricottacreme, Milchmädchen, Waldbeeren und Pistazien.',
        price: 10.5,
        vegetarian: true,
      },
      {
        name: 'Simmy’s French Toast in Making',
        description: 'Butter-Brioche-Toast, Zimt & Zucker, Orange Maple Mascarponecreme, Kirschkompott und Granatapfelsirup.',
        price: 12,
        vegetarian: true,
      },
      {
        name: 'Jugnu’s Golden Glow',
        description: 'Creamy Coconut Chia Pudding, Peanut Butter Drizzle, crunchy Hazelnut & Chocolate Granola und brûléed Banana.',
        price: 11.5,
        vegetarian: true,
      },
      {
        name: 'Sporty Sattu',
        description: 'Homemade Granola, griechischer Joghurt, ofengerösteter Apfel-Birne-Kompott, Chia und Ahornsirup.',
        price: 11.5,
        vegetarian: true,
        note: 'House Adells Empfehlung. Alternativ mit Kokosjoghurt + 1,50 €.',
      },
    ],
  },
  {
    id: 'sourdough',
    label: 'Sauerteigbrote',
    description: 'On Sourdough. Teil unseres All Day Breakfast Clubs.',
    items: [
      {
        name: 'Avocado on top',
        description: 'Gegrilltes Brot, Avocado, homemade Kräuterbutter, Chili-Gewürzmischung, Limette, Wildkräutersalat und homemade pickled Onion.',
        price: 11.5,
        vegetarian: true,
      },
      {
        name: 'Good Vibes',
        description: 'Gegrilltes Brot, Feigensenf, Feta, Rucola, Jamón Serrano und Haselnuss Dukkah.',
        price: 12.5,
      },
      {
        name: 'Für den Morgen danach',
        description: 'Gegrilltes Brot, Ziegenfrischkäse, gebratene frische Pilze, Lauch und Feige.',
        price: 11,
        vegetarian: true,
      },
      {
        name: 'Scandic Saba',
        description: 'Gegrilltes Brot, Sahnemeerrettich, Lachs, homemade Gewürzmischung, Dill und Limette.',
        price: 13,
      },
      {
        name: 'Pretty Little Things',
        description: 'Gegrilltes Brot, Olivenöl, Rucola, Rote Bete, homemade Tomatenpesto und Mozzarella.',
        price: 12.5,
        vegetarian: true,
      },
      {
        name: 'Riri’s Gaumentango',
        description: 'Gegrilltes Brot, regionaler Schmand, Apfelkompott, crispy Geflügel-Bacon, Mandeln und Ahornsirup.',
        price: 12,
        note: 'Chef Sofias Empfehlung',
      },
    ],
    extras: [
      { name: 'Bio-Spiegelei', price: 2 },
      { name: 'Bio-Rührei', price: 2 },
    ],
  },
  {
    id: 'eggs',
    label: 'Eggelicious',
    description: 'Omelettes und Shakshuka. Teil unseres All Day Breakfast Clubs.',
    items: [
      {
        name: 'Omelette Feta & Hummus',
        description: 'Bio-Ei, Koriander, Wildkräutersalat, homemade Kräuterbutter, Brot & Dip.',
        price: 13.5,
        vegetarian: true,
      },
      {
        name: 'Omelette Indian Masala',
        description: 'Bio-Ei, Wildkräutersalat, homemade Kräuterbutter, Brot & Dip.',
        price: 13.5,
        vegetarian: true,
        note: 'Papas Empfehlung',
      },
      {
        name: 'Omelette Lachs & Gruyère',
        description: 'Bio-Ei, Wildkräutersalat, homemade Kräuterbutter, Brot & Dip.',
        price: 15,
      },
      {
        name: 'Shakshuka – Maavi’s Heimattraum',
        description: 'Tomatenragout, Paprika, Sucuk, Bio-Ei, homemade crispy Chili-Öl, Koriander, Brot und Feta.',
        price: 14.5,
      },
    ],
  },
  {
    id: 'coffee',
    label: 'Kaffee',
    description: 'Für die Zubereitung verwenden wir regional geröstete Kaffeebohnen.',
    items: [
      { name: 'Coffee', description: '', price: 3.2 },
      { name: 'Americano', description: '', price: 3.5 },
      { name: 'Espresso', description: '', price: 2.7 },
      { name: 'Iced Americano', description: '', price: 3.5 },
      { name: 'Iced Vanilla Cloud Latte', description: '', price: 5 },
      { name: 'Espresso Macchiato', description: '', price: 3.2 },
      { name: 'Cappuccino', description: '', price: 3.8 },
      { name: 'Flat White', description: '', price: 4.2 },
      { name: 'Latte', description: '', price: 4.2 },
      { name: 'Milchkaffee', description: '', price: 3.8 },
    ],
    extras: [
      { name: 'Hafermilch, Kokosmilch oder Mandelmilch', price: 0.7 },
      { name: 'Vanilla, Hazelnut oder Salted Caramel Sirup', price: 0.5 },
    ],
  },
  {
    id: 'tea',
    label: 'Tee',
    description: 'Unsere biologischen Teesorten.',
    items: [
      {
        name: 'Rich Mint',
        description: 'Nana-Minze gilt als die elegante, süßliche Verwandte der klassischen Pfefferminze.',
        price: 4.2,
        organic: true,
      },
      {
        name: 'Unter den Linden',
        description: 'Lindenblüten, süß-saure Apfelstücke und fruchtige Holunderblüte.',
        price: 4.2,
        organic: true,
      },
      {
        name: 'Brave New Earl',
        description: 'Earl Grey aus indischer Herkunft, mit spritziger Zitrus-Orangen-Note und erfrischend-würziger Wacholderbeere.',
        price: 4.2,
        organic: true,
      },
      {
        name: 'Top of the Day',
        description: 'Blend aus belebender Pfefferminze, Zitronengras und Vitamin-C-reichem Hibiskus, milden Apfel- und Rosennoten.',
        price: 4.2,
        organic: true,
      },
      {
        name: 'Sprite’s Delight',
        description: 'Grünteekomposition aus Erdbeeren, Blaubeeren, Holunderblüten und würzigem Basilikum.',
        price: 4.2,
        organic: true,
      },
    ],
  },
  {
    id: 'specials',
    label: 'House Specials',
    description: 'Schokolade, Chai, Matcha und hausgemachte Erfrischungen.',
    items: [
      { name: 'Spicy Hot Chocolate', description: 'Raw Chocolate, Ingwer und Milch.', price: 4.2 },
      { name: 'Docs Special', description: 'Raw Chocolate, Chili und Milch.', price: 4.2 },
      { name: 'Gewürzmärchen', description: 'Raw Chocolate, Zimt, Kardamom, Tonka, Vanille, Sternanis und Milch.', price: 4.5 },
      { name: 'Seelenfreude', description: 'White Chocolate, Kardamom, Espresso und Milch.', price: 4.7 },
      { name: 'Matcha Latte', description: 'Matcha, Ahornsirup und Milch.', price: 4.5 },
      { name: 'Prabhs Chai Latte', description: 'Indischer schwarzer Tee und Milch.', price: 4.2 },
      { name: 'Roops Dirty Chai Latte', description: 'Indischer schwarzer Tee, Espresso und Milch.', price: 4.7 },
      { name: 'Adells Affogato', description: 'Espresso, Ice Cream und Adell Spices.', price: 4.5 },
      { name: 'Mangolicious', description: 'Griechischer Joghurt, Mango und Kardamom.', price: 4.5 },
      { name: 'Nimbu Pani Lemonade', description: 'Indische Zitronenlimonade und Masala.', price: 5 },
      { name: 'Blushing Rose Lemonade', description: 'Thomas Henry Grapefruit, Rose, Agavensirup und Limette.', price: 6.5 },
      { name: 'Dates & Figs', description: 'Dattel- und Feigenlimonade mit Zitrone.', price: 6.5 },
    ],
    extras: [{ name: 'Hafermilch, Kokosmilch oder Mandelmilch', price: 0.7 }],
  },
  {
    id: 'juices',
    label: 'Frische Säfte',
    description: 'Juicy.',
    items: [
      { name: 'Oh Juice', description: 'Frischer Orangensaft.', price: 3.5 },
      { name: 'Vitamine Booster', description: 'Orange, Apfel, Karotte und Ingwer.', price: 4.5 },
      { name: 'Hydrating Glow', description: 'Rote Bete, Apfel, Karotte, Zitrone und Gurke.', price: 4.5 },
    ],
  },
  {
    id: 'bottled',
    label: 'Bottled Up',
    description: 'Erfrischungen aus der Flasche.',
    items: [
      {
        name: 'Richard’s Sun Iced Tea · 0,33 l',
        description: 'Peach, Lemon, Granatapfel oder Watermelon & Pineapple.',
        price: 3.7,
        organic: true,
      },
      { name: 'Wasser · 0,25 l', description: 'Still oder spritzig.', price: 2.5 },
      {
        name: 'Proviant Beverages · 0,33 l',
        description: 'Apfelschorle, Kirsche & Granatapfel Schorle, Rhabarber-Limonade, Zitrone & Ingwer-Limonade, Cola Fairtrade oder Cola zuckerfrei.',
        price: 3.7,
        organic: true,
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Für den Kreislauf',
    description: 'Ein kleiner Anlass zum Anstoßen.',
    items: [
      { name: 'Mimosa · 0,2 l', description: '', price: 5.5 },
      { name: 'Prosecco · 0,2 l', description: '', price: 6.5 },
      { name: 'Daydrinking Sparking Rosé · 0,75 l', description: '', price: 27 },
      { name: 'Bier · 0,33 l', description: '', price: 3.5 },
      { name: 'Espresso Martini', description: '', price: 8 },
      { name: 'Grapefruit Rosmarin Aperol Spritz', description: '', price: 8.5 },
    ],
  },
];

export const menuNotes = [
  'Besucht unsere Kuchentheke für homemade Cakes & Sandwiches. Die Auswahl wechselt.',
  'Bitte informiert euch in unserer Musterspeisekarte im Café über Allergene und Zusatzstoffe.',
  'Alle Preise in Euro. Es gilt die aktuelle Karte im Café.',
];

export const formatPrice = (value) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
