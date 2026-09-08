import Link from "next/link";
import { NAV, ROUTES, type RouteKey } from "@/lib/routes";
import { site } from "@/data/site";

/**
 * Закреплённая шапка. Здесь живёт единственная на весь сайт кнопка Telegram —
 * в карточках тарифов и в подвале её сознательно нет.
 *
 * На узких экранах разделы не прячутся в меню, а лежат лентой под логотипом:
 * их всего пять, и одно касание надёжнее раскрывающегося списка.
 */
export default function Topline({ current }: { current?: RouteKey }) {
  return (
    <header className="sticky top-0 z-50 border-b border-mint/10 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-4 py-3.5 md:gap-6">
          <Link
            href={ROUTES.home}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="beat h-[7px] w-[7px] shrink-0 rounded-full bg-mint" />
            <span className="font-mono text-[11px] whitespace-nowrap uppercase md:text-xs md:tracking-[0.14em]">
              {site.name}
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.key} item={item} current={current} />
            ))}
          </nav>

          <a
            href={site.contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 rounded-full bg-mint px-4 py-2 font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-bg uppercase shadow-[0_0_28px_-6px] shadow-mint/70 transition-all hover:shadow-[0_0_38px_-4px] hover:shadow-mint md:ml-0 md:px-5 md:py-2.5 md:text-[11.5px] md:tracking-[0.14em]"
          >
            {site.contact.label}
          </a>
        </div>

        {/* разделы на узких экранах: переносятся, ничего не прячется */}
        <nav className="flex flex-wrap gap-1 pb-2.5 md:hidden">
          {NAV.map((item) => (
            <NavLink key={item.key} item={item} current={current} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  item,
  current,
}: {
  item: (typeof NAV)[number];
  current?: RouteKey;
}) {
  const active = current === item.key;

  return (
    <Link
      href={ROUTES[item.key]}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
        active ? "bg-mint/10 text-mint" : "text-dim hover:bg-mint/5 hover:text-ink"
      }`}
    >
      {item.label}
    </Link>
  );
}
