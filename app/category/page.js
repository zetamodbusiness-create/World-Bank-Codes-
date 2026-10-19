import Link from "next/link";
import { getCategories, getPosts } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Topics", description: "Browse every topic: routing numbers, SWIFT codes, IBAN and country codes.", alternates: { canonical: "/category" } };

export default async function Topics() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const top = cats.filter((c) => !c.parent);
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Topics</h1>
      <p className="mt-2 text-muted">Pick a topic to see all of its guides.</p>
      <div className="post-grid mt-8">
        {top.map((c) => {
          const subs = cats.filter((s) => s.parent === c.slug);
          const count = posts.filter((p) => p.category === c.slug || subs.some((s) => s.slug === p.category)).length;
          return (
            <div key={c.slug} className="card p-5">
              <Link href={"/category/" + c.slug} className="block flex-1">
                <h2 className="text-lg font-semibold">{c.name} <span className="text-sm font-normal text-muted">({count})</span></h2>
                <p className="mt-1 text-sm text-muted">{c.description}</p>
              </Link>
              {subs.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="chip">{s.name}</Link>)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}