/**
 * Заголовок секции: порядковый номер, название и линия до края.
 * Номер — не украшение: разделы идут по порядку, и он держит счёт.
 */
export default function SectionHead({
  title,
  meta,
  rank,
}: {
  title: string;
  meta?: string;
  rank?: string;
}) {
  return (
    <div className="mb-7 flex items-baseline gap-4">
      {rank && <span className="rank">{rank}</span>}
      <h2 className="font-display text-xl font-medium tracking-tight md:text-3xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-linear-to-r from-mint/25 to-transparent" />
      {meta && <span className="label">{meta}</span>}
    </div>
  );
}
