import { notFound } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getCategories, getCategory, getCategoryPath, getPostsByCategory } from "@/lib/data";

export const revalidate = 3600;
export async function generateStaticParams() { return (await getCategories()).map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }) {
  const c = await getCategory(params.slug);
  if (!c) return {};
  return { title: c.name, description: c.description, alternates: { canonical: "/category/" + c.slug } };
}

export default async function CategoryPage({ params }) {
  const cat = await getCategory(params.slug);
  if (!cat) notFound();
  const [cats, posts, path] = await Promise.all([getCategories(), getPostsByCategory(cat.slug), getCategoryPath(cat)]);
  const subs = cats.filter((c) => c.parent === cat.slug);
  const name = (s) => cats.find((c) => c.slug === s)?.name;
  const [first, ...rest] = posts;
  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap gap-x-2 text-sm font-semibold text-muted">
        <Link href="/category" className="text-brand">Topics</Link>
        {path.map((c) => <span key={c.slug}>/ {c.slug === cat.slug ? c.name : <Link href={"/category/" + c.slug} className="text-brand">{c.name}</Link>}</span>)}
      </nav>
      <div className="border-t-2 border-ink pt-2">
        <h1 className="font-serif text-4xl font-bold">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted">{cat.description}</p>
        {subs.length > 0 && <p className="mt-3 text-sm">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="mr-4 font-semibold text-brand">{s.name}</Link>)}</p>}
      </div>
      {first && <div className="mt-8"><PostCard post={first} categoryName={name(first.category)} variant="lead" priority /></div>}
      {rest.length > 0 && <div className="mt-8 max-w-3xl">{rest.map((p) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} />)}</div>}
      {posts.length === 0 && <p className="py-12 text-muted">No guides in this topic yet. Check back soon.</p>}
    </div>
  );
}
