import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import CategoryTiles from "@/components/ui/CategoryTiles";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[60ch] pt-16 pb-10 text-center">
        <p className=" accent-word font-display text-6xl leading-none font-bold text-mint md:text-7xl">
          404
        </p>
        <h1 className=" mt-5 font-display text-2xl font-medium">
          Сигнал потерян
        </h1>
        <p className=" mt-3 text-ink/85">
          Раздел не отвечает — ссылка ведёт в пустоту. Очки на месте, канал
          открыт, можно вернуться назад.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={ROUTES.home}
            className="rounded-lg border border-mint bg-mint/10 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-mint uppercase transition-colors hover:bg-mint hover:text-bg"
          >
            На главную
          </Link>
          <Link
            href={ROUTES.simple}
            className="rounded-lg border border-line px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-dim uppercase transition-colors hover:border-dim hover:text-ink"
          >
            К тарифам
          </Link>
        </div>
      </div>

      <CategoryTiles />
    </PageShell>
  );
}
