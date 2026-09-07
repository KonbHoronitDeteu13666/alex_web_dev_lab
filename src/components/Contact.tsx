"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { useReveal } from "@/hooks/useReveal";

type State = "idle" | "sending" | "sent" | "error";

const budgets = ["до 50 000 ₽", "50–100 000 ₽", "100–200 000 ₽", "больше 200 000 ₽", "пока не знаю"];

const field =
  "w-full border border-line bg-void/60 px-4 py-3 font-[family-name:var(--font-mono)] text-sm text-text outline-none transition-colors placeholder:text-dim/60 focus:border-cyan";

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Канал не отвечает");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Канал не отвечает");
    }
  }

  return (
    <section id="contact" ref={ref} className="reveal px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="label text-cyan">// 05</span>
          <span className="h-px flex-1 bg-line" />
          <span className="label">канал связи</span>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Расскажите
              <br />
              про задачу
            </h2>
            <p className="mt-6 max-w-md font-[family-name:var(--font-mono)] text-sm leading-relaxed text-dim md:text-base">
              Отвечаю в течение рабочего дня. На первом созвоне разберём задачу, назову срок и цену —
              бесплатно и без обязательств.
            </p>

            <dl className="mt-10 space-y-px bg-line">
              {[
                { k: "почта", v: site.email, href: `mailto:${site.email}` },
                { k: "телефон", v: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
                { k: "telegram", v: "написать", href: site.telegram },
                { k: "город", v: site.city },
              ].map((row) => (
                <div key={row.k} className="panel flex items-center gap-5 px-5 py-3.5">
                  <dt className="label w-24 shrink-0">{row.k}</dt>
                  <dd className="font-[family-name:var(--font-mono)] text-sm">
                    {row.href ? (
                      <a href={row.href} className="text-cyan transition-opacity hover:opacity-70">
                        {row.v}
                      </a>
                    ) : (
                      <span className="text-text/85">{row.v}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form onSubmit={onSubmit} className="panel space-y-5 p-6 md:p-8">
            <p className="label border-b border-line pb-4">форма передачи</p>

            <label className="block">
              <span className="label mb-2 block">как вас зовут</span>
              <input name="name" required placeholder="Иван" className={field} />
            </label>

            <label className="block">
              <span className="label mb-2 block">телефон или почта</span>
              <input name="contact" required placeholder="+7 900 000-00-00" className={field} />
            </label>

            <label className="block">
              <span className="label mb-2 block">бюджет</span>
              <select name="budget" defaultValue={budgets[4]} className={field}>
                {budgets.map((b) => (
                  <option key={b} value={b} className="bg-void">
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="label mb-2 block">что нужно сделать</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Сайт для шиномонтажа, есть логотип, запуск к маю"
                className={`${field} resize-y`}
              />
            </label>

            {/* приманка для ботов, людям не видна */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute h-0 w-0 opacity-0" />

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full border border-cyan bg-cyan/10 px-6 py-3.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] uppercase text-cyan transition-colors hover:bg-cyan hover:text-void disabled:opacity-50"
            >
              {state === "sending" ? "передача…" : "отправить заявку"}
            </button>

            {state === "sent" && (
              <p className="font-[family-name:var(--font-mono)] text-sm text-acid">
                ▸ принято. Свяжусь в течение рабочего дня.
              </p>
            )}
            {state === "error" && (
              <p className="font-[family-name:var(--font-mono)] text-sm text-alert">▸ {error}</p>
            )}

            <p className="label normal-case leading-relaxed tracking-normal">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
