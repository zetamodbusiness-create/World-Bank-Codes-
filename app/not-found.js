import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page may have moved. Try searching for the guide you need.</p>
      <Link href="/search" className="mt-5 inline-block rounded-full bg-brand px-5 py-2 font-semibold text-brandink">Search guides</Link>
    </div>
  );
}
