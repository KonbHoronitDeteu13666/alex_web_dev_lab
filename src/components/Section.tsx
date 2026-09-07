"use client";

import Scramble from "./Scramble";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
};

export default function Section({ id, index, eyebrow, title, lead, children }: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className="reveal relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="label text-cyan">{index}</span>
          <span className="h-px flex-1 bg-line" />
          <Scramble text={eyebrow} className="label" onView />
        </div>

        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
          {title}
        </h2>

        {lead && (
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-mono)] text-sm leading-relaxed text-dim md:text-base">
            {lead}
          </p>
        )}

        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
