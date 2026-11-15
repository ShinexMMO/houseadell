// A loose, brushed caricature that only hints at the Harmandir Sahib
// (Golden Temple, Amritsar): a big gilded onion dome, two little kiosks,
// a roofline, a few arches and the reflection in the sarovar.
// Used respectfully as a quiet symbol of Sophia's Punjabi roots in the
// "Ein Stück Welt" story, never as menu decoration.
//
// Each stroke is a filled, tapered shape (thin attack, full belly, long
// release) so it reads like a brush mark, similar to the Bilal font.

const GOLD = "#a8771f";
const WASH = "#e6be5a";

// Catmull-Rom through the points, sampled evenly.
function sample(points, steps = 48) {
  const out = [];
  const p = [points[0], ...points, points[points.length - 1]];
  const segs = points.length - 1;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * segs;
    const k = Math.min(Math.floor(t), segs - 1);
    const u = t - k;
    const [p0, p1, p2, p3] = [p[k], p[k + 1], p[k + 2], p[k + 3]];
    const f = (a, b, c, d) =>
      0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}

// Pressure profile: quick attack, full belly, long tapering release.
const pressure = (t) => (t < 0.18 ? 0.25 + 0.75 * (t / 0.18) : 1 - 0.88 * ((t - 0.18) / 0.82) ** 1.6);

function brushPath(points, width) {
  const pts = sample(points);
  const left = [];
  const right = [];
  pts.forEach(([x, y], i) => {
    const [ax, ay] = pts[Math.max(0, i - 1)];
    const [bx, by] = pts[Math.min(pts.length - 1, i + 1)];
    let nx = -(by - ay);
    let ny = bx - ax;
    const len = Math.hypot(nx, ny) || 1;
    nx /= len;
    ny /= len;
    const w = (width * pressure(i / (pts.length - 1))) / 2;
    left.push(`${(x + nx * w).toFixed(2)} ${(y + ny * w).toFixed(2)}`);
    right.push(`${(x - nx * w).toFixed(2)} ${(y - ny * w).toFixed(2)}`);
  });
  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

const Stroke = ({ p, w = 3, o = 1 }) => <path d={brushPath(p, w)} opacity={o} />;

function Temple() {
  return (
    <g fill={GOLD}>
      {/* big onion dome, a little lopsided on purpose */}
      <Stroke p={[[80, 79], [71, 64], [75, 47], [89, 35], [97, 27], [100, 19]]} w={5.2} />
      <Stroke p={[[100, 21], [105, 30], [115, 38], [127, 50], [129, 64], [121, 79]]} w={5.6} />
      <Stroke p={[[100, 20], [101.5, 13], [98.5, 9], [102, 5]]} w={2} />
      <circle cx="102.4" cy="3.6" r="2" />
      {/* lotus ribs, quick and thin */}
      <Stroke p={[[99, 26], [93, 46], [95, 72]]} w={1.6} o={0.8} />
      <Stroke p={[[102, 27], [111, 47], [109, 73]]} w={1.6} o={0.8} />
      {/* drum and roofline */}
      <Stroke p={[[83, 81], [100, 83.5], [119, 80]]} w={3.4} />
      <Stroke p={[[46, 93], [80, 90.5], [120, 91.5], [158, 93.5]]} w={5} />
      {/* little kiosks */}
      <Stroke p={[[55, 92], [53, 84], [58, 76], [63, 70]]} w={3.4} />
      <Stroke p={[[63, 70], [67.5, 77], [69, 85], [67, 92]]} w={3.2} />
      <Stroke p={[[63, 70], [63.6, 63.5]]} w={1.4} />
      <Stroke p={[[134, 93], [133, 84], [138, 77], [141.5, 71]]} w={3.4} />
      <Stroke p={[[141.5, 71], [146.5, 78], [148, 86], [146, 93.5]]} w={3.2} />
      <Stroke p={[[141.5, 71], [142, 64.5]]} w={1.4} />
      {/* walls, only hinted */}
      <Stroke p={[[51, 96], [50, 108], [52.5, 120]]} w={3} />
      <Stroke p={[[153, 97], [154.5, 109], [152, 119]]} w={3} />
      {/* a few arches dashed off */}
      <Stroke p={[[66, 120], [65.5, 110], [70, 103.5], [74.5, 110], [74, 119]]} w={2.6} />
      <Stroke p={[[92, 120], [91.5, 110], [97, 102.5], [102.5, 110], [102, 119.5]]} w={2.8} />
      <Stroke p={[[122, 119.5], [121.5, 111], [126, 104.5], [130.5, 111], [130, 119]]} w={2.6} />
      {/* causeway with three lamps */}
      <Stroke p={[[12, 115], [30, 113.6], [47, 114.4]]} w={2.6} />
      <circle cx="19" cy="108.6" r="1.7" />
      <circle cx="29" cy="107.8" r="1.7" />
      <circle cx="39" cy="108.4" r="1.7" />
    </g>
  );
}

export default function GoldenTemple({ className = "" }) {
  return (
    <figure className={`golden-temple ${className}`}>
      <svg viewBox="0 -2 204 158" role="img" aria-labelledby="golden-temple-title">
        <title id="golden-temple-title">
          Mit dem Pinsel angedeuteter Goldener Tempel von Amritsar, der sich im Wasser spiegelt
        </title>
        <defs>
          {/* uneven watercolour wash */}
          <filter id="gt-wash" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="11" />
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          {/* slight wobble plus dry-brush fibres */}
          <filter id="gt-brush" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="wobble" />
            <feDisplacementMap in="SourceGraphic" in2="wobble" scale="1.8" result="wobbly" />
            <feTurbulence type="fractalNoise" baseFrequency="0.5 0.14" numOctaves="2" seed="9" result="grain" />
            <feColorMatrix
              in="grain"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.15 1.4"
              result="dry"
            />
            <feComposite in="wobbly" in2="dry" operator="in" />
          </filter>
        </defs>

        {/* gold wash, slightly off-register like a quick painting */}
        <g filter="url(#gt-wash)" fill={WASH}>
          <path d="M78 80 C66 58 84 36 100 22 C118 38 136 58 122 82 Z" opacity="0.55" />
          <path d="M50 94 C80 88 126 89 156 95 L154 120 C120 123 84 123 52 121 Z" opacity="0.32" />
          <ellipse cx="63" cy="83" rx="7" ry="10" opacity="0.4" />
          <ellipse cx="141" cy="84" rx="7" ry="10" opacity="0.4" />
        </g>

        <g filter="url(#gt-brush)">
          <Temple />
          {/* waterline */}
          <g fill={GOLD}>
            <Stroke p={[[4, 124], [50, 121.5], [104, 125], [160, 121.6], [200, 123.6]]} w={4} />
          </g>
          {/* reflection: a few faint dashes and a dome echo */}
          <g fill={GOLD}>
            <Stroke p={[[62, 132], [100, 133.4], [140, 131.6]]} w={2.6} o={0.45} />
            <Stroke p={[[80, 140], [102, 141], [124, 139.6]]} w={2} o={0.32} />
            <Stroke p={[[90, 147.5], [101, 151], [112, 147.5]]} w={1.8} o={0.25} />
            <Stroke p={[[24, 130], [40, 129.4]]} w={1.6} o={0.3} />
          </g>
        </g>
      </svg>
      <figcaption>Harmandir Sahib, Amritsar</figcaption>
    </figure>
  );
}
