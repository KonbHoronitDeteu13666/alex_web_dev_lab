"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const nav = [
  { href: "#services", label: "услуги", code: "01" },
  { href: "#process", label: "процесс", code: "02" },
  { href: "#cases", label: "объекты", code: "03" },
  { href: "#faq", label: "справка", code: "04" },
];

export default function Header() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(`#${vis[0].target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.01, 0.3] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-void/55 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flicker h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_2px] shadow-cyan/60" />
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] uppercase">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const on = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`label px-3 py-1.5 transition-colors ${
                  on ? "text-cyan" : "hover:text-text"
                }`}
              >
                <span className="mr-2 opacity-50">{item.code}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="label border border-cyan/50 px-4 py-2 text-cyan transition-colors hover:bg-cyan hover:text-void"
        >
          связь
        </a>
      </div>
    </header>
  );
}
