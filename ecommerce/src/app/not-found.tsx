import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <p className="font-headline text-[7rem] leading-none text-chilli/80 italic">404</p>
      <h1 className="mt-6 font-headline text-display-md">This shelf is empty.</h1>
      <Ornament className="mx-auto mt-6 text-chilli/50" />
      <p className="mt-6 text-muted">The page you’re looking for has moved, or never existed.</p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/shop" className="btn btn-primary">
          Shop the pantry
        </Link>
        <Link href="/" className="btn btn-outline">
          Home
        </Link>
      </div>
    </div>
  );
}
