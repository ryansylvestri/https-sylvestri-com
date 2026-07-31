type CloudflareStreamPlayerProps = {
  customerCode: string;
  title: string;
  videoId: string;
};

export function CloudflareStreamPlayer({
  customerCode,
  title,
  videoId,
}: CloudflareStreamPlayerProps) {
  const source = `https://customer-${encodeURIComponent(customerCode)}.cloudflarestream.com/${encodeURIComponent(videoId)}/iframe?preload=metadata`;

  return (
    <div className="aspect-video overflow-hidden border border-[rgba(20,32,51,0.18)] bg-brand-ink shadow-[0_28px_70px_rgba(20,32,51,0.16)]">
      <iframe
        src={source}
        title={title}
        loading="lazy"
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
