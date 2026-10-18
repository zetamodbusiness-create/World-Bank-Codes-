import Link from "next/link";
import PostImage from "./PostImage";
import { fmtDate } from "@/lib/site";

export default function PostCard({ post, categoryName }) {
  return (
    <Link href={"/blog/" + post.slug} className="flex gap-4 rounded-2xl bg-surface p-3 border border-line active:bg-brandsoft">
      <div className="w-28 shrink-0 overflow-hidden rounded-xl self-start">
        <PostImage image={post.image} className="rounded-xl" />
      </div>
      <div className="min-w-0">
        {categoryName && <p className="text-xs font-medium text-brand mb-1">{categoryName}</p>}
        <h3 className="font-semibold leading-snug">{post.title}</h3>
        <p className="mt-1 text-xs text-muted">{fmtDate(post.updated)} · {post.readMins} min read</p>
      </div>
    </Link>
  );
}
