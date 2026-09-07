import Glass from "@/components/layout/Glass";
import Topline from "@/components/layout/Topline";
import FootNav from "@/components/layout/FootNav";
import EntryOverlay from "@/components/entry/EntryOverlay";
import SectionHead from "@/components/ui/SectionHead";
import CategoryTile from "@/components/ui/CategoryTile";
import ChoiceHint from "@/components/ui/ChoiceHint";
import { ROUTES } from "@/lib/routes";
import { site } from "@/data/site";
import { categoryOf, minPriceOf, tiers } from "@/data/tiers";

export default function HomePage() {
  const simple = categoryOf("simple");
  const middle = categoryOf("middle");

  return (
    <>
      <EntryOverlay />
      <Glass />
      <Topline current="home" />

      <main className="hud-rise mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-[66ch]">
          <p className="on-glass font-mono text-[11px] tracking-[0.2em] text-teal uppercase">
            {site.role}
          </p>
          <h1 className="mt-3.5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance text-emboss on-glass md:text-6xl">
            {site.slogan}
          </h1>
          <p className="on-glass mt-5 text-base leading-relaxed text-ink/85">
            {site.description}
          </p>
        </div>

        <div className="mt-14">
          <SectionHead title="Категории" meta={`${tiers.length} тарифов`} />
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryTile
              href={ROUTES.simple}
              title={simple.title}
              text="Одна страница, форма заявки, без базы данных и личного кабинета. Четыре тарифа: Старт, Стандарт, Продвинутый, Премиум."
              basePrice={minPriceOf("simple")}
              term={simple.termRange}
            />
            <CategoryTile
              href={ROUTES.middle}
              title={middle.title}
              text="5–15 страниц, админка для контента, каталог с фильтрами, блог, интеграции с CRM и мессенджерами. Четыре тарифа."
              basePrice={minPriceOf("middle")}
              term={middle.termRange}
            />
          </div>
        </div>

        <div className="mt-14">
          <SectionHead title="Что выбрать" />
          <ChoiceHint
            stayTitle="Если одна страница закрывает вопрос"
            stayText="Вы продаёте одну услугу или небольшой набор, нужно рассказать о себе и получать заявки. Цены и тексты меняются редко — хватит простого сайта."
            leaveTitle="Если позиции добавляются постоянно"
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
      </main>

      <FootNav current="home" />
    </>
  );
}
