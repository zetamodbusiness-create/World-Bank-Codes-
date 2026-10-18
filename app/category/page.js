import Link from "next/link";
import { getCategories, getPosts } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Topics", description: "Browse every topic: routing numbers, SWIFT codes, IBAN and country codes.", alternates: { canonical: "/category" } };

export default async function Topics() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const top = cats.filter((c) => !c.parent);
  return (
    <div className="max-w-3xl">
      <h1 className="border-t-2 border-ink pt-2 font-serif text-4xl font-bold">Topics</h1>
      {top.map((c) => {
        const subs = cats.filter((s) => s.parent === c.slug);
        const count = posts.filter((p) => p.category === c.slug || subs.some((s) => s.slug === p.category)).length;
        return (
          <div key={c.slug} className="border-b border-line py-5">
            <Link href={"/category/" + c.slug} className="block">
              <p className="font-serif text-2xl font-bold">{c.name} <span className="text-base font-normal text-muted">({count})</span></p>
              <p className="mt-1 text-muted">{c.description}</p>
            </Link>
            {subs.length > 0 && <p className="mt-2 text-sm">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="mr-4 font-semibold text-brand">{s.name}</Link>)}</p>}
          </div>
        );
      })}
    </div>
  );
}
