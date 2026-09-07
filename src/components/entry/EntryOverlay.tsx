"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { siteContent } from "@/data/site-content";
import EnterButton from "./EnterButton";
import BootScreen from "./BootScreen";

type Phase = "start" | "play" | "boot";

/** Скорость ролика: посадка в кресло на обычной скорости тянется. */
const PLAYBACK_RATE = 1.4;

/** Оверлей не исчезает мгновенно — уходит плавно, чтобы сайт не выпрыгивал. */
const FADE_MS = 700;

const SESSION_KEY = "entered";

/**
 * Пока идёт отладка, вход должен проигрываться при каждой перезагрузке.
 * В режиме разработки это включено само; на боевом сайте — только если
 * явно выставить NEXT_PUBLIC_REPLAY_ENTRY=1. Значение 0 выключает и в dev.
 */
const REPLAY_ENTRY =
  process.env.NEXT_PUBLIC_REPLAY_ENTRY === "1" ||
  (process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_REPLAY_ENTRY !== "0");

/* --- отметка о пройденном входе живёт в sessionStorage --- */

const listeners = new Set<() => void>();

// В режиме повтора отметка живёт только в памяти вкладки: перезагрузка
// сбрасывает её, и вход начинается заново.
let dismissedInMemory = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readEntered(): boolean {
  if (REPLAY_ENTRY) return dismissedInMemory;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Приватный режим или заблокированное хранилище — считаем, что вход не пройден.
    return false;
  }
}

function markEntered() {
  // В режиме повтора отметку не пишем: оверлей снимается, но следующая
  // загрузка снова начнётся со стартового кадра.
  if (REPLAY_ENTRY) {
    dismissedInMemory = true;
    listeners.forEach((listener) => listener());
    return;
  }
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Не смогли запомнить — вход просто покажется ещё раз.
  }
  listeners.forEach((listener) => listener());
}

/**
 * Вход показывается оверлеем поверх готовой главной, а не отдельным маршрутом:
 * страница уже отрисована под ним, а возврат в раздел из меню не проигрывает
 * ролик заново. Новая вкладка показывает вход снова.
 *
 * На сервере оверлея нет: значение из sessionStorage известно только в браузере.
 */
export default function EntryOverlay() {
  const entered = useSyncExternalStore(subscribe, readEntered, () => true);
  const [phase, setPhase] = useState<Phase>("start");
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Прокрутку под оверлеем не блокируем совсем: любое переключение
  // overflow меняет наличие полосы, а вместе с ней ширину страницы —
  // именно от этого содержимое дёргалось вбок в момент показа сайта.
  // Оверлей и так закрывает экран целиком, а точку прокрутки
  // возвращаем в начало, пока он ещё виден.
  const finish = useCallback(() => {
    window.scrollTo(0, 0);
    setFading(true);
    window.setTimeout(markEntered, FADE_MS);
  }, []);

  const enter = useCallback(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setPhase("boot");
      return;
    }
    setPhase("play");
    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
    // Если браузер отказал в воспроизведении, не оставляем человека
    // перед застывшим кадром — сразу к загрузке.
    videoRef.current?.play().catch(() => setPhase("boot"));
  }, []);

  if (entered) return null;

  return (
    <div
      className="fixed inset-0 z-100 overflow-hidden bg-[#05070c] transition-opacity ease-out"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
    >
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        preload="auto"
        poster={siteContent.scene.poster}
        onEnded={() => setPhase("boot")}
        onError={() => setPhase("boot")}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={siteContent.scene.webm} type="video/webm" />
        <source src={siteContent.scene.mp4} type="video/mp4" />
      </video>

      {phase === "start" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_50%,rgba(5,7,12,0.78),transparent_78%)]" />
          <div className="relative">
            <EnterButton onClick={enter} />
          </div>
        </div>
      )}

      {phase === "play" && (
        <button
          type="button"
          onClick={() => {
            videoRef.current?.pause();
            setPhase("boot");
          }}
          className="absolute right-7 bottom-6 rounded-lg border border-line bg-bg/60 px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase transition-colors hover:border-dim hover:text-ink"
        >
          Пропустить
        </button>
      )}

      {phase === "boot" && <BootScreen onDone={finish} />}
    </div>
  );
}
