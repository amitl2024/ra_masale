/**
 * Company & editorial content.
 * Heritage facts and unit addresses are RA's own. Anything marked `placeholder`
 * (phone, email, WhatsApp, hours, team) must be supplied by RA Food Products.
 */

export const company = {
  name: "RA Masale",
  legalName: "RA Food Products",
  founded: 1972,
  founders: [
    { name: "Shri Ramchandra Vasant Divate", known: "Bhau" },
    { name: "Sou Vijaya Ramchandra Divate", known: "Aai" },
  ],
  /** placeholders — leave empty strings to hide click-to-call / WhatsApp / email */
  phone: "",
  whatsapp: "",
  email: "",
  hours: "",
  units: [
    {
      name: "Unit 1",
      place: "Kavathe Ekand",
      lines: ["Gat No: 1814/A, Sangli Tasgaon Road", "A/P Kavathe Ekand – 416307", "Tal. Tasgaon, Dist. Sangli"],
      query: "Kavathe Ekand, Tasgaon, Sangli, Maharashtra 416307",
    },
    {
      name: "Unit 2",
      place: "Navjeevan Nagar, Sangli",
      lines: ["C.S No: 2030/2031, Navjeevan Nagar", "Near Sanjay Industrial Estate", "Sangli – 416406"],
      query: "Sanjay Industrial Estate, Sangli, Maharashtra 416406",
    },
    {
      name: "Unit 3",
      place: "Madhavnagar, Sangli",
      lines: ["Gat No: 24/25, Madhavnagar", "Near Sanjay Industrial Estate", "Sangli – 416406"],
      query: "Madhavnagar, Sangli, Maharashtra 416406",
    },
  ],
};

export const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const journey = [
  {
    year: "1972",
    label: "Foundation",
    title: "A small batch of onion-garlic chutney",
    body: "Shri Ramchandra Vasant Divate (Bhau) and Sou Vijaya Ramchandra Divate (Aai) found RA Masale in Sangli, beginning with a small quantity of Onion Garlic Chutney.",
  },
  {
    year: "Early years",
    label: "Onion Garlic Chutney",
    title: "Word travels across Sangli",
    body: "The chutney finds its way into more and more kitchens, built on the same care that went into the first batch.",
  },
  {
    year: "Growth",
    label: "Spices & food products",
    title: "From one chutney to a pantry",
    body: "The range expands into ground spices, blended masalas and food products — always with the focus on quality, recipes and customers.",
  },
  {
    year: "Modernisation",
    label: "Modern production",
    title: "Modern processes, traditional recipes",
    body: "Production is modernised for consistency and hygiene while the traditional recipes are preserved exactly as they were.",
  },
  {
    year: "Today",
    label: "50+ years",
    title: "Fifty years and a growing network",
    body: "Over 50 years of experience, with super stockists and distributors carrying RA Masale across Maharashtra and parts of India.",
  },
  {
    year: "Future",
    label: "Continued growth",
    title: "Expansion, with the same care",
    body: "Continued expansion and a continued focus on quality — so the next fifty years taste just like the first.",
  },
];

export const commitments = [
  { title: "Carefully selected raw materials", body: "Quality begins long before grinding — with the choice of what goes into every batch." },
  { title: "Consistent quality", body: "The same taste in every pack, batch after batch, year after year." },
  { title: "Traditional recipes", body: "The family’s recipes remain the reference point for every blend." },
  { title: "Modernised production", body: "Modern processes bring consistency and scale without changing the recipe." },
  { title: "Hygiene", body: "Clean handling and processing environments across our units." },
  { title: "Food safety", body: "Careful processing and packing to keep products safe and fresh." },
  { title: "Customer satisfaction", body: "Fifty years of returning kitchens is the measure we care about most." },
];

/** Manufacturing journey — confirm each step with RA before publishing */
export const manufacturing = [
  { no: "01", title: "Raw Material Selection", body: "Spices and ingredients are chosen carefully, lot by lot." },
  { no: "02", title: "Cleaning & Processing", body: "Raw materials are cleaned and sorted before processing." },
  { no: "03", title: "Grinding / Preparation", body: "Roasted where the recipe calls for it, then ground or prepared." },
  { no: "04", title: "Blending", body: "Masalas are blended to the family’s recipes." },
  { no: "05", title: "Quality Checking", body: "Batches are checked for consistency of colour, aroma and taste." },
  { no: "06", title: "Packaging", body: "Packed to keep freshness, taste and aroma sealed in." },
  { no: "07", title: "Distribution", body: "Dispatched through super stockists and distributors." },
];

export const whyRA = [
  { title: "50+ Years of Experience", body: "Making food products in Sangli since 1972." },
  { title: "Traditional Recipes", body: "Family recipes, preserved through every modernisation." },
  { title: "Quality-Focused Production", body: "Care at every step, from raw material to pack." },
  { title: "Carefully Selected Raw Materials", body: "The foundation of consistent taste." },
  { title: "Wide Product Range", body: "Spices, masalas, ready mixes, papads, pickles & more." },
  { title: "Strong Distribution Network", body: "Super stockists and distributors across Maharashtra." },
  { title: "Family-Owned Heritage", body: "Founded by Bhau & Aai, run by the family today." },
  { title: "Consistent Taste & Quality", body: "The flavour families have trusted for decades." },
];

export const enquiryTypes = ["Distributor", "Super stockist", "Retailer", "Wholesale", "Institutional", "Bulk order", "Product enquiry", "Other"];

export const indianStates = [
  "Maharashtra", "Karnataka", "Goa", "Gujarat", "Madhya Pradesh", "Telangana", "Andhra Pradesh", "Tamil Nadu",
  "Kerala", "Chhattisgarh", "Rajasthan", "Delhi", "Uttar Pradesh", "Other",
];

/** Districts used on the illustrative distribution map — confirm actual coverage with RA */
export const mapCities = [
  { name: "Mumbai", x: 118, y: 168 },
  { name: "Pune", x: 168, y: 176 },
  { name: "Kolhapur", x: 140, y: 296 },
  { name: "Satara", x: 166, y: 232 },
  { name: "Solapur", x: 238, y: 238 },
  { name: "Aurangabad", x: 232, y: 140 },
  { name: "Nashik", x: 168, y: 118 },
  { name: "Nagpur", x: 318, y: 112 },
];
