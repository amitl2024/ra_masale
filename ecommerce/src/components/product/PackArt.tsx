import type { PackArt as Art } from "@/lib/types";

/**
 * Illustrated, vintage-label packaging rendered in SVG.
 * Stands in for real product photography until RA supplies pack shots.
 * Deliberately avoids <defs>/ids so many instances can coexist on a page.
 */

const PAPER = "#F6EFE2";
const INK = "#1E1A17";
const DISPLAY = { fontFamily: "var(--font-display), Georgia, serif" } as const;
const SANS = { fontFamily: "var(--font-sans), system-ui, sans-serif" } as const;
const DEVA = { fontFamily: "var(--font-marathi), serif" } as const;

export type PackView = "pack" | "spice" | "label";

interface Props {
  art: Art;
  name: string;
  marathi?: string;
  seed: string;
  netWt?: string;
  view?: PackView;
  ribbon?: boolean;
  className?: string;
  title?: string;
}

function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Round to 2dp so server and browser render identical attribute strings */
const r2 = (n: number) => Math.round(n * 100) / 100;

function wrap(text: string, max: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function Speckles({
  cx, cy, r, color, seed, count = 26,
}: { cx: number; cy: number; r: number; color: string; seed: string; count?: number }) {
  const rand = rng(seed);
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * r * 0.86;
        const light = rand() > 0.6;
        // fine grain with the occasional coarser fleck, scaled gently with bowl size
        const size = 0.4 + rand() * Math.min(1.6, r / 26) + (rand() > 0.92 ? Math.min(2.2, r / 30) : 0);
        return (
          <circle
            key={i}
            cx={r2(cx + Math.cos(a) * d)}
            cy={r2(cy + Math.sin(a) * d)}
            r={r2(size)}
            fill={light ? "#fff" : color}
            opacity={light ? 0.18 : 0.42}
          />
        );
      })}
    </g>
  );
}

function Bowl({ cx, cy, r, art, seed }: { cx: number; cy: number; r: number; art: Art; seed: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy + r * 0.08} r={r * 1.12} fill="#000" opacity={0.12} />
      <circle cx={cx} cy={cy} r={r * 1.1} fill={art.accent} />
      <circle cx={cx} cy={cy} r={r * 1.1} fill="#000" opacity={0.12} />
      <circle cx={cx} cy={cy} r={r * 1.02} fill={art.accent} />
      <circle cx={cx} cy={cy} r={r * 0.92} fill={art.spice} />
      <circle cx={cx - r * 0.18} cy={cy - r * 0.2} r={r * 0.52} fill="#fff" opacity={0.07} />
      <Speckles cx={cx} cy={cy} r={r * 0.92} color={INK} seed={seed} count={Math.round(Math.min(r * 3.2, 260))} />
    </g>
  );
}

function VegMark({ x, y, s = 11 }: { x: number; y: number; s?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} fill="none" stroke="#2F7A3A" strokeWidth={1.1} rx={1} />
      <circle cx={x + s / 2} cy={y + s / 2} r={s * 0.28} fill="#2F7A3A" />
    </g>
  );
}

function Ornament({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  return (
    <g stroke={color} strokeWidth={0.8}>
      <line x1={x - w / 2} y1={y} x2={x - 6} y2={y} />
      <line x1={x + 6} y1={y} x2={x + w / 2} y2={y} />
      <path d={`M${x} ${y - 3.5} L${x + 3.5} ${y} L${x} ${y + 3.5} L${x - 3.5} ${y} Z`} fill={color} stroke="none" />
    </g>
  );
}

function NameBlock({
  name, marathi, netWt, y, color, sub, max = 13, size = 17,
}: {
  name: string; marathi?: string; netWt?: string; y: number; color: string; sub: string; max?: number; size?: number;
}) {
  const lines = wrap(name, max);
  const longest = Math.max(...lines.map((l) => l.length));
  // Caslon runs wide (~0.55em per glyph), so scale the label type to the available width
  const fs = r2(Math.min(size * 0.86, ((size * max) / Math.max(longest, 1)) * 0.8));
  const lh = r2(fs * 1.02);
  return (
    <g textAnchor="middle">
      {lines.map((l, i) => (
        <text key={i} x={120} y={y + i * lh} fontSize={fs} fontWeight={700} fill={color} style={DISPLAY}>
          {l}
        </text>
      ))}
      {marathi && (
        <text x={120} y={y + lines.length * lh + 3} fontSize={9.5} fill={sub} style={DEVA}>
          {marathi}
        </text>
      )}
      {netWt && (
        <text
          x={120}
          y={y + lines.length * lh + (marathi ? 18 : 6)}
          fontSize={6.2}
          letterSpacing={1.4}
          fill={color}
          opacity={0.7}
          style={SANS}
        >
          {`NET WT. ${netWt.toUpperCase()}`}
        </text>
      )}
    </g>
  );
}

function Pouch({ art, name, marathi, seed, netWt }: Props) {
  const teeth: string[] = [];
  for (let x = 36; x <= 204; x += 6) teeth.push(`${x},22 ${x + 3},18.5`);
  return (
    <g>
      <ellipse cx={120} cy={288} rx={88} ry={7} fill="#000" opacity={0.16} />
      <path d="M38 36 H202 L208 268 Q209 284 193 284 H47 Q31 284 32 268 Z" fill={art.base} />
      <rect x={36} y={22} width={168} height={18} fill={art.base} />
      <polygon points={`36,22 ${teeth.join(" ")} 204,22`} fill={art.base} />
      <rect x={36} y={22} width={168} height={18} fill="#000" opacity={0.16} />
      {[27, 31, 35].map((y) => (
        <line key={y} x1={36} y1={y} x2={204} y2={y} stroke="#000" opacity={0.14} strokeWidth={0.8} />
      ))}
      <circle cx={120} cy={30} r={3.2} fill="#000" opacity={0.35} />
      <rect x={46} y={44} width={9} height={226} rx={4.5} fill="#fff" opacity={0.09} />
      <path d="M186 40 H202 L208 268 Q209 284 193 284 H190 Z" fill="#000" opacity={0.12} />
      <text x={120} y={64} textAnchor="middle" fontSize={15} fontWeight={700} letterSpacing={3} fill={art.accent} style={DISPLAY}>
        RA MASALE
      </text>
      <text x={120} y={75} textAnchor="middle" fontSize={5.6} letterSpacing={2.2} fill={art.accent} opacity={0.85} style={SANS}>
        EST · 1972 · SANGLI
      </text>
      <rect x={52} y={86} width={136} height={164} rx={4} fill={PAPER} />
      <rect x={57} y={91} width={126} height={154} rx={2} fill="none" stroke={art.base} strokeWidth={1} />
      <rect x={60} y={94} width={120} height={148} rx={1} fill="none" stroke={art.base} strokeWidth={0.4} opacity={0.6} />
      <VegMark x={165} y={99} />
      <Bowl cx={120} cy={128} r={22} art={art} seed={seed} />
      <NameBlock name={name} marathi={marathi} netWt={netWt} y={176} color={INK} sub={art.base} />
      <g fill={art.accent}>
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 48 + i * 12;
          return <path key={i} d={`M${x} 266 l4 -4 l4 4 l-4 4 Z`} opacity={0.9} />;
        })}
      </g>
    </g>
  );
}

function Jar({ art, name, marathi, seed, netWt }: Props) {
  const rand = rng(seed + "jar");
  const scallop: string[] = [];
  for (let x = 180; x > 60; x -= 12) scallop.push(`Q${x - 6} 74 ${x - 12} 66`);
  return (
    <g>
      <ellipse cx={120} cy={288} rx={74} ry={7} fill="#000" opacity={0.16} />
      <path d="M58 80 Q58 68 72 68 H168 Q182 68 182 80 V262 Q182 284 160 284 H80 Q58 284 58 262 Z" fill={art.spice} />
      {Array.from({ length: 34 }).map((_, i) => {
        const x = r2(64 + rand() * 112);
        const y = r2(76 + rand() * 202);
        const s = r2(4 + rand() * 9);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={s}
            height={r2(s * 0.75)}
            rx={r2(s / 3)}
            fill={rand() > 0.5 ? "#000" : "#fff"}
            opacity={r2(0.1 + rand() * 0.12)}
            transform={`rotate(${r2(rand() * 90)} ${x} ${y})`}
          />
        );
      })}
      <path d="M58 80 Q58 68 72 68 H168 Q182 68 182 80 V262 Q182 284 160 284 H80 Q58 284 58 262 Z" fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={2} />
      <rect x={66} y={84} width={7} height={186} rx={3.5} fill="#fff" opacity={0.28} />
      <rect x={166} y={84} width={4} height={186} rx={2} fill="#fff" opacity={0.14} />
      {/* cloth cover */}
      <path d={`M60 66 L68 34 Q120 20 172 34 L180 66 ${scallop.join(" ")} Z`} fill={art.accent} />
      <path d={`M60 66 L68 34 Q120 20 172 34 L180 66 ${scallop.join(" ")} Z`} fill="#000" opacity={0.08} />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={74 + i * 13} y1={30} x2={70 + i * 14} y2={64} stroke="#000" opacity={0.08} strokeWidth={4} />
      ))}
      <path d="M64 56 Q120 62 176 56" stroke={art.base} strokeWidth={2.6} fill="none" />
      <circle cx={150} cy={59} r={3} fill={art.base} />
      <path d="M150 59 q-6 10 -2 18 M150 59 q6 10 2 18" stroke={art.base} strokeWidth={1.6} fill="none" />
      {/* label */}
      <rect x={58} y={118} width={124} height={118} fill={PAPER} />
      <rect x={58} y={118} width={124} height={118} fill="#000" opacity={0.03} />
      <rect x={64} y={124} width={112} height={106} fill="none" stroke={art.base} strokeWidth={1} />
      <rect x={67} y={127} width={106} height={100} fill="none" stroke={art.base} strokeWidth={0.4} opacity={0.6} />
      <text x={120} y={144} textAnchor="middle" fontSize={10} fontWeight={700} letterSpacing={2.4} fill={art.base} style={DISPLAY}>
        RA MASALE
      </text>
      <Ornament x={120} y={152} w={60} color={art.base} />
      <VegMark x={160} y={130} s={9} />
      <NameBlock name={name} marathi={marathi} netWt={netWt} y={174} color={INK} sub={art.base} max={12} size={15} />
    </g>
  );
}

function Packet({ art, name, marathi, seed, netWt }: Props) {
  const rand = rng(seed + "pp");
  return (
    <g>
      <ellipse cx={120} cy={288} rx={92} ry={7} fill="#000" opacity={0.16} />
      <rect x={32} y={30} width={176} height={254} rx={6} fill={art.base} />
      <rect x={32} y={30} width={176} height={16} rx={3} fill="#000" opacity={0.16} />
      <rect x={32} y={268} width={176} height={16} rx={3} fill="#000" opacity={0.16} />
      {[34, 38, 42, 272, 276, 280].map((y) => (
        <line key={y} x1={32} y1={y} x2={208} y2={y} stroke="#000" opacity={0.12} strokeWidth={0.8} />
      ))}
      <rect x={42} y={52} width={8} height={210} rx={4} fill="#fff" opacity={0.1} />
      <text x={120} y={74} textAnchor="middle" fontSize={15} fontWeight={700} letterSpacing={3} fill={PAPER} style={DISPLAY}>
        RA MASALE
      </text>
      <text x={120} y={84} textAnchor="middle" fontSize={5.6} letterSpacing={2.2} fill={PAPER} opacity={0.8} style={SANS}>
        EST · 1972 · SANGLI
      </text>
      {/* mehrab window */}
      <path d="M68 196 V136 Q68 102 120 92 Q172 102 172 136 V196 Z" fill={art.spice} />
      {Array.from({ length: 5 }).map((_, i) => {
        const cx = r2(84 + i * 18 + rand() * 6);
        const cy = r2(128 + (i % 2) * 26 + rand() * 10);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={30} fill={art.spice} stroke="#000" strokeOpacity={0.1} />
            <Speckles cx={cx} cy={cy} r={26} color={INK} seed={seed + i} count={14} />
          </g>
        );
      })}
      {/* mask: repaint the pack colour around the window so discs stay inside the arch */}
      <path
        d="M34 86 H206 V200 H34 Z M68 196 V136 Q68 102 120 92 Q172 102 172 136 V196 Z"
        fill={art.base}
        fillRule="evenodd"
      />
      <rect x={42} y={86} width={8} height={114} fill="#fff" opacity={0.1} />
      <path d="M68 196 V136 Q68 102 120 92 Q172 102 172 136 V196 Z" fill="none" stroke={art.accent} strokeWidth={3} />
      <path d="M64 200 V136 Q64 98 120 87 Q176 98 176 136 V200" fill="none" stroke={PAPER} strokeWidth={0.8} opacity={0.6} />
      <rect x={52} y={200} width={136} height={64} rx={3} fill={PAPER} />
      <VegMark x={170} y={205} s={9} />
      <NameBlock name={name} marathi={marathi} netWt={netWt} y={222} color={INK} sub={art.base} max={14} size={15} />
    </g>
  );
}

function Box({ art, name, marathi, seed, netWt, ribbon }: Props) {
  return (
    <g>
      <ellipse cx={124} cy={286} rx={92} ry={7} fill="#000" opacity={0.18} />
      <polygon points="180,60 204,44 204,262 180,278" fill={art.base} />
      <polygon points="180,60 204,44 204,262 180,278" fill="#000" opacity={0.28} />
      <polygon points="38,60 62,44 204,44 180,60" fill={art.base} />
      <polygon points="38,60 62,44 204,44 180,60" fill="#fff" opacity={0.14} />
      <rect x={38} y={60} width={142} height={218} fill={art.base} />
      <rect x={46} y={68} width={126} height={202} fill="none" stroke={art.accent} strokeWidth={1.2} />
      <rect x={50} y={72} width={118} height={194} fill="none" stroke={art.accent} strokeWidth={0.4} opacity={0.7} />
      {[
        [50, 72],
        [168, 72],
        [50, 266],
        [168, 266],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 4} L${x + 4} ${y} L${x} ${y + 4} L${x - 4} ${y} Z`} fill={art.accent} />
      ))}
      <text x={109} y={96} textAnchor="middle" fontSize={12.5} fontWeight={700} letterSpacing={2.4} fill={art.accent} style={DISPLAY}>
        RA MASALE
      </text>
      <text x={109} y={106} textAnchor="middle" fontSize={5} letterSpacing={1.8} fill={art.accent} opacity={0.85} style={SANS}>
        EST · 1972 · SANGLI
      </text>
      <g transform="translate(-11 0)">
        <Bowl cx={120} cy={146} r={26} art={{ ...art, accent: art.accent }} seed={seed} />
      </g>
      <g transform="translate(-11 0)">
        <NameBlock name={name} marathi={marathi} netWt={netWt} y={202} color={PAPER} sub={art.accent} max={13} size={15} />
      </g>
      {ribbon && (
        <g>
          <rect x={164} y={60} width={10} height={218} fill={art.accent} opacity={0.95} />
          <rect x={164} y={60} width={1.6} height={218} fill="#000" opacity={0.15} />
          <polygon points="164,60 174,60 198,44 188,44" fill={art.accent} />
          <path d="M180 52 q-22 -20 -28 -6 q2 9 28 6 Z" fill={art.accent} />
          <path d="M182 52 q20 -22 28 -8 q-2 9 -28 8 Z" fill={art.accent} />
          <path d="M180 52 q-22 -20 -28 -6 q2 9 28 6 Z M182 52 q20 -22 28 -8 q-2 9 -28 8 Z" fill="#000" opacity={0.14} />
          <path d="M178 54 l-7 15 l5 -2 l2 6 Z M184 54 l7 15 l-5 -2 l-2 6 Z" fill={art.accent} />
          <circle cx={181} cy={52} r={4.2} fill={art.accent} stroke="#000" strokeOpacity={0.25} />
        </g>
      )}
      {!ribbon && <VegMark x={156} y={78} s={9} />}
    </g>
  );
}

export function PackArt(props: Props) {
  const { art, view = "pack", className, title, seed, ribbon } = props;
  const label = title ?? `${props.name} pack illustration`;

  if (view === "spice") {
    return (
      <svg viewBox="0 0 240 300" className={className} role="img" aria-label={`${props.name} — the spice`}>
        {ribbon ? (
          <>
            <Bowl cx={86} cy={118} r={44} art={art} seed={seed + "a"} />
            <Bowl cx={160} cy={168} r={40} art={{ ...art, spice: art.accent }} seed={seed + "b"} />
            <Bowl cx={82} cy={214} r={32} art={{ ...art, spice: art.base }} seed={seed + "c"} />
          </>
        ) : (
          <>
            <Bowl cx={120} cy={150} r={82} art={art} seed={seed} />
            <ellipse cx={196} cy={252} rx={30} ry={8} fill={art.spice} opacity={0.75} />
            <Speckles cx={196} cy={252} r={26} color={INK} seed={seed + "pile"} count={12} />
          </>
        )}
      </svg>
    );
  }

  const shape =
    art.shape === "jar" ? <Jar {...props} /> :
    art.shape === "packet" ? <Packet {...props} /> :
    art.shape === "box" ? <Box {...props} /> :
    <Pouch {...props} />;

  const viewBox = view === "label" ? "40 70 160 200" : "0 0 240 300";

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label}>
      {shape}
    </svg>
  );
}

/** Soft tinted backdrop colour for an art palette */
export function tint(hex: string, alpha = 0.12) {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
