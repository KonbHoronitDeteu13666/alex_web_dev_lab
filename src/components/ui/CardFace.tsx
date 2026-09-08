import type { MockRow } from "@/data/tiers";
import TierMock from "@/components/tiers/TierMock";
import PriceRow from "./PriceRow";

/**
 * Лицо карточки: превью-макет, номер, название, срок, описание, цена
 * и подпись «открыть». Одно на всё — плитка раздела и карточка тарифа
 * обязаны выглядеть одинаково, иначе переход читается как смена интерфейса.
 */

/**
 * Обёртка карточки. Элемент выбирает вызывающий: ссылка или кнопка.
 * Выделенная карточка залита акцентом — одна в ряду, как в референсе.
 */
export function cardShell(hasMock: boolean, featured = false): string {
  const base = featured ? "panel-accent lift" : "panel panel-glow lift";
  // Скругление задаёт panel/panel-accent — в разметке его не перебиваем.
  // Ширина превью растёт вместе с колонкой: на планшете карточка встаёт
  // в один ряд, поэтому там макету можно быть шире, чем на телефоне.
  return `${base} grid w-full items-center gap-4 p-4 text-left sm:p-5 md:gap-5 md:p-6 ${
    hasMock
      ? "grid-cols-[64px_1fr] sm:grid-cols-[104px_1fr] lg:grid-cols-[132px_1fr]"
      : "grid-cols-1"
  }`;
}

export default function CardFace({
  title,
  text,
  term,
  basePrice,
  from = false,
  mock,
  rank,
  featured = false,
}: {
  title: string;
  text: string;
  term?: string;
  basePrice?: number;
  from?: boolean;
  mock?: MockRow[];
  rank?: string;
  featured?: boolean;
}) {
  return (
    <>
      {mock && <TierMock rows={mock} featured={featured} />}

      {/* min-w-0 обязателен: без него колонка не может стать уже своего
          самого длинного слова, и «Максимальный» раздвигал ряд карточек
          на всей странице — они вылезали за правое поле. */}
      <span className="block min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-3">
          {rank && (
            <span
              className={`font-mono text-[13px] tracking-[0.12em] ${
                featured ? "text-bg/60" : "text-mint"
              }`}
            >
              {rank}
            </span>
          )}
          <span className="font-display text-lg font-medium tracking-tight md:text-xl">
            {title}
          </span>
        </span>

        {term && (
          <span
            className={`mt-1.5 block font-mono text-[11px] tracking-[0.1em] ${
              featured ? "text-bg/65" : "text-dim"
            }`}
          >
            {term}
          </span>
        )}

        <span
          className={`mt-2.5 block text-sm leading-relaxed ${
            featured ? "text-bg/80" : "text-ink/90"
          }`}
        >
          {text}
        </span>

        {basePrice !== undefined && (
          <PriceRow basePrice={basePrice} from={from} featured={featured} />
        )}

        <span
          className={`mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase ${
            featured ? "text-bg" : "text-mint"
          }`}
        >
          открыть
          <span aria-hidden>→</span>
        </span>
      </span>
    </>
  );
}
