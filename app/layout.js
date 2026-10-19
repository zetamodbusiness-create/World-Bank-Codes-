import "./globals.css";
import "./menu.css";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import { getCategories } from "@/lib/data";
import { pages } from "@/lib/pages";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name + ": " + site.tagline, template: "%s | " + site.name },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  alternates: { canonical: "/" }
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const themeScript = "try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}";

export default async function RootLayout({ children }) {
  const categories = (await getCategories()).map(({ slug, name, parent }) => ({ slug, name, parent }));
  const important = Object.keys(pages).map((key) => ({ key, href: "/" + key, label: pages[key].title }));
  return (
    <html lang="en-US" className={sans.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen font-sans antialiased">
        <Header name={site.name} categories={categories} important={important} />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mt-10 border-t border-line py-8 text-center text-sm text-muted" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about">About</Link><Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link><Link href="/disclaimer">Disclaimer</Link>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} {site.name}. For information only, not financial advice.</p>
        </footer>
      </body>
    </html>
  );
}