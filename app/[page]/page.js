import { notFound } from "next/navigation";
import { pages } from "@/lib/pages";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map((page) => ({ page })); }
export function generateMetadata({ params }) {
  const p = pages[params.page];
  return p ? { title: p.title, alternates: { canonical: "/" + params.page } } : {};
}
export default function InfoPage({ params }) {
  const p = pages[params.page];
  if (!p) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h1>
      <div className="article mt-6">{p.text.map((t, i) => <p key={i}>{t}</p>)}</div>
    </div>
  );
}