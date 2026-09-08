import type { Tier } from "@/data/tiers";
import Reveal from "@/components/motion/Reveal";
import TierCard from "./TierCard";

/** Четыре пакета категории. Карточки всплывают по очереди при прокрутке. */
export default function TierList({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {tiers.map((tier, i) => (
        <Reveal key={tier.id} delay={i * 90}>
          <TierCard tier={tier} rank={String(i + 1).padStart(2, "0")} />
        </Reveal>
      ))}
    </div>
  );
}
