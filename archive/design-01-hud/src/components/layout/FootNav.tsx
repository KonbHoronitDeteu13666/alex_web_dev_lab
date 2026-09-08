import Link from "next/link";
import { NAV, ROUTES, type RouteKey } from "@/lib/routes";
import { site } from "@/data/site";

/** Нижняя навигация. Кнопки Telegram здесь нет — она одна, в шапке. */
export default function FootNav({ current }: { current?: RouteKey }) {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-7 md:px-10">
        {NAV.filter((item) => item.key !== current).map((item) => (
          <Link
            key={item.key}
            href={ROUTES[item.key]}
            className="on-glass text-sm text-dim transition-colors hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
        <span className="label on-glass ml-auto">
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
