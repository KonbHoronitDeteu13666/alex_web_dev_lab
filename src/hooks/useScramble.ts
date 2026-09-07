"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "▚▞█▓▒░/\|<>=+*#АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ01";

/**
 * Расшифровка текста: буквы проявляются слева направо,
 * остальные позиции мигают случайными глифами.
 */
export function useScramble(text: string, speed = 28) {
  const [out, setOut] = useState(text);
  const timer = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) window.clearInterval(timer.current);

    let frame = 0;
    timer.current = window.setInterval(() => {
      const revealed = frame / 2;
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (i < revealed || ch === " ") return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      frame += 1;
      if (revealed >= text.length && timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
        setOut(text);
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    setOut(text);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [text]);

  return { out, run };
}
