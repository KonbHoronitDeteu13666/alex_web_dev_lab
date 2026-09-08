import Tilt from "@/components/motion/Tilt";

/**
 * Первый экран справа: ноутбук в перспективе, внутри которого страница
 * собирает себя — прилетает шапка, встают блоки, разворачивается каталог,
 * появляется форма. Сцена слегка поворачивается за курсором.
 *
 * Это одновременно метафора работы и её демонстрация: то же, что человек
 * получит, только в миниатюре.
 *
 * Разметка серверная: в браузер уезжает только обёртка Tilt с обработчиком
 * курсора, а полторы сотни строк каркаса ноутбука остаются на сервере.
 */
export default function HeroStage() {
  return (
    <div aria-hidden className="relative select-none">
      {/* свечение под сценой */}
      <span
        className="orb drift"
        style={{
          top: "10%",
          left: "6%",
          width: "30rem",
          height: "30rem",
          background:
            "radial-gradient(circle, rgb(63 240 200 / 0.24) 0%, transparent 68%)",
        }}
      />

      <div style={{ perspective: "1200px" }} className="relative">
        <Tilt>
          {/* корпус экрана */}
          <div className="relative rounded-[14px] border border-mint/20 bg-panel p-2.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,1),0_0_60px_-24px_rgba(63,240,200,0.5)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-line bg-bg">
              {/* верхняя строка окна */}
              <div className="hero-build flex items-center gap-1.5 border-b border-line bg-panel-2/70 px-2.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-dim-2/60" />
                <span className="ml-2 h-2 flex-1 rounded-sm bg-line/80" />
              </div>

              {/* страница собирает себя */}
              <div className="grid gap-2 p-3">
                <div className="hero-build flex items-center gap-2" style={{ animationDelay: "0.25s" }}>
                  <span className="h-2 w-14 rounded-sm bg-mint/70" />
                  <span className="ml-auto h-1.5 w-8 rounded-full bg-line" />
                  <span className="h-1.5 w-8 rounded-full bg-line" />
                  <span className="h-4 w-12 rounded-full bg-mint/80" />
                </div>

                <div className="hero-build grid gap-1.5" style={{ animationDelay: "0.5s" }}>
                  <span className="h-4 w-3/5 rounded-sm bg-ink/25" />
                  <span className="h-4 w-2/5 rounded-sm bg-mint/60" />
                  <span className="mt-1 h-1.5 w-4/5 rounded-full bg-line" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="hero-build grid gap-1 rounded-md border border-line bg-panel-2/70 p-1.5"
                      style={{ animationDelay: `${0.8 + i * 0.12}s` }}
                    >
                      <span className="h-5 rounded-sm bg-line/70" />
                      <span className="h-1 w-3/4 rounded-full bg-dim/40" />
                      <span className="h-1 w-1/2 rounded-full bg-mint/70" />
                    </span>
                  ))}
                </div>

                <div
                  className="hero-build grid grid-cols-[1fr_auto] items-center gap-2 rounded-md border border-mint/25 bg-panel-2/60 p-2"
                  style={{ animationDelay: "1.3s" }}
                >
                  <span className="grid gap-1">
                    <span className="block h-1.5 w-2/3 rounded-full bg-line" />
                    <span className="block h-1.5 w-1/3 rounded-full bg-line" />
                  </span>
                  <span className="h-5 w-14 rounded-md bg-mint shadow-[0_0_16px_-3px] shadow-mint/70" />
                </div>
              </div>

              {/* полоса сборки и отражение по стеклу */}
              <span className="hero-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,transparent,rgba(63,240,200,0.14),transparent)]" />
              <span className="hero-shine pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 bg-[linear-gradient(105deg,transparent,rgba(232,244,241,0.35),transparent)]" />
            </div>
          </div>

          {/* основание ноутбука */}
          <div
            className="mx-auto h-2.5 w-[112%] -translate-x-[5%] rounded-b-[10px] border-x border-b border-mint/15 bg-linear-to-b from-panel-2 to-bg"
            style={{ transform: "translateZ(-14px) rotateX(-18deg)" }}
          />
          <div className="mx-auto mt-1 h-1 w-1/3 rounded-full bg-mint/25 blur-[2px]" />
        </Tilt>
      </div>
    </div>
  );
}
