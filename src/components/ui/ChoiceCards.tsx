import { categories } from "@/data/tiers";
import Reveal from "@/components/motion/Reveal";
import ChoiceCard from "./ChoiceCard";

/**
 * Выбор категории двумя карточками. Клик не ведёт в тарифы — это делает блок
 * выше. Здесь открывается разбор задач: что бывает нужно заказчику и какой
 * пакет это закрывает.
 *
 * Блок серверный: список категорий не должен попадать в браузерный бандл.
 */
export default function ChoiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {categories.map((category, i) => (
        <Reveal key={category.id} delay={i * 90}>
          <ChoiceCard category={category} />
        </Reveal>
      ))}
    </div>
  );
}
