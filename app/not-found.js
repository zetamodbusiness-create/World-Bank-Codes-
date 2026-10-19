import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page may have moved. Try searching for the guide you need.</p>
      <Link href="/search" className="btn mt-6">Search guides</Link>
    </div>
  );
}