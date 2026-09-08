import type { DemoScene as SceneKind } from "@/data/tiers";

/**
 * Живой макет возможности пакета: проволочная сцена в рамке браузера.
 * В сценах ходит курсор, набирается текст, перестраиваются сетки —
 * человек видит не картинку, а то, как это работает.
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

/** Адрес в строке браузера — свой у каждой сцены. */
const URLS: Record<SceneKind, string> = {
  scroll: "vash-sait.ru",
  form: "vash-sait.ru/#zayavka",
  catalog: "vash-sait.ru/katalog",
  parallax: "vash-sait.ru",
  pages: "vash-sait.ru/uslugi",
  admin: "vash-sait.ru/admin",
  filters: "vash-sait.ru/katalog?filtr",
  blog: "vash-sait.ru/blog",
  account: "vash-sait.ru/kabinet",
  dashboard: "vash-sait.ru/admin/otchety",
};

export function sceneCaption(kind: SceneKind) {
  return CAPTIONS[kind];
}

export default function DemoScene({ kind }: { kind: SceneKind }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-mint/12 bg-bg/80 shadow-[inset_0_1px_0_rgba(232,244,241,0.06)]">
      {/* строка браузера с адресом */}
      <div className="flex items-center gap-1.5 border-b border-line bg-panel-2/70 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
        <span className="ml-2 flex-1 truncate rounded-sm bg-bg/70 px-2 py-0.5 font-mono text-[8px] tracking-wide text-dim-2">
          {URLS[kind]}
        </span>
      </div>

      <div className="relative h-[calc(100%-2.1rem)] p-3">
        <Scene kind={kind} />
      </div>
    </div>
  );
}

/* ---------- курсор, общий для сцен ---------- */

function Cursor({
  from,
  to,
  back,
  duration = "5s",
}: {
  from: [string, string];
  to: [string, string];
  back?: [string, string];
  duration?: string;
}) {
  const style = {
    "--x1": from[0],
    "--y1": from[1],
    "--x2": to[0],
    "--y2": to[1],
    "--x3": (back ?? from)[0],
    "--y3": (back ?? from)[1],
    "--dur": duration,
  } as React.CSSProperties;

  return (
    <span
      aria-hidden
      className="demo-cursor pointer-events-none absolute top-0 left-0 z-20"
      style={style}
    >
      <span className="relative block">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path
            d="M1 1L1 14.5L4.8 11L7.4 16.5L9.8 15.3L7.3 10.2L12 10.2L1 1Z"
            fill="#05080a"
            stroke="#3ff0c8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="demo-ping absolute top-3 left-1 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint"
          style={style}
        />
      </span>
    </span>
  );
}

/** Кусок страницы: заголовок, текст, ряды карточек. */
function PageBlocks({ tone = "line" }: { tone?: "line" | "mint" }) {
  return (
    <div className="grid gap-2">
      <span
        className={`h-4 w-2/3 rounded-sm ${tone === "mint" ? "bg-mint/70" : "bg-line"}`}
      />
      <span className="h-2 rounded-sm bg-line/80" />
      <span className="h-2 w-4/5 rounded-sm bg-line/80" />
      <div className="grid grid-cols-2 gap-2">
        <span className="h-9 rounded-md bg-panel-2" />
        <span className="h-9 rounded-md bg-panel-2" />
      </div>
      <span className="h-2 w-3/5 rounded-sm bg-line/80" />
      <div className="grid grid-cols-3 gap-2">
        <span className="h-7 rounded-md bg-panel-2" />
        <span className="h-7 rounded-md bg-panel-2" />
        <span className="h-7 rounded-md bg-panel-2" />
      </div>
    </div>
  );
}

function Scene({ kind }: { kind: SceneKind }) {
  switch (kind) {
    /* ---------- одна страница, прокрутка ---------- */
    case "scroll":
      return (
        <div className="relative h-full overflow-hidden">
          <div className="demo-marquee grid gap-2">
            <PageBlocks tone="mint" />
            <PageBlocks />
            <PageBlocks tone="mint" />
            <PageBlocks />
          </div>
          <span className="absolute top-0 right-0 h-full w-[3px] overflow-hidden rounded-full bg-line/60">
            <span className="demo-marquee block h-2/3 w-full rounded-full bg-mint/50" />
          </span>
        </div>
      );

    /* ---------- форма и отправка ---------- */
    case "form":
      return (
        <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2.5">
          <div className="flex items-center justify-between">
            <span className="h-3 w-24 rounded-sm bg-mint/70" />
            <span className="font-mono text-[8px] tracking-widest text-dim-2 uppercase">
              заявка
            </span>
          </div>

          <div className="grid content-start gap-2">
            {["имя", "телефон", "задача"].map((field, i) => (
              <span
                key={field}
                className="demo-focus relative flex h-6 items-center overflow-hidden rounded-md border border-line bg-panel-2/70 px-2"
                style={{ animationDelay: `${i * 0.45}s` }}
              >
                <span
                  className="demo-type h-1.5 rounded-full bg-dim/50"
                  style={{ animationDelay: `${i * 0.45}s` }}
                />
                <span
                  className="demo-caret ml-0.5 h-3 w-px bg-mint"
                  style={{ animationDelay: `${i * 0.45}s` }}
                />
              </span>
            ))}
          </div>

          <div className="relative flex items-center gap-2">
            <span className="demo-press h-7 flex-1 rounded-md bg-mint shadow-[0_0_18px_-4px] shadow-mint/70" />
            <span className="relative h-7 w-7 rounded-md border border-mint/40 bg-panel-2">
              <span className="demo-badge absolute -top-1 -right-1 h-3 w-3 rounded-full bg-mint" />
            </span>
            <span className="demo-fly absolute bottom-1 left-1/3 h-3 w-4 rounded-[2px] border border-mint bg-mint/25" />
          </div>

          <Cursor
            from={["18%", "42%"]}
            to={["24%", "88%"]}
            back={["70%", "70%"]}
          />
        </div>
      );

    /* ---------- каталог ---------- */
    case "catalog":
      return (
        <div className="relative grid h-full grid-cols-3 content-start gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`grid gap-1 rounded-md border border-line bg-panel-2/70 p-1.5 ${
                i === 4 ? "demo-raise" : "demo-drop"
              }`}
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              <span className="h-6 rounded-sm bg-line/70" />
              <span className="h-1.5 w-4/5 rounded-full bg-dim/40" />
              <span className="h-1.5 w-1/2 rounded-full bg-mint/70" />
            </span>
          ))}
          <Cursor
            from={["6%", "12%"]}
            to={["50%", "48%"]}
            back={["86%", "80%"]}
          />
        </div>
      );

    /* ---------- параллакс ---------- */
    case "parallax":
      return (
        <div className="relative h-full overflow-hidden rounded-md bg-panel-2/40">
          <span
            className="demo-layer absolute inset-x-3 top-3 grid gap-5"
            style={{ "--amp": "6px" } as React.CSSProperties}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-7 rounded-md bg-line/60" />
            ))}
          </span>
          <span
            className="demo-layer absolute inset-x-6 top-7 grid gap-8"
            style={
              {
                "--amp": "14px",
                animationDelay: "-1.2s",
              } as React.CSSProperties
            }
          >
            {[0, 1].map((i) => (
              <span key={i} className="h-9 rounded-md bg-mint/20" />
            ))}
          </span>
          <span
            className="demo-layer absolute inset-x-10 top-12"
            style={
              {
                "--amp": "24px",
                animationDelay: "-2.4s",
              } as React.CSSProperties
            }
          >
            <span className="block h-12 rounded-lg bg-mint/45 shadow-[0_0_30px_-6px] shadow-mint/70" />
          </span>
        </div>
      );

    /* ---------- несколько страниц ---------- */
    case "pages":
      return (
        <div className="relative grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="demo-tab h-2 flex-1 rounded-full bg-line"
                style={{ animationDelay: `${i * 1.2}s` }}
              />
            ))}
          </div>
          <div className="relative overflow-hidden rounded-md border border-line bg-panel-2/40">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="demo-page absolute inset-0 grid content-start gap-2 p-2.5"
                style={{ animationDelay: `${i * 2}s` }}
              >
                <span className="h-3 w-20 rounded-sm bg-mint/70" />
                <span className="h-1.5 rounded-full bg-line" />
                <span className="h-1.5 w-2/3 rounded-full bg-line" />
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <span className="h-8 rounded-md bg-line/60" />
                  <span className="h-8 rounded-md bg-line/60" />
                </div>
              </div>
            ))}
          </div>
          <Cursor
            from={["10%", "6%"]}
            to={["58%", "6%"]}
            back={["88%", "6%"]}
            duration="6s"
          />
        </div>
      );

    /* ---------- админка ---------- */
    case "admin":
      return (
        <div className="relative grid h-full grid-cols-[30%_1fr] gap-2">
          <div className="grid content-start gap-1.5 rounded-md border border-line bg-panel-2/60 p-1.5">
            <span className="h-2 w-3/4 rounded-full bg-mint/60" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1.5 rounded-full bg-line" />
            ))}
          </div>

          <div className="relative grid content-start gap-2 rounded-md border border-line bg-panel-2/40 p-2">
            <span className="h-2 w-16 rounded-full bg-dim/40" />
            <span className="demo-focus flex h-6 items-center overflow-hidden rounded-md border border-line bg-bg/70 px-2">
              <span className="demo-type h-1.5 rounded-full bg-mint/60" />
              <span className="demo-caret ml-0.5 h-3 w-px bg-mint" />
            </span>
            <span className="h-1.5 w-3/4 rounded-full bg-line" />
            <span className="demo-press mt-1 h-6 w-24 rounded-md bg-mint shadow-[0_0_18px_-4px] shadow-mint/70" />

            <span className="demo-toast absolute right-2 bottom-2 rounded-md border border-mint/40 bg-bg/90 px-2 py-1 font-mono text-[8px] tracking-widest text-mint uppercase">
              сохранено
            </span>
          </div>

          <Cursor
            from={["40%", "20%"]}
            to={["46%", "74%"]}
            back={["80%", "40%"]}
          />
        </div>
      );

    /* ---------- фильтры ---------- */
    case "filters":
      return (
        <div className="relative grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex items-center gap-1.5">
            {["до 5 тыс", "в наличии", "новые"].map((label, i) => (
              <span
                key={label}
                className="demo-chip rounded-full border px-2 py-[3px] font-mono text-[7.5px] tracking-wide"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {label}
              </span>
            ))}
            <span className="ml-auto flex h-4 w-14 items-center rounded-full border border-mint/30 bg-bg/60 px-1.5">
              <span className="h-1 w-full rounded-full bg-dim-2/50" />
            </span>
          </div>

          <div className="grid grid-cols-3 content-start gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={`h-11 rounded-md border border-line bg-panel-2/70 ${
                  i % 3 === 2 ? "demo-cut" : ""
                }`}
                style={{ animationDelay: `${(i % 3) * 0.12}s` }}
              />
            ))}
          </div>

          <Cursor
            from={["8%", "60%"]}
            to={["14%", "8%"]}
            back={["62%", "50%"]}
            duration="5.5s"
          />
        </div>
      );

    /* ---------- блог ---------- */
    case "blog":
      return (
        <div className="relative h-full overflow-hidden">
          <div className="demo-marquee-slow grid gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="grid grid-cols-[32%_1fr] gap-2 rounded-md border border-line bg-panel-2/50 p-1.5"
              >
                <span className="h-10 rounded-sm bg-line/70" />
                <span className="grid content-start gap-1">
                  <span className="h-1.5 w-3/4 rounded-full bg-mint/60" />
                  <span className="h-1.5 rounded-full bg-line" />
                  <span className="h-1.5 w-2/3 rounded-full bg-line" />
                  <span className="mt-0.5 h-1 w-10 rounded-full bg-dim-2/40" />
                </span>
              </span>
            ))}
          </div>
        </div>
      );

    /* ---------- личный кабинет ---------- */
    case "account":
      return (
        <div className="relative grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="flex items-center gap-2 rounded-md border border-mint/25 bg-panel-2/60 p-2">
            <span className="h-7 w-7 rounded-full border border-mint/50 bg-mint/15" />
            <span className="grid gap-1">
              <span className="block h-1.5 w-20 rounded-full bg-dim/50" />
              <span className="block h-1.5 w-12 rounded-full bg-line" />
            </span>
            <span className="ml-auto h-4 w-12 rounded-full border border-mint/30 bg-mint/10" />
          </div>

          <div className="grid content-start gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="flex items-center gap-2 rounded-md border border-line bg-panel-2/50 px-2 py-2"
              >
                <span className="h-1.5 flex-1 rounded-full bg-line" />
                <span className="h-2 w-14 overflow-hidden rounded-full bg-line/60">
                  <span
                    className="demo-status block h-full rounded-full"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                </span>
              </span>
            ))}
          </div>
        </div>
      );

    /* ---------- дашборд ---------- */
    case "dashboard":
      return (
        <div className="relative grid h-full grid-rows-[auto_1fr] gap-2">
          <div className="grid grid-cols-3 gap-2">
            {["заявки", "конверсия", "средний чек"].map((label, i) => (
              <span
                key={label}
                className="grid gap-1 rounded-md border border-line bg-panel-2/60 p-1.5"
              >
                <span className="font-mono text-[7px] tracking-wide text-dim-2">
                  {label}
                </span>
                <span
                  className="demo-drop h-2.5 w-2/3 rounded-sm bg-mint/70"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </span>
            ))}
          </div>

          <div className="relative grid grid-rows-[1fr_auto] gap-2 rounded-md border border-line bg-panel-2/40 p-2">
            <svg
              viewBox="0 0 120 40"
              className="h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 34 L22 26 L42 30 L62 16 L82 20 L102 6 L118 10"
                fill="none"
                stroke="#3ff0c8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="demo-draw"
              />
            </svg>

            <div className="flex h-10 items-end gap-1.5">
              {[0.4, 0.65, 0.5, 0.85, 0.6, 1, 0.75].map((height, i) => (
                <span
                  key={i}
                  className="demo-grow flex-1 rounded-t-sm bg-mint/45"
                  style={
                    {
                      "--h": `${height * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>
      );
  }
}
