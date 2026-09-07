"use client";

import { useEffect, useRef } from "react";
import { useScramble } from "@/hooks/useScramble";

type Props = {
  text: string;
  className?: string;
  /** Запустить расшифровку, когда строка появится в экране. */
  onView?: boolean;
  /** Запускать при наведении. */
  onHover?: boolean;
};

export default function Scramble({ text, className = "", onView, onHover }: Props) {
  const { out, run } = useScramble(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!onView) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onView, run]);

  return (
    <span ref={ref} className={className} onPointerEnter={onHover ? run : undefined}>
      {out}
    </span>
  );
}
