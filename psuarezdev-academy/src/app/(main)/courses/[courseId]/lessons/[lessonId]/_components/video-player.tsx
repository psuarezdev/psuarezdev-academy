'use client';

export default function VideoPlayer({ src }: { src: string; }) {
  return (
    <video
      controls
      className="w-full h-full"
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={src} type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
  );
}