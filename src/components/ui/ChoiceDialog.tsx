"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Category } from "@/data/tiers";
import ModalShell from "./ModalShell";

/**
 * Окно категории: разговор с заказчиком — от минимальной задачи к потолку
 * категории. Ни тарифов, ни цен: для этого есть блок с тарифами.
 */
export default function ChoiceDialog({
  category,
  open,
  origin,
  onClose,
}: {
  category: Category;
  open: boolean;
  /** Карточка, из которой разворачивается окно. */
  origin: DOMRect | null;
  onClose: () => void;
}) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      origin={origin}
      width="min(980px, 100%)"
    >
      <div className="flex items-center gap-4 border-b border-line px-6 py-4 md:px-8">
        <span className="font-mono text-[10px] tracking-[0.22em] text-mint/70 uppercase">
          кому подходит
        </span>
        <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
          {category.title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="ml-auto rounded-full border border-mint/25 px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:border-mint hover:text-mint"
        >
          закрыть
        </button>
      </div>

      <div className="no-bars grid min-h-0 content-start gap-5 overflow-y-auto p-5 md:p-7">
        <p className="max-w-[70ch] text-sm leading-relaxed text-ink/85">
          {category.note}
        </p>

        <div className="grid max-w-[76ch] gap-4">
          {category.story.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-relaxed text-ink/90"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <Link
            href={ROUTES[category.id]}
            className="rounded-full bg-mint px-6 py-3 font-mono text-[11.5px] tracking-[0.14em] text-bg uppercase shadow-[0_0_30px_-6px] shadow-mint/70 transition-all hover:shadow-[0_0_42px_-4px] hover:shadow-mint"
          >
            Смотреть все тарифы
          </Link>
          <span className="font-mono text-[11px] tracking-[0.12em] text-dim">
            {category.termRange}
          </span>
        </div>
      </div>
    </ModalShell>
  );
}
