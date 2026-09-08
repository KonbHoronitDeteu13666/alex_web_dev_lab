"use client";

import { useEffect, useRef } from "react";

/**
 * Блок всплывает, когда доезжает до экрана. Само движение описано
 * в globals.css классом .reveal, здесь только момент показа.
 *
 * Наблюдатель один на всю страницу, а не по одному на блок: браузеру
 * дешевле считать пересечения пачкой.
 */

type Observed = Element & { dataset: DOMStringMap };

let observer: IntersectionObserver | null = null;

function show(el: Element) {
  el.setAttribute("data-shown", "true");
  observer?.unobserve(el);
}

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Видно — показываем. Уже уехало вверх — тоже показываем: иначе блок,
        // мимо которого проскочили рывком (восстановленная прокрутка, переход
        // по якорю), навсегда остался бы невидимым.
        if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
          show(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  return observer;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el: Observed | null = ref.current;
    if (!el) return;

    const io = ensureObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
