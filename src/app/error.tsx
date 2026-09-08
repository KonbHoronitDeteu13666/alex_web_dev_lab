"use client";

import { useEffect } from "react";

/**
 * Аварийный экран. Пользователю показываем только человеческий текст:
 * стеки, пути и прочие внутренние детали наружу не выводим.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto grid min-h-dvh max-w-[60ch] place-items-center px-5 text-center">
      <div>
        <p className="font-display text-5xl leading-none font-bold text-mint">
          Сбой
        </p>
        <h1 className="mt-5 font-display text-2xl font-medium">
          Интерфейс не собрался
        </h1>
        <p className="mt-3 text-dim">
          Что-то пошло не так на нашей стороне. Попробуйте ещё раз — обычно
          помогает.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 rounded-lg border border-mint bg-mint/10 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-mint uppercase transition-colors hover:bg-mint hover:text-bg"
        >
          Повторить
        </button>
      </div>
    </main>
  );
}
