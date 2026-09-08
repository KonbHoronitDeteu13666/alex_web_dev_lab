import {
  PROMO_ON,
  RUBLE,
  discounted,
  formatAmount,
} from "@/lib/price";

/**
 * Старая цена зачёркнутой и новая рядом. Процент скидки не показываем —
 * решение пользователя. При выключенной акции остаётся одна прайсовая цена.
 */
export default function PriceRow({
  basePrice,
  from = false,
  size = "card",
  featured = false,
}: {
  basePrice: number;
  /** «от 15 000 ₽» — для плиток раздела, где цена минимальная по категории. */
  from?: boolean;
  size?: "card" | "dialog";
  /** На залитой акцентом карточке цена тёмная, а не мятная. */
  featured?: boolean;
}) {
  const now = discounted(basePrice);
  const dialog = size === "dialog";

  return (
    <p
      className={`flex flex-wrap items-baseline ${
        dialog ? "gap-3" : "mt-3.5 gap-2.5"
      }`}
    >
      {PROMO_ON && (
        <span
          className={`font-mono text-xs line-through sm:text-sm ${
            featured ? "text-bg/50" : "text-strike"
          }`}
        >
          <Amount value={basePrice} from={from} />
        </span>
      )}
      <span
        className={`font-display font-bold tabular-nums ${
          featured ? "text-bg" : "accent-word text-mint"
        } ${dialog ? "text-3xl md:text-4xl" : "text-2xl md:text-[26px]"}`}
      >
        <Amount value={now} from={from} />
      </span>
    </p>
  );
}

/**
 * Число своим шрифтом, знак рубля — всегда моноширинным.
 * Почему так, подробно расписано у RUBLE в lib/price.ts.
 */
function Amount({ value, from }: { value: number; from?: boolean }) {
  return (
    <>
      {from && "от "}
      {formatAmount(value)}
      {"\u00A0"}
      <span className="font-mono font-normal">{RUBLE}</span>
    </>
  );
}
