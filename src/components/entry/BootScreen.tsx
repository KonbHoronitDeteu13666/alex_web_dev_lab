"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Загрузка на стекле очков: фраза, полоса на 1,6 с, затем оверлей снимается. */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [filled, setFilled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = requestAnimationFrame(() => setFilled(true));
    const label = window.setTimeout(() => setReady(true), 1400);
    const done = window.setTimeout(onDone, 1900);
    return () => {
      cancelAnimationFrame(start);
      clearTimeout(label);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="absolute inset-0 grid place-items-center bg-bg/75 backdrop-blur-[3px]">
      <div className="grid w-[min(520px,82vw)] justify-items-center gap-4 text-center">
        <p className="font-display text-lg leading-tight text-balance md:text-3xl">
          {site.slogan}
        </p>
        <div className="h-0.5 w-full overflow-hidden bg-line">
          <div
            className="h-full bg-yellow transition-[width] duration-[1600ms] ease-linear"
            style={{ width: filled ? "100%" : "0%" }}
          />
        </div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
          {ready ? "интерфейс готов" : "загрузка интерфейса"}
        </p>
      </div>
    </div>
  );
}
