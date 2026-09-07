import Link from "next/link";
import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import CategoryTile from "@/components/ui/CategoryTile";
import { ROUTES } from "@/lib/routes";
import { categoryOf, minPriceOf } from "@/data/tiers";

export default function NotFound() {
  return (
    <>
      <Glass />
      <Topline />

      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[60ch] pt-16 pb-10 text-center">
          <p className="on-glass price-glow font-display text-6xl leading-none font-bold text-yellow md:text-7xl">
            404
          </p>
          <h1 className="on-glass mt-5 font-display text-2xl font-medium">
            Сигнал потерян
          </h1>
          <p className="on-glass mt-3 text-ink/85">
            Раздел не отвечает — ссылка ведёт в пустоту. Очки на месте, канал
            открыт, можно вернуться назад.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={ROUTES.home}
              className="rounded-lg border border-yellow bg-yellow/10 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-yellow uppercase transition-colors hover:bg-yellow hover:text-bg"
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

        <div className="grid gap-4 md:grid-cols-2">
          <CategoryTile
            href={ROUTES.simple}
            title={categoryOf("simple").title}
            text="Четыре тарифа, одна страница, заявки на почту или в Telegram."
            basePrice={minPriceOf("simple")}
          />
          <CategoryTile
            href={ROUTES.middle}
            title={categoryOf("middle").title}
            text="Четыре тарифа, до 15 страниц, админка, каталог, интеграции."
            basePrice={minPriceOf("middle")}
          />
        </div>
      </main>

      <FootNav />
    </>
  );
}
