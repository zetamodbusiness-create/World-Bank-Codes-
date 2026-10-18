import { site } from "@/lib/site";
import { getPosts, getCategories } from "@/lib/data";
import { pages } from "@/lib/pages";

export default async function sitemap() {
  const [posts, cats] = await Promise.all([getPosts(), getCategories()]);
  return [
    { url: site.url + "/", changeFrequency: "daily", priority: 1 },
    { url: site.url + "/category", changeFrequency: "weekly", priority: 0.6 },
    ...cats.map((c) => ({ url: site.url + "/category/" + c.slug, changeFrequency: "weekly", priority: 0.7 })),
    ...posts.map((p) => ({ url: site.url + "/blog/" + p.slug, lastModified: p.updated, changeFrequency: "monthly", priority: 0.8 })),
    ...Object.keys(pages).map((k) => ({ url: site.url + "/" + k, changeFrequency: "yearly", priority: 0.3 }))
  ];
}
