"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PATHS = {
  home: "M3 11.5L12 4l9 7.5M5.5 10v9.5h4.5v-5h4v5h4.5V10",
  folder: "M3 7.5A2.5 2.5 0 015.5 5H10l2 2.5h6.5A2.5 2.5 0 0121 10v7.5a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 17.5z",
  about: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01",
  contact: "M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zM3.5 7.5l8.5 6 8.5-6",
  privacy: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9.5 12l2 2 3.5-4",
  disclaimer: "M6 3h8l4 4v14H6zM14 3v4h4M12 11v4M12 17.5h.01",
  chev: "M9 6l6 6-6 6"
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] || PATHS.disclaimer} />
    </svg>
  );
}

function MenuLines() {
  return <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>;
}

export default function Header({ name, categories = [], important = [] }) {
  const path = usePathname();
  const bar = useRef(null);
  const closeRef = useRef(null);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState({});

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setDark(t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar.current) bar.current.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    const m = path.match(/^\/category\/([^/]+)/);
    if (m) {
      const next = {};
      let c = categories.find((x) => x.slug === m[1]);
      while (c && c.parent) { next[c.parent] = true; c = categories.find((x) => x.slug === c.parent); }
      setExp((e) => ({ ...e, ...next }));
    }
  }, [path, categories]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    if (open) setTimeout(() => closeRef.current && closeRef.current.focus(), 50);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch (e) {}
  }

  function renderCat(c, depth) {
    const subs = categories.filter((x) => x.parent === c.slug);
    const href = "/category/" + c.slug;
    const active = path === href;
    const isOpen = !!exp[c.slug];
    return (
      <li key={c.slug}>
        <div className={"menu-row" + (active ? " active" : "")}>
          <Link href={href} className="menu-link" aria-current={active ? "page" : undefined}>
            {depth === 0 && <span className="menu-ico"><Icon name="folder" /></span>}
            <span>{c.name}</span>
          </Link>
          {subs.length > 0 && (
            <button className={"menu-chev" + (isOpen ? " open" : "")} aria-expanded={isOpen} aria-label={"Toggle " + c.name}
              onClick={() => setExp((e) => ({ ...e, [c.slug]: !e[c.slug] }))}>
              <Icon name="chev" size={16} />
            </button>
          )}
        </div>
        {subs.length > 0 && isOpen && <ul className="menu-sub">{subs.map((s) => renderCat(s, depth + 1))}</ul>}
      </li>
    );
  }

  const top = categories.filter((c) => !c.parent);

  return (
    <>
      <div ref={bar} className="scroll-bar" aria-hidden="true" />
      <header className="site-header">
        <div className="mx-auto max-w-5xl px-4">
          <div className="header-shell">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" /></svg>
              </span>
              {name}
            </Link>
            <div className="header-actions">
              <Link href="/search" className="icon-btn" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              </Link>
              <button onClick={toggleTheme} className="icon-btn" aria-label="Switch theme" title="Switch theme">
                {dark ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
                )}
              </button>
              <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="site-menu">
                <MenuLines />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={"menu-overlay" + (open ? " open" : "")} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside id="site-menu" className={"menu-drawer" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open}>
        <div className="menu-head">
          <span className="brand">{name}</span>
          <button ref={closeRef} className="menu-btn open" onClick={() => setOpen(false)} aria-label="Close menu">
            <MenuLines />
          </button>
        </div>
        <nav className="menu-body" aria-label="Site menu">
          <p className="menu-label">Menu</p>
          <ul className="menu-list">
            <li>
              <div className={"menu-row" + (path === "/" ? " active" : "")}>
                <Link href="/" className="menu-link" aria-current={path === "/" ? "page" : undefined}>
                  <span className="menu-ico"><Icon name="home" /></span><span>Home</span>
                </Link>
              </div>
            </li>
            {top.map((c) => renderCat(c, 0))}
          </ul>
          <div className="menu-divider" />
          <p className="menu-label">Important</p>
          <ul className="menu-list menu-important">
            {important.map((i) => {
              const active = path === i.href;
              return (
                <li key={i.href}>
                  <div className={"menu-row" + (active ? " active" : "")}>
                    <Link href={i.href} className="menu-link" aria-current={active ? "page" : undefined}>
                      <span className="menu-ico"><Icon name={i.key} /></span><span>{i.label}</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="menu-foot">© {new Date().getFullYear()} {name}</div>
      </aside>
    </>
  );
}