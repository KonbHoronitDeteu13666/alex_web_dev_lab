import type { MockRow } from "@/data/tiers";
import TierMock from "@/components/tiers/TierMock";
import PriceRow from "./PriceRow";

/**
 * Лицо карточки: превью-макет, название, срок, описание, цена и «открыть».
 * Одно на всё — плитка раздела и карточка тарифа обязаны выглядеть одинаково,
 * иначе переход между экранами читается как смена интерфейса.
 */

/** Обёртка карточки. Элемент выбирает вызывающий: ссылка или кнопка. */
export function cardShell(hasMock: boolean): string {
  return `hud-panel hud-lift grid w-full items-center gap-5 rounded-xl p-5 text-left md:p-6 ${
    hasMock ? "grid-cols-[96px_1fr] md:grid-cols-[132px_1fr]" : "grid-cols-1"
  }`;
}

export default function CardFace({
  title,
  text,
  term,
  basePrice,
  from = false,
  mock,
}: {
  title: string;
  text: string;
  term?: string;
  basePrice?: number;
  from?: boolean;
  mock?: MockRow[];
}) {
  return (
    <>
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
        {basePrice !== undefined && (
          <PriceRow basePrice={basePrice} from={from} />
        )}
        <span className="mt-3.5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-teal uppercase">
          открыть
          <span aria-hidden>→</span>
        </span>
      </span>
    </>
  );
}
