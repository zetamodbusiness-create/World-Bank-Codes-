// Plain <img> on purpose: images come from imgbb, so no Vercel image optimisation quota is used.
// Without an image, a typographic block shows the post's key code instead.
export default function PostImage({ image, label, ratio = "16 / 9", priority = false, className = "" }) {
  if (!image) {
    return (
      <div aria-hidden="true" className={"flex items-end overflow-hidden bg-ink p-3 text-paper " + className} style={{ aspectRatio: ratio }}>
        <span className="break-all font-mono font-semibold opacity-90" style={{ fontSize: "clamp(0.9rem, 4vw, 1.6rem)" }}>{label}</span>
      </div>
    );
  }
  return (
    <img src={image.url} alt={image.alt || ""} width={image.width} height={image.height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"
      className={"h-auto w-full bg-surface object-cover " + className} style={{ aspectRatio: image.width + " / " + image.height }} />
  );
}
