// Plain <img> on purpose: images come from imgbb, so no Vercel image optimisation quota is used.
export default function PostImage({ image, priority = false, className = "" }) {
  if (!image) return <div className={"bg-brandsoft " + className} aria-hidden="true" style={{ aspectRatio: "16 / 9" }} />;
  return (
    <img src={image.url} alt={image.alt || ""} width={image.width} height={image.height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"
      className={"w-full h-auto bg-brandsoft " + className} style={{ aspectRatio: image.width + " / " + image.height }} />
  );
}
