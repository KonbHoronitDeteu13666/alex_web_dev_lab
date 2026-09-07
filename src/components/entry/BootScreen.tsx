"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Загрузка держится чуть больше двух секунд: фразу читают, ждать не заставляем. */
const BOOT_MS = 2200;
const DONE_MS = 2500;

/**
 * Загрузка на стекле очков: прицельное кольцо, фраза с расслоением
 * и полоса на всю ширину. Без плашек — интерфейс идёт прямо по кадру.
 */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const value = Math.min(1, (now - start) / BOOT_MS);
      setProgress(value);
      if (value < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const done = window.setTimeout(onDone, DONE_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [onDone]);

  const percent = Math.round(progress * 100);
  const dash = 2 * Math.PI * 46;

  return (
    <div className="absolute inset-0 bg-bg/72 backdrop-blur-[4px]">
      <div aria-hidden className="scanlines absolute inset-0 opacity-30" />

      {/* служебные подписи по углам, мелко */}
      <span className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.24em] text-teal/60 uppercase">
        нейролинк · подключение
      </span>
      <span className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.24em] text-teal/60 uppercase tabular-nums">
        {String(percent).padStart(3, "0")}%
      </span>

      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="grid justify-items-center gap-8">
          {/* кольцо: внешняя дуга крутится, внутренняя заполняется */}
          <div className="relative h-32 w-32 md:h-40 md:w-40">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgb(55 212 200 / 0.14)"
                strokeWidth="1.5"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#f4d738"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={dash}
                strokeDashoffset={dash * (1 - progress)}
                transform="rotate(-90 50 50)"
                style={{ filter: "drop-shadow(0 0 6px rgb(244 215 56 / 0.6))" }}
              />
            </svg>
            <svg
              viewBox="0 0 100 100"
              className="boot-spin absolute inset-0 h-full w-full"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgb(55 212 200 / 0.55)"
                strokeWidth="1"
                strokeDasharray="18 200"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgb(55 212 200 / 0.35)"
                strokeWidth="1"
                strokeDasharray="6 60"
                strokeDashoffset="120"
              />
            </svg>
            {/* перекрестие прицела */}
            <span className="absolute top-1/2 left-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-teal/60" />
            <span className="absolute top-1/2 left-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-teal/60" />
          </div>

          {/* фраза с расслоением, как на плохо синхронизированном дисплее */}
          <p
            data-text={site.slogan}
            className="boot-split relative text-center font-display text-2xl leading-tight text-balance md:text-5xl"
          >
            {site.slogan}
          </p>
        </div>
      </div>

      {/* полоса на всю ширину внизу */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line/50">
        <div
          className="h-full bg-yellow shadow-[0_0_14px_1px] shadow-yellow/70"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
