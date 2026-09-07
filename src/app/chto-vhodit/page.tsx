import type { Metadata } from "next";
import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTile from "@/components/ui/CategoryTile";
import { ROUTES } from "@/lib/routes";
import { included } from "@/data/included";
import { categoryOf, minPriceOf } from "@/data/tiers";

export const metadata: Metadata = {
  title: "Что входит «под ключ»",
  description:
    "Десять пунктов состава работ, одинаковых для всех восьми тарифов: от брифинга до гарантии 14 дней.",
};

export default function IncludedPage() {
  return (
    <>
      <Glass />
      <Topline current="included" />

      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-[66ch]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            Одинаково для всех восьми тарифов
          </p>
          <h1 className="mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-emboss md:text-5xl">
            Что входит в стоимость «под ключ»
          </h1>
          <p className="mt-5 text-base leading-relaxed text-dim">
            Цена тарифа закрывает весь путь: от первого разговора до сайта,
            открытого на вашем домене. Отдельно за запуск, настройку и передачу
            доступов платить не нужно.
          </p>
        </div>

        <div className="mt-12">
          <SectionHead title="Состав работ" meta={`${included.length} пунктов`} />
          <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
            {[...included]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <li key={item.text} className="relative pl-6 text-[15px]">
                  <span className="absolute top-0 left-0 text-teal">✓</span>
                  {item.text}
                  {item.note && (
                    <small className="block text-[12.5px] text-dim-2">
                      {item.note}
                    </small>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-14">
          <SectionHead title="Дальше" />
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryTile
              href={ROUTES.simple}
              title={categoryOf("simple").title}
              text="Четыре тарифа, одна страница, заявки на почту или в Telegram."
              basePrice={minPriceOf("simple")}
            />
            <CategoryTile
              href={ROUTES.middle}
              title={categoryOf("middle").title}
              text="Четыре тарифа, до 15 страниц, админка, каталог, интеграции."
              basePrice={minPriceOf("middle")}
            />
          </div>
        </div>
      </main>

      <FootNav current="included" />
    </>
  );
}
