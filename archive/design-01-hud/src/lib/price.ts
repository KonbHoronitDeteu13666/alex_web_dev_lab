/**
 * Цены. Со скидкой ничего не хранится: цена по акции всегда считается
 * от прайсовой, поэтому витрина не может разойтись с прайсом.
 */

const RAW = process.env.NEXT_PUBLIC_PROMO_PERCENT;

/** Размер акции в процентах. 0 — акция выключена. По умолчанию 40. */
export const PROMO_PERCENT: number = (() => {
  if (RAW === undefined || RAW === "") return 40;
  const value = Number(RAW);
  if (!Number.isFinite(value) || value < 0 || value >= 100) {
    throw new Error(
      `NEXT_PUBLIC_PROMO_PERCENT должен быть числом от 0 до 99, получено: ${RAW}`,
    );
  }
  return value;
})();

export const PROMO_ON = PROMO_PERCENT > 0;

/** Цена со скидкой. При выключенной акции возвращает прайсовую. */
export function discounted(basePrice: number): number {
  if (!PROMO_ON) return basePrice;
  return basePrice * (1 - PROMO_PERCENT / 100);
}

const RUB = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

/** 19200 → «19 200 ₽» */
export function formatPrice(value: number): string {
  return `${RUB.format(value)} ₽`;
}

/** «от 15 000 ₽» для плиток категорий. */
export function formatFrom(value: number): string {
  return `от ${formatPrice(value)}`;
}
