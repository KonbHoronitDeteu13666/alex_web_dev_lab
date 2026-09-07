"use client";

import { site, stats } from "@/lib/content";
import Scramble from "./Scramble";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-20 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="label mb-7 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 border border-line px-3 py-1.5">
            <span className="flicker h-1.5 w-1.5 rounded-full bg-acid" />
            свободен 1 слот на этот месяц
          </span>
          <span className="hidden sm:inline">{site.city}</span>
        </div>

        <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-balance md:text-[5.5rem]">
          Собираю сайты,
          <br />
          <span className="text-cyan">в которые заходят</span>
          <br />
          как в игру
        </h1>

        <p className="mt-8 max-w-xl font-[family-name:var(--font-mono)] text-sm leading-relaxed text-dim md:text-base">
          {site.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group relative overflow-hidden border border-cyan bg-cyan/10 px-7 py-3.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] uppercase text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            <Scramble text="запустить проект" onHover />
          </a>
          <a
            href="#cases"
            className="border border-line px-7 py-3.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] uppercase text-dim transition-colors hover:border-dim hover:text-text"
          >
            <Scramble text="открыть объекты" onHover />
          </a>
        </div>

        <dl className="mt-20 grid max-w-3xl grid-cols-1 gap-px bg-line sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="panel px-5 py-6">
              <dt className="font-[family-name:var(--font-mono)] text-2xl text-cyan md:text-3xl">
                {s.value}
              </dt>
              <dd className="label mt-2 normal-case tracking-[0.1em]">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="label mt-16 flex items-center gap-3">
          <span className="h-px w-12 bg-cyan/60" />
          прокрутите вниз
        </div>
      </div>
    </section>
  );
}
