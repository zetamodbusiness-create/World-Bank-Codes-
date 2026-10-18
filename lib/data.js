// DATA LAYER. Everything the UI shows comes from these functions.
// When Supabase is ready, replace the bodies of these functions only.

const categories = [
  { slug: "routing-numbers", name: "Routing Numbers", parent: null, description: "ABA routing numbers for US banks and how to use them." },
  { slug: "swift-codes", name: "SWIFT / BIC Codes", parent: null, description: "International bank identifier codes explained." },
  { slug: "iban", name: "IBAN", parent: null, description: "International bank account number formats by country." },
  { slug: "country-codes", name: "Country Codes", parent: null, description: "ISO country codes and dialling codes." },
  { slug: "us-banks", name: "US Banks", parent: "routing-numbers", description: "Routing details for individual US banks." }
];

const posts = [
  {
    slug: "what-is-a-routing-number",
    title: "What Is a Routing Number and Where Can You Find Yours?",
    excerpt: "A routing number identifies your bank in the United States. Learn what the nine digits mean and the three places to find yours.",
    category: "routing-numbers",
    image: null,
    date: "2026-10-12", updated: "2026-10-12", readMins: 4,
    seoTitle: "What Is a Routing Number? How to Find Yours",
    seoDescription: "A routing number is a nine-digit code that identifies a US bank. Learn how it works and where to find yours.",
    sources: [{ label: "Federal Reserve Financial Services", url: "https://www.frbservices.org" }],
    codes: [{ label: "Format", value: "9 digits", note: "Example layout: 021000021" }],
    body: "<p>A routing number, also called an ABA routing transit number, is a nine-digit code that identifies a financial institution in the United States. It tells the payment system which bank should receive or send a transfer.</p><h2>Where to find your routing number</h2><ul><li>On the bottom-left of a paper cheque.</li><li>In your online banking or mobile app, under account details.</li><li>On your bank's official website.</li></ul><h2>Why it matters</h2><p>You need it for direct deposit, automatic bill payments and domestic wire transfers. A wrong digit can delay a payment, so always copy it exactly.</p><p>Some banks use different routing numbers for wires and for ACH transfers, so check which one applies to your payment.</p>",
    faq: [{ q: "How many digits is a routing number?", a: "Nine digits." }, { q: "Is a routing number the same as an account number?", a: "No. The routing number identifies the bank, and the account number identifies your account." }]
  },
  {
    slug: "swift-bic-code-explained",
    title: "SWIFT/BIC Codes Explained: How to Read the 8 or 11 Characters",
    excerpt: "Every SWIFT code follows the same structure. Break one down piece by piece and learn when you need it.",
    category: "swift-codes",
    image: null,
    date: "2026-10-10", updated: "2026-10-10", readMins: 5,
    seoTitle: "SWIFT/BIC Code Explained: Structure and Meaning",
    seoDescription: "A SWIFT/BIC code has 8 or 11 characters. Learn what each part means and when you need one for an international transfer.",
    sources: [{ label: "SWIFT", url: "https://www.swift.com" }],
    codes: [{ label: "Example BIC", value: "DEUTDEFF", note: "Deutsche Bank, Frankfurt" }],
    body: "<p>A SWIFT code, also known as a BIC (Business Identifier Code), identifies a bank for international payments.</p><h2>The structure</h2><table><tr><th>Part</th><th>Length</th><th>Meaning</th></tr><tr><td>Bank code</td><td>4 letters</td><td>The bank</td></tr><tr><td>Country code</td><td>2 letters</td><td>ISO country</td></tr><tr><td>Location code</td><td>2 characters</td><td>City or region</td></tr><tr><td>Branch code</td><td>3 characters (optional)</td><td>A specific branch</td></tr></table><p>In DEUTDEFF, DEUT is the bank, DE is Germany and FF is the location. When the branch part is missing, the code refers to the main office.</p><h2>When you need one</h2><p>You usually need a SWIFT code when sending money to an account in another country.</p>",
    faq: [{ q: "Are SWIFT and BIC the same?", a: "Yes. The terms are used interchangeably." }]
  },
  {
    slug: "iban-format-explained",
    title: "IBAN Format Explained: Structure, Length and Check Digits",
    excerpt: "An IBAN packs the country, bank and account into one string. See how it is built and how to spot a mistake.",
    category: "iban",
    image: null,
    date: "2026-10-08", updated: "2026-10-08", readMins: 4,
    seoTitle: "IBAN Format Explained: Structure and Check Digits",
    seoDescription: "Learn how an IBAN is structured, how long it is in different countries and how check digits catch typing errors.",
    sources: [{ label: "SWIFT IBAN Registry", url: "https://www.swift.com/standards/data-standards/iban-international-bank-account-number" }],
    codes: [{ label: "Example IBAN (UK)", value: "GB82 WEST 1234 5698 7654 32", note: "Published sample, not a real account" }],
    body: "<p>An International Bank Account Number (IBAN) is a standard way to write a bank account so that payments cross borders with fewer errors.</p><h2>What an IBAN contains</h2><ul><li>Two letters for the country.</li><li>Two check digits.</li><li>The domestic bank and account details.</li></ul><p>The length differs by country. The check digits let banks detect most typing mistakes before a payment is sent.</p>",
    faq: [{ q: "Does every country use IBANs?", a: "No. Many countries, including the United States, do not." }]
  }
];

export async function getCategories() { return categories; }
export async function getCategory(slug) { return categories.find((c) => c.slug === slug) || null; }
export async function getCategoryPath(cat) {
  const path = []; let c = cat;
  while (c) { path.unshift(c); c = c.parent ? categories.find((x) => x.slug === c.parent) : null; }
  return path;
}
export async function getPosts() { return [...posts].sort((a, b) => b.date.localeCompare(a.date)); }
export async function getPost(slug) { return posts.find((p) => p.slug === slug) || null; }
export async function getPostsByCategory(slug) {
  const slugs = [slug, ...categories.filter((c) => c.parent === slug).map((c) => c.slug)];
  return (await getPosts()).filter((p) => slugs.includes(p.category));
}
export async function getRelated(post, n = 3) {
  return (await getPosts()).filter((p) => p.slug !== post.slug && p.category === post.category).concat((await getPosts()).filter((p) => p.slug !== post.slug && p.category !== post.category)).slice(0, n);
}
