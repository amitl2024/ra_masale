import { mapsEmbed, mapsLink } from "@/lib/data/site";
import { PinIcon } from "@/components/ui/Icons";

type Unit = { name: string; place: string; lines: string[]; query: string };

export function ContactCard({ unit, index, withMap = false }: { unit: Unit; index: number; withMap?: boolean }) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-rule bg-ivory">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3.5 sm:px-6">
        <span className="eyebrow text-chilli">{unit.name}</span>
        <span className="font-display text-[1.6rem] leading-none text-chilli/60 italic">{["I", "II", "III"][index]}</span>
      </div>
      {withMap && (
        <div className="relative aspect-[16/10] border-b border-rule bg-parchment/50">
          <iframe
            title={`Map — ${unit.name}, ${unit.place}`}
            src={mapsEmbed(unit.query)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[15%]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        <h3 className="font-display text-[1.4rem] leading-tight">{unit.place}</h3>
        <address className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-soft not-italic">
          {unit.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="block">Dist. Sangli, Maharashtra, India</span>
        </address>
        <a
          href={mapsLink(unit.query)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-5 inline-flex min-h-10 items-center gap-2 self-start text-[0.68rem] font-semibold tracking-[0.16em] text-chilli uppercase"
        >
          <PinIcon width={16} height={16} /> Get directions
        </a>
      </div>
    </article>
  );
}
