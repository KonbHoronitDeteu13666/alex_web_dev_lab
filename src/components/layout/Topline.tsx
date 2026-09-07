import Link from "next/link";
import { NAV, ROUTES, type RouteKey } from "@/lib/routes";
import { site } from "@/data/site";

/**
 * Закреплённая шапка. Здесь живёт единственная на весь сайт кнопка Telegram —
 * в карточках тарифов и в подвале её сознательно нет.
 */
export default function Topline({ current }: { current?: RouteKey }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5 md:px-10">
        <Link href={ROUTES.home} className="flex items-center gap-2.5">
          <span className="h-[7px] w-[7px] rounded-full bg-teal shadow-[0_0_10px_2px] shadow-teal/50" />
          <span className="font-mono text-xs tracking-[0.14em] uppercase">
            {site.brand}
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={ROUTES[item.key]}
              aria-current={current === item.key ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                current === item.key
                  ? "text-yellow"
                  : "text-dim hover:bg-panel hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto rounded-lg border border-yellow bg-yellow px-5 py-2.5 font-mono text-[11.5px] tracking-[0.14em] whitespace-nowrap text-bg uppercase transition-opacity hover:opacity-85 md:ml-0"
        >
          {site.contact.label}
        </a>
      </div>
    </header>
  );
}
