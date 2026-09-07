import type { MockRow } from "@/data/tiers";

/**
 * Превью-макет пакета. Рисуется из данных, а не из разметки,
 * поэтому все восемь превью говорят на одном визуальном языке.
 */
export default function TierMock({ rows }: { rows: MockRow[] }) {
  return (
    <div
      aria-hidden
      className="grid aspect-[4/5] content-start gap-[5px] rounded-lg border border-line bg-bg/50 p-2"
    >
      {rows.map((row, i) => {
        if (row.kind === "bar") {
          const tone =
            row.accent === "yellow"
              ? "bg-yellow/75"
              : row.accent === "teal"
                ? "bg-teal/60"
                : "bg-line";
          return (
            <span
              key={i}
              className={`rounded-sm ${tone} ${row.tall ? "h-4" : "h-[7px]"}`}
            />
          );
        }

        if (row.kind === "grid") {
          return (
            <div
              key={i}
              className={`grid gap-[5px] ${row.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}
            >
              {Array.from({ length: row.cols }).map((_, cell) => (
                <span
                  key={cell}
                  className={`h-5 rounded-sm border border-line ${row.filled ? "bg-panel-2" : ""}`}
                />
              ))}
            </div>
          );
        }

        return (
          <div key={i} className="grid grid-cols-[22px_1fr] gap-[5px]">
            <div className="grid content-start gap-1">
              {Array.from({ length: 3 }).map((_, line) => (
                <span key={line} className="h-[5px] rounded-sm bg-line" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[5px]">
              {Array.from({ length: 4 }).map((_, cell) => (
                <span
                  key={cell}
                  className="h-5 rounded-sm border border-line bg-panel-2"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
