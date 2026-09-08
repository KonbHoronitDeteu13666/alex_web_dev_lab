"use client";

import { useEffect, useRef } from "react";

/**
 * Слой, который отстаёт или опережает прокрутку. Скорость задаётся долей:
 * 0.2 — лёгкое отставание фона, −0.15 — движение навстречу.
 *
 * Кадры считаются только пока блок на экране и пока он реально едет:
 * бесконечный requestAnimationFrame на невидимом блоке греет телефон
 * и ничего не показывает.
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
    let visible = false;

    const frame = () => {
      const rect = el.getBoundingClientRect();
      // Ноль — когда середина блока на середине экрана.
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const target = -fromCenter * speed;
      current += (target - current) * 0.12;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;

      // Доехали и стоим — кадры больше не нужны, ждём следующей прокрутки.
      if (!visible || Math.abs(target - current) < 0.05) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
