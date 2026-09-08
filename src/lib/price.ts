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

/** 19200 → «19 200». Знак валюты отдельно, см. RUBLE ниже. */
export function formatAmount(value: number): string {
  return RUB.format(value);
}

/**
 * Знак рубля отделён от числа не из любви к порядку. U+20BD — единственный
 * символ на всём сайте, который не попадает ни в latin, ни в cyrillic,
 * и один он заставляет браузер тянуть подмножество latin-ext. У заголовочного
 * шрифта этот файл весит 116 КБ и лезет в критический путь загрузки,
 * у моноширинного — 8 КБ, и он всё равно уже нужен зачёркнутой цене.
 * Поэтому знак всегда рисуется моноширинным, а числа — своим шрифтом.
 */
export const RUBLE = "₽";

/** 19200 → «19 200 ₽» одной строкой: для мест без разметки. */
export function formatPrice(value: number): string {
  return `${formatAmount(value)} ${RUBLE}`;
}
