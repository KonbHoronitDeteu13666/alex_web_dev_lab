import PageShell from "@/components/layout/PageShell";
import EntryOverlay from "@/components/entry/EntryOverlay";
import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTile from "@/components/ui/CategoryTile";
import CategoryTiles from "@/components/ui/CategoryTiles";
import ChoiceHint from "@/components/ui/ChoiceHint";
import { ROUTES } from "@/lib/routes";
import { site } from "@/data/site";
import { categoryOf, tiers } from "@/data/tiers";

export default function HomePage() {
  return (
    <>
      <EntryOverlay />

      <PageShell current="home">
        <PageHero
          size="home"
          eyebrow={site.role}
          title={site.slogan}
          lead={site.description}
        />

        <div className="mt-14">
          <SectionHead title="Категории" meta={`${tiers.length} тарифов`} />
          <CategoryTiles detailed />
        </div>

        <div className="mt-14">
          <SectionHead title="Что выбрать" />
          <ChoiceHint
            stayTitle={categoryOf("simple").hint.title}
            stayText="Вы продаёте одну услугу или небольшой набор, нужно рассказать о себе и получать заявки. Цены и тексты меняются редко — хватит простого сайта."
            leaveTitle={categoryOf("middle").hint.title}
            leaveText="Каталог живёт, цены меняются, нужно править содержимое самому, вести блог и сводить заявки в CRM — это средний функционал."
          />
        </div>

        <div className="mt-14">
          <SectionHead title="Дальше" />
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryTile
              href={ROUTES.included}
              title="Что входит «под ключ»"
              text="Десять пунктов состава работ, одинаковых для всех тарифов: от брифинга и прототипа до публикации на хостинге и гарантии 14 дней."
            />
            <CategoryTile
              href={ROUTES.terms}
              title="Условия работы"
              text="Как вносятся правки и что считается переделкой. Оплата четырьмя этапами, привязана к результату, а не к календарю."
            />
          </div>
        </div>
      </PageShell>
    </>
  );
}
