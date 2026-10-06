"use client";

import { useId, useState } from "react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

/**
 * Reusable enquiry form (distributor, B2B, contact, product).
 * Demo only — it confirms locally. Wire the submit handler to an API route / CRM / email service.
 */
export function EnquiryForm({
  fields,
  submitLabel,
  defaults = {},
  successTitle = "Thank you — we’ll be in touch.",
  successBody = "Our team will get back to you shortly.",
}: {
  fields: FieldDef[];
  submitLabel: string;
  defaults?: Record<string, string>;
  successTitle?: string;
  successBody?: string;
}) {
  const [sent, setSent] = useState(false);
  const uid = useId();

  if (sent) {
    return (
      <div className="border border-rule bg-ivory px-6 py-12 text-center sm:px-10" role="status">
        <p className="font-display text-[1.7rem] leading-tight italic">{successTitle}</p>
        <p className="mt-3 text-muted">{successBody}</p>
        <button type="button" onClick={() => setSent(false)} className="link-underline mt-6 min-h-10 text-[0.7rem] tracking-[0.18em] uppercase">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="@container grid grid-cols-1 gap-x-5 gap-y-5"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 @md:grid-cols-2">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const cls = f.full || f.type === "textarea" ? "@md:col-span-2" : "";
        const def = defaults[f.name];
        return (
          <div key={f.name} className={`min-w-0 ${cls}`}>
            <label htmlFor={id} className="label">
              {f.label}
              {f.required && <span className="text-chilli"> *</span>}
            </label>
            {f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} className="field" defaultValue={def && f.options?.includes(def) ? def : ""}>
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={id} name={f.name} required={f.required} className="field" defaultValue={def} placeholder={f.placeholder} />
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "numeric" : undefined}
                defaultValue={def}
                placeholder={f.placeholder}
                className="field"
              />
            )}
          </div>
        );
      })}
      </div>
      <div>
        <button type="submit" className="btn btn-primary w-full @md:w-auto">
          {submitLabel}
        </button>
        <p className="mt-3 text-[0.75rem] text-muted">Demo form — submissions are not stored yet.</p>
      </div>
    </form>
  );
}
