"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { site } from "@/data/site";
import type { Tier } from "@/data/tiers";
import { PROMO_ON, discounted, formatPrice } from "@/lib/price";
import DemoScene, { sceneCaption } from "./DemoScene";

/** Сколько держится одна сцена макета, прежде чем смениться следующей. */
const SCENE_MS = 5000;

/**
 * Большое окно тарифа: слева живой макет возможностей пакета,
 * который крутится по кругу, справа развёрнутое описание.
 */
export default function TierDialog({
  tier,
  open,
  onClose,
}: {
  tier: Tier;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [scene, setScene] = useState(0);

  // Открытие и закрытие настоящего <dialog>: Esc и затемнение фона —
  // работа браузера, а не наша.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setScene(0);
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Сцены сменяют друг друга, пока окно открыто.
  useEffect(() => {
    if (!open || tier.demo.length < 2) return;
    const id = window.setInterval(
      () => setScene((i) => (i + 1) % tier.demo.length),
      SCENE_MS,
    );
    return () => clearInterval(id);
  }, [open, tier.demo.length]);

  const kind = tier.demo[scene];
  const now = discounted(tier.basePrice);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Клик мимо окна закрывает: цель события — сам dialog.
        if (e.target === ref.current) onClose();
      }}
      className="hud-panel m-auto max-h-[88vh] w-[min(1120px,94vw)] max-w-none overflow-hidden rounded-2xl p-0 text-ink backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {/* Прокрутки внутри окна быть не должно: содержимое подогнано так,
          чтобы помещаться целиком. На узких экранах окно просто выше. */}
      <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
        {/* шапка окна */}
        <div className="flex items-center gap-4 border-b border-line/70 px-6 py-4 md:px-8">
          <span className="font-mono text-[10px] tracking-[0.22em] text-teal/70 uppercase">
            пакет
          </span>
          <h2 className="font-display text-xl font-medium tracking-tight md:text-2xl">
            {tier.title}
          </h2>
          <span className="font-mono text-[11px] tracking-[0.1em] text-dim">
            {tier.term}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="ml-auto rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:border-teal hover:text-ink"
          >
            закрыть
          </button>
        </div>

        <div className="grid gap-5 overflow-hidden p-5 md:grid-cols-[minmax(0,42%)_1fr] md:gap-7 md:p-7">
          {/* ---------- слева: живой макет ---------- */}
          <div className="grid content-start gap-3">
            <div className="relative aspect-[4/3] w-full max-h-[46vh]">
              <DemoScene key={kind} kind={kind} />
            </div>

            <p className="font-mono text-[11px] tracking-[0.12em] text-teal/80">
              {sceneCaption(kind)}
            </p>

            {tier.demo.length > 1 && (
              <div className="flex gap-1.5">
                {tier.demo.map((item, i) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setScene(i)}
                    aria-label={sceneCaption(item)}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i === scene ? "bg-yellow" : "bg-line hover:bg-dim-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ---------- справа: развёрнутое описание ---------- */}
          <div className="grid content-start gap-5">
            <div className="flex flex-wrap items-baseline gap-3">
                {PROMO_ON && (
                  <span className="font-mono text-sm text-strike line-through">
                    {formatPrice(tier.basePrice)}
                  </span>
                )}
              <span className="price-glow font-display text-3xl font-bold text-yellow tabular-nums md:text-4xl">
                {formatPrice(now)}
              </span>
            </div>

            <div className="grid gap-2.5">
              {tier.details.map((paragraph) => (
                <p key={paragraph} className="text-[14px] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-teal/70 uppercase">
                что входит
              </p>
              <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="relative pl-[16px] text-[13px] leading-snug text-ink/85"
                  >
                    <span className="absolute top-[9px] left-0 h-px w-2 bg-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-line/70 pt-4">
              <a
                href={site.contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="key-3d rounded-lg border border-yellow bg-yellow px-5 py-3 font-mono text-[11.5px] tracking-[0.14em] text-bg uppercase transition-opacity hover:opacity-85"
              >
                Обсудить проект
              </a>
              <Link
                href={ROUTES.included}
                className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:text-ink"
              >
                что входит в «под ключ»
              </Link>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
