import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Backdrop from "@/components/layout/Backdrop";

import { site } from "@/data/site";

/**
 * Начертания перечислены поимённо, а не взяты по умолчанию: без списка
 * next/font тянет переменный шрифт со всей осью весов — на кириллице это
 * сотня килобайт в критическом пути, и заголовок ждёт их на медленной сети.
 *
 * В разметке встречаются ровно два веса: font-medium и font-bold, оба
 * на заголовочном шрифте. Текст и моноширинный идут обычным начертанием.
 * Добавляете font-semibold или font-bold к тексту — допишите вес сюда,
 * иначе браузер нарисует его подделкой.
 */
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-jetbrains",
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
      className={`${unbounded.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      {/* Подложка со свечением — на всех страницах, поэтому живёт здесь. */}
      <body className="text-ink">
        <Backdrop />

        {children}
      </body>
    </html>
  );
}
