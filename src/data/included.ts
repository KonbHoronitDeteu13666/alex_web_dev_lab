// Метка "только сервер": клиентский компонент, импортировавший отсюда значение,
// уронит сборку с внятной ошибкой. Раньше такой импорт молча утаскивал zod
// в браузерный бандл. Типы (import type) меткой не задеваются.
import "server-only";
import { z } from "zod";

/** Десять пунктов состава работ, одинаковых для всех восьми тарифов. */

const itemSchema = z.object({
  text: z.string().min(1),
  note: z.string().min(1).optional(),
  order: z.number().int().nonnegative(),
});

export type IncludedItem = z.infer<typeof itemSchema>;

const rawIncluded = z.array(itemSchema).length(10).parse([
  { text: "Брифинг и сбор требований", order: 0 },
  { text: "Анализ конкурентов", order: 1 },
  { text: "Прототип и структура страниц", order: 2 },
  {
    text: "Дизайн-макет",
    note: "адаптация под ПК, планшет и смартфон",
    order: 3,
  },
  { text: "Вёрстка и программирование", order: 4 },
  {
    text: "Наполнение контентом",
    note: "тексты и фото предоставляет заказчик, базовая обработка — по необходимости",
    order: 5,
  },
  { text: "Тестирование в браузерах и на устройствах", order: 6 },
  { text: "Публикация на хостинге и привязка вашего домена", order: 7 },
  {
    text: "Подключение аналитики",
    note: "Яндекс.Метрика или Google Analytics",
    order: 8,
  },
  {
    text: "Гарантийная поддержка 14 дней",
    note: "бесплатное исправление ошибок после сдачи",
    order: 9,
  },
]);

/** Порядок фиксируется здесь, чтобы страницы просто перебирали массив. */
export const included: IncludedItem[] = [...rawIncluded].sort(
  (a, b) => a.order - b.order,
);
