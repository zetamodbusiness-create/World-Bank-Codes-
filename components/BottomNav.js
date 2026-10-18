"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", d: "M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { href: "/category", label: "Topics", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { href: "/search", label: "Search", d: "M11 4a7 7 0 105 12l4 4 1.5-1.5-4-4A7 7 0 0011 4z" }
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <ul className="mx-auto flex max-w-md">
        {items.map((i) => {
          const active = i.href === "/" ? path === "/" : path.startsWith(i.href);
          return (
            <li key={i.href} className="flex-1">
              <Link href={i.href} aria-current={active ? "page" : undefined} className="flex flex-col items-center gap-1 py-2 text-xs font-medium">
                <span className={"flex h-7 w-14 items-center justify-center rounded-full " + (active ? "bg-brandsoft text-brand" : "text-muted")}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={i.d} /></svg>
                </span>
                <span className={active ? "text-ink" : "text-muted"}>{i.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
