import Parallax from "@/components/motion/Parallax";

/**
 * Первый экран раздела: служебная строка в рамке, крупный заголовок
 * с выделенным словом и вводный абзац. За заголовком стоит мятное пятно —
 * оно и даёт ощущение подсвеченного стекла, а не плоского текста.
 */
export default function PageHero({
  eyebrow,
  title,
  accentWord,
  lead,
  size = "inner",
  aside,
}: {
  eyebrow: string;
  title: string;
  /** Слово из заголовка, которое горит акцентом. */
  accentWord?: string;
  lead: React.ReactNode;
  size?: "home" | "inner";
  /** Сцена справа от текста. Показывается только на широких экранах. */
  aside?: React.ReactNode;
}) {
  const home = size === "home";

  return (
    <div className="relative">
      {/* свечение за заголовком */}
      <span
        aria-hidden
        className="orb drift-slow -z-10"
        style={{
          top: home ? "-40%" : "-60%",
          left: "-10%",
          width: home ? "34rem" : "26rem",
          height: home ? "34rem" : "26rem",
          background:
            "radial-gradient(circle, rgb(63 240 200 / 0.22) 0%, transparent 68%)",
        }}
      />

      <Parallax speed={0.06}>
        <div
          className={
            aside
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)]"
              : ""
          }
        >
          <div className="max-w-[64ch]">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/5 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-mint uppercase">
              <span className="beat h-1.5 w-1.5 rounded-full bg-mint" />
              {eyebrow}
            </p>

            <h1
              className={`mt-6 font-display leading-[1.04] font-medium tracking-tight text-balance ${
                home ? "text-4xl md:text-7xl" : "text-3xl md:text-5xl"
              }`}
            >
              {renderTitle(title, accentWord)}
            </h1>

            <p
              className={
                home
                  ? "mt-7 max-w-[52ch] text-lg leading-relaxed text-ink/85 md:text-xl"
                  : "mt-5 max-w-[60ch] text-base leading-relaxed text-ink/85"
              }
            >
              {lead}
            </p>
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </Parallax>
    </div>
  );
}

/** Подсвечивает одно слово в заголовке, не трогая остальные. */
function renderTitle(title: string, accentWord?: string) {
  if (!accentWord || !title.includes(accentWord)) return title;
  const [before, after] = title.split(accentWord);
  return (
    <>
      {before}
      <span className="accent-word">{accentWord}</span>
      {after}
    </>
  );
}
