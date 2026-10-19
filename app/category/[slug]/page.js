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
  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-sm">
        <Link href="/category" className="pill">Topics</Link>
        {path.filter((c) => c.slug !== cat.slug).map((c) => <Link key={c.slug} href={"/category/" + c.slug} className="pill">{c.name}</Link>)}
      </nav>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{cat.name}</h1>
      <p className="mt-2 max-w-2xl text-muted">{cat.description}</p>
      {subs.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{subs.map((s) => <Link key={s.slug} href={"/category/" + s.slug} className="chip">{s.name}</Link>)}</div>}
      <div className="post-grid mt-8">
        {posts.map((p, i) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} priority={i === 0} />)}
      </div>
      {posts.length === 0 && <p className="py-16 text-center text-muted">No guides in this topic yet. Check back soon.</p>}
    </div>
  );
}