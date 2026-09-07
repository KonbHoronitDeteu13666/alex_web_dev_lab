import Section from "./Section";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <Section
      id="services"
      index="// 01"
      eyebrow="модули"
      title="Что можно запустить"
      lead="Цены стартовые. Точную смету называю после разговора — она зависит от числа экранов, интеграций и объёма текста."
    >
      <div className="grid gap-px bg-line md:grid-cols-2">
        {services.map((s, i) => (
          <article key={s.title} className="panel group flex flex-col p-7 transition-colors hover:border-cyan/40 md:p-9">
            <div className="label mb-6 flex items-center justify-between">
              <span>модуль {String(i + 1).padStart(2, "0")}</span>
              <span className="text-cyan">{s.term}</span>
            </div>

            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{s.title}</h3>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-lg text-acid">{s.price}</p>

            <p className="mt-5 text-sm leading-relaxed text-dim">{s.text}</p>

            <ul className="mt-7 space-y-2.5 border-t border-line pt-6 font-[family-name:var(--font-mono)] text-xs">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3 text-text/85">
                  <span className="text-cyan">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
