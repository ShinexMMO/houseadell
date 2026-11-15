// Hanging marigold garland (genda phool), drawn as SVG in a soft watercolour
// style to sit next to the eucalyptus twigs. Purely decorative.

// Small deterministic PRNG so every render (and SSR/hydration) looks the same.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PALETTES = [
  ["#f6b13f", "#ec8f22", "#c9661a"], // saffron
  ["#f8c552", "#f0a531", "#cf7a1f"], // golden
  ["#f19a3a", "#e2731d", "#b8531a"], // deep orange
];

function Flower({ cx, cy, r, rand, palette, id }) {
  const [light, mid, dark] = palette;
  const rings = [
    { radius: r, count: 16, size: r * 0.42, color: dark },
    { radius: r * 0.72, count: 13, size: r * 0.4, color: mid },
    { radius: r * 0.42, count: 9, size: r * 0.36, color: light },
  ];
  return (
    <g filter={`url(#${id}-rough)`}>
      <circle cx={cx} cy={cy} r={r * 1.02} fill={dark} opacity="0.55" />
      {rings.map((ring, ri) =>
        Array.from({ length: ring.count }, (_, i) => {
          const a = (i / ring.count) * Math.PI * 2 + rand() * 0.5 + ri;
          const d = ring.radius * (0.85 + rand() * 0.2);
          return (
            <ellipse
              key={`${ri}-${i}`}
              cx={cx + Math.cos(a) * d * 0.62}
              cy={cy + Math.sin(a) * d * 0.62}
              rx={ring.size * (0.9 + rand() * 0.3)}
              ry={ring.size * 0.62}
              transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * d * 0.62} ${cy + Math.sin(a) * d * 0.62})`}
              fill={ring.color}
              opacity={0.82 + rand() * 0.18}
            />
          );
        }),
      )}
      <circle cx={cx} cy={cy} r={r * 0.2} fill={dark} opacity="0.75" />
    </g>
  );
}

function Leaf({ x, y, flip, rand }) {
  const s = flip ? -1 : 1;
  const len = 13 + rand() * 4;
  return (
    <path
      d={`M${x} ${y} q${s * len * 0.55} ${-len * 0.35} ${s * len} ${len * 0.15} q${-s * len * 0.5} ${len * 0.35} ${-s * len} ${-len * 0.15}z`}
      fill="#7f9a6a"
      opacity="0.8"
    />
  );
}

export default function Marigold({ count = 7, seed = 1, className = "" }) {
  const rand = rng(seed);
  const id = `marigold-${seed}`;
  const spacing = 34;
  const top = 10;
  const height = top + count * spacing + 30;
  const items = [];
  for (let i = 0; i < count; i++) {
    const cy = top + 18 + i * spacing;
    const cx = 30 + (rand() - 0.5) * 3;
    const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
    if (i > 0 && i % 2 === 0) {
      items.push(<Leaf key={`l${i}a`} x={30} y={cy - 18} flip={false} rand={rand} />);
      items.push(<Leaf key={`l${i}b`} x={30} y={cy - 17} flip rand={rand} />);
    }
    items.push(
      <Flower key={`f${i}`} cx={cx} cy={cy} r={14 + rand() * 2.5} rand={rand} palette={palette} id={id} />,
    );
  }
  const tasselY = top + count * spacing + 4;
  return (
    <svg
      className={`marigold ${className}`}
      viewBox={`0 0 60 ${height}`}
      width="60"
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={`${id}-rough`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
      </defs>
      <line x1="30" y1="0" x2="30" y2={tasselY} stroke="#a77b4f" strokeWidth="1.1" opacity="0.7" />
      {items}
      <path
        d={`M30 ${tasselY} l-4 18 M30 ${tasselY} l0 20 M30 ${tasselY} l4 18`}
        stroke="#c9661a"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

// Small single marigold used as a marker next to Indian-inspired dishes.
export function MarigoldMark({ className = "" }) {
  const petals = Array.from({ length: 12 }, (_, i) => (i / 12) * 360);
  return (
    <svg
      className={`marigold-mark ${className}`}
      viewBox="0 0 20 20"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      {petals.map((deg) => (
        <ellipse key={deg} cx="10" cy="4.6" rx="2.4" ry="4" fill="#ec8f22" transform={`rotate(${deg} 10 10)`} />
      ))}
      {petals.map((deg) => (
        <ellipse key={`i${deg}`} cx="10" cy="6.6" rx="1.7" ry="2.6" fill="#f6b13f" transform={`rotate(${deg + 15} 10 10)`} />
      ))}
      <circle cx="10" cy="10" r="1.8" fill="#c9661a" />
    </svg>
  );
}
