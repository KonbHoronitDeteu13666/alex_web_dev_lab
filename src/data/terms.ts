// Метка "только сервер": клиентский компонент, импортировавший отсюда значение,
// уронит сборку с внятной ошибкой. Раньше такой импорт молча утаскивал zod
// в браузерный бандл. Типы (import type) меткой не задеваются.
import "server-only";
import { z } from "zod";

/** Правила правок и этапы оплаты. Сумма долей обязана быть равна 100. */

const stageSchema = z.object({
  percent: z.number().int().positive(),
  title: z.string().min(1),
  condition: z.string().min(1),
  order: z.number().int().nonnegative(),
});

const policySchema = z.object({
  rule: z.string().min(1),
  exceptions: z.array(z.string().min(1)).min(1),
});

export type PaymentStage = z.infer<typeof stageSchema>;
export type RevisionPolicy = z.infer<typeof policySchema>;

const rawStages = z.array(stageSchema).length(4).parse([
  {
    percent: 10,
    title: "Аванс",
    condition:
      "При подписании договора, до начала работ: согласование ТЗ, сбор материалов, прототип структуры.",
    order: 0,
  },
  {
    percent: 30,
    title: "Дизайн принят",
    condition: "После утверждения дизайн-макета заказчиком.",
    order: 1,
  },
  {
    percent: 30,
    title: "Тестовая версия",
    condition:
      "После реализации функционала и предоставления тестовой версии сайта.",
    order: 2,
  },
  {
    percent: 30,
    title: "Сдача",
    condition: "После публикации на хостинге и приёмки готового сайта.",
    order: 3,
  },
]);

/** Порядок фиксируется здесь, чтобы страницы просто перебирали массив. */
export const paymentStages: PaymentStage[] = [...rawStages].sort(
  (a, b) => a.order - b.order,
);

const total = paymentStages.reduce((sum, stage) => sum + stage.percent, 0);
if (total !== 100) {
  throw new Error(
    `Сумма долей по этапам оплаты равна ${total}%, а должна быть 100%. Проверьте src/data/terms.ts.`,
  );
}

export const revisionPolicy: RevisionPolicy = policySchema.parse({
  rule: "Правки вносятся до тех пор, пока результат полностью не устроит заказчика.",
  exceptions: [
    "смена концепции дизайна",
    "изменение структуры или количества страниц",
    "добавление функционала, не предусмотренного согласованным ТЗ",
  ],
});
