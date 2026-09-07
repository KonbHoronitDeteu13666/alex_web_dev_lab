/**
 * Первый экран раздела: служебная строка, заголовок и вводный абзац.
 * Вариант «home» крупнее — главная задаёт тон, внутренние страницы тише.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  size = "inner",
}: {
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  size?: "home" | "inner";
}) {
  const home = size === "home";

  return (
    <div className="max-w-[66ch]">
      <p className="on-glass font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
        {eyebrow}
      </p>
      <h1
        className={`mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-emboss on-glass ${
          home ? "md:text-6xl" : "md:text-5xl"
        }`}
      >
        {title}
      </h1>
      <p
        className={
          home
            ? "on-glass mt-6 max-w-[54ch] text-lg leading-relaxed text-ink/90 md:text-xl"
            : "on-glass mt-5 text-base leading-relaxed text-ink/85"
        }
      >
        {lead}
      </p>
    </div>
  );
}
