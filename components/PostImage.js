// Plain <img> on purpose: images come from imgbb, so no Vercel image optimisation quota is used.
const PALETTE = [["#4f46e5", "#7c3aed"], ["#0d9488", "#22c55e"], ["#e11d48", "#f97316"], ["#0284c7", "#14b8a6"], ["#7c3aed", "#ec4899"], ["#b45309", "#f59e0b"]];

export function gradientFor(key = "") {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const [a, b] = PALETTE[h % PALETTE.length];
  return "linear-gradient(135deg, " + a + ", " + b + ")";
}

export default function PostImage({ image, label, category = "", badge, ratio = "16 / 9", priority = false }) {
  if (!image) {
    return (
      <div className="cover" aria-hidden="true" style={{ aspectRatio: ratio, background: gradientFor(category) }}>
        {badge && <span className="badge">{badge}</span>}
        <svg className="cover-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" /></svg>
        <span className="cover-code">{label}</span>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden">
      {badge && <span className="badge">{badge}</span>}
      <img src={image.url} alt={image.alt || ""} width={image.width} height={image.height}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"
        className="h-auto w-full object-cover" style={{ aspectRatio: image.width + " / " + image.height }} />
    </div>
  );
}