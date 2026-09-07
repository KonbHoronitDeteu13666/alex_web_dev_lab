import Section from "./Section";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <Section
      id="process"
      index="// 02"
      eyebrow="протокол"
      title="Как идёт работа"
      lead="Каждый этап заканчивается тем, что вы видите и утверждаете. Сюрпризов на сдаче не бывает."
    >
      <ol className="relative border-l border-line pl-7 md:pl-10">
        {process.map((p) => (
          <li key={p.step} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[calc(1.75rem+5px)] top-1.5 h-2.5 w-2.5 rotate-45 border border-cyan bg-void md:-left-[calc(2.5rem+5px)]" />
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="label text-cyan">этап {p.step}</span>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
