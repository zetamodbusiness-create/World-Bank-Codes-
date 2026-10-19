import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getCategories, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function Home() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const name = (slug) => cats.find((c) => c.slug === slug)?.name;
  const top = cats.filter((c) => !c.parent);
  const count = (c) => posts.filter((p) => p.category === c.slug || cats.find((x) => x.slug === p.category)?.parent === c.slug).length;
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url,
    potentialAction: { "@type": "SearchAction", target: site.url + "/search", "query-input": "required name=search_term_string" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <span className="hero-badge">Every guide is checked against official sources</span>
        <h1 className="grad-text mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{site.tagline}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">{site.description}</p>
        <Link href="/search" className="soft mx-auto mt-7 flex max-w-md items-center gap-3 rounded-full border border-line bg-surface px-5 py-3.5 text-left text-muted">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          Search a code or bank
        </Link>
      </section>
      <div className="flex flex-wrap justify-center gap-2 pb-8 pt-4">
        <Link href="/" className="chip chip-active">All<small>{posts.length}</small></Link>
        {top.map((c) => <Link key={c.slug} href={"/category/" + c.slug} className="chip">{c.name}<small>{count(c)}</small></Link>)}
      </div>
      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map((p, i) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} priority={i === 0} />)}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">Guides are coming soon.</p>
      )}
    </>
  );
}