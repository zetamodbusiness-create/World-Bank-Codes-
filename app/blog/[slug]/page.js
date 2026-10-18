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
      <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap gap-x-2 text-sm font-semibold">
        {path.map((c, i) => (<span key={c.slug} className="text-brand">{i > 0 && <span className="text-muted">/ </span>}<Link href={"/category/" + c.slug}>{c.name}</Link></span>))}
      </nav>
      <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-3 font-serif text-xl italic text-muted">{post.excerpt}</p>
      <p className="mt-4 border-y border-line py-2 text-sm text-muted">Last checked {fmtDate(post.updated)} · {post.readMins} min read</p>
      <div className="mt-5"><PostImage image={post.image} label={post.codes?.[0]?.value} priority /></div>
      {post.codes?.length > 0 && <div className="mt-6 space-y-3">{post.codes.map((c) => <CodeCard key={c.label} {...c} />)}</div>}
      <div className="article mt-8" dangerouslySetInnerHTML={{ __html: post.body }} />
      {post.faq?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 border-t-2 border-ink pt-2 font-serif text-2xl font-bold">Frequently asked questions</h2>
          {post.faq.map((f) => (
            <details key={f.q} className="border-b border-line py-3">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </section>
      )}
      {post.sources?.length > 0 && (
        <section className="mt-10 bg-surface p-4 text-sm">
          <h2 className="font-semibold">Sources</h2>
          <ul className="mt-2 space-y-1">{post.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank" className="text-brand underline underline-offset-2">{s.label}</a></li>)}</ul>
        </section>
      )}
      <section className="mt-12">
        <h2 className="mb-4 border-t-2 border-ink pt-2 font-serif text-2xl font-bold">Keep reading</h2>
        {related.map((p) => <PostCard key={p.slug} post={p} categoryName={cats.find((c) => c.slug === p.category)?.name} />)}
      </section>
    </article>
  );
}
