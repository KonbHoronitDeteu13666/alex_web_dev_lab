"use client";

import { useState } from "react";
import Section from "./Section";
import Scramble from "./Scramble";
import { cases } from "@/lib/content";

export default function Cases() {
  const [open, setOpen] = useState<string | null>(cases[0]?.title ?? null);

  return (
    <Section
      id="cases"
      index="// 03"
      eyebrow="объекты"
      title="Последние проекты"
      lead="Показываю не картинки, а задачу и результат. Ссылки и подробности — на созвоне."
    >
      <div className="border-t border-line">
        {cases.map((c, i) => {
          const on = open === c.title;
          return (
            <div key={c.title} className="border-b border-line">
              <button
                onClick={() => setOpen(on ? null : c.title)}
                className="flex w-full items-center gap-5 py-6 text-left transition-colors hover:text-cyan"
              >
                <span className="label shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-xl font-semibold tracking-tight md:text-3xl">
                  <Scramble text={c.title} onHover />
                </span>
                <span className="label hidden md:inline">{c.kind}</span>
                <span
                  className="text-cyan transition-transform duration-300"
                  style={{ transform: on ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>

              <div
                className="grid transition-all duration-500 ease-out"
                style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 md:grid-cols-3">
                    <div>
                      <p className="label mb-2">направление</p>
                      <p className="text-sm text-text/85">{c.kind}</p>
                    </div>
                    <div>
                      <p className="label mb-2">результат</p>
                      <p className="text-sm leading-relaxed text-text/85">{c.result}</p>
                    </div>
                    <div>
                      <p className="label mb-2">стек</p>
                      <p className="font-[family-name:var(--font-mono)] text-sm text-cyan">{c.stack}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
