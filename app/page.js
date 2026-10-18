import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getCategories, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function Home() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const name = (slug) => cats.find((c) => c.slug === slug)?.name;
  const top = cats.filter((c) => !c.parent);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url,
    potentialAction: { "@type": "SearchAction", target: site.url + "/search", "query-input": "required name=search_term_string" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section>
        <h1 className="font-serif text-4xl font-bold leading-tight">{site.tagline}</h1>
        <p className="mt-3 text-muted max-w-xl">{site.description}</p>
        <Link href="/search" className="mt-5 flex items-center justify-between rounded-full border border-line bg-surface px-5 py-3 text-muted">
          <span>Search a code or bank</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 4a7 7 0 105 12l4 4 1.5-1.5-4-4A7 7 0 0011 4z" /></svg>
        </Link>
        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
          {top.map((c) => (
            <Link key={c.slug} href={"/category/" + c.slug} className="shrink-0 rounded-full bg-brandsoft px-4 py-2 text-sm font-medium text-brand">{c.name}</Link>
          ))}
        </div>
      </section>
      <section className="mt-9">
        <h2 className="mb-3 text-xl font-bold">Latest guides</h2>
        <div className="space-y-3">{posts.map((p) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} />)}</div>
      </section>
    </>
  );
}
