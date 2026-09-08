import Link from "next/link";
import { NAV, ROUTES, type RouteKey } from "@/lib/routes";
import { site } from "@/data/site";

/**
 * Закреплённая шапка. Здесь живёт единственная на весь сайт кнопка Telegram —
 * в карточках тарифов и в подвале её сознательно нет.
 */
export default function Topline({ current }: { current?: RouteKey }) {
  return (
    <header className="sticky top-0 z-50 border-b border-mint/10 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5 md:px-10">
        <Link href={ROUTES.home} className="flex items-center gap-2.5">
          <span className="beat h-[7px] w-[7px] rounded-full bg-mint" />
          <span className="font-mono text-xs tracking-[0.14em] uppercase">
            {site.name}
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
                  ? "bg-mint/10 text-mint"
                  : "text-dim hover:bg-mint/5 hover:text-ink"
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
          className="ml-auto rounded-full bg-mint px-5 py-2.5 font-mono text-[11.5px] tracking-[0.14em] whitespace-nowrap text-bg uppercase shadow-[0_0_28px_-6px] shadow-mint/70 transition-all hover:shadow-[0_0_38px_-4px] hover:shadow-mint md:ml-0"
        >
          {site.contact.label}
        </a>
      </div>
    </header>
  );
}
