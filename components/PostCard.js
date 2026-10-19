import Link from "next/link";
import PostImage from "./PostImage";
import { fmtDate } from "@/lib/site";

export default function PostCard({ post, categoryName, priority = false }) {
  return (
    <Link href={"/blog/" + post.slug} className="card">
      <PostImage image={post.image} label={post.codes?.[0]?.value} category={post.category} badge={categoryName} priority={priority} />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm text-muted">{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-2 border-t border-dashed border-line pt-3 text-xs text-muted">
          <span>{fmtDate(post.updated)}</span><span aria-hidden="true">·</span><span>{post.readMins} min read</span>
          <span className="card-arrow ml-auto" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}