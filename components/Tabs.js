"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({ items }) {
  const path = usePathname();
  return (
    <nav aria-label="Sections" className="sticky top-0 z-30 border-y border-line bg-paper" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <ul className="no-scrollbar mx-auto flex max-w-5xl gap-6 overflow-x-auto px-4">
        {items.map((i) => {
          const active = i.href === "/" ? path === "/" : path === i.href || path.startsWith(i.href + "/");
          return (
            <li key={i.href} className="shrink-0">
              <Link href={i.href} aria-current={active ? "page" : undefined}
                className={"block border-b-2 py-3 text-sm font-semibold " + (active ? "border-brand text-ink" : "border-transparent text-muted")}>
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}