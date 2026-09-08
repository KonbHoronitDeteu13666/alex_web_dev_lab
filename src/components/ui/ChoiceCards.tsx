"use client";

import { useState } from "react";
import { categories, type CategoryId } from "@/data/tiers";
import Reveal from "@/components/motion/Reveal";
import ChoiceDialog from "./ChoiceDialog";

/**
 * Выбор категории двумя карточками. Клик не ведёт в тарифы — это делает блок
 * выше. Здесь открывается разбор задач: что бывает нужно заказчику и какой
 * пакет это закрывает.
 */
export default function ChoiceCards() {
  const [openId, setOpenId] = useState<CategoryId | null>(null);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {categories.map((category, i) => (
        <Reveal key={category.id} delay={i * 90}>
          <button
            type="button"
            onClick={() => setOpenId(category.id)}
            aria-haspopup="dialog"
            className="panel panel-glow lift grid h-full w-full content-start gap-5 rounded-2xl p-6 text-left md:p-7"
          >
            <div>
              <span className="font-mono text-[10.5px] tracking-[0.2em] text-mint uppercase">
                {category.title}
              </span>
              <span className="mt-3 block font-display text-xl leading-snug font-medium tracking-tight text-balance md:text-2xl">
                {category.hint.title}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-ink/85">
                {category.hint.stay}
              </span>
            </div>

            <ul className="grid gap-2.5 border-t border-line pt-5">
              {category.hint.signs.map((sign) => (
                <li key={sign} className="flex gap-3 text-sm text-ink/90">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_10px_1px] shadow-mint/70"
                  />
                  {sign}
                </li>
              ))}
            </ul>

            <span className="flex items-center gap-2 border-t border-line pt-5 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              подробнее о категории
              <span aria-hidden>→</span>
            </span>
          </button>

          <ChoiceDialog
            category={category}
            open={openId === category.id}
            onClose={() => setOpenId(null)}
          />
        </Reveal>
      ))}
    </div>
  );
}
