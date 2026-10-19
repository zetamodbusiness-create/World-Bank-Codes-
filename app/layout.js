import "./globals.css";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import { site } from "@/lib/site";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={sans.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen font-sans antialiased">
        <Header name={site.name} />
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