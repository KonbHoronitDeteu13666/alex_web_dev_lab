"use client";

import { useEffect, useRef } from "react";

/**
 * Сцена слегка поворачивается за курсором. Клиентской здесь остаётся только
 * эта обёртка — сама разметка сцены приходит с сервера и в браузерный
 * пакет не попадает.
 *
 * Кадры считаются только пока сцена на экране и только там, где поворот
 * вообще уместен: на телефоне сцена скрыта, курсора нет, считать нечего.
 */
export default function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const allowed = window.matchMedia(
      "(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    let raf = 0;
    let visible = false;
    let stop = () => {};

    const run = () => {
      stop();
      if (!allowed.matches) return;

      // Целевой и сглаженный поворот: сцена догоняет курсор, а не дёргается.
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        target.x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        target.y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      };

      const frame = () => {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        el.style.transform = `rotateX(${(6 - current.y * 6).toFixed(2)}deg) rotateY(${(
          -14 +
          current.x * 8
        ).toFixed(2)}deg)`;
        raf = visible ? requestAnimationFrame(frame) : 0;
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      });
      io.observe(el);
      window.addEventListener("pointermove", onMove, { passive: true });

      stop = () => {
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        stop = () => {};
      };
    };

    run();
    allowed.addEventListener("change", run);

    return () => {
      allowed.removeEventListener("change", run);
      stop();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: "rotateX(6deg) rotateY(-14deg)",
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </div>
  );
}
