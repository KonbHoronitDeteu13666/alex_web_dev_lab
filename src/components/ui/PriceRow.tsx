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
  from?: boolean;
  size?: "card" | "tile";
}) {
  const now = discounted(basePrice);
  const format = from ? formatFrom : formatPrice;

  return (
    <p className="mt-3 flex flex-wrap items-baseline gap-2.5">
      {PROMO_ON && (
        <span className="font-mono text-sm text-strike line-through">
          {format(basePrice)}
        </span>
      )}
      <span
        className={`font-display font-bold text-yellow tabular-nums ${
          size === "card" ? "text-2xl md:text-[26px]" : "text-xl md:text-2xl"
        }`}
      >
        {format(now)}
      </span>
    </p>
  );
}
