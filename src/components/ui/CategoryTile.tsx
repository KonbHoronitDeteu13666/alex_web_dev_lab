import Link from "next/link";
import type { Route } from "@/lib/routes";
import type { MockRow } from "@/data/tiers";
import TierMock from "@/components/tiers/TierMock";
import PriceRow from "./PriceRow";

/**
 * Плитка раздела. С макетом и ценой выглядит так же, как карточка тарифа
 * внутри категории, — переход между экранами читается как продолжение,
 * а не как новый интерфейс.
 */
export default function CategoryTile({
  href,
  title,
  text,
  basePrice,
  term,
  mock,
}: {
  href: Route;
  title: string;
  text: string;
  basePrice?: number;
  term?: string;
  mock?: MockRow[];
}) {
  return (
    <Link
      href={href}
      className={`hud-panel hud-lift grid items-center gap-5 rounded-xl p-5 md:p-6 ${
        mock ? "grid-cols-[96px_1fr] md:grid-cols-[132px_1fr]" : "grid-cols-1"
      }`}
    >
      {mock && <TierMock rows={mock} />}

      <span className="block">
        <span className="block font-display text-lg font-medium tracking-tight md:text-xl">
          {title}
        </span>
        {term && (
          <span className="mt-1 block font-mono text-[11px] tracking-[0.1em] text-dim">
            {term}
          </span>
        )}
        <span className="mt-2.5 block text-sm leading-relaxed text-ink/90">
          {text}
        </span>
        {basePrice !== undefined && <PriceRow basePrice={basePrice} from />}
        <span className="mt-3.5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-teal uppercase">
          открыть
          <span aria-hidden>→</span>
        </span>
      </span>
    </Link>
  );
}
