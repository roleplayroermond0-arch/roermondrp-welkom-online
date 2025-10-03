import { useEffect, useState } from "react";

function extractUrlFromCssVar(value: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("url(")) {
    const match = trimmed.match(/^url\((.*)\)$/i);
    if (!match) return null;
    let inner = match[1].trim();
    if ((inner.startsWith("'") && inner.endsWith("'")) || (inner.startsWith('"') && inner.endsWith('"'))) {
      inner = inner.slice(1, -1);
    }
    return inner || null;
  }
  return trimmed;
}

const BackgroundVideo = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const raw = styles.getPropertyValue("--app-bg-video");
    const url = extractUrlFromCssVar(raw);
    if (url) setVideoSrc(url);
  }, []);

  if (!videoSrc) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -3,
        filter: "blur(6px) saturate(1.05)",
        transform: "scale(1.04)",
        pointerEvents: "none",
      }}
      src={videoSrc}
    />
  );
};

export default BackgroundVideo;




