import SearchBox from "@/components/SearchBox";
import { getPosts, getCategories } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Search", robots: { index: false, follow: true } };

export default async function SearchPage() {
  const [posts, cats] = await Promise.all([getPosts(), getCategories()]);
  const items = posts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, categoryName: cats.find((c) => c.slug === p.category)?.name || "" }));
  return (
    <div>
      <h1 className="mb-4 font-serif text-3xl font-bold">Search</h1>
      <SearchBox items={items} />
    </div>
  );
}
