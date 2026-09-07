import type { Metadata } from "next";
import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import ChoiceHint from "@/components/ui/ChoiceHint";
import TierList from "@/components/tiers/TierList";
import { ROUTES } from "@/lib/routes";
import { categoryOf, tiersOf } from "@/data/tiers";

const category = categoryOf("simple");

export const metadata: Metadata = {
  title: category.title,
  description: category.note,
};

export default function SimplePage() {
  return (
    <>
      <Glass />
      <Topline current="simple" />

      <main className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-[66ch]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            Категория 1 из 2 · 4 тарифа
          </p>
          <h1 className="mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-dim">
            {category.note} Сроки {category.termRange}.
          </p>
        </div>

        <div className="mt-12">
          <TierList tiers={tiersOf("simple")} />
        </div>

        <div className="mt-14">
          <ChoiceHint
            stayTitle="Если одна страница закрывает вопрос"
            stayText={category.hint.stay}
            leaveTitle="Если позиции добавляются постоянно"
            leaveText={category.hint.leave}
            leaveHref={ROUTES.middle}
            leaveLabel="Перейти во вторую категорию →"
          />
        </div>
      </main>

      <FootNav current="simple" />
    </>
  );
}
