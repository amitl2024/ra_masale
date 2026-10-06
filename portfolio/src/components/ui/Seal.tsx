const isPositioned = (cls: string) => cls.split(/\s+/).some((c) => c === "absolute" || c === "fixed");

/** Circular "Est. 1972" seal with slowly rotating ring text. */
export function Seal({
  size = 132,
  className = "",
  color = "var(--color-ivory)",
  bg = "var(--color-chilli)",
  ring = "RA MASALE · SANGLI · MAHARASHTRA · ",
  id = "seal-ring",
}: {
  size?: number;
  className?: string;
  color?: string;
  bg?: string;
  ring?: string;
  id?: string;
}) {
  return (
    <div
      // positioned seals pass "absolute"; only fall back to relative so the two never conflict
      className={`${isPositioned(className) ? "" : "relative"} select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <circle cx="60" cy="60" r="59" fill={bg} />
        <circle cx="60" cy="60" r="55" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
        <circle cx="60" cy="60" r="35" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow">
        <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
        <text fill={color} fontSize="8.4" letterSpacing="2.4" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href={`#${id}`}>{ring}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ color }}>
        <span className="text-[0.5rem] tracking-[0.3em] uppercase opacity-80">Est.</span>
        <span className="font-display leading-none font-semibold italic" style={{ fontSize: size * 0.2 }}>
          1972
        </span>
      </div>
    </div>
  );
}
