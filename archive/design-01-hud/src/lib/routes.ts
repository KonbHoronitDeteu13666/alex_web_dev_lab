/**
 * Единственный источник внутренних путей.
 * Строковые href в разметке запрещены правилом ESLint — ссылки берутся отсюда,
 * поэтому переименование раздела правится в одном месте.
 */
export const ROUTES = {
  home: "/",
  simple: "/lending",
  middle: "/sayt-s-cms",
  included: "/chto-vhodit",
  terms: "/usloviya",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type Route = (typeof ROUTES)[RouteKey];

/** Разделы в порядке показа в шапке и подвале. */
export const NAV: { key: RouteKey; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "simple", label: "Лендинг" },
  { key: "middle", label: "Сайт с CMS" },
  { key: "included", label: "Что входит" },
  { key: "terms", label: "Условия" },
];
