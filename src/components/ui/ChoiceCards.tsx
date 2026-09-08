import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { categories, minPriceOf } from "@/data/tiers";
import { PROMO_ON, discounted, formatFrom } from "@/lib/price";
import Reveal from "@/components/motion/Reveal";

/**
 * Выбор категории двумя кликабельными карточками. Внутри — признаки,
 * по которым человек узнаёт свой случай, и цена входа: решение принимается
 * здесь, а не после блуждания по разделам.
 */
export default function ChoiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {categories.map((category, i) => {
        const base = minPriceOf(category.id);

        return (
          <Reveal key={category.id} delay={i * 90}>
            <Link
              href={ROUTES[category.id]}
              className="panel panel-glow lift grid h-full content-start gap-5 rounded-2xl p-6 md:p-7"
            >
              <div>
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-mint uppercase">
                  {category.title}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug font-medium tracking-tight text-balance md:text-2xl">
                  {category.hint.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">
                  {category.hint.stay}
                </p>
              </div>

              <ul className="grid gap-2.5 border-t border-line pt-5">
                {category.hint.signs.map((sign) => (
                  <li key={sign} className="flex gap-3 text-sm text-ink/90">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_10px_1px] shadow-mint/70"
                    />
                    {sign}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-line pt-5">
                {PROMO_ON && (
                  <span className="font-mono text-[13px] text-strike line-through">
                    {formatFrom(base)}
                  </span>
                )}
                <span className="accent-word font-display text-2xl font-bold text-mint tabular-nums">
                  {formatFrom(discounted(base))}
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-dim">
                  {category.termRange}
                </span>
                <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                  смотреть тарифы
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
