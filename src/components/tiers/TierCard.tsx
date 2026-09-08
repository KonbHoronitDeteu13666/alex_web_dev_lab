"use client";

import { useState } from "react";
import type { Tier } from "@/data/tiers";
import CardFace, { cardShell } from "@/components/ui/CardFace";
import TierDialog from "./TierDialog";

/** Карточка тарифа. Клик открывает большое окно с живым макетом и описанием. */
export default function TierCard({
  tier,
  rank,
}: {
  tier: Tier;
  rank?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cardShell(true, tier.featured)}
      >
        <CardFace
          title={tier.title}
          text={tier.gist}
          term={tier.term}
          basePrice={tier.basePrice}
          mock={tier.mock}
          rank={rank}
          featured={tier.featured}
        />
      </button>

      <TierDialog tier={tier} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
