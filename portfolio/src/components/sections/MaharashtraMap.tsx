import { mapCities } from "@/lib/data/site";

/**
 * Stylised Maharashtra outline with Sangli marked and illustrative network points.
 * Decorative — not a geographic or coverage claim. Confirm real districts with RA.
 */
export function MaharashtraMap({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const ink = tone === "dark" ? "#1E1A17" : "#F3EBDD";
  const gold = "#D9A23A";
  const sangli = { x: 172, y: 262 };
  return (
    <svg viewBox="0 0 420 360" className={className} role="img" aria-label="Illustrative map of Maharashtra with Sangli highlighted">
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx={sangli.x} cy={sangli.y} r={28 + i * 30} fill="none" stroke={gold} strokeOpacity={0.3 - i * 0.035} />
      ))}
      <path
        d="M70 160 L110 120 L150 104 L196 80 L250 88 L300 64 L352 86 L372 120 L350 150 L318 172 L300 210 L250 226 L226 262 L196 280 L166 304 L134 300 L112 264 L96 222 L76 196 Z"
        fill={ink}
        fillOpacity={0.07}
        stroke={ink}
        strokeOpacity={0.55}
        strokeWidth={1.2}
        strokeDasharray="3 4"
      />
      {mapCities.map((c) => (
        <g key={c.name}>
          <line x1={sangli.x} y1={sangli.y} x2={c.x} y2={c.y} stroke={gold} strokeOpacity={0.35} strokeDasharray="2 3" />
          <circle cx={c.x} cy={c.y} r={3} fill={ink} opacity={0.85} />
          <text x={c.x + 7} y={c.y + 3.5} fill={ink} opacity={0.7} fontSize={10} style={{ fontFamily: "var(--font-sans)" }}>
            {c.name}
          </text>
        </g>
      ))}
      <circle cx={sangli.x} cy={sangli.y} r={7} fill={gold} />
      <circle cx={sangli.x} cy={sangli.y} r={13} fill="none" stroke={gold} strokeWidth={1.2} />
      <text x={sangli.x + 18} y={sangli.y - 2} fill={ink} fontSize={17} style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
        Sangli
      </text>
      <text x={sangli.x + 18} y={sangli.y + 13} fill={ink} opacity={0.6} fontSize={8} letterSpacing={2} style={{ fontFamily: "var(--font-sans)" }}>
        THREE UNITS · SINCE 1972
      </text>
    </svg>
  );
}
