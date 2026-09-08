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
 *
 * Все запущенные анимации держим под рукой и гасим перед каждой новой.
 * Затухание при закрытии идёт с fill: forwards — без отмены оно осталось бы
 * на элементе навсегда, и следующее открытие показало бы только затемнённую
 * подложку: ::backdrop рисуется отдельно и прозрачность окна на него не влияет.
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
  /** Окно уже развёрнуто: второй раз анимацию открытия не запускаем. */
  const shown = useRef(false);
  const running = useRef<Animation[]>([]);
  /** Номер текущего открытия: по нему опоздавшее закрытие понимает,
      что окно уже переоткрыли, и не лезет его закрывать. */
  const cycle = useRef(0);

  /** Снимает следы предыдущих анимаций, включая залипший fill. */
  const stopAnimations = useCallback(() => {
    for (const animation of running.current) animation.cancel();
    running.current = [];
  }, []);

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
    if (!dialog?.open) return;

    stopAnimations();

    const steps = frames();
    if (!steps || !card || reduced()) {
      dialog.close();
      return;
    }

    const fade = dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CLOSE_MS,
      easing: "ease-in",
      fill: "forwards",
    });
    const back = card.animate([steps[1], steps[0]], {
      duration: CLOSE_MS,
      easing: "ease-in",
    });
    running.current = [fade, back];

    // Закрытие не должно зависеть от одного события: если кадры перестанут
    // идти (вкладка ушла в фон, система придушила анимации), onfinish
    // не придёт, и окно останется висеть невидимым поверх страницы.
    const token = cycle.current;
    const shut = () => {
      if (cycle.current !== token || !dialog.open) return;
      // Сначала закрываем — окно исчезает, — и только потом снимаем заливку,
      // иначе на один кадр мелькнёт полностью непрозрачная карточка.
      dialog.close();
      stopAnimations();
    };
    back.onfinish = shut;
    window.setTimeout(shut, CLOSE_MS + 120);
  }, [frames, stopAnimations]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      // Повторный вызов при том же открытом окне (сменился origin) ничего
      // не переигрывает: анимация открытия одна на одно открытие.
      if (shown.current) return;
      shown.current = true;

      // Могли нажать по карточке, пока окно ещё складывалось: гасим
      // незаконченное закрытие, иначе оно доиграет и закроет окно.
      cycle.current += 1;
      stopAnimations();
      if (!dialog.open) dialog.showModal();

      const steps = frames();
      const card = cardRef.current;
      if (steps && card && !reduced()) {
        running.current = [
          card.animate(steps, { duration: OPEN_MS, easing: EASING }),
          dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: OPEN_MS,
            easing: EASING,
          }),
        ];
      }
      return;
    }

    shown.current = false;
    if (dialog.open) close();
  }, [open, frames, close, stopAnimations]);

  // Уходим со страницы с открытым окном — за собой прибираем.
  useEffect(() => stopAnimations, [stopAnimations]);

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
