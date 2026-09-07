import { z } from "zod";

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
  name: z.string().min(1),
  role: z.string().min(1),
  slogan: z.string().min(1),
  description: z.string().min(1),
  brand: z.string().min(1),
  contact: contactSchema,
  scene: sceneSchema,
  promoCondition: z.string().min(1),
});

export const site = siteSchema.parse({
  name: "Алексей Лобас",
  role: "Разработка сайтов под ключ",
  slogan: "Всё ограничено вашей фантазией",
  description:
    "Восемь тарифов в двух категориях: от визитки на одну страницу до многостраничного сайта с админ-панелью, каталогом и интеграциями. Цены, состав работ и порядок оплаты — здесь же, без переписки.",
  brand: "Kiroshi Optics",
  contact: {
    kind: "telegram",
    href: "https://t.me/username",
    label: "Написать в Telegram",
  },
  scene: {
    webm: "/scene/scene.webm",
    mp4: "/scene/scene.mp4",
    poster: "/scene/poster.webp",
    lastFrame: "/scene/last.webp",
    durationSec: 8,
  },
  promoCondition: "для проектов, которые войдут в примеры работ",
});

export type Site = z.infer<typeof siteSchema>;
