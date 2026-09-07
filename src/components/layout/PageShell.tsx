import Topline from "./Topline";
import FootNav from "./FootNav";
import type { RouteKey } from "@/lib/routes";

/**
 * Каркас страницы: шапка, поле содержимого и подвал. Отступы поля заданы
 * здесь один раз — раздел не может разъехаться с остальными.
 * Рамка стекла и фон комнаты живут в корневом layout.
 */
export default function PageShell({
  current,
  children,
}: {
  current?: RouteKey;
  children: React.ReactNode;
}) {
  return (
    <>
      <Topline current={current} />
      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        {children}
      </main>
      <FootNav current={current} />
    </>
  );
}
