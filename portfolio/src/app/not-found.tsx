import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center sm:py-28">
      <p className="font-headline text-[6rem] leading-none text-chilli/80 sm:text-[7rem]">404</p>
      <h1 className="mt-6 font-headline text-display-md">This page isn’t on our shelves.</h1>
      <Ornament className="mx-auto mt-6 text-chilli/50" />
      <p className="mt-6 text-muted">The page you’re looking for has moved, or never existed.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 min-[420px]:flex-row">
        <Link href="/products" className="btn btn-primary">
          Explore products
        </Link>
        <Link href="/" className="btn btn-outline">
          Home
        </Link>
      </div>
    </div>
  );
}
