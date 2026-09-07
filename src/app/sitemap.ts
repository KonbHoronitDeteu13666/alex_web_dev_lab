import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { site } from "@/data/site";

/** Карта сайта собирается из ROUTES: новый раздел попадает в неё сам. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === ROUTES.home ? 1 : 0.8,
  }));
}
