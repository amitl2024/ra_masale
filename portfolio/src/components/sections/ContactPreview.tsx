import Link from "next/link";
import { company } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "./ContactCard";

export function ContactPreview() {
  return (
    <section className="border-t border-rule py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Three units in Sangli district."
          action={
            <Link href="/contact" className="btn btn-dark">
              Contact us
            </Link>
          }
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3 sm:mt-12">
          {company.units.map((u, i) => (
            <li key={u.name}>
              <ContactCard unit={u} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
