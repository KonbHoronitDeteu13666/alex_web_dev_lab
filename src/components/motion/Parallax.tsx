"use client";

import { useEffect, useRef } from "react";

/**
 * Слой, который отстаёт или опережает прокрутку. Скорость задаётся долей:
 * 0.2 — лёгкое отставание фона, −0.15 — движение навстречу.
 *
 * Считаем в requestAnimationFrame и пишем только transform, чтобы браузер
 * не пересчитывал раскладку на каждый пиксель прокрутки.
 */
export default function Parallax({
  speed = 0.15,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;

    const frame = () => {
      const rect = el.getBoundingClientRect();
      // Ноль — когда середина блока на середине экрана.
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const target = -fromCenter * speed;
      current += (target - current) * 0.12;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
