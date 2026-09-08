import { ROUTES } from "@/lib/routes";
import { categoryOf, otherCategoryOf, type CategoryId } from "@/data/tiers";
import ChoiceHint from "./ChoiceHint";

/**
 * Подсказка выбора на странице категории: слева — когда хватает этой,
 * справа — когда пора в соседнюю, со ссылкой туда.
 */
export default function CategoryChoice({
  categoryId,
}: {
  categoryId: CategoryId;
}) {
  const category = categoryOf(categoryId);
  const other = otherCategoryOf(categoryId);

  return (
    <ChoiceHint
      stayTitle={category.hint.title}
      stayText={category.hint.stay}
      leaveTitle={other.hint.title}
      leaveText={category.hint.leave}
      leaveHref={ROUTES[other.id]}
      leaveLabel={other.crossLabel}
    />
  );
}
