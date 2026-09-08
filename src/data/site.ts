// Метка "только сервер": клиентский компонент, импортировавший отсюда значение,
// уронит сборку с внятной ошибкой. Раньше такой импорт молча утаскивал zod
// в браузерный бандл. Типы (import type) меткой не задеваются.
import "server-only";
import { z } from "zod";
import { siteContent } from "./site-content";

/**
 * Проверенные данные сайта. Схема прогоняется при импорте, поэтому опечатка
 * в site-content.ts роняет сборку с понятным текстом.
 *
 * Импортировать отсюда можно только из серверных компонентов: клиентским
 * нужен site-content.ts, иначе zod окажется в браузерном бандле.
 */

const contactSchema = z.object({
  kind: z.literal("telegram"),
  href: z.string().url(),
  label: z.string().min(1),
});

const sceneSchema = z.object({
  webm: z.string().min(1),
  mp4: z.string().min(1),
  poster: z.string().min(1),
  lastFrame: z.string().min(1),
  durationSec: z.number().positive(),
});

const siteSchema = z.object({
  /** Публичный адрес сайта: нужен карте сайта, robots.txt и Open Graph. */
  url: z.string().url(),
  name: z.string().min(1),
  role: z.string().min(1),
  slogan: z.string().min(1),
  description: z.string().min(1),
  contact: contactSchema,
  scene: sceneSchema,
  promoCondition: z.string().min(1),
});

export const site = siteSchema.parse(siteContent);

export type Site = z.infer<typeof siteSchema>;
