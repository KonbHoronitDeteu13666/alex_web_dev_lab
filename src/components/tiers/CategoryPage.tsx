import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/ui/PageHero";
import CategoryChoice from "@/components/ui/CategoryChoice";
import TierList from "./TierList";
import { categoryOf, tiersOf, type CategoryId } from "@/data/tiers";

/**
 * Страница категории. Обе категории показываются одинаково, отличаются
 * только данными, поэтому разметка живёт здесь, а маршруты — тонкие.
 */
export default function CategoryPage({
  categoryId,
}: {
  categoryId: CategoryId;
}) {
  const category = categoryOf(categoryId);

  return (
    <PageShell current={categoryId}>
      <PageHero
        eyebrow={category.eyebrow}
        title={category.title}
        lead={`${category.note} Сроки ${category.termRange}.`}
      />

      <div className="mt-12">
        <TierList tiers={tiersOf(categoryId)} />
      </div>

      <div className="mt-14">
        <CategoryChoice categoryId={categoryId} />
      </div>
    </PageShell>
  );
}
