import { ROUTES } from "@/lib/routes";
import { categories, minPriceOf } from "@/data/tiers";
import CategoryTile from "./CategoryTile";

/**
 * Обе категории плитками. Тексты и цены берутся из данных, поэтому блок
 * одинаков на главной, на 404 и на странице состава работ.
 * `detailed` добавляет срок и превью-макет — там, где есть место.
 */
export default function CategoryTiles({
  detailed = false,
}: {
  detailed?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          href={ROUTES[category.id]}
          title={category.title}
          text={category.tileText}
          basePrice={minPriceOf(category.id)}
          term={detailed ? category.termRange : undefined}
          mock={detailed ? category.mock : undefined}
        />
      ))}
    </div>
  );
}
