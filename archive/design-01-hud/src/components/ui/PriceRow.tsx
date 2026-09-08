import { PROMO_ON, discounted, formatPrice, formatFrom } from "@/lib/price";

/**
 * Старая цена зачёркнутой и новая рядом. Процент скидки не показываем —
 * решение пользователя. При выключенной акции остаётся одна прайсовая цена.
 */
export default function PriceRow({
  basePrice,
  from = false,
  size = "card",
}: {
  basePrice: number;
  /** «от 15 000 ₽» — для плиток раздела, где цена минимальная по категории. */
  from?: boolean;
  size?: "card" | "dialog";
}) {
  const now = discounted(basePrice);
  const format = from ? formatFrom : formatPrice;
  const dialog = size === "dialog";

  return (
    <p
      className={`flex flex-wrap items-baseline ${
        dialog ? "gap-3" : "mt-3 gap-2.5"
      }`}
    >
      {PROMO_ON && (
        <span className="font-mono text-sm text-strike line-through">
          {format(basePrice)}
        </span>
      )}
      <span
        className={`font-display font-bold text-yellow price-glow tabular-nums ${
          dialog ? "text-3xl md:text-4xl" : "text-2xl md:text-[26px]"
        }`}
      >
        {format(now)}
      </span>
    </p>
  );
}
