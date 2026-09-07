"use client";

import { useEffect, useRef } from "react";

/** Помечает элемент data-shown="true", когда он въезжает в экран. */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const t = setTimeout(() => el.setAttribute("data-shown", "true"), delay);
        io.disconnect();
        return () => clearTimeout(t);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
