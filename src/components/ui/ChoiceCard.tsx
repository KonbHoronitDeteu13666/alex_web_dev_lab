"use client";

import { useState } from "react";
import type { Category } from "@/data/tiers";
import ChoiceDialog from "./ChoiceDialog";

/**
 * Одна карточка выбора. Клиентская часть здесь минимальна: состояние окна
 * и точка, из которой оно разворачивается. Список категорий остаётся
 * на сервере — иначе вместе с ним в браузер уезжают схемы.
 */
export default function ChoiceCard({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  // Из этого прямоугольника окно разворачивается и в него же складывается.
  const [origin, setOrigin] = useState<DOMRect | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          setOrigin(e.currentTarget.getBoundingClientRect());
          setOpen(true);
        }}
        aria-haspopup="dialog"
        className="panel panel-glow lift grid h-full w-full content-start gap-5 p-6 text-left md:p-7"
      >
        <span className="block">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-mint uppercase">
            {category.title}
          </span>
          <span className="mt-3 block font-display text-xl leading-snug font-medium tracking-tight text-balance md:text-2xl">
            {category.hint.title}
          </span>
          <span className="mt-3 block text-sm leading-relaxed text-ink/85">
            {category.hint.stay}
          </span>
        </span>

        <span className="grid gap-2.5 border-t border-line pt-5">
          {category.hint.signs.map((sign) => (
            <span key={sign} className="flex gap-3 text-sm text-ink/90">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_10px_1px] shadow-mint/70"
              />
              {sign}
            </span>
          ))}
        </span>

        <span className="flex items-center gap-2 border-t border-line pt-5 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
          подробнее о категории
          <span aria-hidden>→</span>
        </span>
      </button>

      <ChoiceDialog
        category={category}
        open={open}
        origin={origin}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
