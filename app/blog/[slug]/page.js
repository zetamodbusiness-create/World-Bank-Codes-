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
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap gap-x-2 text-sm text-muted">
        <Link href="/">Home</Link>
        {path.map((c) => (<span key={c.slug}>/ <Link href={"/category/" + c.slug} className="text-brand">{c.name}</Link></span>))}
      </nav>
      <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">Last checked {fmtDate(post.updated)} · {post.readMins} min read</p>
      <div className="mt-5 overflow-hidden rounded-2xl"><PostImage image={post.image} priority /></div>
      {post.codes?.length > 0 && <div className="mt-5 space-y-3">{post.codes.map((c) => <CodeCard key={c.label} {...c} />)}</div>}
      <div className="article mt-6" dangerouslySetInnerHTML={{ __html: post.body }} />
      {post.faq?.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold">Frequently asked questions</h2>
          <div className="space-y-2">
            {post.faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-line bg-surface p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      {post.sources?.length > 0 && (
        <section className="mt-8 rounded-2xl bg-brandsoft p-4 text-sm">
          <h2 className="font-semibold">Sources</h2>
          <ul className="mt-2 space-y-1">{post.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank" className="text-brand underline underline-offset-2">{s.label}</a></li>)}</ul>
        </section>
      )}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold">Keep reading</h2>
        <div className="space-y-3">{related.map((p) => <PostCard key={p.slug} post={p} categoryName={cats.find((c) => c.slug === p.category)?.name} />)}</div>
      </section>
    </article>
  );
}
