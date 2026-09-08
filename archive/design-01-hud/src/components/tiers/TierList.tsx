import type { Tier } from "@/data/tiers";
import TierCard from "./TierCard";

export default function TierList({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tiers.map((tier) => (
        <TierCard key={tier.id} tier={tier} />
      ))}
    </div>
  );
}
