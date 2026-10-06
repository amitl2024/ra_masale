/**
 * Company & editorial content.
 * Heritage facts and unit addresses come from RA Food Products. Anything marked
 * "placeholder" (phone, email, hours, reviews, recipes) is demo content to be replaced.
 */

export const company = {
  name: "RA Masale",
  legalName: "RA Food Products",
  founded: 1972,
  founders: [
    { name: "Shri Ramchandra Vasant Divate", known: "Bhau" },
    { name: "Sou Vijaya Ramchandra Divate", known: "Aai" },
  ],
  phone: "+91 00000 00000", // placeholder
  email: "hello@example.com", // placeholder
  hours: "Mon – Sat, 9:30 am – 6:30 pm", // placeholder
  units: [
    {
      name: "Unit 1",
      place: "Kavathe Ekand",
      lines: ["Gat No: 1814/A, Sangli Tasgaon Road", "A/P Kavathe Ekand – 416307", "Tal. Tasgaon, Dist. Sangli"],
      map: "https://maps.google.com/?q=Kavathe+Ekand+Tasgaon+Sangli",
    },
    {
      name: "Unit 2",
      place: "Navjeevan Nagar, Sangli",
      lines: ["C.S No: 2030/2031, Navjeevan Nagar", "Near Sanjay Industrial Estate", "Sangli – 416406"],
      map: "https://maps.google.com/?q=Sanjay+Industrial+Estate+Sangli",
    },
    {
      name: "Unit 3",
      place: "Madhavnagar, Sangli",
      lines: ["Gat No: 24/25, Madhavnagar", "Near Sanjay Industrial Estate", "Sangli – 416406"],
      map: "https://maps.google.com/?q=Madhavnagar+Sangli",
    },
  ],
};

export const shipping = {
  freeAbove: 499,
  standard: 49,
  express: 99,
};

export const timeline = [
  {
    year: "1972",
    title: "A small batch of chutney",
    body: "Bhau and Aai begin with a small quantity of Onion Garlic Chutney, made the way it was made at home.",
  },
  {
    year: "The early years",
    title: "From chutney to spices",
    body: "Word spreads across Sangli. The range grows into ground spices and the family’s own house blends.",
  },
  {
    year: "Growth",
    title: "Three units in Sangli district",
    body: "Production expands across Kavathe Ekand, Navjeevan Nagar and Madhavnagar.",
  },
  {
    year: "Modernisation",
    title: "Modern methods, same recipes",
    body: "Modern grinding and packing processes are introduced while the recipes stay exactly as they were.",
  },
  {
    year: "Today",
    title: "50+ years at the table",
    body: "Super stockists and distributors carry RA Masale across Maharashtra and parts of India.",
  },
];

export const process = [
  { no: "I", title: "Selection", body: "Raw materials are chosen carefully, lot by lot." },
  { no: "II", title: "Cleaning", body: "Spices are cleaned and sorted before processing." },
  { no: "III", title: "Roasting & Grinding", body: "Roasted where the recipe calls for it, then ground." },
  { no: "IV", title: "Blending", body: "House blends are mixed to the family’s recipes." },
  { no: "V", title: "Sealing", body: "Packed to keep freshness, taste and aroma inside." },
];

/** Sample reviews — placeholder content for the demo storefront */
export const reviews = [
  {
    quote: "The Goda Masala smells exactly like my grandmother’s kitchen in Satara. Amti hasn’t tasted this right in years.",
    name: "Sample review",
    city: "Pune",
    product: "Goda Masala",
  },
  {
    quote: "Kanda Lasun Chutney with a little oil and hot bhakri — that’s dinner sorted. Properly fiery.",
    name: "Sample review",
    city: "Kolhapur",
    product: "Kanda Lasun Chutney",
  },
  {
    quote: "Gifted the Sangli Kitchen Box at a housewarming. Everyone asked where it was from.",
    name: "Sample review",
    city: "Mumbai",
    product: "The Sangli Kitchen Box",
  },
];

/** Placeholder journal / recipe entries */
export const recipes = [
  {
    slug: "misal-pav",
    title: "Kolhapuri Misal Pav",
    time: "45 min",
    level: "Medium",
    uses: "misal-masala",
    excerpt: "Sprouted matki, a fiery red kat and crisp farsan — Maharashtra’s favourite breakfast.",
    tint: "#B5371B",
  },
  {
    slug: "bharli-vangi",
    title: "Bharli Vangi",
    time: "35 min",
    level: "Easy",
    uses: "goda-masala",
    excerpt: "Baby brinjals stuffed with peanut, coconut and Goda Masala, slow-cooked until silky.",
    tint: "#3F2A1E",
  },
  {
    slug: "gavran-mutton",
    title: "Sunday Gavran Mutton",
    time: "1 hr 20 min",
    level: "Medium",
    uses: "gavran-mutton-masala",
    excerpt: "A dark, rustic mutton curry for long lunches — best with jowar bhakri.",
    tint: "#2B1B16",
  },
];
