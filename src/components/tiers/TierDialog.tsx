"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { siteContent } from "@/data/site-content";
import type { Tier } from "@/data/tiers";
import PriceRow from "@/components/ui/PriceRow";
import ModalShell from "@/components/ui/ModalShell";
import { sceneCaption } from "./scene-captions";

/**
 * Сцены живого макета — почти пятьсот строк разметки с анимациями,
 * которые видно только при открытом окне. Держать их в общем куске
 * скриптов незачем: грузим отдельным файлом при первом открытии.
 * Место под сцену уже занято рамкой 4:3, поэтому ничего не прыгает.
 */
const DemoScene = dynamic(() => import("./DemoScene"), { ssr: false });

/** Сколько держится одна сцена макета, прежде чем смениться следующей. */
const SCENE_MS = 5000;

/**
 * Большое окно тарифа: слева живой макет возможностей пакета,
 * который крутится по кругу, справа развёрнутое описание.
 */
export default function TierDialog({
  tier,
  open,
  origin,
  onClose,
}: {
  tier: Tier;
  open: boolean;
  /** Карточка, из которой разворачивается окно. */
  origin: DOMRect | null;
  onClose: () => void;
}) {
  const [scene, setScene] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);

  // Каждое открытие начинается с первой сцены. Правка состояния прямо
  // при отрисовке, а не в эффекте: лишнего кадра со старой сценой не будет.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setScene(0);
  }

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

  return (
    <ModalShell open={open} onClose={onClose} origin={origin}>
      {/* шапка окна */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line/70 px-5 py-4 md:px-8">
        <span className="font-mono text-[10px] tracking-[0.22em] text-mint/70 uppercase">
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
          className="ml-auto rounded-full border border-mint/25 px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:border-mint hover:text-mint"
        >
          закрыть
        </button>
      </div>

      <div className="no-bars grid min-h-0 gap-5 overflow-y-auto p-5 md:grid-cols-[minmax(0,42%)_1fr] md:gap-7 md:p-7">
        {/* ---------- слева: живой макет ---------- */}
        <div className="grid content-start gap-3">
          <div className="relative aspect-[4/3] max-h-[46dvh] w-full">
            {open && <DemoScene key={kind} kind={kind} />}
          </div>

          <p className="font-mono text-[11px] tracking-[0.12em] text-mint/80">
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
                    i === scene ? "bg-mint" : "bg-line hover:bg-dim-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---------- справа: развёрнутое описание ---------- */}
        <div className="grid content-start gap-5">
          <PriceRow basePrice={tier.basePrice} size="dialog" />

          <div className="grid gap-2.5">
            {tier.details.map((paragraph) => (
              <p key={paragraph} className="text-[14px] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-mint/70 uppercase">
              что входит
            </p>
            <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
              {tier.includes.map((item) => (
                <li
                  key={item}
                  className="relative pl-[16px] text-[13px] leading-snug text-ink/85"
                >
                  <span className="absolute top-[9px] left-0 h-px w-2 bg-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-line/70 pt-4">
            <a
              href={siteContent.contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-mint px-6 py-3 font-mono text-[11.5px] tracking-[0.14em] text-bg uppercase shadow-[0_0_30px_-6px] shadow-mint/70 transition-all hover:shadow-[0_0_42px_-4px] hover:shadow-mint"
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
    </ModalShell>
  );
}
