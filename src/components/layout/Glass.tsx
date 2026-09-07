/** Стекло очков: виньетка по краям кадра и засечки по углам. */
export default function Glass() {
  const corners = [
    "left-4 top-4 border-l border-t",
    "right-4 top-4 border-r border-t",
    "left-4 bottom-4 border-l border-b",
    "right-4 bottom-4 border-r border-b",
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      <div className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_45%,transparent_52%,rgba(3,5,10,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_112%,rgba(55,212,200,0.10)_0%,transparent_70%)]" />
      {corners.map((position) => (
        <span
          key={position}
          className={`absolute h-6 w-6 border-teal/50 ${position}`}
        />
      ))}
    </div>
  );
}
