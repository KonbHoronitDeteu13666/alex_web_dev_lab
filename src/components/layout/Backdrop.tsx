/**
 * Подложка сайта: почти чёрный фон и светящиеся пятна,
 * которые медленно плывут. Свечение живёт за содержимым и даёт глубину,
 * поэтому панели поверх читаются как объекты, а не как плоские прямоугольники.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-bg" />

      {/* пятна света: два мятных и одно холодное, разной скорости */}
      <span
        className="orb drift"
        style={{
          top: "-14%",
          left: "8%",
          width: "46rem",
          height: "46rem",
          background:
            "radial-gradient(circle, rgb(63 240 200 / 0.20) 0%, transparent 68%)",
        }}
      />
      <span
        className="orb drift-slow"
        style={{
          top: "38%",
          right: "-12%",
          width: "40rem",
          height: "40rem",
          background:
            "radial-gradient(circle, rgb(22 191 160 / 0.16) 0%, transparent 70%)",
        }}
      />
      <span
        className="orb drift"
        style={{
          bottom: "-18%",
          left: "26%",
          width: "52rem",
          height: "52rem",
          background:
            "radial-gradient(circle, rgb(63 240 200 / 0.10) 0%, transparent 72%)",
          animationDelay: "-8s",
        }}
      />

      {/* виньетка, чтобы края уходили в темноту */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_40%,transparent_45%,rgba(2,4,5,0.85)_100%)]" />
    </div>
  );
}
