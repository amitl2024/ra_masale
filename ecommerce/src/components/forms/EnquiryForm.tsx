"use client";

import { useState } from "react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
};

/**
 * Reusable enquiry form. In this demo it only confirms locally —
 * wire `onSubmit` to an API route / CRM when the backend is ready.
 */
export function EnquiryForm({
  fields,
  submitLabel,
  successTitle = "Thank you — we’ll be in touch.",
  successBody = "Our team usually replies within two working days.",
}: {
  fields: FieldDef[];
  submitLabel: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-rule bg-ivory p-10 text-center" role="status">
        <p className="font-display text-[1.8rem] leading-tight italic">{successTitle}</p>
        <p className="mt-3 text-muted">{successBody}</p>
        <button type="button" onClick={() => setSent(false)} className="link-underline mt-6 text-[0.72rem] tracking-[0.18em] uppercase">
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
      className="grid gap-5 sm:grid-cols-2"
    >
      {fields.map((f) => {
        const id = `enq-${f.name}`;
        const cls = f.full || f.type === "textarea" ? "sm:col-span-2" : "";
        return (
          <div key={f.name} className={cls}>
            <label htmlFor={id} className="label">
              {f.label}
              {f.required && <span className="text-chilli"> *</span>}
            </label>
            {f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} className="field" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={id} name={f.name} required={f.required} className="field" />
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.type === "tel" ? "tel" : undefined}
                className="field"
              />
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          {submitLabel}
        </button>
        <p className="mt-3 text-[0.75rem] text-muted">Demo form — submissions are not stored.</p>
      </div>
    </form>
  );
}
