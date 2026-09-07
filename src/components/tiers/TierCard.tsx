import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Tier } from "@/data/tiers";
import PriceRow from "@/components/ui/PriceRow";
import TierMock from "./TierMock";

/**
 * Карточка тарифа на <details>: раскрывается без JavaScript
 * и доступна с клавиатуры. Открытыми могут быть несколько сразу.
 */
export default function TierCard({ tier }: { tier: Tier }) {
  return (
    <details className="tier overflow-hidden rounded-xl border border-line bg-panel/55 backdrop-blur-sm">
      <summary className="grid grid-cols-[96px_1fr] items-center gap-5 p-5 md:grid-cols-[132px_1fr]">
        <TierMock rows={tier.mock} />
        <div>
          <h3 className="font-display text-lg font-medium tracking-tight md:text-xl">
            {tier.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-dim">
            {tier.term}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-dim">{tier.gist}</p>
          <PriceRow basePrice={tier.basePrice} />
          <span className="tier-toggle mt-3.5 inline-block font-mono text-[11px] tracking-[0.14em] text-teal uppercase" />
        </div>
      </summary>

      <div className="grid gap-4 p-5">
        <ul className="grid gap-2">
          {tier.includes.map((item) => (
            <li key={item} className="relative pl-[18px] text-sm text-dim">
              <span className="absolute top-[11px] left-0 h-px w-2 bg-yellow" />
              {item}
            </li>
          ))}
        </ul>
        <div className="border-t border-line-soft pt-3.5">
          <Link href={ROUTES.included} className="label hover:text-ink">
            что входит в «под ключ»
          </Link>
        </div>
      </div>
    </details>
  );
}
