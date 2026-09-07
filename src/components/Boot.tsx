"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> инициализация ядра ............ ок",
  "> проверка каналов связи ........ ок",
  "> загрузка портфолио ............ 32 объекта",
  "> калибровка интерфейса ......... ок",
  "> статус оператора .............. на связи",
];

export default function Boot() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Заставку показываем один раз за визит и не показываем вовсе,
    // если человек попросил меньше анимации.
    const skip =
      sessionStorage.getItem("booted") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      setHidden(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 260 + i * 260));
    const end = window.setTimeout(() => setDone(true), 260 + LINES.length * 260 + 200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(close, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function close() {
    sessionStorage.setItem("booted", "1");
    document.body.style.overflow = "";
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-void px-6"
      style={{ transition: "opacity .5s", opacity: done ? 0 : 1 }}
    >
      <div className="w-full max-w-md font-[family-name:var(--font-mono)] text-xs leading-7 text-cyan md:text-sm">
        {LINES.slice(0, shown).map((l) => (
          <p key={l}>{l}</p>
        ))}
        {shown < LINES.length && <span className="blink">▊</span>}

        <div className="mt-6 h-px w-full bg-line">
          <div
            className="h-px bg-cyan"
            style={{
              width: `${(shown / LINES.length) * 100}%`,
              transition: "width .26s linear",
            }}
          />
        </div>
        <p className="mt-3 text-dim">нажмите, чтобы пропустить</p>
      </div>
    </div>
  );
}
