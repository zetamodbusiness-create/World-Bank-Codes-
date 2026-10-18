import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getCategories, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const revalidate = 3600;

function SectionHead({ title, href }) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-2 border-ink pt-2">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {href && <Link href={href} className="text-sm font-semibold text-brand">See all</Link>}
    </div>
  );
}

export default async function Home() {
  const [cats, posts] = await Promise.all([getCategories(), getPosts()]);
  const name = (slug) => cats.find((c) => c.slug === slug)?.name;
  const [lead, ...rest] = posts;
  const secondary = rest.slice(0, 2);
  const latest = rest.slice(2, 8);
  const top = cats.filter((c) => !c.parent);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url,
    potentialAction: { "@type": "SearchAction", target: site.url + "/search", "query-input": "required name=search_term_string" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="sr-only">{site.name}: {site.tagline}</h1>
      {lead && (
        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2"><PostCard post={lead} categoryName={name(lead.category)} variant="lead" priority /></div>
          <div className="space-y-6 lg:border-l lg:border-line lg:pl-8">
            {secondary.map((p) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} variant="grid" />)}
          </div>
        </section>
      )}
      {latest.length > 0 && (
        <section className="mt-12"><SectionHead title="Latest guides" />
          <div className="max-w-3xl">{latest.map((p) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} />)}</div>
        </section>
      )}
      {top.map((c) => {
        const list = posts.filter((p) => p.category === c.slug || cats.find((x) => x.slug === p.category)?.parent === c.slug).slice(0, 3);
        if (!list.length) return null;
        return (
          <section key={c.slug} className="mt-12"><SectionHead title={c.name} href={"/category/" + c.slug} />
            <div className="max-w-3xl">{list.map((p) => <PostCard key={p.slug} post={p} categoryName={name(p.category)} />)}</div>
          </section>
        );
      })}
    </>
  );
}
