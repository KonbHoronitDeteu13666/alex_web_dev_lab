"use client";

import { useCallback, useEffect, useRef } from "react";

/** Разворот длится чуть дольше обычного перехода: путь большой. */
const OPEN_MS = 220;
const CLOSE_MS = 180;
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Каркас модального окна: карточка вырастает из того элемента, по которому
 * кликнули, и складывается обратно при закрытии.
 *
 * Сам <dialog> растянут на весь экран и прозрачен — карточку центрирует
 * разметка, поэтому окно стоит посередине на любом экране.
 */
export default function ModalShell({
  open,
  onClose,
  origin,
  width = "min(1120px, 100%)",
  children,
}: {
  open: boolean;
  onClose: () => void;
  /** Положение нажатой карточки на экране в момент клика. */
  origin: DOMRect | null;
  width?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  /** Шаги превращения: из прямоугольника карточки в прямоугольник окна. */
  const frames = useCallback((): Keyframe[] | null => {
    const card = cardRef.current;
    if (!card || !origin) return null;

    const to = card.getBoundingClientRect();
    if (!to.width || !to.height) return null;

    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    const sx = origin.width / to.width;
    const sy = origin.height / to.height;

    return [
      {
        transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
        opacity: 0.35,
      },
      { transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
    ];
  }, [origin]);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Закрытие: складываем карточку обратно и только потом закрываем окно. */
  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const card = cardRef.current;
    if (!dialog?.open || closing.current) return;

    const steps = frames();
    if (!steps || reduced()) {
      dialog.close();
      return;
    }

    closing.current = true;
    dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CLOSE_MS,
      easing: "ease-in",
      fill: "forwards",
    });
    const back = card!.animate([steps[1], steps[0]], {
      duration: CLOSE_MS,
      easing: "ease-in",
    });
    back.onfinish = () => {
      closing.current = false;
      dialog.close();
    };
  }, [frames]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      const steps = frames();
      if (steps && !reduced()) {
        cardRef.current?.animate(steps, { duration: OPEN_MS, easing: EASING });
        dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: OPEN_MS,
          easing: EASING,
        });
      }
    }

    if (!open && dialog.open) close();
  }, [open, frames, close]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        // Esc: сначала складываем окно, потом отдаём событие наружу.
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      className="modal-shell text-ink backdrop:bg-black/80 backdrop:backdrop-blur-md"
    >
      {/* Клик по пустому месту вокруг карточки закрывает окно. */}
      <div
        className="flex h-full w-full items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={cardRef}
          style={{ width }}
          className="panel grid max-h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden shadow-[0_0_120px_-40px_rgba(63,240,200,0.55)]"
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}
