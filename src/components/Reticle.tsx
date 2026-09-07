"use client";

import { useEffect, useRef, useState } from "react";

/** Прицел вместо курсора. Включается только для мыши, на тач-экранах не нужен. */
export default function Reticle() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setActive(true);

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...pos };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = e.target as HTMLElement | null;
      setHot(!!el?.closest("a, button, summary, input, textarea, select"));
    };

    let raf = 0;
    const frame = () => {
      cur.x += (pos.x - cur.x) * 0.22;
      cur.y += (pos.y - cur.y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-90 hidden lg:block">
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ width: hot ? 42 : 22, height: hot ? 42 : 22 }}
      >
        <span className="absolute inset-0 rounded-full border border-cyan/70" />
        <span className="absolute left-1/2 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/80" />
        <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-cyan/80" />
        <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-cyan/80" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-cyan/80" />
      </div>
    </div>
  );
}
