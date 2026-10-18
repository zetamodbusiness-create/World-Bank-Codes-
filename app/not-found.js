import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page may have moved. Try searching for the guide you need.</p>
      <Link href="/search" className="mt-5 inline-block rounded-sm bg-ink px-5 py-2 font-semibold text-paper">Search guides</Link>
    </div>
  );
}
