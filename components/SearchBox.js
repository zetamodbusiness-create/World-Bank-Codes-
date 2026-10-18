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
        className="w-full border-0 border-b-2 border-ink bg-transparent py-3 font-serif text-2xl outline-none placeholder:text-muted focus:border-brand" />
      <ul className="mt-2">
        {results.map((r) => (
          <li key={r.slug} className="border-b border-line py-4">
            <Link href={"/blog/" + r.slug} className="block">
              <p className="text-sm font-semibold text-brand">{r.categoryName}</p>
              <p className="font-serif text-xl font-bold leading-snug">{r.title}</p>
              <p className="mt-1 text-muted">{r.excerpt}</p>
            </Link>
          </li>
        ))}
        {results.length === 0 && <li className="py-10 text-center text-muted">No guides match “{q}”. Try a shorter search, such as “SWIFT”.</li>}
      </ul>
    </div>
  );
}
