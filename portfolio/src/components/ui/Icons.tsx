import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

export const SearchIcon = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
);
export const BagIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>
);
export const UserIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}><path d="M3.5 7h17M3.5 12h17M3.5 17h11" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M4 12h15M14 7l5 5-5 5" /></svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}><path d="M20 12H5M10 7l-5 5 5 5" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14" /></svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const TruckIcon = (p: P) => (
  <svg {...base(p)}><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const LeafIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 19C5 10 11 5 20 5c0 9-5 15-14 15" /><path d="M5 19l8-8" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const HomeIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></svg>
);
export const MortarIcon = (p: P) => (
  <svg {...base(p)}><path d="M3.5 11h17c0 4.5-3.5 8-8.5 8s-8.5-3.5-8.5-8z" /><path d="M14 11l5.5-7" /><path d="M8 19.5h8" /></svg>
);
export const PhoneIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 006.5 6.5L16 14l4 1.5V19a1.5 1.5 0 01-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 015 4z" /></svg>
);
export const MailIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5.5" width="18" height="13" /><path d="M3 6.5l9 6.5 9-6.5" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const GiftIcon = (p: P) => (
  <svg {...base(p)}><rect x="3.5" y="8.5" width="17" height="4" /><path d="M5 12.5V20h14v-7.5M12 8.5V20" /><path d="M12 8.5C10 4 6.5 5 7.5 7.2 8.2 8.6 12 8.5 12 8.5zM12 8.5c2-4.5 5.5-3.5 4.5-1.3-.7 1.4-4.5 1.3-4.5 1.3z" /></svg>
);
export const FilterIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 6.5h16M7 12h10M10 17.5h4" /></svg>
);
export const TrashIcon = (p: P) => (
  <svg {...base(p)}><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.8 12.5h9.4L17.5 7" /></svg>
);
