import { z } from "zod";

/**
 * Категории и восемь тарифов. Цены — прайсовые, без скидки:
 * акционная считается в lib/price.ts.
 *
 * Схемы прогоняются при импорте, поэтому пропущенное поле, нулевая цена
 * или дубль идентификатора роняют сборку с понятным текстом.
 */

const mockRowSchema = z.union([
  z.object({
    kind: z.literal("bar"),
    accent: z.enum(["yellow", "teal"]).optional(),
    tall: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal("grid"),
    cols: z.union([z.literal(2), z.literal(3)]),
    filled: z.boolean().optional(),
  }),
  z.object({ kind: z.literal("side") }),
]);

const tierSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id только латиницей в нижнем регистре"),
  categoryId: z.enum(["simple", "middle"]),
  title: z.string().min(1),
  term: z.string().min(1),
  gist: z.string().min(1),
  basePrice: z.number().int().positive("цена должна быть больше нуля"),
  includes: z.array(z.string().min(1)).min(1, "список того, что входит, пуст"),
  mock: z.array(mockRowSchema).min(1),
  order: z.number().int().nonnegative(),
});

const categorySchema = z.object({
  id: z.enum(["simple", "middle"]),
  title: z.string().min(1),
  note: z.string().min(1),
  termRange: z.string().min(1),
  hint: z.object({ stay: z.string().min(1), leave: z.string().min(1) }),
});

export type MockRow = z.infer<typeof mockRowSchema>;
export type Tier = z.infer<typeof tierSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoryId = Category["id"];

export const categories = z.array(categorySchema).length(2).parse([
  {
    id: "simple",
    title: "Простой сайт",
    note: "Лендинг или сайт-визитка: одна страница, форма заявки, без базы данных и личного кабинета.",
    termRange: "3–12 дней",
    hint: {
      stay: "Одна страница закрывает вопрос: рассказать о себе и получить заявку. Каталог небольшой и меняется редко, править содержимое самому не нужно.",
      leave:
        "Позиции добавляются постоянно, нужны фильтры и поиск, блог, админка и сведение заявок в CRM.",
    },
  },
  {
    id: "middle",
    title: "Средний функционал",
    note: "Многостраничный сайт: 5–15 страниц, админка для контента, каталог товаров или услуг, интеграции с CRM, Telegram и почтой, блог.",
    termRange: "2–6 недель",
    hint: {
      stay: "Каталог живёт, содержимое меняется, заявки нужно сводить в CRM, а тексты править самому через админку.",
      leave:
        "Если задача — одна страница, рассказ о себе и заявки, а содержимое меняется пару раз в год.",
    },
  },
]);

export const tiers = z.array(tierSchema).length(8).parse([
  {
    id: "start",
    categoryId: "simple",
    title: "Старт",
    term: "3–5 дней",
    gist: "Одна страница на готовой основе: четыре блока и форма заявки на почту.",
    basePrice: 25000,
    includes: [
      "Одностраничный сайт (Landing Page)",
      "Адаптивная вёрстка на основе шаблона под ваш бренд: логотип, цвета, тексты",
      "До 4 смысловых блоков: о компании, услуги или товары, отзывы, контакты",
      "1 форма заявки с отправкой на почту",
      "Адаптация под ПК, планшет, смартфон",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "bar" },
      { kind: "bar" },
      { kind: "grid", cols: 2 },
      { kind: "bar", accent: "teal" },
    ],
    order: 0,
  },
  {
    id: "standart",
    categoryId: "simple",
    title: "Стандарт",
    term: "5–7 дней",
    gist: "Индивидуальный дизайн, шесть блоков, заявки приходят в Telegram.",
    basePrice: 32000,
    includes: [
      "Индивидуальный дизайн, не шаблон, под ваш бренд",
      "До 6 смысловых блоков",
      "Форма заявки с интеграцией в Telegram и почту",
      "Базовая SEO-разметка: мета-теги, заголовки",
      "Подключение Яндекс.Метрики или Google Analytics",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "bar" },
      { kind: "grid", cols: 2, filled: true },
      { kind: "bar" },
      { kind: "bar", accent: "teal" },
    ],
    order: 1,
  },
  {
    id: "prodvinutyy",
    categoryId: "simple",
    title: "Продвинутый",
    term: "7–10 дней",
    gist: "Каталог до 20 позиций, калькулятор или квиз, анимации при скролле.",
    basePrice: 40000,
    includes: [
      "Уникальный дизайн с анимациями и микро-интерактивностью при скролле",
      "Каталог товаров или услуг, статичный, до 15–20 позиций",
      "Простой калькулятор стоимости или квиз для сбора заявок",
      "Несколько форм захвата в разных блоках",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "grid", cols: 3, filled: true },
      { kind: "grid", cols: 3, filled: true },
      { kind: "bar", accent: "teal" },
      { kind: "bar" },
    ],
    order: 2,
  },
  {
    id: "premium",
    categoryId: "simple",
    title: "Премиум",
    term: "10–12 дней",
    gist: "Всё из «Продвинутого» плюс вторая страница, сложные эффекты и разгон скорости.",
    basePrice: 50000,
    includes: [
      "Всё из тарифа «Продвинутый»",
      "Дополнительная страница: услуга, акция или политика конфиденциальности",
      "Сложные анимации: параллакс, эффекты при скролле",
      "Оптимизация скорости загрузки",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "side" },
      { kind: "grid", cols: 2 },
      { kind: "bar", accent: "teal" },
    ],
    order: 3,
  },
  {
    id: "standart-plus",
    categoryId: "middle",
    title: "Стандарт",
    term: "2–3 недели",
    gist: "5–7 страниц, простая админка, каталог до 30 позиций.",
    basePrice: 75000,
    includes: [
      "Многостраничный сайт, 5–7 страниц",
      "Простая CMS или админка для редактирования текстов и фото",
      "Каталог до 30 позиций без фильтров",
      "Форма заявки с интеграцией в Telegram-бота",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "grid", cols: 3 },
      { kind: "grid", cols: 2, filled: true },
      { kind: "bar", accent: "teal" },
    ],
    order: 0,
  },
  {
    id: "optimalnyy",
    categoryId: "middle",
    title: "Оптимальный",
    term: "3–4 недели",
    gist: "8–10 страниц, полная админка, фильтры и поиск, блог, CRM.",
    basePrice: 100000,
    includes: [
      "8–10 страниц",
      "Полноценная админ-панель: каталог, цены, новости и блог",
      "Каталог с фильтрами и поиском",
      "Блог с собственной CMS",
      "Интеграция с CRM: amoCRM или Bitrix24",
    ],
    mock: [
      { kind: "bar", accent: "yellow", tall: true },
      { kind: "side" },
      { kind: "grid", cols: 2, filled: true },
      { kind: "bar", accent: "teal" },
    ],
    order: 1,
  },
  {
    id: "rasshirennyy",
    categoryId: "middle",
    title: "Расширенный",
    term: "4–5 недель",
    gist: "11–15 страниц, категории и подкатегории, личный кабинет клиента.",
    basePrice: 125000,
    includes: [
      "11–15 страниц",
      "Каталог с категориями и подкатегориями",
      "Личный кабинет клиента: история заявок, без оплаты",
      "Интеграции с несколькими каналами: Telegram, WhatsApp, почта, CRM",
    ],
    mock: [
      { kind: "bar", accent: "yellow" },
      { kind: "side" },
      { kind: "grid", cols: 3, filled: true },
      { kind: "bar", accent: "teal" },
    ],
    order: 2,
  },
  {
    id: "maksimalnyy",
    categoryId: "middle",
    title: "Максимальный",
    term: "5–6 недель",
    gist: "Всё из «Расширенного» плюс дашборд, конфигуратор, обучение и поддержка 30 дней.",
    basePrice: 150000,
    includes: [
      "Всё из тарифа «Расширенный»",
      "Аналитический дашборд для владельца сайта",
      "Кастомные виджеты: калькулятор стоимости, конфигуратор товара или услуги",
      "Обучение работе с админ-панелью",
      "Приоритетная поддержка 30 дней после запуска",
    ],
    mock: [
      { kind: "bar", accent: "yellow" },
      { kind: "grid", cols: 2, filled: true },
      { kind: "side" },
      { kind: "bar", accent: "yellow" },
    ],
    order: 3,
  },
]);

// Дубли идентификаторов ловим здесь: схема одного тарифа их не видит.
const seen = new Set<string>();
for (const tier of tiers) {
  if (seen.has(tier.id)) {
    throw new Error(`Дублирующийся идентификатор тарифа: ${tier.id}`);
  }
  seen.add(tier.id);
}

export function tiersOf(categoryId: CategoryId): Tier[] {
  return tiers
    .filter((tier) => tier.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function categoryOf(categoryId: CategoryId): Category {
  const found = categories.find((category) => category.id === categoryId);
  if (!found) throw new Error(`Категория не найдена: ${categoryId}`);
  return found;
}

/** Минимальная прайсовая цена категории — для плиток «от …». */
export function minPriceOf(categoryId: CategoryId): number {
  return Math.min(...tiersOf(categoryId).map((tier) => tier.basePrice));
}
