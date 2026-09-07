import type { DemoScene as SceneKind } from "@/data/tiers";

/**
 * Живой макет возможности пакета: проволочная сцена внутри рамки браузера.
 * Анимации крутятся сами, пока сцена на экране.
 */

const CAPTIONS: Record<SceneKind, string> = {
  scroll: "одна страница, блоки проявляются при прокрутке",
  form: "заявка с формы уходит в Telegram",
  catalog: "каталог позиций с ценами",
  parallax: "слои двигаются с разной скоростью",
  pages: "несколько страниц, у каждой свой адрес",
  admin: "правка текста в админке, без разработчика",
  filters: "фильтры и поиск по каталогу",
  blog: "лента статей, которую ведёте сами",
  account: "личный кабинет: история обращений",
  dashboard: "дашборд: заявки по неделям",
};

export function sceneCaption(kind: SceneKind) {
  return CAPTIONS[kind];
}

export default function DemoScene({ kind }: { kind: SceneKind }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-teal/15 bg-bg/70">
      {/* строка браузера */}
      <div className="flex items-center gap-1.5 border-b border-line/70 bg-panel-2/60 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2" />
        <span className="ml-2 h-2 flex-1 rounded-sm bg-line/80" />
      </div>

      <div className="relative h-[calc(100%-2.25rem)] p-3">
        <Scene kind={kind} />
      </div>
    </div>
  );
}

function Scene({ kind }: { kind: SceneKind }) {
  switch (kind) {
    /* ---------- одна страница, прокрутка ---------- */
    case "scroll":
      return (
        <div className="h-full overflow-hidden">
          <div className="demo-scroll grid gap-2">
            {["h", "t", "g", "t", "g", "h", "t", "g"].map((type, i) => (
              <Block key={i} type={type} />
            ))}
          </div>
        </div>
      );

    /* ---------- форма и отправка ---------- */
    case "form":
      return (
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-2">
          <span className="h-3 w-24 rounded-sm bg-yellow/70" />
          <div className="grid content-start gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="demo-field h-6 rounded-sm border border-line bg-panel-2/70"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </div>
          <div className="relative flex items-center gap-2">
            <span className="demo-send h-6 w-24 rounded-sm bg-yellow" />
            <span className="demo-fly ml-auto h-4 w-4 rotate-45 border border-teal bg-teal/25" />
          </div>
        </div>
      );

    /* ---------- каталог ---------- */
    case "catalog":
      return (
        <div className="grid h-full grid-cols-3 content-start gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="demo-pop grid h-11 gap-1 rounded-sm border border-line bg-panel-2/70 p-1"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="h-5 rounded-[2px] bg-line/80" />
              <span className="h-1.5 w-8 rounded-[2px] bg-yellow/70" />
            </span>
          ))}
        </div>
      );

    /* ---------- параллакс ---------- */
    case "parallax":
      return (
        <div className="relative h-full overflow-hidden rounded-sm bg-panel-2/40">
          <div className="demo-layer-slow absolute inset-x-0 top-4 grid gap-6 px-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-8 rounded-sm bg-line/60" />
            ))}
          </div>
          <div className="demo-layer-mid absolute inset-x-0 top-8 grid gap-10 px-6">
            {[0, 1].map((i) => (
              <span key={i} className="h-10 rounded-sm bg-teal/25" />
            ))}
          </div>
          <div className="demo-layer-fast absolute inset-x-0 top-12 px-10">
            <span className="block h-12 rounded-sm bg-yellow/45" />
          </div>
        </div>
      );

    /* ---------- несколько страниц ---------- */
    case "pages":
      return (
        <div className="grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="demo-tab h-2.5 flex-1 rounded-sm bg-line"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            ))}
          </div>
          <div className="relative overflow-hidden rounded-sm border border-line bg-panel-2/50">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="demo-page absolute inset-0 grid content-start gap-2 p-2"
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <span className="h-3 w-20 rounded-sm bg-yellow/70" />
                <span className="h-2 rounded-sm bg-line" />
                <span className="h-2 w-2/3 rounded-sm bg-line" />
                <span className="mt-1 grid grid-cols-2 gap-2">
                  <span className="h-8 rounded-sm bg-line/70" />
                  <span className="h-8 rounded-sm bg-line/70" />
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    /* ---------- админка ---------- */
    case "admin":
      return (
        <div className="grid h-full grid-cols-[28%_1fr] gap-2">
          <div className="grid content-start gap-1.5 rounded-sm border border-line bg-panel-2/60 p-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="demo-nav h-2 rounded-sm bg-line"
                style={{ animationDelay: `${i * 0.8}s` }}
              />
            ))}
          </div>
          <div className="grid content-start gap-2 rounded-sm border border-line bg-panel-2/40 p-2">
            <span className="h-2.5 w-16 rounded-sm bg-teal/50" />
            <span className="demo-type h-5 rounded-sm border border-teal/40 bg-bg/60" />
            <span className="h-2 w-3/4 rounded-sm bg-line" />
            <span className="demo-save mt-1 h-5 w-20 rounded-sm bg-yellow" />
          </div>
        </div>
      );

    /* ---------- фильтры ---------- */
    case "filters":
      return (
        <div className="grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="demo-chip h-4 w-12 rounded-full border border-line"
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            ))}
            <span className="ml-auto h-4 w-16 rounded-sm border border-teal/40 bg-bg/50" />
          </div>
          <div className="grid grid-cols-3 content-start gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="demo-filter h-10 rounded-sm border border-line bg-panel-2/70"
                style={{ animationDelay: `${(i % 3) * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      );

    /* ---------- блог ---------- */
    case "blog":
      return (
        <div className="h-full overflow-hidden">
          <div className="demo-feed grid gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="grid grid-cols-[34%_1fr] gap-2 rounded-sm border border-line bg-panel-2/50 p-1.5"
              >
                <span className="h-9 rounded-sm bg-line/80" />
                <span className="grid content-start gap-1">
                  <span className="h-2 w-3/4 rounded-sm bg-yellow/60" />
                  <span className="h-1.5 rounded-sm bg-line" />
                  <span className="h-1.5 w-2/3 rounded-sm bg-line" />
                </span>
              </span>
            ))}
          </div>
        </div>
      );

    /* ---------- личный кабинет ---------- */
    case "account":
      return (
        <div className="grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex items-center gap-2 rounded-sm border border-teal/25 bg-panel-2/60 p-2">
            <span className="h-6 w-6 rounded-full border border-teal/50 bg-teal/15" />
            <span className="grid gap-1">
              <span className="block h-2 w-20 rounded-sm bg-line" />
              <span className="block h-1.5 w-12 rounded-sm bg-line/70" />
            </span>
          </div>
          <div className="grid content-start gap-1.5">
            {["в работе", "принято", "завершено"].map((_, i) => (
              <span
                key={i}
                className="demo-row flex items-center gap-2 rounded-sm border border-line bg-panel-2/50 px-2 py-1.5"
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <span className="h-1.5 flex-1 rounded-sm bg-line" />
                <span className="h-2 w-10 rounded-full bg-teal/40" />
              </span>
            ))}
          </div>
        </div>
      );

    /* ---------- дашборд ---------- */
    case "dashboard":
      return (
        <div className="grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="grid gap-1 rounded-sm border border-line bg-panel-2/60 p-1.5"
              >
                <span className="h-1.5 w-8 rounded-sm bg-line" />
                <span className="h-3 w-10 rounded-sm bg-yellow/70" />
              </span>
            ))}
          </div>
          <div className="flex items-end gap-1.5 rounded-sm border border-line bg-panel-2/40 p-2">
            {[0.35, 0.6, 0.45, 0.8, 0.55, 0.95, 0.7].map((height, i) => (
              <span
                key={i}
                className="demo-bar flex-1 rounded-t-sm bg-teal/45"
                style={
                  {
                    "--h": `${height * 100}%`,
                    animationDelay: `${i * 0.12}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      );
  }
}

function Block({ type }: { type: string }) {
  if (type === "h") return <span className="h-4 rounded-sm bg-yellow/60" />;
  if (type === "g")
    return (
      <span className="grid grid-cols-2 gap-2">
        <span className="h-8 rounded-sm bg-line/70" />
        <span className="h-8 rounded-sm bg-line/70" />
      </span>
    );
  return <span className="h-2.5 rounded-sm bg-line" />;
}
