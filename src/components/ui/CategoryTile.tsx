import Link from "next/link";
import type { Route } from "@/lib/routes";
import type { MockRow } from "@/data/tiers";
import CardFace, { cardShell } from "./CardFace";

/** Плитка раздела: та же карточка, что и у тарифа, только ведёт по ссылке. */
export default function CategoryTile({
  href,
  title,
  text,
  basePrice,
  term,
  mock,
  rank,
}: {
  href: Route;
  title: string;
  text: string;
  basePrice?: number;
  term?: string;
  mock?: MockRow[];
  rank?: string;
}) {
  return (
    <Link href={href} className={cardShell(Boolean(mock))}>
      <CardFace
        title={title}
        text={text}
        term={term}
        basePrice={basePrice}
        from
        mock={mock}
        rank={rank}
      />
    </Link>
  );
}
