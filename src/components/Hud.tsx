"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

/** Неподвижная рамка интерфейса поверх страницы: углы, координаты, часы, прогресс. */
export default function Hud() {
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setProgress(Math.round((window.scrollY / max) * 100));
    };
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );

    onScroll();
    tick();
    const id = window.setInterval(tick, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {/* засечки по углам экрана */}
      {[
        "left-4 top-4 border-l border-t",
        "right-4 top-4 border-r border-t",
        "left-4 bottom-4 border-l border-b",
        "right-4 bottom-4 border-r border-b",
      ].map((c) => (
        <span key={c} className={`absolute h-5 w-5 border-cyan/50 md:h-7 md:w-7 ${c}`} />
      ))}

      {/* левая вертикальная подпись */}
      <span className="label absolute left-5 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] lg:block">
        {site.role}
      </span>

      {/* правый столбец телеметрии */}
      <div className="label absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 lg:flex">
        <span>{clock}</span>
        <span className="text-cyan/70">{String(progress).padStart(3, "0")}%</span>
        <span className="h-24 w-px bg-line">
          <span className="block w-px bg-cyan" style={{ height: `${progress}%` }} />
        </span>
      </div>

      {/* сканирующая полоса */}
      <div className="sweep absolute inset-x-0 h-24 bg-[linear-gradient(to_bottom,transparent,rgba(79,240,255,0.05),transparent)]" />
    </div>
  );
}
