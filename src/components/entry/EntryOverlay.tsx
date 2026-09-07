"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { site } from "@/data/site";
import EnterButton from "./EnterButton";
import BootScreen from "./BootScreen";

type Phase = "start" | "play" | "boot";

const SESSION_KEY = "entered";

/* --- отметка о пройденном входе живёт в sessionStorage --- */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readEntered(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Приватный режим или заблокированное хранилище — считаем, что вход не пройден.
    return false;
  }
}

function markEntered() {
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Пока оверлей на экране, страница под ним не прокручивается.
  useEffect(() => {
    if (entered) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const finish = useCallback(() => markEntered(), []);

  const enter = useCallback(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setPhase("boot");
      return;
    }
    setPhase("play");
    // Если браузер отказал в воспроизведении, не оставляем человека
    // перед застывшим кадром — сразу к загрузке.
    videoRef.current?.play().catch(() => setPhase("boot"));
  }, []);

  if (entered) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden bg-[#05070c]">
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        preload="auto"
        poster={site.scene.poster}
        onEnded={() => setPhase("boot")}
        onError={() => setPhase("boot")}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={site.scene.webm} type="video/webm" />
        <source src={site.scene.mp4} type="video/mp4" />
      </video>

      {phase === "start" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_62%,rgba(5,7,12,0.72),transparent_75%)]" />
          <div className="absolute bottom-[12%] left-1/2 grid -translate-x-1/2 justify-items-center gap-4 text-center">
            <p className="font-mono text-[11px] tracking-[0.24em] text-teal uppercase">
              {site.brand} · нейролинк готов
            </p>
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
