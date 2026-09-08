"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { tierById, type Category } from "@/data/tiers";
import { discounted, formatPrice } from "@/lib/price";

/**
 * Окно категории: разбор задач заказчика. Слева ситуация, справа пакет,
 * который её закрывает, с ценой и сроком. Это не список тарифов — это ответ
 * на вопрос «а мне что нужно».
 */
export default function ChoiceDialog({
  category,
  open,
  onClose,
}: {
  category: Category;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="modal-shell text-ink backdrop:bg-black/80 backdrop:backdrop-blur-md"
    >
      {/* Карточку центрирует разметка: на низких и вытянутых экранах окно
          остаётся посередине, а не прижимается к верхнему краю. */}
      {/* Клик по пустому месту вокруг карточки закрывает окно. */}
      <div
        className="flex h-full w-full items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="panel grid max-h-full w-[min(980px,100%)] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl shadow-[0_0_120px_-40px_rgba(63,240,200,0.55)]">
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

            <div className="grid gap-2.5">
              {category.needs.map((need) => {
                const tier = tierById(need.tierId);

                return (
                  <div
                    key={need.situation}
                    className="grid gap-3 rounded-xl border border-line bg-panel-2/40 p-4 md:grid-cols-[1fr_auto] md:items-center md:gap-6 md:p-5"
                  >
                    <div>
                      <p className="font-display text-base font-medium">
                        {need.situation}
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/80">
                        {need.detail}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-3 border-t border-line pt-3 md:flex-col md:items-end md:gap-1 md:border-none md:pt-0 md:text-right">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-dim-2 uppercase">
                        подойдёт
                      </span>
                      <span className="font-display text-base font-medium whitespace-nowrap text-mint">
                        {tier.title}
                      </span>
                      <span className="font-mono text-[12px] whitespace-nowrap text-ink/80 tabular-nums">
                        {formatPrice(discounted(tier.basePrice))}
                      </span>
                      <span className="font-mono text-[10.5px] whitespace-nowrap text-dim">
                        {tier.term}
                      </span>
                    </div>
                  </div>
                );
              })}
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
        </div>
      </div>
    </dialog>
  );
}
