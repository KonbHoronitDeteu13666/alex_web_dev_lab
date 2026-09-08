import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTiles from "@/components/ui/CategoryTiles";
import { included } from "@/data/included";

export const metadata: Metadata = {
  title: "Что входит «под ключ»",
  description:
    "Десять пунктов состава работ, одинаковых для всех восьми тарифов: от брифинга до гарантии 14 дней.",
};

export default function IncludedPage() {
  return (
    <PageShell current="included">
      <PageHero
        eyebrow="Одинаково для всех восьми тарифов"
        title="Что входит в стоимость «под ключ»"
        lead="Цена тарифа закрывает весь путь: от первого разговора до сайта, открытого на вашем домене. Отдельно за запуск, настройку и передачу доступов платить не нужно."
      />

      <div className="mt-12">
        <SectionHead title="Состав работ" meta={`${included.length} пунктов`} />
        <ul className="panel grid gap-x-8 gap-y-3 rounded-xl p-6 md:grid-cols-2 md:p-7">
          {included.map((item) => (
            <li key={item.text} className="relative pl-6 text-[15px]">
              <span className="absolute top-0 left-0 text-mint">✓</span>
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
        <CategoryTiles detailed />
      </div>
    </PageShell>
  );
}
