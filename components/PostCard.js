import Link from "next/link";
import PostImage from "./PostImage";
import { fmtDate } from "@/lib/site";

function Meta({ post, categoryName }) {
  return (
    <p className="text-sm text-muted">
      {categoryName && <span className="font-semibold text-brand">{categoryName}</span>}
      {categoryName && " · "}{fmtDate(post.updated)}
    </p>
  );
}

export default function PostCard({ post, categoryName, variant = "row", priority = false }) {
  const label = post.codes?.[0]?.value || "";
  const href = "/blog/" + post.slug;
  if (variant === "lead") {
    return (
      <article>
        <Link href={href} className="block"><PostImage image={post.image} label={label} priority={priority} ratio="16 / 9" /></Link>
        <div className="mt-4"><Meta post={post} categoryName={categoryName} /></div>
        <h2 className="mt-1 font-serif text-3xl font-bold leading-tight sm:text-4xl"><Link href={href}>{post.title}</Link></h2>
        <p className="mt-2 max-w-2xl text-lg text-muted">{post.excerpt}</p>
      </article>
    );
  }
  if (variant === "grid") {
    return (
      <article>
        <Link href={href} className="block"><PostImage image={post.image} label={label} ratio="3 / 2" /></Link>
        <div className="mt-3"><Meta post={post} categoryName={categoryName} /></div>
        <h3 className="mt-1 font-serif text-xl font-bold leading-snug"><Link href={href}>{post.title}</Link></h3>
        <p className="mt-1 text-muted">{post.excerpt}</p>
      </article>
    );
  }
  return (
    <article className="flex gap-4 border-b border-line py-4 first:pt-0">
      <div className="min-w-0 flex-1">
        <Meta post={post} categoryName={categoryName} />
        <h3 className="mt-1 font-serif text-lg font-bold leading-snug"><Link href={href}>{post.title}</Link></h3>
      </div>
      <Link href={href} className="block w-24 shrink-0 self-start sm:w-32" tabIndex={-1} aria-hidden="true">
        <PostImage image={post.image} label={label} ratio="4 / 3" />
      </Link>
    </article>
  );
}
