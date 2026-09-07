import type { Metadata } from "next";
import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import ChoiceHint from "@/components/ui/ChoiceHint";
import TierList from "@/components/tiers/TierList";
import { ROUTES } from "@/lib/routes";
import { categoryOf, tiersOf } from "@/data/tiers";

const category = categoryOf("middle");

export const metadata: Metadata = {
  title: category.title,
  description: category.note,
};

export default function MiddlePage() {
  return (
    <>
      <Glass />
      <Topline current="middle" />

      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-[66ch]">
          <p className="on-glass font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            Категория 2 из 2 · 4 тарифа
          </p>
          <h1 className="mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-emboss on-glass md:text-5xl">
            {category.title}
          </h1>
          <p className="on-glass mt-5 text-base leading-relaxed text-ink/85">
            {category.note} Сроки {category.termRange}.
          </p>
        </div>

        <div className="mt-12">
          <TierList tiers={tiersOf("middle")} />
        </div>

        <div className="mt-14">
          <ChoiceHint
            stayTitle="Если позиции добавляются постоянно"
            stayText={category.hint.stay}
            leaveTitle="Если хватает одной страницы"
            leaveText={category.hint.leave}
            leaveHref={ROUTES.simple}
            leaveLabel="Перейти в первую категорию →"
          />
        </div>
      </main>

      <FootNav current="middle" />
    </>
  );
}
