import type { FieldDef } from "@/components/forms/EnquiryForm";
import { categories } from "@/lib/data/categories";
import { enquiryTypes, indianStates } from "@/lib/data/site";

export const distributorFields: FieldDef[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "company", label: "Company name", required: true, autoComplete: "organization" },
  { name: "mobile", label: "Mobile", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "state", label: "State", type: "select", options: indianStates, required: true },
  { name: "businessType", label: "Business type", type: "select", options: ["Super stockist", "Distributor", "Wholesaler", "Retail chain", "Other"], required: true },
  { name: "years", label: "Years in business", type: "number" },
  { name: "territory", label: "Territory / areas covered", full: true, placeholder: "e.g. Kolhapur & Satara districts" },
  { name: "message", label: "Message", type: "textarea", placeholder: "Current brands, warehouse, team size…" },
];

export const b2bFields: FieldDef[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "mobile", label: "Mobile", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "state", label: "State", type: "select", options: indianStates, required: true },
  { name: "type", label: "Enquiry type", type: "select", options: enquiryTypes, required: true },
  { name: "products", label: "Products interested in", placeholder: "e.g. Goda Masala, Mango Pickle" },
  { name: "quantity", label: "Expected quantity", full: true, placeholder: "e.g. 50 kg / month" },
  { name: "message", label: "Message", type: "textarea" },
];

export const productOptions = ["All products", ...categories.map((c) => c.name)];
