/**
 * Рамка стекла очков поверх всей страницы: засечки по углам, боковые рейки
 * с насечками, телеметрия в углах, строки развёртки и бегущая полоса сканирования.
 * Ничего не перехватывает — слой сквозной для мыши.
 */
export default function Glass() {
  const corners = [
    "left-3 top-3 border-l-2 border-t-2 md:left-5 md:top-5",
    "right-3 top-3 border-r-2 border-t-2 md:right-5 md:top-5",
    "left-3 bottom-3 border-l-2 border-b-2 md:left-5 md:bottom-5",
    "right-3 bottom-3 border-r-2 border-b-2 md:right-5 md:bottom-5",
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {/* глубина стекла */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_45%,transparent_58%,rgba(3,5,10,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_112%,rgba(55,212,200,0.10)_0%,transparent_70%)]" />

      {/* строки развёртки */}
      <div className="scanlines absolute inset-0 opacity-25" />

      {/* засечки по углам экрана */}
      {corners.map((position) => (
        <span
          key={position}
          className={`absolute h-6 w-6 border-teal/45 md:h-9 md:w-9 ${position}`}
        />
      ))}

      {/* боковые рейки с насечками */}
      <span className="ticks-y absolute top-[22%] bottom-[22%] left-5 hidden w-px opacity-60 md:block" />
      <span className="ticks-y absolute top-[22%] right-5 bottom-[22%] hidden w-px opacity-60 md:block" />

      {/* телеметрия по углам: неизменные подписи, без бегущих цифр */}
      <span className="absolute top-6 left-12 hidden font-mono text-[10px] tracking-[0.22em] text-teal/55 uppercase md:block">
        оптика · канал открыт
      </span>
      <span className="absolute top-6 right-12 hidden items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-teal/55 uppercase md:flex">
        синхронизация
        <span className="hud-blink inline-block h-1.5 w-1.5 rounded-full bg-teal" />
      </span>
      <span className="absolute bottom-6 left-12 hidden font-mono text-[10px] tracking-[0.22em] text-teal/40 uppercase md:block">
        режим просмотра
      </span>
      <span className="absolute right-12 bottom-6 hidden font-mono text-[10px] tracking-[0.22em] text-teal/40 uppercase md:block">
        v 1.0
      </span>
    </div>
  );
}
