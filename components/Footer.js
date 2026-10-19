import Link from "next/link";

export default function Footer({ name, description, categories = [], important = [] }) {
  const top = categories.filter((c) => !c.parent);
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-5xl px-4">
        <div className="footer-shell">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" /></svg>
                </span>
                {name}
              </Link>
              <p className="footer-about">{description}</p>
              <span className="footer-trust">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9.5 12l2 2 3.5-4" /></svg>
                Sources and dates on every guide
              </span>
            </div>
            <nav aria-label="Topics">
              <p className="footer-title">Topics</p>
              <ul className="footer-links">
                {top.map((c) => <li key={c.slug}><Link href={"/category/" + c.slug}>{c.name}</Link></li>)}
                <li><Link href="/category">All topics</Link></li>
              </ul>
            </nav>
            <nav aria-label="Important">
              <p className="footer-title">Important</p>
              <ul className="footer-links">
                {important.map((i) => <li key={i.href}><Link href={i.href}>{i.label}</Link></li>)}
              </ul>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {name}. For information only, not financial advice.</p>
            <a href="#" className="to-top">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}