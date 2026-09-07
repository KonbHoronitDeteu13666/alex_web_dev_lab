import type { Metadata } from "next";
import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTile from "@/components/ui/CategoryTile";
import { ROUTES } from "@/lib/routes";
import { paymentStages, revisionPolicy } from "@/data/terms";
import { minPriceOf } from "@/data/tiers";

export const metadata: Metadata = {
  title: "Условия работы",
  description:
    "Правила правок и четыре этапа оплаты, привязанных к результату, а не к календарю.",
};

export default function TermsPage() {
  const stages = [...paymentStages].sort((a, b) => a.order - b.order);

  return (
    <>
      <Glass />
      <Topline current="terms" />

      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-[66ch]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            Правки и оплата
          </p>
          <h1 className="mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-emboss md:text-5xl">
            Условия работы
          </h1>
          <p className="mt-5 text-base leading-relaxed text-dim">
            Два вопроса, которые обычно задают первыми: сколько раз можно
            переделать и когда платить.
          </p>
        </div>

        <div className="mt-12">
          <SectionHead title="Правки" />
          <div className="rounded-r-xl border-l-[3px] border-yellow hud-panel hud-lift p-6 md:p-7">
            <p className="text-[15px]">{revisionPolicy.rule}</p>
            <p className="mt-3 text-[15px] text-dim">
              Отдельно оценивается и оплачивается только основательная переделка
              после утверждения этапа: {revisionPolicy.exceptions.join(", ")}.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <SectionHead
            title="Оплата"
            meta={`${stages.length} этапа, привязаны к результату`}
          />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <div
                key={stage.title}
                className="rounded-xl hud-panel p-5 md:p-6"
              >
                <p className="font-display text-3xl leading-none font-bold text-yellow price-glow tabular-nums">
                  {stage.percent}%
                </p>
                <h3 className="mt-3 font-display text-base font-medium">
                  {stage.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-dim">
                  {stage.condition}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHead title="Дальше" />
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryTile
              href={ROUTES.included}
              title="Что входит «под ключ»"
              text="Десять пунктов состава работ, одинаковых для всех тарифов."
            />
            <CategoryTile
              href={ROUTES.simple}
              title="Вернуться к тарифам"
              text="Восемь пакетов в двух категориях."
              basePrice={Math.min(minPriceOf("simple"), minPriceOf("middle"))}
            />
          </div>
        </div>
      </main>

      <FootNav current="terms" />
    </>
  );
}
