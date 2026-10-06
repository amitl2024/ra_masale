import type { ReactNode } from "react";
import { EnquiryForm, type FieldDef } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";

/** Two-column enquiry block: pitch on the left, form on the right. */
export function EnquirySection({
  id,
  eyebrow,
  title,
  intro,
  points,
  fields,
  submitLabel,
  defaults,
  tone = "paper",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  points?: string[];
  fields: FieldDef[];
  submitLabel: string;
  defaults?: Record<string, string>;
  tone?: "paper" | "ivory";
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-rule py-16 sm:py-20 md:py-28 ${tone === "ivory" ? "bg-ivory/60" : ""}`}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="min-w-0 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow text-chilli">{eyebrow}</p>
          <h2 className="mt-5 font-headline text-display-md leading-[1.05] text-balance">{title}</h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-soft">{intro}</p>
          {points && (
            <ul className="mt-8 space-y-3 border-t border-rule pt-6">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-chilli" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal className="min-w-0 lg:col-span-7" delay={100}>
          <div className="border border-rule bg-ivory p-5 sm:p-8 lg:p-10">
            <EnquiryForm fields={fields} submitLabel={submitLabel} defaults={defaults} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
