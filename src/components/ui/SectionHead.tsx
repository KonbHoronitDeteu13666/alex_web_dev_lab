export default function SectionHead({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <h2 className="on-glass font-display text-xl font-medium tracking-tight md:text-2xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-line" />
      {meta && <span className="label on-glass">{meta}</span>}
    </div>
  );
}
