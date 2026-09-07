"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Полоса заполняется за 3,2 с — столько нужно, чтобы прочитать фразу. */
const BAR_MS = 3200;
const DONE_MS = 3600;

/** Строки загрузки: проявляются по очереди, как в системе очков. */
const LINES = [
  "оптика синхронизирована",
  "нейролинк устойчив",
  "каталог загружен · 8 пакетов",
  "интерфейс готов",
];

const SEGMENTS = 32;

/**
 * Загрузка на стекле очков: рамка, телеметрия, сегментная полоса
 * и фраза, ради которой всё затевалось.
 */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const value = Math.min(1, (now - start) / BAR_MS);
      setProgress(value);
      if (value < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timers = LINES.map((_, i) =>
      window.setTimeout(
        () => setShown(i + 1),
        Math.round(((i + 1) / LINES.length) * BAR_MS) - 500,
      ),
    );
    const done = window.setTimeout(onDone, DONE_MS);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  const filledSegments = Math.round(progress * SEGMENTS);
  const percent = Math.round(progress * 100);

  return (
    <div className="absolute inset-0 grid place-items-center bg-bg/78 backdrop-blur-[5px]">
      {/* развёртка поверх затемнения */}
      <div aria-hidden className="scanlines absolute inset-0 opacity-60" />

      <div className="hud-panel relative w-[min(620px,86vw)] px-7 py-8 md:px-10 md:py-10">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-teal/70 uppercase">
          <span>загрузка интерфейса</span>
          <span className="tabular-nums">{String(percent).padStart(3, "0")}%</span>
        </div>

        <p className="hud-glitch font-display text-xl leading-tight text-balance md:text-4xl">
          {site.slogan}
        </p>

        {/* сегментная полоса вместо сплошной: читается как прибор */}
        <div className="mt-8 flex gap-[3px]" aria-hidden>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={`h-3 flex-1 ${
                i < filledSegments
                  ? "bg-yellow shadow-[0_0_8px_-1px] shadow-yellow/70"
                  : "bg-line/70"
              }`}
            />
          ))}
        </div>

        <ul className="mt-7 grid gap-1.5 font-mono text-[11px] tracking-[0.12em] text-dim uppercase">
          {LINES.map((line, i) => (
            <li
              key={line}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                i < shown ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-teal">›</span>
              {line}
              <span className="ml-auto text-teal/70">ок</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
