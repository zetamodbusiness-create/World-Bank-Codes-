import "./globals.css";
import Link from "next/link";
import { Newsreader, Public_Sans } from "next/font/google";
import Tabs from "@/components/Tabs";
import { site } from "@/lib/site";
import { getCategories } from "@/lib/data";

const sans = Public_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name + ": " + site.tagline, template: "%s | " + site.name },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  alternates: { canonical: "/" }
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default async function RootLayout({ children }) {
  const top = (await getCategories()).filter((c) => !c.parent);
  const items = [{ href: "/", label: "Home" }, ...top.map((c) => ({ href: "/category/" + c.slug, label: c.name })), { href: "/search", label: "Search" }];
  return (
    <html lang="en-US" className={sans.variable + " " + serif.variable}>
      <body className="min-h-screen font-sans antialiased">
        <header className="mx-auto max-w-5xl px-4 pb-4 pt-6 text-center" style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}>
          <Link href="/" className="font-serif text-4xl font-extrabold tracking-tight sm:text-5xl">{site.name}</Link>
          <p className="mt-1 font-serif italic text-muted">{site.tagline}</p>
        </header>
        <Tabs items={items} />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-12 text-sm text-muted" style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-ink pt-5">
            <Link href="/about">About</Link><Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link><Link href="/disclaimer">Disclaimer</Link>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} {site.name}. For information only, not financial advice.</p>
        </footer>
      </body>
    </html>
  );
}
