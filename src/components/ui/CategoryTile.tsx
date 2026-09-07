import Link from "next/link";
import type { Route } from "@/lib/routes";
import PriceRow from "./PriceRow";

export default function CategoryTile({
  href,
  title,
  text,
  basePrice,
  term,
}: {
  href: Route;
  title: string;
  text: string;
  basePrice?: number;
  term?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-line bg-panel/70 p-6 backdrop-blur-sm transition-colors hover:border-teal md:p-7"
    >
      <h3 className="font-display text-lg font-medium tracking-tight md:text-xl">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-dim">{text}</p>
      {basePrice !== undefined && <PriceRow basePrice={basePrice} from size="tile" />}
      {term && <p className="label mt-3">{term}</p>}
    </Link>
  );
}
