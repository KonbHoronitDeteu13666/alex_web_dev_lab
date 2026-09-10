import type { Metadata } from "next";
import { Exo_2, Golos_Text } from "next/font/google";
import "./globals.css";
import Backdrop from "@/components/layout/Backdrop";

import { site } from "@/data/site";

/**
 * Начертания перечислены поимённо, а не взяты по умолчанию: без списка
 * next/font тянет переменный шрифт со всей осью весов — на кириллице это
 * сотня килобайт в критическом пути, и заголовок ждёт их на медленной сети.
 *
 * Заголовки, цены, имя в шапке и служебные подписи набраны Exo 2,
 * основной текст — Golos Text. У Exo 2 три веса: обычный для подписей,
 * средний для заголовков, жирный для цен. Добавляете другой вес — допишите
 * его сюда, иначе браузер нарисует подделку.
 */
const exo = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-exo",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.slogan,
    url: "/",
    siteName: site.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${exo.variable} ${golos.variable}`}
    >
      {/* Подложка со свечением — на всех страницах, поэтому живёт здесь. */}
      <body className="text-ink">
        <Backdrop />

        {children}
      </body>
    </html>
  );
}
