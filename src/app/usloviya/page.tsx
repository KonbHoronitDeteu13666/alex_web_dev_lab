import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/ui/PageHero";
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
  return (
    <PageShell current="terms">
      <PageHero
        eyebrow="Правки и оплата"
        title="Условия работы"
        lead="Два вопроса, которые обычно задают первыми: сколько раз можно переделать и когда платить."
      />

      <div className="mt-12">
        <SectionHead title="Правки" />
        <div className="rounded-l-none border-l-[3px] border-mint panel panel-glow lift p-6 md:p-7">
          <p className="text-[15px]">{revisionPolicy.rule}</p>
          <p className="mt-3 text-[15px] text-ink/85">
            Отдельно оценивается и оплачивается только основательная переделка
            после утверждения этапа: {revisionPolicy.exceptions.join(", ")}.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <SectionHead
          title="Оплата"
          meta={`${paymentStages.length} этапа, привязаны к результату`}
        />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {paymentStages.map((stage) => (
            <div key={stage.title} className="panel p-5 md:p-6">
              <p className="font-display text-3xl leading-none font-bold text-mint accent-word tabular-nums">
                {stage.percent}%
              </p>
              <h3 className="mt-3 font-display text-base font-medium">
                {stage.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/90">
                {stage.condition}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionHead title="Дальше" />
        <div className="grid gap-5 md:grid-cols-2">
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
    </PageShell>
  );
}
