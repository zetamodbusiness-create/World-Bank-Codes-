"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function SearchBox({ items }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((i) => (i.title + " " + i.excerpt + " " + i.categoryName).toLowerCase().includes(t));
  }, [q, items]);
  return (
    <div>
      <label htmlFor="q" className="sr-only">Search guides</label>
      <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} autoFocus
        placeholder="Search routing numbers, SWIFT codes, IBAN…"
        className="soft w-full rounded-full border border-line bg-surface px-6 py-3.5 text-base outline-none focus:border-brand" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {results.map((r) => (
          <li key={r.slug}>
            <Link href={"/blog/" + r.slug} className="card h-full p-5">
              <span className="tag self-start text-xs">{r.categoryName}</span>
              <h3 className="mt-3 font-semibold leading-snug">{r.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{r.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
      {results.length === 0 && <p className="py-12 text-center text-muted">No guides match “{q}”. Try a shorter search, such as “SWIFT”.</p>}
    </div>
  );
}