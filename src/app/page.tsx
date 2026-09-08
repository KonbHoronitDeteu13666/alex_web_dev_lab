import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTile from "@/components/ui/CategoryTile";
import CategoryTiles from "@/components/ui/CategoryTiles";
import ChoiceCards from "@/components/ui/ChoiceCards";
import Reveal from "@/components/motion/Reveal";
import { ROUTES } from "@/lib/routes";
import { site } from "@/data/site";
import { tiers } from "@/data/tiers";

export default function HomePage() {
  return (
    <PageShell current="home">
      <PageHero
        size="home"
        eyebrow={site.role}
        title={site.slogan}
        accentWord="фантазией"
        lead={site.description}
      />

      <div className="mt-20">
        <SectionHead
          rank="01"
          title="Категории"
          meta={`${tiers.length} тарифов`}
        />
        <CategoryTiles detailed />
      </div>

      <div className="mt-20">
        <SectionHead rank="02" title="Какой вариант ваш" />
        <ChoiceCards />
      </div>

      <div className="mt-20">
        <SectionHead rank="03" title="Условия" />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <CategoryTile
              href={ROUTES.included}
              title="Что входит «под ключ»"
              text="Десять пунктов состава работ, одинаковых для всех тарифов: от брифинга и прототипа до публикации на хостинге и гарантии 14 дней."
            />
          </Reveal>
          <Reveal delay={90}>
            <CategoryTile
              href={ROUTES.terms}
              title="Условия работы"
              text="Как вносятся правки и что считается переделкой. Оплата четырьмя этапами, привязана к результату, а не к календарю."
            />
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
