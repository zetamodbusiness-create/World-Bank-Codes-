import Link from "next/link";
import { getCategories, getPosts } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Topics", description: "Browse every topic: routing numbers, SWIFT codes, IBAN and country codes.", alternates: { canonical: "/category" } };

export default async function Topics() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const top = cats.filter((c) => !c.parent);
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">Topics</h1>
      <div className="mt-5 space-y-3">
        {top.map((c) => {
          const subs = cats.filter((s) => s.parent === c.slug);
          const count = posts.filter((p) => p.category === c.slug || subs.some((s) => s.slug === p.category)).length;
          return (
            <div key={c.slug} className="rounded-2xl border border-line bg-surface p-4">
              <Link href={"/category/" + c.slug} className="block">
                <p className="font-semibold">{c.name} <span className="text-sm font-normal text-muted">({count})</span></p>
                <p className="mt-1 text-sm text-muted">{c.description}</p>
              </Link>
              {subs.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="rounded-full bg-brandsoft px-3 py-1 text-sm text-brand">{s.name}</Link>)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
