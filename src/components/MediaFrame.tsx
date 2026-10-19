import type { MediaItem } from '../data/projects';
import { asset } from '../data/art';

/** Renders one gallery item. Empty video sources show a labelled slot instead. */
export default function MediaFrame({ item, className = '' }: { item: MediaItem; className?: string }) {
  if (item.type === 'image') {
    return <img src={asset(item.src)} alt={item.alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }
  if (item.type === 'video') {
    if (!item.src) {
      return (
        <div className={`relative h-full w-full ${className}`}>
          {item.poster && <img src={asset(item.poster)} alt="" className="h-full w-full object-cover opacity-50" />}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/40 bg-night/60" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M7 4v16l13-8z" fill="currentColor" /></svg>
            </span>
            <span className="label text-paper/80">Gameplay video slot</span>
            <span className="max-w-xs text-sm text-paper/60">Add a video file path to this item in projects.ts</span>
          </div>
        </div>
      );
    }
    return <video src={asset(item.src)} poster={asset(item.poster)} controls playsInline preload="metadata" className={`h-full w-full bg-black object-cover ${className}`} aria-label={item.alt} />;
  }
  return (
    <iframe
      src={item.url}
      title={item.title}
      className={`h-full w-full ${className}`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
}
