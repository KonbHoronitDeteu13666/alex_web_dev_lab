import Section from "./Section";
import { faq } from "@/lib/content";

export default function Faq() {
  return (
    <Section id="faq" index="// 04" eyebrow="справка" title="Что обычно спрашивают">
      <div className="border-t border-line">
        {faq.map((item, i) => (
          <details key={item.q} className="group border-b border-line py-5">
            <summary className="flex cursor-pointer list-none items-start gap-5 text-base font-medium transition-colors group-hover:text-cyan md:text-lg">
              <span className="label mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{item.q}</span>
              <span className="mt-1 shrink-0 text-cyan transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-3xl pl-11 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-dim">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
