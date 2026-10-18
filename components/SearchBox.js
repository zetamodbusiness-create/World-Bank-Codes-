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
        className="w-full rounded-full border border-line bg-surface px-5 py-3 text-base outline-none focus:border-brand" />
      <ul className="mt-4 space-y-3">
        {results.map((r) => (
          <li key={r.slug}>
            <Link href={"/blog/" + r.slug} className="block rounded-2xl border border-line bg-surface p-4 active:bg-brandsoft">
              <p className="text-xs font-medium text-brand">{r.categoryName}</p>
              <p className="font-semibold leading-snug">{r.title}</p>
              <p className="mt-1 text-sm text-muted line-clamp-2">{r.excerpt}</p>
            </Link>
          </li>
        ))}
        {results.length === 0 && <li className="text-muted py-8 text-center">No guides match “{q}”. Try a shorter search, such as “SWIFT”.</li>}
      </ul>
    </div>
  );
}
