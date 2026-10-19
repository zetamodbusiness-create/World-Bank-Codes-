import { notFound } from "next/navigation";
import Link from "next/link";
import PostImage from "@/components/PostImage";
import CodeCard from "@/components/CodeCard";
import PostCard from "@/components/PostCard";
import { getPost, getPosts, getCategory, getCategoryPath, getRelated, getCategories } from "@/lib/data";
import { site, fmtDate } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }) {
  const p = await getPost(params.slug);
  if (!p) return {};
  const url = "/blog/" + p.slug;
  return {
    title: p.seoTitle || p.title, description: p.seoDescription || p.excerpt, alternates: { canonical: url },
    openGraph: { title: p.seoTitle || p.title, description: p.seoDescription || p.excerpt, url, type: "article", modifiedTime: p.updated, publishedTime: p.date, images: p.image ? [p.image.url] : undefined },
    twitter: { card: "summary_large_image" }
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const cat = await getCategory(post.category);
  const path = await getCategoryPath(cat);
  const related = await getRelated(post);
  const cats = await getCategories();
  const crumbs = [{ name: "Home", url: site.url + "/" }, ...path.map((c) => ({ name: c.name, url: site.url + "/category/" + c.slug })), { name: post.title, url: site.url + "/blog/" + post.slug }];
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: post.date, dateModified: post.updated, image: post.image ? [post.image.url] : undefined, mainEntityOfPage: site.url + "/blog/" + post.slug, publisher: { "@type": "Organization", name: site.name } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })) }
  ];
  if (post.faq?.length) jsonLd.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href={"/category/" + cat.slug} className="pill mb-6">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        {cat.name}
      </Link>
      <div className="soft overflow-hidden rounded-3xl"><PostImage image={post.image} label={post.codes?.[0]?.value} category={post.category} priority /></div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span className="tag">{cat.name}</span><span aria-hidden="true">·</span>
        <span>Last checked {fmtDate(post.updated)}</span><span aria-hidden="true">·</span><span>{post.readMins} min read</span>
      </div>
      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-lg text-muted">{post.excerpt}</p>
      {post.codes?.length > 0 && <div className="mt-6 space-y-3">{post.codes.map((c) => <CodeCard key={c.label} {...c} />)}</div>}
      <div className="article mt-8 border-t border-line pt-8" dangerouslySetInnerHTML={{ __html: post.body }} />
      {post.faq?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-bold">Frequently asked questions</h2>
          <div className="space-y-3">
            {post.faq.map((f) => (
              <details key={f.q} className="soft rounded-2xl border border-line bg-surface p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      {post.sources?.length > 0 && (
        <section className="mt-10 rounded-2xl bg-brandsoft p-5 text-sm">
          <h2 className="font-semibold">Sources</h2>
          <ul className="mt-2 space-y-1">{post.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank" className="text-brand underline underline-offset-2">{s.label}</a></li>)}</ul>
        </section>
      )}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Keep reading</h2>
        <div className="post-grid">{related.map((p) => <PostCard key={p.slug} post={p} categoryName={cats.find((c) => c.slug === p.category)?.name} />)}</div>
      </section>
    </article>
  );
}