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
  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap gap-x-2 text-sm text-muted">
        <Link href="/category">Topics</Link>
        {path.map((c) => <span key={c.slug}>/ {c.slug === cat.slug ? c.name : <Link href={"/category/" + c.slug} className="text-brand">{c.name}</Link>}</span>)}
      </nav>
      <h1 className="font-serif text-3xl font-bold">{cat.name}</h1>
      <p className="mt-2 text-muted">{cat.description}</p>
      {subs.length > 0 && <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="shrink-0 rounded-full bg-brandsoft px-4 py-2 text-sm font-medium text-brand">{s.name}</Link>)}</div>}
      <div className="mt-6 space-y-3">
        {posts.map((p) => <PostCard key={p.slug} post={p} categoryName={cats.find((c) => c.slug === p.category)?.name} />)}
        {posts.length === 0 && <p className="py-10 text-center text-muted">No guides in this topic yet. Check back soon.</p>}
      </div>
    </div>
  );
}
