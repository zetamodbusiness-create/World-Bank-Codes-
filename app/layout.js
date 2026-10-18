import "./globals.css";
import Link from "next/link";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import { site } from "@/lib/site";
import { getCategories } from "@/lib/data";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name + ": " + site.tagline, template: "%s | " + site.name },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  alternates: { canonical: "/" }
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0b6b57" };

export default async function RootLayout({ children }) {
  const top = (await getCategories()).filter((c) => !c.parent);
  return (
    <html lang="en-US" className={sans.variable + " " + serif.variable}>
      <body className="font-sans antialiased min-h-screen pb-24 md:pb-0">
        <header className="sticky top-0 z-30 border-b border-line bg-surface" style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
            <Link href="/" className="text-lg font-bold tracking-tight">{site.name}</Link>
            <nav aria-label="Main" className="hidden items-center gap-5 text-sm font-medium md:flex">
              {top.map((c) => <Link key={c.slug} href={"/category/" + c.slug} className="text-muted hover:text-ink">{c.name}</Link>)}
              <Link href="/search" className="rounded-full bg-brand px-4 py-1.5 text-brandink">Search</Link>
            </nav>
            <Link href="/search" aria-label="Search" className="md:hidden p-2 text-muted">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 4a7 7 0 105 12l4 4 1.5-1.5-4-4A7 7 0 0011 4z" /></svg>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 pb-10 text-sm text-muted">
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
            <Link href="/about">About</Link><Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link><Link href="/disclaimer">Disclaimer</Link>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} {site.name}. For information only, not financial advice.</p>
        </footer>
        <BottomNav />
      </body>
    </html>
  );
}
