import { site } from "@/data/site";

/**
 * Комната остаётся за интерфейсом: последний кадр ролика стоит фоном
 * на всех страницах. Размытие и затемнение — чтобы текст читался,
 * а кадр воспринимался как то, что видно сквозь стекло очков.
 */
export default function RoomBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center blur-[3px]"
        style={{ backgroundImage: `url(${site.scene.lastFrame})` }}
      />
      {/* затемнение: без него жёлтый свет комнаты глушит текст */}
      <div className="absolute inset-0 bg-bg/70" />
      {/* тёплый отсвет снизу, как от окна */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_100%,rgba(244,215,56,0.07),transparent_70%)]" />
    </div>
  );
}
