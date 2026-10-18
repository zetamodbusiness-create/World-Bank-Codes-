export const site = {
  name: "BankCodex",
  tagline: "Bank codes, explained and checked.",
  description: "Clear, verified guides to routing numbers, SWIFT/BIC codes, IBANs and country codes.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  email: "contact@example.com"
};
export function fmtDate(iso) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
