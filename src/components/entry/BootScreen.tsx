"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Загрузка держится чуть больше двух секунд: фразу читают, ждать не заставляем. */
const BOOT_MS = 2200;
const DONE_MS = 2500;

/** Телеметрия слева: подпись и значение, как на приборной панели. */
const TELEMETRY = [
  ["оптика", "KRS-04B"],
  ["канал", "12.4 ГГц"],
  ["задержка", "003 мс"],
  ["профиль", "оператор"],
];

const WAVE = [
  0.2, 0.5, 0.35, 0.8, 0.45, 0.95, 0.6, 0.3, 0.7, 0.5, 0.85, 0.4, 0.65, 0.25,
  0.9, 0.55, 0.35, 0.75, 0.45, 0.6,
];

const SEGMENTS = 40;

/**
 * Загрузка на стекле очков: рамка захвата сходится к центру, по краям
 * телеметрия, снизу сегментная шкала и осциллограмма. Фраза стоит в скобках
 * интерфейса, а не висит сама по себе.
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
  const filled = Math.round(progress * SEGMENTS);

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg/22 backdrop-blur-[1px]">
      <div aria-hidden className="scanlines absolute inset-0 opacity-40" />

      {/* ---------- телеметрия слева ---------- */}
      <div className="absolute top-10 left-10 hidden gap-1.5 md:grid">
        {TELEMETRY.map(([label, value], i) => (
          <div
            key={label}
            className="boot-line flex items-baseline gap-3 font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="w-24 text-teal/45">{label}</span>
            <span className="text-teal/85 tabular-nums">{value}</span>
            <span className="h-px w-8 bg-teal/25" />
          </div>
        ))}
      </div>

      {/* ---------- счётчик справа ---------- */}
      <div className="absolute top-10 right-10 grid justify-items-end gap-2">
        <span className="font-mono text-[10px] tracking-[0.24em] text-teal/45 uppercase">
          синхронизация
        </span>
        <span className="price-glow font-mono text-4xl leading-none font-bold text-yellow tabular-nums md:text-5xl">
          {String(percent).padStart(3, "0")}
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-teal/60">
          %
        </span>
      </div>

      {/* ---------- рамка захвата и фраза ---------- */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="relative">
          {/* скобки, сходящиеся к строке */}
          <span className="boot-clamp-l absolute top-1/2 -left-10 h-16 w-6 -translate-y-1/2 border-t border-b border-l border-teal/70 md:-left-16 md:h-24 md:w-10" />
          <span className="boot-clamp-r absolute top-1/2 -right-10 h-16 w-6 -translate-y-1/2 border-t border-r border-b border-teal/70 md:-right-16 md:h-24 md:w-10" />

          {/* прицельное перекрестие над строкой */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-linear-to-r from-transparent to-teal/60 md:w-28" />
            <span className="relative h-5 w-5">
              <span className="boot-ring absolute inset-0 rounded-full border border-dashed border-teal/70" />
              <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_10px_2px] shadow-yellow/60" />
            </span>
            <span className="h-px w-16 bg-linear-to-l from-transparent to-teal/60 md:w-28" />
          </div>

          <p
            data-text={site.slogan}
            className="boot-split relative text-center font-display text-2xl leading-tight tracking-tight text-balance md:text-5xl"
          >
            {site.slogan}
          </p>

          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.3em] text-teal/50 uppercase">
            интерфейс разворачивается
          </p>
        </div>
      </div>

      {/* ---------- нижняя приборная строка ---------- */}
      <div className="absolute inset-x-0 bottom-0 grid gap-3 px-6 pb-6 md:px-10 md:pb-8">
        {/* осциллограмма */}
        <div className="flex h-8 items-end gap-[3px] opacity-70">
          {WAVE.map((height, i) => (
            <span
              key={i}
              className="boot-wave flex-1 bg-teal/50"
              style={
                {
                  "--h": `${height * 100}%`,
                  animationDelay: `${i * 0.07}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* сегментная шкала */}
        <div className="flex gap-[3px]">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 ${
                i < filled
                  ? "bg-yellow shadow-[0_0_8px_-2px] shadow-yellow/80"
                  : "bg-line/60"
              }`}
            />
          ))}
        </div>

        <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.22em] text-teal/50 uppercase">
          <span>загрузка интерфейса</span>
          <span className="tabular-nums">
            {String(Math.round(progress * 128)).padStart(3, "0")} / 128 модулей
          </span>
        </div>
      </div>
    </div>
  );
}
