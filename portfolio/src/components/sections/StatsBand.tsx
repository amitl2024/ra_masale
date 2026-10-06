import { Counter } from "@/components/ui/Counter";
import { categories } from "@/lib/data/categories";
import { company } from "@/lib/data/site";

export function StatsBand() {
  const stats = [
    { value: <Counter to={50} suffix="+" />, label: "Years of experience" },
    { value: <span className="oldstyle">{company.founded}</span>, label: "Year founded" },
    { value: <Counter to={company.units.length} />, label: "Units in Sangli district" },
    { value: <Counter to={categories.length} />, label: "Product categories" },
  ];
  return (
    <section className="border-y border-rule bg-ivory/70" aria-label="RA Masale at a glance">
      <div className="container-x grid grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div className="col-span-2 flex items-center border-b border-rule py-6 lg:col-span-1 lg:border-r lg:border-b-0 lg:py-8 lg:pr-8">
          <p className="font-display text-[1.25rem] leading-snug italic sm:text-[1.4rem]">
            Since 1972 — <span className="text-chilli">taste, trust &amp; tradition.</span>
          </p>
        </div>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-rule py-6 lg:py-8 ${i % 2 === 1 ? "border-l pl-5 sm:pl-6" : "pr-5"} ${i < 2 ? "border-b border-rule lg:border-b-0" : ""} lg:border-l lg:pl-8`}
          >
            <p className="font-headline text-[2.5rem] leading-none sm:text-[3rem]">{s.value}</p>
            <p className="mt-2 text-[0.66rem] tracking-[0.16em] text-muted uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
