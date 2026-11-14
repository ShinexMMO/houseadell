// Reuse the original brand artwork without recoloring or redrawing its leaves.
export default function Botanical({ side = "left", className = "" }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox={side === "right" ? "1020 20 380 590" : "0 80 360 540"}
      aria-hidden="true"
      focusable="false"
    >
      <image href="/assets/logo.webp" width="1400" height="1046" />
    </svg>
  );
}
